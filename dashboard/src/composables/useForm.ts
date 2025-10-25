import { ref, reactive } from 'vue'

export type FormErrors = Record<string, string>

/**
 * Form validation composable
 * Provides form state management and validation
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema: Record<keyof T, (value: any) => string | undefined>
) => {
  const values = reactive({ ...initialValues }) as T
  const errors = ref<FormErrors>({})
  const isSubmitting = ref(false)

  /**
   * Validate a single field or all fields
   */
  const validate = (field?: keyof T): boolean => {
    if (field) {
      const value = values[field]
      const error = validationSchema[field]?.(value)
      if (error) {
        errors.value[field as string] = error
      } else {
        delete errors.value[field as string]
      }
      return !error
    }

    // Validate all fields
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(validationSchema).forEach((key) => {
      const error = validationSchema[key as keyof T](values[key as keyof T])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })

    errors.value = newErrors
    return isValid
  }

  /**
   * Handle form submission with validation
   */
  const handleSubmit = async (onSubmit: (values: T) => Promise<void>) => {
    if (!validate()) return

    isSubmitting.value = true
    try {
      await onSubmit({ ...values } as T)
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Reset form to initial values
   */
  const reset = () => {
    Object.assign(values, initialValues)
    errors.value = {}
  }

  /**
   * Set a specific field error
   */
  const setError = (field: keyof T, message: string) => {
    errors.value[field as string] = message
  }

  /**
   * Clear a specific field error
   */
  const clearError = (field: keyof T) => {
    delete errors.value[field as string]
  }

  /**
   * Clear all errors
   */
  const clearErrors = () => {
    errors.value = {}
  }

  return {
    values,
    errors,
    isSubmitting,
    validate,
    handleSubmit,
    reset,
    setError,
    clearError,
    clearErrors,
  }
}
