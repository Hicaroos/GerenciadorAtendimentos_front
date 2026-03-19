import { TouchableOpacityProps } from 'react-native';
import { Default } from './Default';
import { WithIcon } from './WithIcon';

type BaseProps = TouchableOpacityProps & {
  title            : string  ;
  padding?         : number  ;
  borderRadius?    : number  ;
  filled?          : boolean ; 
  fullWidth?       : boolean ;
  gapAdjust?       : number  ;
  darkTheme?       : boolean ;
  processing?      : boolean ;
  processingLabel? : string  ;
  textSize?        : 'SM' | 'MD' | 'LG';
  unable?          : boolean;
};

export type DefaultButtonProps = BaseProps;

export type WithIconButtonProps = BaseProps & {
  iconFamily : React.ElementType;
  iconName   : string;
  iconSide?  : 'LEFT' | 'RIGHT';
};

export const Button = Object.assign(Default, {
  WithIcon,
});