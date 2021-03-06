const { route } = require('oi-node-api-framework');
const { server } = require('../../config/server');
const controller = require('./controller');
const autorizacao = require('../../config/custom-authorization');

// Através do objeto info obtemos informações que nos possibilitam ser flexiveis para criar rotas mais elegantes e significativas:
// { base: '/atendimento-backend', module: 'cliente', full: '/atendimento-backend/cliente' }
const info = route.info(__filename);

server.get(`${info.base}/${info.module}s/`, autorizacao.protect.bind(autorizacao), controller.carregar.bind(controller));
