export interface TarifDTO {
  id: string
  price: number
  category: string
  min_age: number
  max_age: number
  mutation_price: number
  created_at: string
}

export type CreateTarifDTO = Omit<TarifDTO, 'id' | 'created_at'>
export type UpdateTarifDTO = Partial<TarifDTO>
