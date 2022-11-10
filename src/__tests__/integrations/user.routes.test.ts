import request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"
import { IHospitalRequest } from "../../Interfaces/cpnj"
import { IProfessionalRequest } from "../../Interfaces/Professional"
import {
  IUserRequest,
  IUserWithOutPasswordRequest,
} from "../../Interfaces/users"
import { IUserLogin } from "../../Interfaces/users"

const userAdminData: IUserRequest = {
  name: "Lucas",
  email: "lucas@kenzie.com",
  password: "123456",
  isAdm: true,
  address: {
    complement: "Casa",
    number: 5,
    zipCode: "23087470",
  },
}

const hospitalData: IHospitalRequest = {
  name: "São Judas",
  cnpj: "78.014.887/0001-64",
  address: {
    complement: "casa",
    zipCode: "35502831",
    number: 61,
  },
}

const userNotAdminData: IUserRequest = {
  name: "Breno",
  email: "breno@kenzie.com",
  password: "123456",
  isAdm: false,
  address: {
    complement: "Casa",
    number: 5,
    zipCode: "23040180",
  },
}

const userWithOutPasswordData: IUserWithOutPasswordRequest = {
  name: "Lucas",
  email: "semsenha@kenzie.com",
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

const newDataUserAdmin: any = {
  name: "Novo nome",
  email: "novoemail@kenzie.com",
  password: "654321",
  address: {
    city: "Rio de Janeiro",
    state: "RJ",
    complement: "Casa",
    number: 5,
    hood: "Campo Grande",
    zipCode: "23040180",
  },
}

const newDataUserNotAdmin: any = {
  name: "Not Adm",
  email: "notadm@kenzie.com",
  password: "654321",
  address: {
    city: "Rio de Janeiro",
    state: "RJ",
    complement: "Casa",
    number: 5,
    hood: "Campo Grande",
    zipCode: "23040180",
  },
}

const profissionalData: IProfessionalRequest = {
  name: "Teste",
  email: "teste@kenzie.com",
  password: "123456",
  CRM: "CRM/RJ 123456",
  serviceType: {
    name: "Fisioterapeuta",
    price: 89,
    duration: "60 minutos",
  },
  cnpj: "78.014.887/0001-64",
}

let userAdminSession: IUserLogin
let userNotAdminSession: IUserLogin

let tokenAdmin: string = ""
let tokenNotAdmin: string = ""

let idAdmin: string = ""
let idNotAdmin: string = ""

let createdUsers: Array<any> = []

describe("Testando rotas de usuário", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res
      })
      .catch((error) => error)
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("POST /user -> Deve ser capaz de criar um novo usuário", async () => {
    const resultAdmin = await request(app).post("/user").send(userAdminData)
    const resultNotAdmin = await request(app)
      .post("/user")
      .send(userNotAdminData)

    expect(resultAdmin.status).toBe(201)
    expect(resultNotAdmin.status).toBe(201)
    expect(resultAdmin.body).toHaveProperty("id")
    expect(resultNotAdmin.body).toHaveProperty("id")
    expect(resultAdmin.body).not.toHaveProperty("password")
    expect(resultNotAdmin.body).not.toHaveProperty("password")
    createdUsers.push(resultAdmin.body)
    createdUsers.push(resultNotAdmin.body)
    idAdmin = resultAdmin.body.id
    idNotAdmin = resultNotAdmin.body.id
  })

  test("POST /user -> Não deve ser capaz de criar um usuário sem senha", async () => {
    const resultAdmin = await request(app)
      .post("/user")
      .send(userWithOutPasswordData)

    expect(resultAdmin.status).toBe(400)
    expect(resultAdmin.body).toMatchObject({
      message: "Senha requerida",
    })
  })

  test("POST /login/user -> Deve ser possível fazer o login de usuário", async () => {
    const resultLoginAdmin = await request(app).post("/login/user").send({
      email: userAdminData.email,
      password: userAdminData.password,
    })

    const resultLoginNotAdmin = await request(app).post("/login/user").send({
      email: userNotAdminData.email,
      password: userNotAdminData.password,
    })

    expect(resultLoginAdmin.status).toBe(200)
    expect(resultLoginNotAdmin.status).toBe(200)
    expect(resultLoginAdmin.body).toHaveProperty("token")
    expect(resultLoginNotAdmin.body).toHaveProperty("token")

    tokenAdmin = resultLoginAdmin.body.token
    tokenNotAdmin = resultLoginNotAdmin.body.token
  })

  test("GET /user -> Deve ser capaz de listar todos os usuários", async () => {
    const result = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${tokenAdmin}`)

    expect(result.body).toMatchObject(createdUsers)
  })

  test("GET /user -> Não deve ser capaz de listar os usuários sem ser administrador", async () => {
    const result = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${tokenNotAdmin}`)

    expect(result.status).toBe(401)
    expect(result.body).toMatchObject({
      message: "Apenas administrador.",
    })
  })

  test("PATCH /user/:id -> Deve ser capaz de alterar o próprio perfil", async () => {
    const resultNotAdmin = await request(app)
      .patch(`/user/${idNotAdmin}`)
      .send(newDataUserAdmin)
      .set("Authorization", `Bearer ${tokenNotAdmin}`)

    expect(resultNotAdmin.status).toBe(200)
    expect(resultNotAdmin.body).toHaveProperty("id")
    expect(resultNotAdmin.body.name).toBe(newDataUserAdmin.name)
    expect(resultNotAdmin.body.email).toBe(newDataUserAdmin.email)
    expect(resultNotAdmin.body).not.toHaveProperty("password")
  })

  test("PATCH /user/:id -> Não deve ser capaz de alterar a propriedade isAdm", async () => {
    const resultNotAdmin = await request(app)
      .patch(`/user/${idNotAdmin}`)
      .send({ isAdm: true })
      .set("Authorization", `Bearer ${tokenNotAdmin}`)

    expect(resultNotAdmin.status).toBe(401)
    expect(resultNotAdmin.body).toMatchObject({
      message: "Não é possível alterar status de ADM",
    })
    expect(resultNotAdmin.body).not.toHaveProperty("password")
  })

  test("PATCH /user/:id -> Não deve ser capaz de alterar outro perfil sem ser administrador", async () => {
    const resultNotAdmin = await request(app)
      .patch(`/user/${idAdmin}`)
      .send(newDataUserNotAdmin)
      .set("Authorization", `Bearer ${tokenNotAdmin}`)

    expect(resultNotAdmin.status).toBe(401)
    expect(resultNotAdmin.body).toMatchObject({
      message: "Sem permissão",
    })
  })

  test("PATCH /user/:id -> Deve ser capaz de atualizar outro perfil sendo administrador", async () => {
    const resultLoginAdmin = await request(app).post("/login/user").send({
      email: userAdminData.email,
      password: userAdminData.password,
    })

    const resultAdmin = await request(app)
      .patch(`/user/${idNotAdmin}`)
      .send({
        name: "Mudar nome",
        email: "mudaremail@kenzie.com",
        password: "541214",
      })
      .set("Authorization", `Bearer ${resultLoginAdmin.body.token}`)

    expect(resultAdmin.status).toBe(200)
    expect(resultAdmin.body).toHaveProperty("id")
    expect(resultAdmin.body).not.toHaveProperty("password")
  })

  test("PATCH /profissional/activate/:id -> Deve ser capaz o administrador tornar um profissional ativo", async () => {
    const resultLoginAdmin = await request(app).post("/login/user").send({
      email: userAdminData.email,
      password: userAdminData.password,
    })

    const resultHospital = await request(app)
      .post("/hospital")
      .send(hospitalData)
      .set("Authorization", `Bearer ${resultLoginAdmin.body.token}`)

    const resultLoginProfissional = await request(app)
      .post("/professional")
      .send(profissionalData)

    const result = await request(app)
      .patch(`/professional/activate/${resultLoginProfissional.body.id}`)
      .set("Authorization", `Bearer ${resultLoginAdmin.body.token}`)

    expect(result.status).toBe(202)
    expect(result.body).toHaveProperty("message")
  })
})
