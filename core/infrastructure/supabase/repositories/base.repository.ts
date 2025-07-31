import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { BaseRepository } from '../../../domain/repositories/base.repository';
/**
 * Implémentation abstraite de BaseRepository utilisant Supabase comme stockage de données
 *
 * @template Entity - Type de l'entité métier
 * @template SerializedEntity - Reprentation sous forme d'objet de l'entité métier
 * @template CreateEntity - Reprentation sous forme d'objet de l'entité métier pour la création
 * @template UpdateEntity - Reprentation sous forme d'objet de l'entité métier pour la mise à jour
 * @template ID - Type de l'identifiant unique pour l'entité, un string ou un number
 * @implements {BaseRepository<Entity, ID>}
 */

export abstract class SupabaseBaseRepository<Entity, DTO> implements BaseRepository<Entity, DTO> {
  constructor(
    protected readonly tableName: string,
    protected readonly client: SupabaseClient | Promise<SupabaseClient>,
    protected readonly toDomain: (data: DTO) => Entity,
  ) {}

  protected async getClient(): Promise<SupabaseClient> {
    return this.client instanceof Promise ? await this.client : this.client;
  }

  async findAll(sortBy?: string, order: 'asc' | 'desc' = 'asc'): Promise<Entity[]> {
    try {
      const client = await this.getClient();
      let query = client.from(this.tableName).select('*');

      if (sortBy) {
        query = query.order(sortBy, { ascending: order === 'asc' });
      }

      const { data, error } = await query;

      if (error) {
        throw this.handleError(error);
      }

      return data.map((item) => this.toDomain(item));
    } catch (error) {
      throw this.handleError(error as PostgrestError);
    }
  }

  async findById(id: string): Promise<Entity | null> {
    try {
      const client = await this.getClient();
      const { data, error } = await client.from(this.tableName).select('*').eq('id', id).single();

      if (error) {
        throw this.handleError(error);
      }
      return this.toDomain(data) || null;
    } catch (error) {
      throw this.handleError(error as PostgrestError);
    }
  }

  async create(input: Omit<DTO, 'id' | 'created_at'>): Promise<Entity> {
    try {
      const client = await this.getClient();
      const { data: result, error } = await client.from(this.tableName).insert(input).select().single();
      if (error) throw error;

      if (!result || result.length === 0) {
        throw new Error('Aucun résultat retourné après insertion');
      }

      return this.toDomain(result);
    } catch (error) {
      throw this.handleError(error as PostgrestError);
    }
  }

  async update(input: Partial<DTO> & { id: string }): Promise<Entity> {
    try {
      const client = await this.getClient();
      const { data, error } = await client.from(this.tableName).update(input).eq('id', input.id).select().single();
      if (error) throw this.handleError(error);
      return this.toDomain(data);
    } catch (error) {
      throw this.handleError(error as PostgrestError);
    }
  }

  async upsert(input: Partial<DTO>): Promise<Entity> {
    try {
      const client = await this.getClient();
      const { data, error } = await client.from(this.tableName).upsert(input).select().single();
      if (error) throw this.handleError(error);
      return this.toDomain(data);
    } catch (error) {
      throw this.handleError(error as PostgrestError);
    }
  }

  async delete(id: string | string[]): Promise<void> {
    try {
      const client = await this.getClient();
      await client
        .from(this.tableName)
        .delete()
        .in('id', Array.isArray(id) ? id : [id]);
    } catch (error) {
      throw this.handleError(error as PostgrestError);
    }
  }

  async createMany(inputs: Omit<DTO, 'id' | 'created_at'>[]): Promise<Entity[]> {
    try {
      const client = await this.getClient();
      const { data, error } = await client.from(this.tableName).insert(inputs).select();
      if (error) throw this.handleError(error);
      return data.map((item) => this.toDomain(item));
    } catch (error) {
      throw this.handleError(error as PostgrestError);
    }
  }

  async updateMany(inputs: DTO[]): Promise<Entity[]> {
    try {
      const client = await this.getClient();
      const { data, error } = await client.from(this.tableName).update(inputs).select();
      if (error) throw this.handleError(error);
      return data.map((item) => this.toDomain(item));
    } catch (error) {
      throw this.handleError(error as PostgrestError);
    }
  }

  async upsertMany(inputs: Partial<DTO>[]): Promise<Entity[]> {
    try {
      const client = await this.getClient();
      const { data, error } = await client.from(this.tableName).upsert(inputs).select();
      if (error) throw this.handleError(error);
      return data.map((item) => this.toDomain(item));
    } catch (error) {
      throw this.handleError(error as PostgrestError);
    }
  }

  protected handleError(error: PostgrestError): Error {
    console.error(`Erreur de base de données (${this.tableName}):`, error);
    switch (error.code) {
      case '23505': // Violation de contrainte d'unicité
        return new Error('Une entrée avec ces informations existe déjà');
      case '23503': // Violation de clé étrangère
        return new Error("Référence à une entité qui n'existe pas");
      case '23502': // Violation de contrainte NOT NULL
        return new Error('Données incomplètes');
      case 'PGRST116':
        return new Error('Aucun résultat');
      case 'PGRST301':
        return new Error("Vous n'avez pas les droits pour effectuer cette action");
      case 'PGRST399':
        return new Error('Vous avez dépassé le nombre de requêtes autorisées');
      case '42501':
        return new Error('vous ne pouvez pas effectuer cette action, pour cause de droit RLS');
      default:
        return new Error(`Erreur de base de données: ${error.message}`);
    }
  }
}
