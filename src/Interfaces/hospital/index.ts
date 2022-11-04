export interface IHospitalRequest {
  address: IAddressRequest
  name: string
  cnpj: string
}

export interface IAddressRequest {
  state: string
  city: string
  hood: string
  complement: string
  zipCode: string
  number: number
}
