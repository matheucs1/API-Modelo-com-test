const { response } = require("express");
const database = require("../../src/database");
const serviceUser = require("../../src/services/user");

describe("Teste de usuário", () => {

    beforeAll(async ()=> {
        this.transaction = await database.db.transaction()
    })
    afterAll(() => {
        this.transaction.rollback();
    })

    it("Deve criar um usuário", async () => {
        const user = {
            email: "emailteste2@teste.com",
            password: 123456
        }
        const addUser = await serviceUser.Create(user.email, user.password, this.transaction);
        this.id = addUser.id;
        console.log(addUser)

        expect(addUser.email).toBe(user.email)
        expect(addUser.password).toBe(user.password)
    })

    it("Deve alterar um usuário", async () => {
        const user = {
            id: this.id,
            email: "emailalterado@teste.com",
            password: 123456
        }
        const updateUser = await serviceUser.Update(user.id, user.email, user.password, this.transaction);

        expect(updateUser.email).toBe(user.email)
        expect(updateUser.password).toBe(user.password)
    })

    it("Deve deletar um usuário", async () => {
        const user = {
            id: this.id
        }
        const response = await serviceUser.Delete(user.id, this.transaction);
        

        expect(response).toBe(true)
    })



})