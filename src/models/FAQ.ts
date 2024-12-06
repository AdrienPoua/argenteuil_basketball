import { v4 as uuidv4 } from "uuid";

export default class FAQ {
  private _question: string;
  private _answer: string;
  private _rank: number;
  private _id: string;
  constructor(data: { id?: string; question: string; answer: string; rank?: number }) {
    this._id = data.id ?? uuidv4();
    this._question = data.question;
    this._answer = data.answer;
    this._rank = data.rank ?? 0;
  }
  get question(): string {
    return this._question;
  }
  get answer(): string {
    return this._answer;
  }
  get rank(): number {
    return this._rank;
  }
}
