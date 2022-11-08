export interface IHospitalRequest {
  address: IAddressRequest
  name: string
  cnpj: string
}

export interface IAddressRequest {
  complement: string
  zipCode: string
  number: number
}
