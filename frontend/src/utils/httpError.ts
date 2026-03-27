import { AxiosError } from "axios";

type ApiErrorPayload = {
  message?: string;
  error?: string;
};

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
  const backendMessage =
    axiosError.response?.data?.message || axiosError.response?.data?.error;

  if (backendMessage) return backendMessage;
  if (status === 401) return "Sua sessao expirou. Faca login novamente.";
  if (status === 403) return "Voce nao tem permissao para esta acao.";
  if (status === 409) return "Conflito de horario. Escolha outro horario.";
  if (status && status >= 500) return "Erro interno do servidor. Tente novamente.";
  return "Nao foi possivel concluir a solicitacao.";
}

export function normalizeHttpError(error: unknown): HttpError {
  const axiosError = error as AxiosError<ApiErrorPayload>;
  const status = axiosError.response?.status;
  const message = toFriendlyErrorMessage(error);
  return new HttpError(message, status, error);
}
