import { TextInputProps } from "react-native";
import { CalendarDate } from "./CalendarDate";
import { Default } from "./Default";
import { Search } from "./Search";
import { WithIcon } from "./WithIcon";

type BaseProps = {
  padding?      : number ; 
  borderRadius? : number ;
  darkTheme?    : boolean;
  hasLabel?     : boolean;
  label?        : string ;
  inputValue?   : string | null;
}

export type DateInputProps = BaseProps & {
  onChange : (date:string) => void;
};

export type DefaultInputProps = BaseProps & TextInputProps & {
  bgTransparent?: boolean;
};

export const Input = Object.assign(Default, {
  CalendarDate,
  Search,
  Default: { WithIcon }
});