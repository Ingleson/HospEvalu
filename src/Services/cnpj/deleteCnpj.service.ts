import { AppDataSource } from "../../data-source"
import { Cnpj } from "../../Entities/cnpj.entity"
import { AppError } from "../../Error/appError"

export const deleteCnpjService = async (id: string) => {
  const cnpjRepository = AppDataSource.getRepository(Cnpj)

  const findCnpj = await cnpjRepository.findOneBy({ id })

  if (!findCnpj) {
    throw new AppError(404, "Cnpj não encontrado")
  }

  await cnpjRepository.delete({ id })

  return { message: "Cnpj deletado" }
}
