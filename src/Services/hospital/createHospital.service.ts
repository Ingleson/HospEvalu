import { AppDataSource } from "../../data-source";
import { AppError } from "../../Error/appError";
import { IHospitalRequest } from "../../interfaces/hospital";

export const createHospitalService = async ({address, name, cnpj}: IHospitalRequest) => {
  
  const hospitalRepository = AppDataSource.getRepository("hospital");
  const addressRepository = AppDataSource.getRepository("address");

  const findAddress = await addressRepository.findOneBy({cep: address.cep, number: address.number});
  const findCnpj = await hospitalRepository.findOneBy({cnpj});

  if(findAddress) {
    throw new AppError(400, "Address already exists");
  };
  
  if(findCnpj) {
    throw new AppError(400, "Cpnj already exists");
  };

  const newAddress = addressRepository.create({
    state: address.state,
    city: address.city,
    hood: address.hood,
    complement: address.complement,
    cep: address.cep,
    number: address.number
  });

  const createdAddress = await addressRepository.save(newAddress);

  const hospital = hospitalRepository.create({
    address: createdAddress,
    name,
    cnpj
  });

  await hospitalRepository.save(hospital);

  return hospital;
};