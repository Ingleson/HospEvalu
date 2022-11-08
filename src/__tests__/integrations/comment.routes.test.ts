import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";

import app from "../../app";
import request from "supertest";
import { IUserRequest } from "../../Interfaces/users"
import { IHospitalRequest } from "../../Interfaces/hospital"

const userAdminData: IUserRequest = {
    name: "Gusta",
    email: "gusta@kenzie.com",
    password: "1234",
    isAdm: true,
    address: {
      
      complement: "Casa",
      number: 46,
     
      zipCode: "72235226"
    }
}

const userNotAdminData: IUserRequest = {
    name: 'Breno',
    email: 'breno@kenzie.com',
    password: '123456',
    isAdm: false,
    address: {
        complement: 'Casa',
        number: 210,
        zipCode: '16523664'
    }
}
  
const hospitalData: IHospitalRequest = {
    name: "Hospital Santa Marta",
    cnpj: "04075963124787",
    address: {
      
      complement: 'Hospital',
      zipCode: '72025110',
      number: 109
    }
}
  
const professionalData = {
    "name": "Gusta Doctor",
    "email": "gustadoctor@kenzie.com",
    "password": "123456",
    "CRM": "CRM/DF 123456",
    "serviceType": 
      {
        "name": "Odontologia",
        "price": 500,
        "duration": "1h"      
    },
    "hospital_cnpj": "04075963124787"
}
  

describe("Testando rotas comment", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error(err);
      });
  });

  afterAll(async () => {
    connection.destroy();
  });

  test("POST /comment -> Deve ser capaz de criar um novo comentário", async () => {
    const createUser = await request(app).post("/user").send(userAdminData);

    const loginUser = await request(app).post("/login/user").send({
      email: userAdminData.email,
      password: userAdminData.password,
    });

    await request(app).post("/hospital").send(hospitalData);
    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData);

    const content = "Excelente Profissional";

    const commentResponse = await request(app)
      .post("/comment")
      .send({
        userId: createUser.body.id,
        professionalId: createProfessional.body.id,
        content: content,
      })
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    expect(commentResponse.status).toBe(201);
    expect(commentResponse.body).toHaveProperty('id')
  });

  test("POST /comment -> Não deve ser capaz de criar um novo comentário, sem o token", async () => {
    const createUser = await request(app).post("/user").send(userAdminData);

    await request(app).post("/hospital").send(hospitalData);
    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData);

    const content = "Excelente Profissional";

    const commentResponse = await request(app).post("/comment").send({
      userId: createUser.body.id,
      professionalId: createProfessional.body.id,
      content: content,
    });

    expect(commentResponse.status).toBe(401);
    expect(commentResponse.body).toHaveProperty('message')
  });

  test("GET /comment/professional/:id -> Deve ser capaz de pegar todos os comentários de um profissional específico", async () => {
    await request(app).post("/user").send(userAdminData);

    const loginUser = await request(app).post("/login/user").send({
      email: userAdminData.email,
      password: userAdminData.password,
    });

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData);

    const commentResponse = await request(app)
      .get(`/comment/professional/${createProfessional.body.id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    expect(commentResponse.status).toBe(200);
  });

  test("GET /comment/professional/:id -> Não deve ser capaz de pegar todos os comentários de um profissional específico, sem token", async () => {
    await request(app).post("/user").send(userAdminData);

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData);

    const commentResponse = await request(app).get(
      `/comment/professional/${createProfessional.body.id}`
    );

    expect(commentResponse.status).toBe(401);
    expect(commentResponse.body).toHaveProperty('message')
  });

  test("PATCH /comment/:id -> Deve ser capaz de atualizar um comentário", async () => {
    await request(app).post("/user").send(userAdminData);

    const loginUser = await request(app).post("/login/user").send({
      email: userAdminData.email,
      password: userAdminData.password,
    });

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData);

    const commentToBeUpdated = await request(app)
      .get(`/comment/professional/${createProfessional.body.id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    const responseComment = await request(app)
      .patch(`/comment/${commentToBeUpdated.body.comments}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    expect(responseComment.status).toBe(200);
  });

  test("PATCH /comment/:id -> Não deve ser capaz de atualizar um comentário, sem ser ADM", async () => {
    await request(app).post("/user").send(userNotAdminData);

    const loginUser = await request(app).post("/login/user").send({
      email: userNotAdminData.email,
      password: userNotAdminData.password,
    });

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData);

    const commentToBeUpdated = await request(app)
      .get(`/comment/professional/${createProfessional.body.id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    const responseComment = await request(app)
      .patch(`/comment/${commentToBeUpdated.body.comments}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    expect(responseComment.status).toBe(401);
  });

  test("PATCH /comment/:id -> Não deve ser capaz de atualizar um comentário, sem o token", async () => {
    await request(app).post("/user").send(userAdminData);

    const loginUser = await request(app).post("/login/user").send({
      email: userAdminData.email,
      password: userAdminData.password,
    });

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData);

    const commentToBeUpdated = await request(app)
      .get(`/comment/professional/${createProfessional.body.id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    const responseComment = await request(app).patch(
      `/comment/${commentToBeUpdated.body.comments}`
    );

    expect(responseComment.status).toBe(401);
  });

  test("DELETE /comment/:id -> Deve ser capaz de excluir um comentário", async () => {
    await request(app).post("/user").send(userAdminData);

    const loginUser = await request(app).post("/login/user").send({
      email: userAdminData.email,
      password: userAdminData.password,
    });

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData);

    const commentToBeDeleted = await request(app)
      .get(`/comment/professional/${createProfessional.body.id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    const responseComment = await request(app)
      .delete(`/comment/${commentToBeDeleted.body.comments}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    expect(responseComment.status).toBe(204);
  });

  test("DELETE /comment/:id -> Não deve ser capaz de excluir um comentário, sem ser ADM", async () => {
    await request(app).post("/user").send(userNotAdminData);

    const loginUser = await request(app).post("/login/user").send({
      email: userNotAdminData.email,
      password: userNotAdminData.password,
    });

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData);

    const commentToBeDeleted = await request(app)
      .get(`/comment/professional/${createProfessional.body.id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    const responseComment = await request(app)
      .delete(`/comment/${commentToBeDeleted.body.comments}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    expect(responseComment.status).toBe(401);
  });

  test("DELETE /comment/:id -> Não deve ser capaz de excluir um comentário, sem o token", async () => {
    await request(app).post("/user").send(userAdminData);

    const loginUser = await request(app).post("/login/user").send({
      email: userAdminData.email,
      password: userAdminData.password,
    });

    const createProfessional = await request(app)
      .post("/professional")
      .send(professionalData);

    const commentToBeDeleted = await request(app)
      .get(`/comment/professional/${createProfessional.body.id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    const responseComment = await request(app).delete(
      `/comment/${commentToBeDeleted.body.comments}`
    );

    expect(responseComment.status).toBe(401);
  });
});
