import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"

const listAllProfessionalsService = async () => {
  //   const professionalRepository = AppDataSource.getRepository("Professional") //Importar quando as entity ficar pronta

  //   const professionalList = await professionalRepository.find()

  const professionalList = [
    {
      name: "Raphael",
      email: "rapha@mail.com",
      password: "teste123",
      CRM: "CRM/RJ 123456",
      service_type_id: "uuid",
      hospital_id: "uuid",
    },
    {
      name: "teste",
      email: "teste@mail.com",
      password: "teste123",
      CRM: "CRM/RJ 123456",
      service_type_id: "uuid",
      hospital_id: "uuid",
    },
  ]

  if (professionalList.length < 1) {
    throw new AppError(404, "Nenhum profissional cadastrado.")
  }

  return professionalList
}

export default listAllProfessionalsService
