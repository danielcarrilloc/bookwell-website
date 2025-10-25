/**
 * TypeScript types generated from OpenAPI specification
 * BookWell API - Boutique wellness booking SaaS
 */

// User and Authentication Types
export type UserRole = 'instructor' | 'client'

export interface ClientProfile {
  _id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  totalCredits?: number
  createdAt?: string
  updatedAt?: string
}

export interface CurrentUser {
  id: string
  email: string
  role: UserRole
  firstName: string
  lastName: string
  phone: string
  instructor?: InstructorProfile
  client?: ClientProfile
}

export interface HealthResponse {
  status: string
  service?: string
  timestamp: string
  database?: string
}

// Instructor Types
export interface InstructorProfile {
  _id: string
  userId: string
  businessName: string
  bio: string
  specialties: string[]
  city?: string
  state?: string
  profileImageUrl?: string
  stripeAccountId?: string
  paymentEnabled?: boolean
  paymentMethods?: PaymentMethod[]
  notificationPreferences?: NotificationPreferences
  weeklyAvailability?: WeeklyAvailability[]
  exceptions?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface WeeklyAvailability {
  dayOfWeek: number // 0 = Sunday, 6 = Saturday
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  isAvailable: boolean
}

export interface NotificationPreferences {
  emailNotifications: boolean
  smsNotifications: boolean
  bookingConfirmations: boolean
  bookingReminders: boolean
  cancellations: boolean
  paymentNotifications: boolean
}

export type PaymentMethod = 'stripe' | 'pix' | 'mercadopago' | 'manual'

export interface DashboardStats {
  activeClients: number
  totalBookings: number
  upcomingBookings: number
  totalRevenue: number
  creditsSold: number
  activePackages: number
}

// Class Types
export interface Class {
  _id: string
  instructorId: string | InstructorProfile
  name: string
  description: string
  type: string // e.g., 'yoga', 'pilates', 'personal_training'
  duration: number // minutes
  maxCapacity: number
  creditCost: number
  location?: string
  recurringSchedule: RecurringSchedule[]
  oneOffDates: OneOffDate[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ClassPopulated extends Omit<Class, 'instructorId'> {
  instructorId: InstructorProfile
}

export interface RecurringSchedule {
  dayOfWeek: number // 0-6
  startTime: string // HH:mm
  endTime: string // HH:mm
}

export interface OneOffDate {
  date: string // ISO date
  startTime: string // HH:mm
  endTime: string // HH:mm
  isException?: boolean // If true, cancels recurring class on this date
}

export interface ClassScheduleItem {
  classId: string
  className: string
  date: string
  startTime: string
  endTime: string
  bookedCount: number
  maxCapacity: number
}

export interface ClassWithSlots extends Class {
  availableSlots: TimeSlot[]
}

export interface TimeSlot {
  startTime: string
  endTime: string
  isAvailable: boolean
  bookedCount: number
}

// Booking Types
export type BookingStatus = 'confirmed' | 'cancelled' | 'completed' | 'no-show' | 'pending'

export interface Booking {
  _id: string
  clientId: string | Client
  instructorId: string
  classId: string | Class
  date: string // ISO date
  startTime: string
  endTime: string
  status: BookingStatus
  creditsUsed: number
  clientPackageId?: string
  checkedInAt?: string
  cancelledAt?: string
  cancellationReason?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface BookingPopulated extends Omit<Booking, 'classId' | 'clientId'> {
  classId: Class
  clientId: Client
}

export interface CreateBookingInput {
  clientId: string
  classId: string
  date: string
  startTime: string
  endTime: string
  clientPackageId?: string
  notes?: string
}

export interface CreateBookingWithPaymentInput extends CreateBookingInput {
  paymentMethod?: PaymentMethod
  packageId?: string // If purchasing a new package
}

// Client Types
export interface Client {
  _id: string
  userId: string
  instructorId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  notes?: string
  totalCredits: number
  activePackages: ClientPackage[]
  createdAt: string
  updatedAt: string
}

// Package Types
export interface Package {
  _id: string
  instructorId: string
  name: string
  description: string
  credits: number
  price: number
  validityDays: number
  isActive: boolean
  isAvailableForPurchase: boolean
  createdAt: string
  updatedAt: string
}

export interface ClientPackage {
  _id: string
  clientId: string
  packageId: string | Package
  instructorId: string
  creditsRemaining: number
  creditsTotal: number
  expiresAt: string
  purchasedAt: string
  revokedAt?: string
  paymentId?: string
  status: 'active' | 'expired' | 'depleted' | 'revoked'
}

export interface ClientPackagePopulated extends Omit<ClientPackage, 'packageId'> {
  packageId: Package
}

// Payment Types
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'cancelled'

export interface Payment {
  _id: string
  clientId: string
  instructorId: string
  packageId: string
  amount: number
  currency: string
  status: PaymentStatus
  paymentMethod: PaymentMethod
  stripePaymentIntentId?: string
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

// Notification Types
export type NotificationType =
  | 'booking_confirmation'
  | 'booking_reminder'
  | 'booking_cancellation'
  | 'payment_success'
  | 'payment_failed'
  | 'credit_low'
  | 'credit_expiring'

export type NotificationStatus = 'pending' | 'sent' | 'failed'

export interface Notification {
  _id: string
  recipientId: string
  type: NotificationType
  channel: 'email' | 'sms'
  subject?: string
  message: string
  bookingId?: string
  paymentId?: string
  status: NotificationStatus
  sentAt?: string
  failedAt?: string
  error?: string
  createdAt: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  statusCode: number
  message: string
  error: string
}

// Form Input Types
export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  role: UserRole
}

export interface UpdateInstructorProfileInput {
  businessName?: string
  bio?: string
  specialties?: string[]
  city?: string
  state?: string
  profileImageUrl?: string
}

export interface UpdateNotificationPreferencesInput {
  emailNotifications?: boolean
  smsNotifications?: boolean
  bookingConfirmations?: boolean
  bookingReminders?: boolean
  cancellations?: boolean
  paymentNotifications?: boolean
}

export interface CreateClassInput {
  name: string
  description: string
  type: string
  duration: number
  maxCapacity: number
  creditCost: number
  location?: string
  recurringSchedule?: RecurringSchedule[]
  oneOffDates?: OneOffDate[]
}

export interface UpdateClassInput {
  name?: string
  description?: string
  type?: string
  duration?: number
  maxCapacity?: number
  creditCost?: number
  location?: string
  isActive?: boolean
}

export interface CreatePackageInput {
  name: string
  description: string
  credits: number
  price: number
  validityDays: number
  isAvailableForPurchase?: boolean
}

export interface AssignPackageManuallyInput {
  clientId: string
  packageId: string
  notes?: string
}

// Query Parameters
export interface DateRangeParams {
  startDate: string
  endDate: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
