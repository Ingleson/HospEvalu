export interface IHospitalRequest {
  address: string,
  name: string,
  cnpj: string
};

export interface IAddressRequest {
  state: string,
  city: string,
  hood: string,
  complement: string,
  cep: string,
  number: number
};