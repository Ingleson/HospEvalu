import { Request, Response } from "express"
import sessionProfessionalService from "../../Services/sessions/sessionProfessional.service"

const sessionProfessionalController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const session = await sessionProfessionalService(email, password)

  return res.json({ session })
}

export default sessionProfessionalController
