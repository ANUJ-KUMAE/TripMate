import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { createPropertySchema, type CreatePropertyFormData } from '@/features/properties/schemas/propertySchemas'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'

export function CreateListingPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePropertyFormData>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'cabin',
      city: '',
      country: '',
      address: '',
      pricePerNight: 150,
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1,
    },
  })

  const onSubmit = async () => {
    // In production: await propertyService.createProperty(data)
    navigate(ROUTES.PROPERTIES)
  }

  return (
    <div className="create-listing-page container">
      <div className="form-card-container">
        <div className="page-header">
          <h1 className="page-title">List Your Stay on TripMate</h1>
          <p className="page-subtitle">Earn money welcoming travelers from all over the world</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="listing-form" noValidate>
          <Input
            label="Listing Title"
            placeholder="e.g. Cozy Mountain Chalet with Panoramic Views"
            error={errors.title?.message}
            {...register('title')}
          />

          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea
              className="input-field textarea"
              rows={4}
              placeholder="Describe your space, ambiance, amenities, and location highlights..."
              {...register('description')}
            />
            {errors.description && <span className="input-error">{errors.description.message}</span>}
          </div>

          <div className="form-row-grid">
            <div className="input-group">
              <label className="input-label">Category</label>
              <select className="input-field" {...register('category')}>
                <option value="cabin">Cabin</option>
                <option value="beachfront">Beachfront</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="mansion">Mansion</option>
                <option value="countryside">Countryside</option>
                <option value="lakefront">Lakefront</option>
              </select>
            </div>

            <Input
              label="Price per Night ($ USD)"
              type="number"
              error={errors.pricePerNight?.message}
              {...register('pricePerNight', { valueAsNumber: true })}
            />
          </div>

          <div className="form-row-grid">
            <Input
              label="City"
              placeholder="e.g. Aspen"
              error={errors.city?.message}
              {...register('city')}
            />
            <Input
              label="Country"
              placeholder="e.g. United States"
              error={errors.country?.message}
              {...register('country')}
            />
          </div>

          <Input
            label="Street Address"
            placeholder="e.g. 124 Alpine Trail"
            error={errors.address?.message}
            {...register('address')}
          />

          <div className="form-quad-grid">
            <Input
              label="Max Guests"
              type="number"
              error={errors.maxGuests?.message}
              {...register('maxGuests', { valueAsNumber: true })}
            />
            <Input
              label="Bedrooms"
              type="number"
              error={errors.bedrooms?.message}
              {...register('bedrooms', { valueAsNumber: true })}
            />
            <Input
              label="Beds"
              type="number"
              error={errors.beds?.message}
              {...register('beds', { valueAsNumber: true })}
            />
            <Input
              label="Bathrooms"
              type="number"
              step="0.5"
              error={errors.bathrooms?.message}
              {...register('bathrooms', { valueAsNumber: true })}
            />
          </div>

          <div className="form-actions">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
              Publish Listing
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

