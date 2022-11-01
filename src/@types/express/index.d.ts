import * as express from "express"

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
        name: string
        email: string
        is_adm: boolean
      }
    }
  }
}
