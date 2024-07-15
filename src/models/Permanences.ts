import { IsString, IsArray } from 'class-validator';

export default class Permanence {
    @IsString()
    private _start: string;
    @IsString()
    private _end: string;
    @IsString()
    private _place: string;
    @IsArray()
    private _slots: { day: string; startTime: string; endTime: string }[];
  
    constructor(data: { start: string; end: string; place: string; slots: { day: string; startTime: string; endTime: string }[] }) {
      this._start = data.start;
      this._end = data.end;
      this._place = data.place;
      this._slots = data.slots;
    }
  
    get start(): string {
      return this._start;
    }
  
    get end(): string {
      return this._end;
    }
  
    get slots(): { day: string; startTime: string; endTime: string }[] {
      return this._slots;
    }
  
    get place(): string {
      return this._place;
    }
  }