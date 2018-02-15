const { audit, Restify } = require('oi-node-api-framework');

// Classe customizada para extender as configurações basicas do restify do framework
class Server extends Restify {
    // applyMiddlewares() {
    //     super.applyMiddlewares();
    // }

    // applyAudit() {
    //     audit.configure(this.server, (req, res, route, err) => {
    //         // console.log('Log customizado de auditoria');
    //     });
    // }
}

const server = new Server();

module.exports = {
    restify: server.restify,
    server: server.configure()
};
