const person = require("../model/person");
const user = require("../model/user");

class ServicePerson {
    async FindAll() {
        return person.findAll();
    }

    async FindById(id) {
        return person.findByPk(id, {
            include: [{
                model: user,
            }]
        });
    }

    async Create(name, address, userId) {
        if (!name) {
            throw new Error("Favor informar nome");
        } else if (!address) {
            throw new Error("Favor informar endereço");
        } else if (!userId) {
            throw new Error("Favor informar o id do usuário");

        };

        await person.create({
            name, address, userId
        });

    }

    async Update(id, name, address) {
        const oldPerson = await this.FindById(id);

        oldPerson.name = name || oldPerson.name;
        oldPerson.address = address || oldPerson.address;

        oldPerson.save();

        return oldPerson;

    }

    async Delete(id) {
        const person = await this.FindById(id);
        person.destroy();

    }
}

module.exports = new ServicePerson()