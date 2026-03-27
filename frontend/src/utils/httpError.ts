import { AxiosError } from "axios";

type ApiErrorPayload = {
  message?: string;
  error?: string;
  errors?: Array<{ defaultMessage?: string; message?: string }>;
  violations?: Array<{ message?: string; propertyPath?: string }>;
};

function extractSpringValidationMessages(data: unknown): string[] {
  if (!data || typeof data !== "object") return [];
  const d = data as ApiErrorPayload;
  const msgs: string[] = [];

  if (Array.isArray(d.errors)) {
    for (const item of d.errors) {
      if (item && typeof item === "object") {
        const e = item as { defaultMessage?: string; message?: string };
        const m =
          typeof e.defaultMessage === "string"
            ? e.defaultMessage
            : typeof e.message === "string"
              ? e.message
              : "";
        const t = m.trim();
        if (t) msgs.push(t);
      }
    }
  }

  if (Array.isArray(d.violations)) {
    for (const v of d.violations) {
      if (v && typeof v === "object" && typeof v.message === "string") {
        const t = v.message.trim();
        if (t) msgs.push(t);
      }
    }
  }

  return [...new Set(msgs)];
}

function isGenericValidationSummary(message: string): boolean {
  return (
    message.includes("Validation failed") ||
    message.includes("MethodArgumentNotValid") ||
    /^Validation failed for/i.test(message)
  );
}

export class HttpError extends Error {
  status?: number;
  original?: unknown;

  constructor(message: string, status?: number, original?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.original = original;
  }
}

export function toFriendlyErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<ApiErrorPayload>;
  const status = axiosError.response?.status;
  const data = axiosError.response?.data as ApiErrorPayload | undefined;

  const validationMsgs = extractSpringValidationMessages(data);
  if (validationMsgs.length > 0) {
    return validationMsgs.join(" ");
  }

  const backendMessage = data?.message || data?.error;
  if (typeof backendMessage === "string" && backendMessage.trim()) {
    if (isGenericValidationSummary(backendMessage) && status === 400) {
      return "Dados inválidos. Verifique horário (precisa ser no futuro), motivo e demais campos.";
    }
    return backendMessage.trim();
  }

  if (status === 401) return "Sua sessão expirou. Faça login novamente.";
  if (status === 403) return "Você não tem permissão para esta ação.";
  if (status === 409) return "Conflito de horário. Escolha outro horário.";
  if (status && status >= 500) return "Erro interno do servidor. Tente novamente.";
  return "Não foi possível concluir a solicitação.";
}

export function normalizeHttpError(error: unknown): HttpError {
  const axiosError = error as AxiosError<ApiErrorPayload>;
  const status = axiosError.response?.status;
  const message = toFriendlyErrorMessage(error);
  return new HttpError(message, status, error);
}
