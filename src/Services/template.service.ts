import { AppError } from "../Error/appError"

const templateService = async (email: string) => {
  if (!email) {
    throw new AppError(400, "email is required")
  }

  return email
}

export default templateService
