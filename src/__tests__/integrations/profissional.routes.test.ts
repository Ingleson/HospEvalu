import request from 'supertest'
import { DataSource } from 'typeorm'
import app from '../../app'
import { AppDataSource } from '../../data-source'
import { IHospitalRequest } from '../../Interfaces/hospital'
import { IProfessional, IProfessionalRequest } from '../../Interfaces/Professional'
import { IUserRequest, IUserWithOutPasswordRequest } from '../../Interfaces/users'
import { IUserLogin } from '../../Interfaces/users'

const profissionalData: IProfessionalRequest = {
    name: "Lucas",
    email: "lucas@kenzie.com",
    password: "123456",
    CRM: "CRM/RJ 123456",
	serviceType: {
		name: "Fisioterapeuta",
		price: 89,
		duration: "60 minutos"
	},
	hospital_cnpj: "78.014.887/0001-64"
}

const profissionalWithOutPasswordData: any = {
    name: "Novo mail",
    email: "novomail@kenzie.com",
    CRM: "CRM/RJ 123456",
	serviceType: {
		name: "Fisioterapeuta",
		price: 89,
		duration: "60 minutos"
	},
	hospital_cnpj: "78.014.887/0001-64"
}

const professionalUpdateData: any = {
    name: "Novo mail",
    email: "novomail@kenzie.com",
    password: "1234567",
    CRM: "CRM/RJ 123456",
	serviceType: {
		name: "Fisioterapeuta",
		price: 89,
		duration: "60 minutos"
	},
	hospital_cnpj: "78.014.887/0001-64"
}

const userAdminData: IUserRequest = {
    name: "Teste profissional",
    email: "profissional@kenzie.com",
    password: "123456",
    isAdm: true,
    address: {
        city: "Bauru",
        state: "SP",
        complement: "Casa",
        number: 214,
        hood: "Capitão Gomes",
        zipCode: "14565246"
    }
}

const hospitalData: IHospitalRequest = {
	name: "São Judas",
	cnpj: "78.014.887/0001-64",
	address: {
		state: "MG",
		city: "Divinopolis",
		hood: "Centro",
		complement: "Prédio",
		zipCode: "12345-678",
		number: 100
	}
}

let tokenUser: string = ''
let tokenProfissional: string = ''
let idProfissional: string = ''


describe('Testando rotas de usuário', ()=> {

    let connection: DataSource

    beforeAll(async ()=>{
        await AppDataSource.initialize().then(res=>{
            connection = res
        }).catch((error => {
            console.log(error)
        }))
    })

    afterAll( async() => {
        await connection.destroy()
    })

    test('POST /professional -> Deve ser capaz de criar um novo profissional', async ()=> {
        const resultUser = await request(app).post('/user').send(userAdminData)
        const resultLogin = await request(app).post('/login/user').send({email: userAdminData.email, password: userAdminData.password})

        tokenUser = resultLogin.body.token

        const resultHospital = await request(app).post('/hospital').send(hospitalData).set('Authorization', `Bearer ${tokenUser}`)

        const result = await request(app).post('/professional').send(profissionalData)

        expect(result.status).toBe(201)
        expect(result.body).toHaveProperty('id')
        idProfissional = result.body.id
    })

    test('POST /professional -> Não deve ser capaz de criar um usuário sem senha', async ()=> {
        const resultAdmin = await request(app).post('/user').send(profissionalWithOutPasswordData)

        expect(resultAdmin.status).toBe(400)
        expect(resultAdmin.body).toMatchObject({message: "Senha requerida"})

    })

    test('POST /login/professional -> Deve ser possível fazer o login de profissional', async ()=> {

        const resultLogin = await request(app).post('/login/professional').send({
            email: profissionalData.email,
            password: profissionalData.password
        })

        expect(resultLogin.status).toBe(200)
        expect(resultLogin.body).toHaveProperty('session')
        
        tokenProfissional = resultLogin.body.session
    })
    
    test('GET /user -> Deve ser capaz de listar todos os usuários', async ()=> {
        const result = await request(app).get('/professional').set('Authorization', `Bearer ${tokenProfissional}`)

        expect(result.status).toBe(200)
    })


    test('PATCH /professional/:id -> Deve ser capaz de alterar o próprio perfil', async ()=> {

        const result = await request(app).patch(`/professional/${idProfissional}`).send(professionalUpdateData).set('Authorization', `Bearer ${tokenProfissional}`)

        expect(result.status).toBe(200)
        expect(result.body).toHaveProperty('id')
    })

    test('PATCH /professional/activate/:id -> Não deve ser capaz de alterar a propriedade isActive', async ()=> {


        const resultNotAdmin = await request(app).patch(`/professional/activate/${idProfissional}`).send({isActive: true}).set('Authorization', `Bearer ${tokenProfissional}`)

        expect(resultNotAdmin.status).toBe(401)
        expect(resultNotAdmin.body).toMatchObject({
            message: "Apenas usuários administradores"
        })
        
    })
})
