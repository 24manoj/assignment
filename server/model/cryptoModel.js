const { Double } = require('bson');
let mongoose = require('mongoose');
/**@description schema for collaborate */
const cryptoModel = mongoose.Schema({
  companyName: {
    type: String,
  },
  symbols: {
    type: String,
  },

  marketCap: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
  currentRate: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
});

exports.cryptoModel = mongoose.model('crytodata', cryptoModel);
