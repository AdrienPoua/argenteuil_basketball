import { IsArray, IsOptional, IsString } from "class-validator";
import { v4 as uuidv4 } from "uuid";
import { NewsType } from "@/types";
import Utils from "@/models/Utils";

export default class News {
    @IsString()
    private _id: string;
  
    @IsString()
    private _title: string;
  
    @IsString()
    private _date: string;
  
    @IsOptional()
    @IsString()
    private _img?: string;
  
    @IsString()
    private _url: string;
  
    @IsOptional()
    @IsString()
    private _rank?: string;
  
    @IsArray()
    private _content: string[] = [];
  
    constructor(data: NewsType) {
      this._id = data.id ? data.id : uuidv4();
      this._title = data.title;
      this._date = data.date;
      this._img = data.img;
      this._url = data.url;
      this._rank = data.rank;
      this._content = data.content;
    }
  
    // Getters
    get id(): string {
      return this._id;
    }
  
    get title(): string {
      return this._title;
    }
  
    get content(): string[] {
      return this._content;
    }
  
    get date(): Date {
      return new Date(Utils.parseDate(this._date));
    }
  
    get img(): string {
      return this._img ?? "/images/default/news.avif";
    }
  
    get url(): string {
      return this._url;
    }
  
    get isMain(): boolean {
      return this._rank === "primary";
    }
  
    get isSecondary(): boolean {
      return this._rank === "secondary";
    }
  
    static lastFour(array: News[]): News[] {
      array.sort((a, b) => b.date.getTime() - a.date.getTime());
      const sortedArray = array;
      const filteredArray = sortedArray.filter((item) => !item.isMain && !item.isSecondary);
      return filteredArray.slice(0, 4);
    }
  
    static main(array: News[]): News {
      return array.find((item) => item.isMain) ?? array[0];
    }
  
    static secondary(array: News[]): News {
      return array.find((item) => item.isSecondary) ?? array[1];
    }
  }