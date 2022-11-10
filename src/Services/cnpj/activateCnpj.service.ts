import { AppDataSource } from "../../data-source"
import { Cnpj } from "../../Entities/cnpj.entity"
import { AppError } from "../../Error/appError"

export const activateCnpjService = async (cnpjId: string) => {
  const cnpjRepository = AppDataSource.getRepository(Cnpj)

  const getCnpj = await cnpjRepository.findOneBy({
    id: cnpjId,
  })

  if (!getCnpj) {
    throw new AppError(404, "CNPJ não encontrado")
  }

  if (getCnpj.is_active) {
    throw new AppError(409, "Este CNPJ já está ativo")
  }

  cnpjRepository.update(cnpjId, {
    is_active: true,
  })

  return { message: `O CNPJ: ${getCnpj.cnpj} foi ativo com sucesso!` }
}
