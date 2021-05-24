const axios = require('axios');
const _ = require('lodash');
const cryptoModel = require('../model/cryptoModel');
const list = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(result => {
        resolve(result.data.crypto);
      })
      .catch(err => {
        reject(err);
      });
  });
};
module.exports = {
  fetch: async (req, res) => {
    // crypto
    const listData = await list(`http://api.coinlayer.com/list?access_key=${process.env.App_key}&expand=1`);
    // console.log('lis', listData);
    axios
      .get(`http://api.coinlayer.com/live?access_key=${process.env.App_key}&expand=1`)
      .then(result => {
        let combineData = Object.entries(result.data.rates).map(ele => {
          return {
            details: _.find(listData, { symbol: ele[0] }),
            rates: ele[1],
          };
        });
        cryptoModel.cryptoModel
          .find({
            symbols: { $in: Object.keys(result.data.rates) },
          })
          .then(found => {
            found.map(ele => {
              let index = _.findIndex(combineData, { details: { symbol: ele.symbols } });
              if (index > -1)
                combineData[index] = {
                  ...combineData[index],
                  id: ele._id,
                };
            });
            res.status(200).json({
              data: combineData,
            });
          })
          .catch(err => {
            res.status(200).json(err);
          });
      })
      .catch(err => {
        res.status(400).json(err);
      });
  },
  insertdata: async (req, res) => {
    try {
      const {
        details: { symbol, name },
        rates: { rate, cap },
      } = req.body;

      const cryptData = new cryptoModel.cryptoModel({
        companyName: name,
        symbols: symbol,
        marketCap: cap,
        currentRate: rate,
      });

      cryptData.save(cryptData, (err, result) => {
        if (err)
          res.status(400).json({
            err: err,
          });

        res.status(200).json({
          id: result._id,
        });
      });
    } catch (err) {
      console.error(err);
    }
  },
};
