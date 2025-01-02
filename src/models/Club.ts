import { Prisma } from "@prisma/client";

export default class ClubService {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _email: string | null
    private readonly _phone: string | null

    constructor(data: Prisma.ClubGetPayload<{
 }>) {
        this._id = data.id;
        this._name = data.name;
        this._email = data.email;
        this._phone = data.phone;
    }
    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get email(): string {
        return this._email ?? "Pas d'email"
    }
    get phone(): string {
        return this._phone ?? "Pas de numéro"
    }

    toPlainObject() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
        };
    }
}
