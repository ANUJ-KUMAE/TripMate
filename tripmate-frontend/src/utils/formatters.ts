/**
 * Format a number as currency using Intl.NumberFormat
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a date string or object
 */
export function formatDate(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' },
): string {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}

/**
 * Format a date range (e.g. "Jul 12 - 18, 2026")
 */
export function formatDateRange(startDate: string | Date, endDate: string | Date): string {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const startFormatted = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(start)
  const endFormatted = new Intl.DateTimeFormat('en-US', {
    month: start.getMonth() === end.getMonth() ? undefined : 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(end)

  return `${startFormatted} - ${endFormatted}`
}

