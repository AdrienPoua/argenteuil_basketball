// Ce fichier définit une interface générique pour les opérations de base
export interface BaseRepository<Entity, DTO> {
  findById(id: string): Promise<Entity | null>
  create(input: Omit<DTO, "id" | "created_at">): Promise<Entity>
  update(input: Partial<DTO>): Promise<Entity>
  upsert(input: Partial<DTO>): Promise<Entity>
  delete(id: string | string[]): Promise<void>
  createMany(inputs: Omit<DTO, "id" | "created_at">[]): Promise<Entity[]>
  updateMany(inputs: Partial<DTO>[]): Promise<Entity[]>
  upsertMany(inputs: Partial<DTO>[]): Promise<Entity[]>
  findAll(sortBy?: string, order?: "asc" | "desc"): Promise<Entity[]>
}
