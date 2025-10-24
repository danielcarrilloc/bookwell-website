import { useUserStore } from '@/stores/user'

export function useCredits() {
  const store = useUserStore()

  async function purchaseCredits(amount: number) {
    // TODO: call API to purchase credits
    await new Promise(r => setTimeout(r, 400))
    store.setCredits(store.credits + amount)
    return true
  }

  async function consumeCredits(amount: number) {
    await new Promise(r => setTimeout(r, 200))
    store.setCredits(Math.max(0, store.credits - amount))
    return true
  }

  return { purchaseCredits, consumeCredits }
}