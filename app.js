const framework = require('oi-node-api-framework');
const { server, restify } = require('./api/config/server');

const { config, route, Database, applicationError, redis, logger } = framework;
let database;

// iniciando o servidor web
server.listen(config.app.port, () => {
    logger.debug('Aplicação', `A aplicação está rodando em modo [${config.app.env}] na porta [${config.app.port}].`);

    // iniciando a conexão com o banco de dados
    database = new Database().mongoose;

    // importando as rotas de todos os modulos da aplicação contidos na pasta modules
    route.importModuleRoutes();
});

// repassa todos os erros para o handler padrão da aplicação
server.on('restifyError', applicationError.handle.bind(applicationError));

// finaliza a conexão com o banco sempre que o restify for finalizado
server.on('close', () => {
    logger.debug('Aplicação', 'O Servidor do restify foi finalizado.');
    database.connection.close();
    if (redis) redis.client.quit();
});

// Finaliza a aplicação e todos os seus processos e conexões
process.on('SIGINT', () => {
    logger.debug('Aplicação', 'A aplicação foi finalizada.');
    process.exit();
});

// configurando rota de health check
server.get('/healthcheck', (req, res, next) => {
    res.send(`${config.app.name} está rodando.`);
    next();
});

// configurando rota para o swagger
server.get(/\/doc\/?.*/, restify.plugins.serveStatic({
    default: 'index.html',
    directory: __dirname
}));

module.exports = server;
