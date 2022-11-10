import { AppDataSource } from "../../data-source"
import { Address } from "../../Entities/address.entity"
import { Hospital } from "../../Entities/hospital.entity"
import { AppError } from "../../Error/appError"
import { IHospitalRequest } from "../../Interfaces/hospital"
import getAddress from "../../Utils/viaCep"

export const createHospitalService = async ({
  address,
  name,
  cnpj,
}: IHospitalRequest) => {
  const hospitalRepository = AppDataSource.getRepository(Hospital)
  const addressRepository = AppDataSource.getRepository(Address)

  const findAddress = await addressRepository.findOneBy({
    zipCode: address.zipCode,
    number: address.number,
    complement: address.complement
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

  const createdHospital = await hospitalRepository.save({
    address: newAddress,
    name,
    cnpj,
  })

  return createdHospital
}
