"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const data_source_1 = require("../../data-source");
const userAdminData = {
    name: "Lucas",
    email: "lucas@kenzie.com",
    password: "123456",
    isAdm: true,
    address: {
        city: "Bauru",
        state: "SP",
        complement: "Casa",
        number: 214,
        hood: "Capitão Gomes",
        zipCode: "14565245"
    }
};
const userNotAdminData = {
    name: 'Breno',
    email: 'breno@kenzie.com',
    password: '123456',
    isAdm: false,
    address: {
        city: 'Bauru',
        state: 'SP',
        complement: 'Casa',
        number: 210,
        hood: 'Capitão Gomes',
        zipCode: '16523664'
    }
};
const userWithOutPasswordData = {
    name: "Lucas",
    email: "semsenha@kenzie.com",
    isAdm: true,
    address: {
        city: "Bauru",
        state: "SP",
        complement: "Casa",
        number: 200,
        hood: "Capitão Gomes",
        zipCode: "14525645"
    }
};
const newDataUserAdmin = {
    name: "Novo nome",
    email: "novoemail@kenzie.com",
    password: "654321",
    address: {
        city: "Novo",
        state: "NV",
        hood: "NovoD",
        complement: "Alt",
        zipCode: "154223654",
        number: 541
    }
};
const newDataUserNotAdmin = {
    name: "Not Adm",
    email: "notadm@kenzie.com",
    password: "654321",
    address: {
        city: "Adm",
        state: "AD",
        hood: "AdmD",
        complement: "Adm",
        zipCode: "154222554",
        number: 525
    }
};
let userAdminSession;
let userNotAdminSession;
let tokenAdmin = '';
let tokenNotAdmin = '';
let idAdmin = '';
let idNotAdmin = '';
let createdUsers = [];
describe('Testando rotas de usuário', () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize().then(res => {
            connection = res;
        }).catch((error => {
            console.log(error);
        }));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test('POST /user -> Deve ser capaz de criar um novo usuário', () => __awaiter(void 0, void 0, void 0, function* () {
        const resultAdmin = yield (0, supertest_1.default)(app_1.default).post('/user').send(userAdminData);
        const resultNotAdmin = yield (0, supertest_1.default)(app_1.default).post('/user').send(userNotAdminData);
        expect(resultAdmin.status).toBe(201);
        expect(resultNotAdmin.status).toBe(201);
        expect(resultAdmin.body).toHaveProperty('id');
        expect(resultNotAdmin.body).toHaveProperty('id');
        expect(resultAdmin.body).not.toHaveProperty("password");
        expect(resultNotAdmin.body).not.toHaveProperty('password');
        createdUsers.push(resultAdmin.body);
        createdUsers.push(resultNotAdmin.body);
        idAdmin = resultAdmin.body.id;
        idNotAdmin = resultNotAdmin.body.id;
    }));
    test('POST /user -> Não deve ser capaz de criar um usuário sem senha', () => __awaiter(void 0, void 0, void 0, function* () {
        const resultAdmin = yield (0, supertest_1.default)(app_1.default).post('/user').send(userWithOutPasswordData);
        expect(resultAdmin.status).toBe(400);
        expect(resultAdmin.body).toMatchObject({
            message: "Senha requerida"
        });
    }));
    test('POST /login/user -> Deve ser possível fazer o login de usuário', () => __awaiter(void 0, void 0, void 0, function* () {
        const resultLoginAdmin = yield (0, supertest_1.default)(app_1.default).post('/login/user').send({
            email: userAdminData.email,
            password: userAdminData.password
        });
        const resultLoginNotAdmin = yield (0, supertest_1.default)(app_1.default).post('/login/user').send({
            email: userNotAdminData.email,
            password: userNotAdminData.password
        });
        expect(resultLoginAdmin.status).toBe(200);
        expect(resultLoginNotAdmin.status).toBe(200);
        expect(resultLoginAdmin.body).toHaveProperty('token');
        expect(resultLoginNotAdmin.body).toHaveProperty('token');
        tokenAdmin = resultLoginAdmin.body.token;
        tokenNotAdmin = resultLoginNotAdmin.body.token;
    }));
    test('GET /user -> Deve ser capaz de listar todos os usuários', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/user').set('Authorization', `Bearer ${tokenAdmin}`);
        expect(result.body).toMatchObject(createdUsers);
    }));
    test('GET /user -> Não deve ser capaz de listar os usuários sem ser administrador', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/user').set('Authorization', `Bearer ${tokenNotAdmin}`);
        expect(result.status).toBe(401);
        expect(result.body).toMatchObject({
            message: "Apenas administrador."
        });
    }));
    test('PATCH /user/:id -> Deve ser capaz de alterar o próprio perfil', () => __awaiter(void 0, void 0, void 0, function* () {
        const resultNotAdmin = yield (0, supertest_1.default)(app_1.default).patch(`/user/${idNotAdmin}`).send(newDataUserAdmin).set('Authorization', `Bearer ${tokenNotAdmin}`);
        expect(resultNotAdmin.status).toBe(200);
        expect(resultNotAdmin.body).toHaveProperty('id');
        expect(resultNotAdmin.body.name).toBe(newDataUserAdmin.name);
        expect(resultNotAdmin.body.email).toBe(newDataUserAdmin.email);
        expect(resultNotAdmin.body).not.toHaveProperty('password');
    }));
    test('PATCH /user/:id -> Não deve ser capaz de alterar a propriedade isAdm', () => __awaiter(void 0, void 0, void 0, function* () {
        const resultNotAdmin = yield (0, supertest_1.default)(app_1.default).patch(`/user/${idNotAdmin}`).send({ isAdm: true }).set('Authorization', `Bearer ${tokenNotAdmin}`);
        expect(resultNotAdmin.status).toBe(401);
        expect(resultNotAdmin.body).toMatchObject({
            message: "Não é possível alterar status de ADM"
        });
        expect(resultNotAdmin.body).not.toHaveProperty('password');
    }));
    test('PATCH /user/:id -> Não deve ser capaz de alterar outro perfil sem ser administrador', () => __awaiter(void 0, void 0, void 0, function* () {
        const resultNotAdmin = yield (0, supertest_1.default)(app_1.default).patch(`/user/${idAdmin}`).send(newDataUserNotAdmin).set('Authorization', `Bearer ${tokenNotAdmin}`);
        expect(resultNotAdmin.status).toBe(401);
        expect(resultNotAdmin.body).toMatchObject({
            message: "Sem permissão"
        });
    }));
    test('PATCH /user/:id -> Deve ser capaz de atualizar outro perfil sendo administrador', () => __awaiter(void 0, void 0, void 0, function* () {
        const resultLoginAdmin = yield (0, supertest_1.default)(app_1.default).post('/login/user').send({
            email: userAdminData.email,
            password: userAdminData.password
        });
        const resultAdmin = yield (0, supertest_1.default)(app_1.default).patch(`/user/${idNotAdmin}`).send({ name: "Mudar nome", email: "mudaremail@kenzie.com", password: "541214" }).set('Authorization', `Bearer ${resultLoginAdmin.body.token}`);
        expect(resultAdmin.status).toBe(200);
        expect(resultAdmin.body).toHaveProperty('id');
        expect(resultAdmin.body).not.toHaveProperty('password');
    }));
});
