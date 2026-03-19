/**
 * Extrai o horário de uma data (Objeto ou String ISO) no formato HH:mm.
 * * @param date - A data em formato de Objeto Date ou String ISO.
 * @returns String formatada (ex: "15:00").
 */

export const hoursOnly = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

