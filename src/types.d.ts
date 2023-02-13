declare type NavItem = {
  label: string;
  subs?: NavItem[];
  id?: string;
  isOpen?: boolean;
  icon?: string;
  to?: string;
  type?: "name" | "path" | "external" | "none";
};

declare interface LoginFormError {
  email?: string[];
  password?: string[];
  remember?: string[];
}

declare interface LoginForm {
  email?: string;
  password?: string;
  remember?: boolean;
}
