export interface IProfessional {
  id: string
  hospital_id: string
  service_type_id: string
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
  service_type_id: string
  hospital_id: string //Pensar em como será a lógica do hospital_id
}

export interface IProfessionalUpdate {
  name: string
  email: string
  password: string
  service_type_id: string
  hospital_id: string
}
