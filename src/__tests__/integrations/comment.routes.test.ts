import { DataSource } from "typeorm"
import { AppDataSource } from "../../data-source"
import app from "../../app"
import request from "supertest"
import { IUserRequest } from "../../Interfaces/users"
import { IHospitalRequest } from "../../Interfaces/cpnj"
const userAdminData: IUserRequest = {
  name: "Gusta",
  email: "gusta@kenzie.com",
  password: "1234",
  isAdm: true,
  address: {
    complement: "Casa",
    number: 46,
    zipCode: "72235226",
  },
}
const userNotAdminData: IUserRequest = {
  name: "Breno",
  email: "breno@kenzie.com",
  password: "123456",
  isAdm: false,
  address: {
    complement: "Casa",
    number: 210,
    zipCode: "72235226",
  },
}
const hospitalData: IHospitalRequest = {
  name: "Hospital Santa Marta",
  cnpj: "78.014.887/0001-65",
  address: {
    complement: "Hospital",
    zipCode: "72235226",
    number: 109,
  },
}
const professionalData = {
  name: "Gusta Doctordfg",
  email: "gustadoctorgdf@kenzie.com",
  password: "123456",
  CRM: "CRM/DF 123456",
  serviceType: {
    name: "Odontologia",
    price: 500,
    duration: "1h",
  },
  cnpj: "78.014.887/0001-65",
}
const userWithOutPasswordData: any = {
  name: "Lucas",
  email: "semsenha@kenzie.com",
  password: "1234",
  isAdm: true,
  address: {
    city: "Rio de Janeiro",
    state: "RJ",
    complement: "Casa",
    number: 5,
    hood: "Campo Grande",
    zipCode: "23040180",
  },
}

let tokenUser: string = ""
let professionalId: string = ""
let commentId: string = ""

describe("Testando rotas comment", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res
      })
      .catch((err) => {
        console.error(err)
      })
  })

  afterAll(async () => {
    connection.destroy()
  })

  test("POST /comment -> Deve ser capaz de criar um novo comentário", async () => {
    const createUser = await request(app)
      .post("/user")
      .send(userWithOutPasswordData)

    const loginUser = await request(app).post("/login/user").send({
      email: userWithOutPasswordData.email,
      password: userWithOutPasswordData.password,
    })

    tokenUser = loginUser.body.token

    const hospital = await request(app)
      .post("/hospital")
      .send(hospitalData)
      .set("Authorization", `Bearer ${tokenUser}`)

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData)

    professionalId = createProfessional.body.id

    const content = "Excelente Profissional"

    const commentResponse = await request(app)
      .post("/comment")
      .send({
        userId: createUser.body.id,
        professionalId: createProfessional.body.id,
        content: content,
      })
      .set("Authorization", `Bearer ${tokenUser}`)

    commentId = commentResponse.body.id

    expect(commentResponse.status).toBe(201)
    expect(commentResponse.body).toHaveProperty("id")
  })

  test("POST /comment -> Não deve ser capaz de criar um novo comentário, sem o token", async () => {
    const createUser = await request(app).post("/user").send(userAdminData)
    await request(app).post("/hospital").send(hospitalData)
    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData)
    const content = "Excelente Profissional"

    const commentResponse = await request(app).post("/comment").send({
      userId: createUser.body.id,
      professionalId: createProfessional.body.id,
      content: content,
    })
    expect(commentResponse.status).toBe(401)
    expect(commentResponse.body).toHaveProperty("message")
  })

  test("GET /comment/professional/:id -> Deve ser capaz de pegar todos os comentários de um profissional específico", async () => {
    const createHospital = await request(app)
      .post("/hospital")
      .send(hospitalData)
      .set("Authorization", `Bearer ${tokenUser}`)

    const commentResponse = await request(app)
      .get(`/comment/professional/${professionalId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(commentResponse.status).toBe(200)
  })

  test("GET /comment/professional/:id -> Não deve ser capaz de pegar todos os comentários de um profissional específico, sem token", async () => {
    await request(app).post("/user").send(userAdminData)

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData)

    const commentResponse = await request(app).get(
      `/comment/professional/${createProfessional.body.id}`
    )

    expect(commentResponse.status).toBe(401)
    expect(commentResponse.body).toHaveProperty("message")
  })

  test("PATCH /comment/:id -> Deve ser capaz de atualizar um comentário", async () => {
    const responseComment = await request(app)
      .patch(`/comment/${commentId}`)
      .send({ content: "Comentário editado" })
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(responseComment.status).toBe(200)
    expect(responseComment.body).toHaveProperty("id")
    expect(responseComment.body.content).toBe("Comentário editado")
  })

  test("PATCH /comment/:id -> Não deve ser capaz de atualizar um comentário, sem ser ADM", async () => {
    await request(app).post("/user").send(userNotAdminData)

    const loginUser = await request(app)
      .post("/login/user")
      .send(userNotAdminData)

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData)

    const commentToBeUpdated = await request(app)
      .get(`/comment/professional/${createProfessional.body.id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`)

    const responseComment = await request(app)
      .patch(`/comment/${commentId}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`)

    expect(responseComment.status).toBe(401)
  })

  test("PATCH /comment/:id -> Não deve ser capaz de atualizar um comentário, sem o token", async () => {
    await request(app).post("/user").send(userAdminData)
    const loginUser = await request(app).post("/login/user").send(userAdminData)
    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData)
    const commentToBeUpdated = await request(app)
      .get(`/comment/professional/${createProfessional.body.id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`)
    const responseComment = await request(app).patch(
      `/comment/${commentToBeUpdated.body.comments}`
    )
    expect(responseComment.status).toBe(401)
  })

  test("DELETE /comment/:id -> Deve ser capaz de excluir um comentário", async () => {
    const responseComment = await request(app)
      .delete(`/comment/${commentId}`)
      .set("Authorization", `Bearer ${tokenUser}`)

    expect(responseComment.status).toBe(200)
    expect(responseComment.body).toMatchObject({
      message: "Comentário deletado com sucesso",
    })
  })

  test("DELETE /comment/:id -> Não deve ser capaz de excluir um comentário, sem ser ADM", async () => {
    await request(app).post("/user").send(userNotAdminData)

    const loginUser = await request(app)
      .post("/login/user")
      .send(userNotAdminData)

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData)

    const commentToBeDeleted = await request(app)
      .get(`/comment/professional/${createProfessional.body.id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`)

    const responseComment = await request(app)
      .delete(`/comment/${commentToBeDeleted.body.comments}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`)

    expect(responseComment.status).toBe(401)
  })

  test("DELETE /comment/:id -> Não deve ser capaz de excluir um comentário, sem o token", async () => {
    await request(app).post("/user").send(userAdminData)
    const loginUser = await request(app).post("/login/user").send(userAdminData)
    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData)
    const commentToBeDeleted = await request(app)
      .get(`/comment/professional/${createProfessional.body.id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`)
    const responseComment = await request(app).delete(
      `/comment/${commentToBeDeleted.body.comments}`
    )
    expect(responseComment.status).toBe(401)
  })
})
