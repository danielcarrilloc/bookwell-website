import { ref } from 'vue'
import { httpClient } from '@/utils/http-client'
import type {
  Class,
  CreateClassInput,
  UpdateClassInput,
  ClassWithSlots,
  ClassScheduleItem,
} from '@/types'

export const useClasses = () => {
  const classes = ref<Class[]>([])
  const currentClass = ref<Class | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch all classes for the current instructor
   */
  const fetchMyClasses = async (activeOnly: boolean = false) => {
    try {
      isLoading.value = true
      error.value = null
      const params = activeOnly ? '?activeOnly=true' : ''
      const response = await httpClient.get<Class[]>(`/classes${params}`)
      classes.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch classes'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch classes by instructor ID
   */
  const fetchClassesByInstructor = async (
    instructorId: string,
    activeOnly: boolean = true
  ) => {
    try {
      isLoading.value = true
      error.value = null
      const params = activeOnly ? '?activeOnly=true' : ''
      const response = await httpClient.get<Class[]>(
        `/classes/instructor/${instructorId}${params}`
      )
      classes.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch classes'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch single class by ID
   */
  const fetchClass = async (classId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<Class>(`/classes/${classId}`)
      currentClass.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch class'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Create a new class
   */
  const createClass = async (data: CreateClassInput) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.post<Class>('/classes', data)
      classes.value.push(response)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create class'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update an existing class
   */
  const updateClass = async (classId: string, data: UpdateClassInput) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.patch<Class>(`/classes/${classId}`, data)

      // Update in local array
      const index = classes.value.findIndex((c) => c._id === classId)
      if (index !== -1) {
        classes.value[index] = response
      }

      if (currentClass.value?._id === classId) {
        currentClass.value = response
      }

      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update class'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Delete a class
   */
  const deleteClass = async (classId: string) => {
    try {
      isLoading.value = true
      error.value = null
      await httpClient.delete(`/classes/${classId}`)

      // Remove from local array
      classes.value = classes.value.filter((c) => c._id !== classId)

      if (currentClass.value?._id === classId) {
        currentClass.value = null
      }

      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to delete class'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get upcoming schedule for instructor
   */
  const fetchUpcomingSchedule = async (days: number = 7) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<ClassScheduleItem[]>(
        `/classes/schedule/upcoming?days=${days}`
      )
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch schedule'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get available classes for booking on a specific date
   */
  const fetchAvailableClasses = async (instructorId: string, date: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<ClassWithSlots[]>(
        `/classes/instructor/${instructorId}/available?date=${date}`
      )
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch available classes'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Add recurring schedule to class
   */
  const addRecurringSchedule = async (classId: string, schedule: any) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.post<Class>(
        `/classes/${classId}/recurring-schedule`,
        schedule
      )

      // Update in local array
      const index = classes.value.findIndex((c) => c._id === classId)
      if (index !== -1) {
        classes.value[index] = response
      }

      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to add schedule'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Remove recurring schedule from class
   */
  const removeRecurringSchedule = async (
    classId: string,
    dayOfWeek: number,
    startTime: string
  ) => {
    try {
      isLoading.value = true
      error.value = null
      await httpClient.delete(
        `/classes/${classId}/recurring-schedule/${dayOfWeek}/${startTime}`
      )

      // Refresh class data
      await fetchClass(classId)

      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to remove schedule'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Add one-off date to class
   */
  const addOneOffDate = async (classId: string, dateData: any) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.post<Class>(
        `/classes/${classId}/oneoff-dates`,
        dateData
      )

      // Update in local array
      const index = classes.value.findIndex((c) => c._id === classId)
      if (index !== -1) {
        classes.value[index] = response
      }

      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to add one-off date'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Remove one-off date from class
   */
  const removeOneOffDate = async (classId: string, date: string) => {
    try {
      isLoading.value = true
      error.value = null
      await httpClient.delete(`/classes/${classId}/oneoff-dates/${date}`)

      // Refresh class data
      await fetchClass(classId)

      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to remove one-off date'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    classes,
    currentClass,
    isLoading,
    error,

    // Methods
    fetchMyClasses,
    fetchClassesByInstructor,
    fetchClass,
    createClass,
    updateClass,
    deleteClass,
    fetchUpcomingSchedule,
    fetchAvailableClasses,
    addRecurringSchedule,
    removeRecurringSchedule,
    addOneOffDate,
    removeOneOffDate,

    // Aliases for compatibility
    fetchAllClasses: fetchMyClasses,
  }
}
