const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nome: String,
}, {
    collection: 'clientes'
});

module.exports = mongoose.model('Cliente', schema);
