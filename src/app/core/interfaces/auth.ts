export interface registerationInterface extends loginInterface{
  name: string
  rePassword: string
  phone: string
}
export interface loginInterface extends forgetPasswordInterface{
  password: string
}
export interface forgetPasswordInterface{
  email: string
}
export interface updatePasswordInterface{
    currentPassword:string,
    password:string,
    rePassword:string
}