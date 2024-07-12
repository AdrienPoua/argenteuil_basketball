import { v4 as uuidv4 } from 'uuid';

export default class Rate {
    private _id: string;
    private _birthYear: string[];
    private _category: string;
    private _rate: number;
  
    constructor(data: { id?: string; birthYear: string[]; category: string; rate: number }) {
      this._id = data.id ?? uuidv4();
      this._birthYear = data.birthYear;
      this._category = data.category;
      this._rate = data.rate;
    }
  
    get id(): string {
      return this._id;
    }
  
    get birthYear(): string[] {
      return this._birthYear;
    }
  
    get category(): string {
      return this._category;
    }
  
    get rate(): number {
      return this._rate;
    }
  }