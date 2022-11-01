import { AppDataSource } from "../../data-source"
import { Address } from "../../Entities/address.entity"
import { Hospital } from "../../Entities/hospital.entity"
import { AppError } from "../../Error/appError"
import { IHospitalRequest } from "../../Interfaces/hospital"

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
  })
  const findCnpj = await hospitalRepository.findOneBy({ cnpj })

  // if (findAddress) {
  //   throw new AppError(400, "Address already exists")
  // }
  // Verificar lógica do endereço

  if (findCnpj) {
    throw new AppError(400, "Cpnj already exists")
  }

  const newAddress = addressRepository.create({
    city: address.city,
    complement: address.complement,
    number: address.number,
    hood: address.hood,
    state: address.state,
    zipCode: address.zipCode,
  })

  const createdAddress = await addressRepository.save(newAddress)

  const hospital = hospitalRepository.create({
    address: findAddress || createdAddress,
    name,
    cnpj,
  })

  await hospitalRepository.save(hospital)

  return hospital
}
