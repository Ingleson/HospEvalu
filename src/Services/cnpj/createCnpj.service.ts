import { AppDataSource } from "../../data-source"
import { Address } from "../../Entities/address.entity"
import { Cnpj } from "../../Entities/cnpj.entity"
import { AppError } from "../../Error/appError"
import { ICnpjRequest } from "../../Interfaces/cpnj"
import getAddress from "../../Utils/viaCep"

export const createCnpjService = async ({
  address,
  name,
  cnpj,
}: ICnpjRequest) => {
  const hospitalRepository = AppDataSource.getRepository(Cnpj)
  const addressRepository = AppDataSource.getRepository(Address)

  const findAddress = await addressRepository.findOneBy({
    zipCode: address.zipCode,
    number: address.number,
    complement: address.complement,
  })

  if (findAddress) {
    throw new AppError(400, "Endereço já cadastrado.")
  }

  const addressData = await getAddress(address.zipCode)

  const newAddress = findAddress
    ? findAddress
    : await addressRepository.save({
        zipCode: addressData.cep,
        city: addressData.localidade,
        state: addressData.uf,
        hood: addressData.bairro,
        number: address.number,
        complement: address.complement || addressData.complemento,
      })

  const findCnpj = await hospitalRepository.findOneBy({ cnpj })

  if (findCnpj) {
    throw new AppError(400, "CNPJ Duplicado")
  }

  const createdCnpj = await hospitalRepository.save({
    address: newAddress,
    name,
    cnpj,
  })

  return createdCnpj
}
