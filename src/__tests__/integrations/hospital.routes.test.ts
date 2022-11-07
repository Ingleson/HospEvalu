import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";

import request  from "supertest";
import { IHospitalRequest } from "../../Interfaces/hospital";
import app from "../../app";
import { userAdminData, userNotAdminData } from "./user.routes.test";

export const hospitalData: IHospitalRequest = {
    name: 'Hospital Santa Casa',
    cnpj: '04075963124787',
    address: {
        state: 'DF',
        city: 'Brasília',
        hood: 'Plano Piloto',
        complement: 'Prédio Pátio Brasil',
        zipCode: '72000000',
        number: 244
    }
}

let tokenInvalid: string = ''

describe("Teste rota Hospital", () => {

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

    test("POST /hospital -> Deve ser capaz de criar um novo hospital", async () => {
        await request(app).post('/user').send(userAdminData)
        const adminResponse = await request(app).post('/login/user').send(userAdminData)
        const hospitalCreate = await request(app).post("/hospital").set('Authorization', `Bearer ${adminResponse.body.token}`).send(hospitalData)

        expect(hospitalCreate.status).toBe(201)
        expect(hospitalCreate.body).toHaveProperty('id')
    })

    test("POST /hospital -> Não deve ser capaz de criar novo hospital porque usuário não é ADM", async () => {
        await (await request(app).post('/user').send(userNotAdminData))
        const notAdminResponse = await request(app).post('/login/user').send(userNotAdminData)
        const hospitalCreate = await request(app).post("/hospital").set("Authorization", `Bearer ${notAdminResponse.body.token}`).send(hospitalData)

        expect(hospitalCreate.status).toBe(401)
    })

    test("GET /hospital -> Deve ser capaz de listar todos os hospitais", async () => {
        await request(app).post("/user").send(userAdminData)
        const adminResponse = await request(app).post("/login/user").send(userAdminData)
        const listAllHospital = await request(app).get("/hospital").set('Authorization', `Bearer ${adminResponse.body.token}`)

        expect(listAllHospital.status).toBe(200)
    })

    test("GET /hospital -> Não deve ser capaz de listar todos os hospitais por falta do TOKEN", async () => {
        const listAllHospital = await request(app).get("/hospital").set('Authorization', `Bearer ${tokenInvalid}`)

        expect(listAllHospital.status).toBe(401)
    })

    test("DELETE /hospital -> Não deve ser capaz de deletar um hospital, token invalido", async () => {
        await request(app).post("/user").send(userNotAdminData)
        const adminResponse = await request(app).post("/login/user").send(userNotAdminData)
        
        await request(app).post("/hospital").set('Authorization', `Bearer ${adminResponse.body.token}`).send(hospitalData)

        const UserTobeDeleted = await request(app).get('/hospital').set("Authorization", `Bearer ${adminResponse.body.token}`)

        const deleteHospital = await request(app).delete(`/hospital/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${tokenInvalid}`)


        expect(deleteHospital.status).toBe(401)
    })

    test("DELETE /hospital -> Não deve ser capaz de deletar um hospital, não é ADM", async () => {
        await request(app).post("/user").send(userNotAdminData)
        const adminResponse = await request(app).post("/login/user").send(userNotAdminData)
        
        await request(app).post("/hospital").set('Authorization', `Bearer ${adminResponse.body.token}`).send(hospitalData)

        const UserTobeDeleted = await request(app).get('/hospital').set("Authorization", `Bearer ${adminResponse.body.token}`)

        const deleteHospital = await request(app).delete(`/hospital/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminResponse.body.token}`)


        expect(deleteHospital.status).toBe(401)
    })

    test("DELETE /hospital -> Deve ser capaz de deletar um hospital", async () => {
        await request(app).post("/user").send(userAdminData)
        const adminResponse = await request(app).post("/login/user").send(userAdminData)

        const UserTobeDeleted = await request(app).get('/hospital').set("Authorization", `Bearer ${adminResponse.body.token}`)

        const deleteHospital = await request(app).delete(`/hospital/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminResponse.body.token}`)


        expect(deleteHospital.status).toBe(202)
    })

})