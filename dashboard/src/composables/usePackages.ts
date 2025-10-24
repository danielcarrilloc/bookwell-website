import { ref } from 'vue'
import { httpClient } from '@/utils/http-client'
import type {
  Package,
  ClientPackage,
  CreatePackageInput,
  AssignPackageManuallyInput,
} from '@/types'

export const usePackages = () => {
  const packages = ref<Package[]>([])
  const clientPackages = ref<ClientPackage[]>([])
  const currentPackage = ref<Package | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch packages by instructor ID
   */
  const fetchInstructorPackages = async (
    instructorId: string,
    activeOnly: boolean = false
  ) => {
    try {
      isLoading.value = true
      error.value = null
      const params = activeOnly ? '?activeOnly=true' : ''
      const response = await httpClient.get<Package[]>(
        `/packages/instructor/${instructorId}${params}`
      )
      packages.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch packages'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch available packages for purchase
   */
  const fetchAvailablePackages = async (instructorId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<Package[]>(
        `/packages/instructor/${instructorId}/available`
      )
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch packages'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch single package by ID
   */
  const fetchPackage = async (packageId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<Package>(`/packages/${packageId}`)
      currentPackage.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch package'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Create a new package
   */
  const createPackage = async (data: CreatePackageInput) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.post<Package>('/packages', data)
      packages.value.push(response)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create package'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update an existing package
   */
  const updatePackage = async (packageId: string, data: Partial<Package>) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.put<Package>(
        `/packages/${packageId}`,
        data
      )

      // Update in local array
      const index = packages.value.findIndex((p) => p._id === packageId)
      if (index !== -1) {
        packages.value[index] = response
      }

      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to update package'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Delete a package
   */
  const deletePackage = async (packageId: string) => {
    try {
      isLoading.value = true
      error.value = null
      await httpClient.delete(`/packages/${packageId}`)

      // Remove from local array
      packages.value = packages.value.filter((p) => p._id !== packageId)

      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to delete package'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch client packages by client ID
   */
  const fetchClientPackages = async (clientId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<ClientPackage[]>(
        `/client-packages/client/${clientId}/active`
      )
      clientPackages.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch client packages'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch client packages with credits
   */
  const fetchClientPackagesWithCredits = async (clientId: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<ClientPackage[]>(
        `/client-packages/client/${clientId}/with-credits`
      )
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch client packages'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch expiring packages
   */
  const fetchExpiringPackages = async (days: number = 7) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.get<ClientPackage[]>(
        `/client-packages/expiring?days=${days}`
      )
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch expiring packages'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Assign package manually to client
   */
  const assignPackageManually = async (data: AssignPackageManuallyInput) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await httpClient.post<ClientPackage>(
        '/client-packages/assign-manual',
        data
      )
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to assign package'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Revoke a client package
   */
  const revokeClientPackage = async (clientPackageId: string) => {
    try {
      isLoading.value = true
      error.value = null
      await httpClient.put(`/client-packages/${clientPackageId}/revoke`, {})

      // Update in local array
      const index = clientPackages.value.findIndex(
        (cp) => cp._id === clientPackageId
      )
      if (index !== -1) {
        clientPackages.value[index].status = 'revoked'
      }

      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to revoke package'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Calculate total credits for a client
   */
  const calculateTotalCredits = (packages: ClientPackage[]): number => {
    return packages
      .filter((pkg) => pkg.status === 'active')
      .reduce((total, pkg) => total + pkg.creditsRemaining, 0)
  }

  return {
    // State
    packages,
    clientPackages,
    currentPackage,
    isLoading,
    error,

    // Methods
    fetchInstructorPackages,
    fetchAvailablePackages,
    fetchPackage,
    createPackage,
    updatePackage,
    deletePackage,
    fetchClientPackages,
    fetchClientPackagesWithCredits,
    fetchExpiringPackages,
    assignPackageManually,
    revokeClientPackage,
    calculateTotalCredits,
  }
}
