export class DateHelper {
  /**
   * Generates a date string for a specific day of the current month.
   * @param day The day of the month (1-31).
   * @returns The date in MM/DD/YYYY format.
   */
  static getFormattedDate(day: number): string {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = day.toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${month}/${date}/${year}`;
  }

  /**
   * Generates a random date for the next few days to avoid fixed date issues.
   * @returns A formatted date string.
   */
  static getRandomUpcomingDate(): string {
    const now = new Date();
    const randomDaysToAdd = Math.floor(Math.random() * 5) + 1;
    now.setDate(now.getDate() + randomDaysToAdd);
    return now.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  }
}
