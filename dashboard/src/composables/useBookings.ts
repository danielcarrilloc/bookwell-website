import { ref } from 'vue'
import { httpClient } from '@/utils/http-client'
import type { Booking, CreateBookingWithPaymentInput } from '@/types'

export const useBookings = () => {
  const bookings = ref<Booking[]>([])
  const currentBooking = ref<Booking | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch bookings by client ID
   */
  const fetchClientBookings = async (clientId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<Booking[]>(
        `/bookings/client/${clientId}`
      )
      bookings.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch bookings'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch upcoming bookings for client
   */
  const fetchUpcomingClientBookings = async (clientId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<Booking[]>(
        `/bookings/client/${clientId}/upcoming`
      )
      bookings.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch bookings'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch bookings by instructor ID
   */
  const fetchInstructorBookings = async (instructorId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<Booking[]>(
        `/bookings/instructor/${instructorId}`
      )
      bookings.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch bookings'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch upcoming bookings for instructor
   */
  const fetchUpcomingInstructorBookings = async (instructorId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<Booking[]>(
        `/bookings/instructor/${instructorId}/upcoming`
      )
      bookings.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch bookings'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch bookings by class ID
   */
  const fetchClassBookings = async (classId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<Booking[]>(
        `/bookings/class/${classId}`
      )
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch bookings'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch bookings by date range
   */
  const fetchBookingsByDateRange = async (
    startDate: string,
    endDate: string
  ) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<Booking[]>(
        `/bookings/date-range?startDate=${startDate}&endDate=${endDate}`
      )
      bookings.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch bookings'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch single booking by ID
   */
  const fetchBooking = async (bookingId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<Booking>(`/bookings/${bookingId}`)
      currentBooking.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch booking'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Create a new booking
   */
  const createBooking = async (data: CreateBookingWithPaymentInput) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.post<Booking>('/bookings', data)
      bookings.value.push(response)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create booking'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Cancel a booking
   */
  const cancelBooking = async (
    bookingId: string,
    cancellationReason?: string
  ) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.patch<Booking>(
        `/bookings/${bookingId}/cancel`,
        { cancellationReason }
      )

      // Update in local array
      const index = bookings.value.findIndex((b) => b._id === bookingId)
      if (index !== -1) {
        bookings.value[index] = response
      }

      if (currentBooking.value?._id === bookingId) {
        currentBooking.value = response
      }

      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to cancel booking'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Check in a booking (instructor only)
   */
  const checkInBooking = async (bookingId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.patch<Booking>(
        `/bookings/${bookingId}/checkin`
      )

      // Update in local array
      const index = bookings.value.findIndex((b) => b._id === bookingId)
      if (index !== -1) {
        bookings.value[index] = response
      }

      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to check in booking'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Mark booking as no-show (instructor only)
   */
  const markNoShow = async (bookingId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.patch<Booking>(
        `/bookings/${bookingId}/no-show`
      )

      // Update in local array
      const index = bookings.value.findIndex((b) => b._id === bookingId)
      if (index !== -1) {
        bookings.value[index] = response
      }

      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to mark no-show'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Count bookings for a class on a specific date
   */
  const countBookings = async (classId: string, date: string) => {
    try {
      const response = await httpClient.get<{ count: number }>(
        `/bookings/class/${classId}/count?date=${date}`
      )
      return response.count
    } catch (err: any) {
      error.value = err.message || 'Failed to count bookings'
      throw err
    }
  }

  return {
    // State
    bookings,
    currentBooking,
    isLoading,
    error,

    // Methods
    fetchClientBookings,
    fetchUpcomingClientBookings,
    fetchInstructorBookings,
    fetchUpcomingInstructorBookings,
    fetchClassBookings,
    fetchBookingsByDateRange,
    fetchBooking,
    createBooking,
    cancelBooking,
    checkInBooking,
    markNoShow,
    countBookings,

    // Aliases for compatibility
    fetchBookingsByClient: fetchClientBookings,
    fetchBookingsByInstructor: fetchInstructorBookings,
    checkIn: checkInBooking,
  }
}
