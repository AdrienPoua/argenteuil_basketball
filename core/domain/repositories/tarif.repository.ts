import { TarifEntity } from "@/core/domain/entities/tarif.entity"
import { BaseRepository } from "./base.repository.js"
import { TarifDTO } from "../dtos/tarif.dto.js"

export type TarifRepository = BaseRepository<TarifEntity, TarifDTO>
