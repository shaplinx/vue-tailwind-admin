declare type BaseSize = "xs" | "s" | "md" | "lg" | "lg";

declare type ButtonSize = BaseSize;
declare type ButtonVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "ghost"
  | "link"
  | "glass";
declare interface ButtonProp {
  loading?: boolean;
  iconClass?: string;
  label?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  shape: "default" | "circle" | "square";
  block?: boolean;
  wide?: boolean;
  disabled?: boolean;
  outline?:boolean;
  noAnimation?: boolean;
  tag: string;
  active?: boolean;
  outline?: boolean;
  value?: Number | string;
  onClick?: Function;
}

