import Staff, { ConstructorType as ExtendingConstructor } from "@/models/Staff";

type RoleType =
  | "Président"
  | "Trésorier"
  | "Correspondant"
  | "Secrétaire_Général"
  | "Entraineur";

type ConstructorType = {
  role: RoleType;
} & ExtendingConstructor;

export default class Leader extends Staff {
  private readonly _role: RoleType;

  constructor(data: ConstructorType) {
    super(data);
    this._role = data.role;
  }

  get role() {
    return this._role.replace("_", " ");
  }
}
