import { format, parseISO, formatDistance, isToday, isTomorrow, isYesterday } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Formatting utilities for dates, currency, and other data
 */

// Date Formatting
export const formatDate = (date: string | Date, pattern: string = 'PP'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, pattern, { locale: ptBR })
}

export const formatTime = (time: string): string => {
  // Assumes time is in HH:mm format
  return time
}

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'PPp', { locale: ptBR })
}

export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date

  if (isToday(dateObj)) {
    return `Hoje às ${format(dateObj, 'HH:mm')}`
  } else if (isTomorrow(dateObj)) {
    return `Amanhã às ${format(dateObj, 'HH:mm')}`
  } else if (isYesterday(dateObj)) {
    return `Ontem às ${format(dateObj, 'HH:mm')}`
  }

  return formatDistance(dateObj, new Date(), { addSuffix: true, locale: ptBR })
}

// Currency Formatting
export const formatCurrency = (amount: number, currency: string = 'BRL'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(amount / 100) // Assuming amount is in cents
}

export const formatCurrencyCompact = (amount: number, currency: string = 'BRL'): string => {
  if (amount >= 1000000) {
    return `${currency === 'BRL' ? 'R$' : '$'} ${(amount / 1000000).toFixed(1)}M`
  } else if (amount >= 1000) {
    return `${currency === 'BRL' ? 'R$' : '$'} ${(amount / 1000).toFixed(1)}K`
  }
  return formatCurrency(amount, currency)
}

// Number Formatting
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('pt-BR').format(num)
}

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`
}

// Phone Formatting
export const formatPhone = (phone: string): string => {
  // Brazilian phone format: +55 (11) 99999-9999
  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    return `+55 (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`
  } else if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }

  return phone
}

// Text Formatting
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const capitalizeWords = (text: string): string => {
  return text
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ')
}

// Credits Formatting
export const formatCredits = (credits: number): string => {
  if (credits === 1) return '1 crédito'
  return `${credits} créditos`
}

// Status Badge Formatting
export const getBookingStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    confirmed: 'Confirmado',
    cancelled: 'Cancelado',
    completed: 'Completo',
    'no-show': 'Faltou',
    pending: 'Pendente',
  }
  return statusMap[status] || status
}

export const getBookingStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    confirmed: 'text-info bg-info-light',
    cancelled: 'text-error bg-error-light',
    completed: 'text-success bg-success-light',
    'no-show': 'text-warning bg-warning-light',
    pending: 'text-foreground-secondary bg-background-secondary',
  }
  return colorMap[status] || colorMap.pending
}

export const getPaymentStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Pendente',
    succeeded: 'Pago',
    failed: 'Falhou',
    cancelled: 'Cancelado',
  }
  return statusMap[status] || status
}

export const getPaymentStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    pending: 'text-warning bg-warning-light',
    succeeded: 'text-success bg-success-light',
    failed: 'text-error bg-error-light',
    cancelled: 'text-foreground-secondary bg-background-secondary',
  }
  return colorMap[status] || colorMap.pending
}

// Duration Formatting
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
}
