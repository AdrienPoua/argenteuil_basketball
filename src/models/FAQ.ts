import { v4 as uuidv4 } from 'uuid';

export default class FAQ {
    private _id: string;
    private _question: string;
    private _answer: string;
    constructor(data: { id?: string; question: string; answer: string }) {
      this._id = data.id ?? uuidv4();
      this._question = data.question;
      this._answer = data.answer;
    }
    get id(): string {
      return this._id;
    }
    get question(): string {
      return this._question;
    }
    get answer(): string {
      return this._answer;
    }
  }