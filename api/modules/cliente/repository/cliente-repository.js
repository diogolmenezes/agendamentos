const { BaseRepository } = require('oi-node-api-framework');
const clienteModel = require('../model/cliente');

class ClienteRepository extends BaseRepository {
    constructor() {
        super({
            module: 'Cliente Repository'
        });

        this.model = clienteModel;
    }

    carregarPorNome(nome) {
        return this.model.findOne({
            nome
        });
    }
}

module.exports = new ClienteRepository();
