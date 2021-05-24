const cryptoModel = require('../model/cryptoModel');

module.exports = {
  fetch: (req, res) => {
    try {
      cryptoModel.cryptoModel
        .find({})
        .then(result => {
          res.status(200).json({
            data: result,
          });
        })
        .catch(err => {
          res.status(400).json(err);
        });
    } catch (err) {
      console.error(err);
    }
  },
  deleted: (req, res) => {
    try {
      const { id } = req.body;
      console.log('id', id);
      cryptoModel.cryptoModel
        .deleteOne({ _id: id })
        .then(result => {
          res.status(200).json({
            data: result,
          });
        })
        .catch(err => {
          res.status(400).json(err);
        });
    } catch (err) {}
  },
};
