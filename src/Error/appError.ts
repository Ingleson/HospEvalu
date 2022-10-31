import { Response } from "express"

export class AppError extends Error {
  statusCode

  constructor(statusCode: number, message: string) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

export const handleError = (err: AppError, res: Response) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", code: err.statusCode, message: err.message })
  }
}
