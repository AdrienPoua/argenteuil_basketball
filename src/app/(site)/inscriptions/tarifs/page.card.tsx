import { Calendar, Euro } from 'lucide-react'
import Pattern from '@/components/decorative/pattern-card-round'
import { Tarif } from '@/core/domain/entities/tarif.entity'
import { getBirthyearsByCategories } from '@/core/shared/utils/getBirthyearsByCategories'

type PropsType = {
  tarif: Tarif
  index: number
}

export const TarifCard = ({ tarif, index }: Readonly<PropsType>) => {
  const birthyears = getBirthyearsByCategories([tarif])
  return (
    <div
      className={`animate-fade-in-up group relative transform overflow-hidden rounded-xl border border-secondary bg-gradient-to-br from-white to-orange-50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Decorative background pattern */}
      <Pattern topLeft />
      <Pattern bottomRight />

      <div className="relative p-4 sm:p-6">
        {/* Basketball icon */}
        <div className="mb-3 flex items-center sm:mb-4">
          <div className="mr-2 h-6 w-6 flex-shrink-0 sm:mr-3 sm:h-8 sm:w-8">
            <svg
              viewBox="0 0 40 40"
              className="text-orange-500 transition-transform duration-300 group-hover:rotate-12"
            >
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="currentColor"
                stroke="#8B4513"
                strokeWidth="0.5"
              />
              <path
                d="M2 20 L38 20 M20 2 L20 38 M8 8 L32 32 M32 8 L8 32"
                stroke="#8B4513"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-secondary sm:text-xl">
            {tarif.category}
          </h3>
        </div>
        {/* Birth years */}
        <div className="mb-3 flex items-center sm:mb-4">
          {birthyears.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="mr-2 h-4 w-4 text-gray-500 sm:h-5 sm:w-5">
                <Calendar />
              </div>
              <span className="text-xs font-medium text-gray-600 sm:text-sm">
                Né(e) en {birthyears.join(' - ')} {birthyears.length === 1 && 'et plus'}
              </span>
            </div>
          )}
        </div>
        {/* Price */}
        <div className="mb-2 flex items-center justify-between sm:mb-3">
          <div className="flex items-center">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Euro className="h-4 w-4 md:h-5 md:w-5" />
              <p className="text-xs md:text-base">Cotisation annuelle</p>
            </div>
          </div>
          <div className="font-secondary text-2xl font-bold text-secondary transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
            {tarif.price}€
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Euro className="h-4 w-4 md:h-5 md:w-5" />
                <p className="text-xs md:text-base">Frais de mutation</p>
              </div>
            </div>
          </div>
          <div className="font-secondary text-2xl font-bold text-secondary transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
            {tarif.mutation_price}€
          </div>
        </div>
        {/* Hover effect indicator */}
        <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-gradient-to-r from-orange-400 to-secondary transition-transform duration-300 group-hover:scale-x-100"></div>
      </div>
    </div>
  )
}
