import { z } from 'zod'

export const createPropertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['cabin', 'beachfront', 'villa', 'apartment', 'mansion', 'countryside', 'lakefront']),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  address: z.string().min(5, 'Address is required'),
  pricePerNight: z.number().positive('Price must be greater than 0'),
  maxGuests: z.number().int().min(1, 'At least 1 guest required'),
  bedrooms: z.number().int().min(1),
  beds: z.number().int().min(1),
  bathrooms: z.number().min(0.5),
})

export type CreatePropertyFormData = z.infer<typeof createPropertySchema>

