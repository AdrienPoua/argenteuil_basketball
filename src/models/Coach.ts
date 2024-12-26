import Staff, {
  ConstructorType as ExtentedConstructor,
} from "@/models/Staff";
import { TeamWithIdSchema } from "@/database/schemas/Team";
import { z } from "zod";

type ConstructorType = {
  teams: Omit<z.infer<typeof TeamWithIdSchema>, 'sessions'>[];
} & ExtentedConstructor;

export default class Coach extends Staff {
  private readonly _teams: z.infer<typeof TeamWithIdSchema>[];

  constructor(data: ConstructorType) {
    super(data);
    this._teams = data.teams;
  }

  get teams(): z.infer<typeof TeamWithIdSchema>[] {
    return this._teams;
  }
}
