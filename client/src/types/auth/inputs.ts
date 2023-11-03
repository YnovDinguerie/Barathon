export type RegisterInputs = {
  name: string
  email: string
  password: string
  c_password: string
  birthdate: string
}

export type LoginInputs = {
  email: string
  password: string
}

export type ResetPasswordInputs = {
  email: string
}

export type UpdatePasswordInputs = {
  token: string
  email: string
  password: string
  c_password: string
}

export type ProfileInfo = {
  name: string
  email: string
  birthdate: string
}
