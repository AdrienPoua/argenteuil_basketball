import { IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export default class Document {
    @IsString()
    private _id: string;
  
    @IsString()
    private _title: string;
  
    @IsString()
    private _url: string;
  
    constructor(document: { id?: string; title: string; url: string }) {
      this._id = document.id ?? uuidv4();
      this._title = document.title;
      this._url = document.url;
    }
  
    get id(): string {
      return this._id;
    }
  
    get title(): string {
      return this._title;
    }
  
    get url(): string {
      return this._url;
    }
  }