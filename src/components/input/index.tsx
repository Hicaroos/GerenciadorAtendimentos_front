import { CalendarDate } from "./CalendarDate";
import { Default } from "./Default"

type BaseProps = {
  padding?      : number ; 
  borderRadius? : number ;
  darkTheme?    : boolean;
  onChange      : (date:string) => void;
  hasLabel?     : boolean;
  label?        : string ;
}

export type DateInputProps = BaseProps;

export const Input = Object.assign(Default, {
  CalendarDate,
});