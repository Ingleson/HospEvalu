import { AppDataSource } from "../../data-source"
import { Cnpj } from "../../Entities/cnpj.entity"

export const listCnpjsService = async () => {
  const cnpjRepository = AppDataSource.getRepository(Cnpj)
  const cnpj = await cnpjRepository.find()

  return cnpj
}
