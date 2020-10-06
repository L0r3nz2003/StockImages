const express   = require('express');
const router    = express.Router();
const _app_folder = 'public/';


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(`index.html`, {root: _app_folder});

});

module.exports = router;
