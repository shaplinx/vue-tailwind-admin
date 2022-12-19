import { BaseColor, ClassesPairs } from "./../daisy.d";
export type DropdownImageMode =
  | "top"
  | "bottom"
  | "full"
  | "side"
  | "responsive";
export type DropdownColor = BaseColor;

declare interface DropdownOption {
  value?: any;
  label?: string;
  icon?: string;
  action?: Function;
  [key: string]: any
}
export interface DropdownClasses extends ClassesPairs {}
export interface DropdownColorClasses extends DropdownClasses {}
