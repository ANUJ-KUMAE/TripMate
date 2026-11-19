import { z } from 'zod'

export const createBookingSchema = z
  .object({
    propertyId: z.string().min(1, 'Property ID is required'),
    startDate: z.string().min(1, 'Check-in date is required'),
    endDate: z.string().min(1, 'Check-out date is required'),
    guestCount: z.number().int().min(1, 'At least 1 guest required'),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: 'Check-out date must be after check-in date',
    path: ['endDate'],
  })

export type CreateBookingFormData = z.infer<typeof createBookingSchema>

