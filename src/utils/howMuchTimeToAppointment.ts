export function howMuchTimeToAppointment(dateString: string): string {
  const targetDate = new Date(dateString);
  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTarget = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

  const diffTime = startOfTarget.getTime() - startOfToday.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Amanhã';
  if (diffDays === -1) return 'Ontem';

  if (diffDays > 1) {
    if (diffDays < 7) return `Em ${diffDays} dias`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Em ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `Em ${months} ${months === 1 ? 'mês' : 'meses'}`;
    }
    const years = Math.floor(diffDays / 365);
    return `Em ${years} ${years === 1 ? 'ano' : 'anos'}`;
  }

  const absDays = Math.abs(diffDays);
  if (absDays < 7) return `Há ${absDays} dias`;
  if (absDays < 30) return `Há ${Math.floor(absDays / 7)} sem.`;
  if (absDays < 365) return `Há ${Math.floor(absDays / 30)} meses`;
  
  return `Há ${Math.floor(absDays / 365)} anos`;
}