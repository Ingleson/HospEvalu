export interface IServiceType {
  id: string
  name: string
  price: number
  duration: string
}

export interface IServiceTestType {
  id?: string
  name: string
  price: number
  duration: string
}

export interface IServiceTypeRequest {
  name: string
  price: number
  duration: string
}

export interface IProfessional {
  id: string
  hospital_id: string
  serviceType: IServiceType
  email: string
  password: string
  created_at: Date
  updated_at: Date
  name: string
  CRM: string
  is_active: boolean
}

export interface IProfessionalRequest {
  name: string
  email: string
  password: string
  CRM: string
  serviceType: IServiceTestType
  hospital_cnpj: string
}

export interface IProfessionalUpdate {
  name: string
  email: string
  password: string
  serviceType: IServiceType
  hospital_cnpj: string
}
