export * from './api'

// UI Component Types
export interface MenuItem {
  label: string
  icon: string
  to: string
  badge?: number
}

export interface Tab {
  id: string
  label: string
  icon?: string
  count?: number
}

export interface BreadcrumbItem {
  label: string
  to?: string
}

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export interface ModalOptions {
  title: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  validation?: FormValidation
  options?: SelectOption[]
}

export interface SelectOption {
  label: string
  value: string | number
}

export interface FormValidation {
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | undefined
}

export interface FormErrors {
  [key: string]: string
}

// Calendar Types
export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  color?: string
  classId?: string
  bookingId?: string
  type: 'class' | 'booking' | 'exception'
}

export interface TimeRange {
  start: string // HH:mm
  end: string // HH:mm
}

// Filter Types
export interface ClassFilters {
  type?: string
  instructor?: string
  date?: string
  timeRange?: TimeRange
  onlyAvailable?: boolean
}

export interface BookingFilters {
  status?: string
  dateFrom?: string
  dateTo?: string
  classId?: string
}

export interface ClientFilters {
  search?: string
  hasActivePackage?: boolean
  lowCredits?: boolean
}

// Stats Types
export interface StatCard {
  label: string
  value: number | string
  change?: number // percentage
  trend?: 'up' | 'down' | 'neutral'
  icon?: string
  color?: string
}

export interface RevenueData {
  date: string
  amount: number
  bookings: number
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor?: string
  borderColor?: string
}

// Empty State Types
export interface EmptyStateConfig {
  icon: string
  title: string
  message: string
  actionLabel?: string
  actionTo?: string
}
