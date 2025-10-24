export interface Booking {
  id: string
  title: string
  time: string
  seats: number
}

export function useBookings() {
  async function fetchBookings(): Promise<Booking[]> {
    // TODO: fetch from API
    await wait(300)
    return [
      { id: '1', title: 'Yoga — Flow', time: 'Thu 6:30 PM', seats: 12 },
      { id: '2', title: 'Pilates — Core', time: 'Fri 8:00 AM', seats: 8 },
    ]
  }

  async function createBooking(_booking: Partial<Booking>) {
    await wait(300)
    return { ok: true }
  }

  return { fetchBookings, createBooking }
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}