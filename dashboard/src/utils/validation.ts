/**
 * Form validation utilities
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  // Brazilian phone: +55 (11) 99999-9999 or variations
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 13
}

export const isValidCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '')

  if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) {
    return false
  }

  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false

  return true
}

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  )
}

export const getPasswordStrength = (password: string): {
  score: number
  label: string
  color: string
} => {
  let score = 0

  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score <= 2) {
    return { score, label: 'Fraca', color: 'error' }
  } else if (score <= 4) {
    return { score, label: 'Média', color: 'warning' }
  } else {
    return { score, label: 'Forte', color: 'success' }
  }
}

export const validateRequired = (value: any): string | undefined => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return 'Este campo é obrigatório'
  }
  return undefined
}

export const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email é obrigatório'
  if (!isValidEmail(email)) return 'Email inválido'
  return undefined
}

export const validatePhone = (phone: string): string | undefined => {
  if (!phone) return 'Telefone é obrigatório'
  if (!isValidPhone(phone)) return 'Telefone inválido'
  return undefined
}

export const validatePassword = (password: string): string | undefined => {
  if (!password) return 'Senha é obrigatória'
  if (password.length < 8) return 'Senha deve ter no mínimo 8 caracteres'
  if (!isValidPassword(password)) {
    return 'Senha deve conter maiúscula, minúscula e número'
  }
  return undefined
}

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!confirmPassword) return 'Confirme sua senha'
  if (password !== confirmPassword) return 'As senhas não coincidem'
  return undefined
}

export const validateMinLength = (value: string, min: number): string | undefined => {
  if (value.length < min) {
    return `Deve ter no mínimo ${min} caracteres`
  }
  return undefined
}

export const validateMaxLength = (value: string, max: number): string | undefined => {
  if (value.length > max) {
    return `Deve ter no máximo ${max} caracteres`
  }
  return undefined
}

export const validateMin = (value: number, min: number): string | undefined => {
  if (value < min) {
    return `Deve ser no mínimo ${min}`
  }
  return undefined
}

export const validateMax = (value: number, max: number): string | undefined => {
  if (value > max) {
    return `Deve ser no máximo ${max}`
  }
  return undefined
}

export const validateUrl = (url: string): string | undefined => {
  if (!url) return undefined
  try {
    new URL(url)
    return undefined
  } catch {
    return 'URL inválida'
  }
}

export const validateTime = (time: string): string | undefined => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
  if (!timeRegex.test(time)) {
    return 'Formato de hora inválido (HH:mm)'
  }
  return undefined
}

export const validateDate = (date: string): string | undefined => {
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) {
    return 'Data inválida'
  }
  return undefined
}

export const validateFutureDate = (date: string): string | undefined => {
  const dateError = validateDate(date)
  if (dateError) return dateError

  const dateObj = new Date(date)
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  if (dateObj < now) {
    return 'A data deve ser futura'
  }
  return undefined
}
