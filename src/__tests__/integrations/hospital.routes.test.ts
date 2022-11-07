import exp from "constants";
import { response } from "express";
import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { IHospitalRequest } from "../../Interfaces/hospital";
import { IUserLogin, IUserRequest } from "../../Interfaces/users";

const userAdminData: IUserRequest = {
  name: "Ingleson",
  email: "Ingleson@kenzie.com",
  password: "1234",
  isAdm: true,
  address: {
    city: "Manaus",
    state: "AM",
    complement: "Casa",
    number: 109,
    hood: "Monte Sião",
    zipCode: "69099212"
  }
}
const userData: IUserRequest = {
  name: "Ingleson",
  email: "Noselgni@kenzie.com",
  password: "123456",
  isAdm: false,
  address: {
    city: "Manaus",
    state: "AM",
    complement: "Casa",
    number: 109,
    hood: "Monte Sião",
    zipCode: "69099212"
  }
}

const adminLogin: IUserLogin = {
  email: "Ingleson@kenzie.com",
  password: "1234"
};

const hospitalData: IHospitalRequest = {
  name: "Platão Araujo",
  cnpj: "00697295009072",
  address: {
    state: "AM",
    city: "Manaus",
    hood: "Av. Autaz Mirim",
    complement: 'Posto de saúde',
    zipCode: '69063492',
    number: 109
  }
}

describe('Testando rotas de hospital', () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize().then(res => {
      connection = res;
    }).catch(err => {
      console.log(err);
    }); 

    await request(app).post('/user').send(userData);
    await request(app).post('/user').send(userAdminData);
  });

  afterAll( async() => {
    await connection.destroy();
  });

  test('POST /hospital -> Deve ser capaz de criar um novo hospital', async() => {

    const adminLoginResponse = await request(app).post('/login/user').send(adminLogin);
    const response = await request(app).post('/hospital').set('Authorization', `Bearer ${adminLoginResponse.body.token}`).send(hospitalData);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("cnpj")
  })

  test('POST /hospital -> Não deve ser capaz de criar cnpj que já existe', async() => {

    const adminLoginResponse = await request(app).post('/login/user').send(adminLogin);
    const response = await request(app).post('/hospital').set('Authorization', `Bearer ${adminLoginResponse.body.token}`).send(hospitalData);

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(400)
  })

  test('POST /hospital -> Não deve conseguir criar um novo hospital sem autorização', async() => {

    const response = await request(app).post('/hospital').send(hospitalData);

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test('POST /hospital -> Não deve conseguir criar um hospital sem ser administrador',async() => {

    const adminLoginResponse = await request(app).post('/login/user').send(userData);
    const response = await request(app).post('/hospital').set('Authorization', `Bearer ${adminLoginResponse.body.token}`).send(hospitalData);

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test('GET /hospital -> Deve ser capaz de listar todos os hospitais', async() => {

    const adminLoginResponse = await request(app).post('/login/user').send(adminLogin);
    const response = await request(app).get('/hospital').set('Authorization', `Bearer ${adminLoginResponse.body.token}`)

    expect(response.body).toHaveLength(1)
    expect(response.status).toBe(200)
  })

  test('GET /hospital -> Não deve ser capaz de listar todos os hospitais sem autorização', async() => {
    
    const response = await request(app).get('/hospital')

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test('DELETE /hospital/:id -> Não deve ser capaz de deletar hospitais sem autorização', async() => {

    const adminLoginResponse = await request(app).post('/login/user').send(adminLogin);
    const hospitalToBeDeleted = await request(app).get('/hospital').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    const response = await request(app).delete(`/hospital/${hospitalToBeDeleted.body[0].id}`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test('DELETE /hospital/:id -> Não deve ser capaz de deleter hospitais sem ser Administrador', async() => {
  
    const adminLoginResponse = await request(app).post('/login/user').send(adminLogin);
    const userLoginResponse = await request(app).post('/login/user').send(userData);
    const hospitalToBeDeleted = await request(app).get('/hospital').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    const response = await request(app).delete(`/hospital/${hospitalToBeDeleted.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test('DELETE /hospital/:id -> Não deve ser capaz de deletar hospital com id inválido', async() => {
    await request(app).post('/user').send(userAdminData);
    const adminLoginResponse = await request(app).post('/login/user').send(adminLogin);
    const response = await request(app).delete(`/hospital/13970660-5dbe-423a-9a9d-5c23b37943cf`).set('Authorization', `Bearer ${adminLoginResponse.body.token}`)
    
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(404)
  })

  test('DELETE /hospital/:id -> Deve ser capaz de deleter hospital', async() => {
    
    await request(app).post('/user').send(userAdminData);
    const adminLoginResponse = await request(app).post('/login/user').send(adminLogin);
    const hospitalToBeDeleted = await request(app).get('/hospital').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    
    const response = await request(app).delete(`/hospital/${hospitalToBeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    
    expect(response.body).toBeDefined()
    expect(response.status).toBe(204)
  })
})