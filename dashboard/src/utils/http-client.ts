import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiError } from '@/types'

// API base URL - configure based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * HTTP Client with Better Auth session handling
 *
 * Features:
 * - Automatic session cookie handling
 * - Request/response interceptors
 * - Error handling and transformation
 * - TypeScript support
 */
class HttpClient {
  private instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      withCredentials: true, // Important for Better Auth cookie handling
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add any custom headers here if needed
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        // Transform response if needed
        return response
      },
      (error: AxiosError<ApiError>) => {
        // Handle errors globally
        return Promise.reject(this.handleError(error))
      }
    )
  }

  private handleError(error: AxiosError<ApiError>) {
    if (error.response) {
      // Server responded with error
      const apiError: ApiError = {
        statusCode: error.response.status,
        message: error.response.data?.message || 'An error occurred',
        error: error.response.data?.error || 'Error',
      }

      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized - redirect to login
        // This will be handled by the router guard
        console.error('Unauthorized access')
      } else if (error.response.status === 403) {
        // Forbidden - insufficient permissions
        console.error('Forbidden access')
      }

      return apiError
    } else if (error.request) {
      // Request made but no response
      return {
        statusCode: 0,
        message: 'Network error - please check your connection',
        error: 'NetworkError',
      }
    } else {
      // Something else happened
      return {
        statusCode: 0,
        message: error.message || 'An unexpected error occurred',
        error: 'UnknownError',
      }
    }
  }

  // HTTP Methods
  public async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.instance.get<T>(url, config)
    return response.data
  }

  public async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.instance.post<T>(url, data, config)
    return response.data
  }

  public async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.instance.put<T>(url, data, config)
    return response.data
  }

  public async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config)
    return response.data
  }

  public async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.instance.delete<T>(url, config)
    return response.data
  }

  // Get the axios instance for advanced use cases
  public getAxiosInstance(): AxiosInstance {
    return this.instance
  }
}

// Create and export the HTTP client instance
export const httpClient = new HttpClient(API_BASE_URL)

// Export default for convenience
export default httpClient
