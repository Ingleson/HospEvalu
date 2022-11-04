import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"

export const deleteHospitalService = async (id: string) => {
  const hospitalRepository = AppDataSource.getRepository("hospital")

  const findHospital = await hospitalRepository.findOneBy({ id })

  if (!findHospital) {
    throw new AppError(404, "Hospital not found")
  }

  await hospitalRepository.delete({ id })

  return { message: "Hospital was deleted" }
}
