import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";

import request from "supertest";
import app from "../../app";

import { ICommentRequest } from "../../Interfaces/comment";
import { IServiceTypeRequest } from "../../Interfaces/Professional";
import { IProfessionalRequest } from "../../Interfaces/Professional";
import { userAdminData, userNotAdminData } from "./user.routes.test";
import { hospitalData } from "./hospital.routes.test";

const requestProfessinal = {
    name: "Gusta Doctor",
    email: "gustadoctor@kenzie.com",
    password: "123456",
    CRM: "CRM/DF 123456",
    serviceType: {

        name: "Odontologia",
        price: 500,
        duration: "1h"
        
    },
    hospital_cnpj: "04075963124787"
  }



describe("Teste rota comment", () => {
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize().then(res => {
            connection = res
        }).catch(err => {
            console.error(err)
        })
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("POST /comment -> Deve ser capaz de criar um novo comentario", async () => {
        const userAdmin = await request(app).post('/user').send(userAdminData)
        const loginUser = await request(app).post('/login/user').send(userAdminData)

        await request(app).post('/hospital').send(hospitalData)
        const createProfissional = await request(app).post('/professional').send(requestProfessinal)

        const content = "Esse profissional é bão"

        const responseComment = await request(app).post('/comment').send({
            userId: userAdmin.body.id,
            professionalId: createProfissional.body.id,
            content: content
        }).set("Authorizarion", `Bearer ${loginUser.body.token}`)

        expect(responseComment.status).toBe(201)
        expect(responseComment.body).toHaveProperty('id')
        
    })
})