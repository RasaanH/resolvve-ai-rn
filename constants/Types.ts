// types go here
export interface ValidatePasswordArgs {
  password: string;
  confirmPassword: string;
  email: string;
}

export interface SignUpValidationObj {
  password: string | null;
  confirmPassword: string | null;
  email: string | null;
}
