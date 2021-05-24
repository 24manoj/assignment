const home = require('../services/home');
const view = require('../services/view');
module.exports = router => {
  try {
    router.get('/api/fetchstockdetails', home.fetch);
    router.post('/api/insert', home.insertdata);
    router.get('/api/fetchviewdata', view.fetch);
    router.post('/api/delete', view.deleted);
  } catch (err) {
    console.error(err);
  }
};
