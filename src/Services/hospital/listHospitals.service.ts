import { AppDataSource } from "../../data-source"

export const listHospitalsService = async () => {
  const hospitalRepository = AppDataSource.getRepository("hospital");
  const hospital = await hospitalRepository.find();

  return hospital;
};