import {
  Booking,
  BookingItem,
  Category,
  Event,
  HostProfile,
  Location,
  TicketTier,
  User,
} from './index'

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string }

export type PaginatedResponse<T> = ApiResponse<{
  items: T[]
  total: number
  page: number
  pageSize: number
}>

export type EventWithDetails = Event & {
  category: Category
  location: Location | null
  host: User & { profile: HostProfile | null }
  ticket_tiers: TicketTier[]
}

export type BookingWithItems = Booking & {
  items: BookingItem[]
  ticket_tiers: TicketTier[]
}
