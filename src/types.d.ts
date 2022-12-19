declare type NavItem = {
  label: string;
  child?: NavItem[];
  isOpen?: boolean;
  icon?: string;
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