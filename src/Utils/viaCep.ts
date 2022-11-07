import { AppError } from "../Error/appError"

export interface IAddressResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

const getAddress = async (cep: string): Promise<IAddressResponse> => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  const data = await response.json()

  if (data.erro) {
    throw new AppError(404, "Cep nao encontrado!")
  }

  return data
}

export default getAddress
