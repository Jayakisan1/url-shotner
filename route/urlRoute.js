 const express = require('express');

const router = express.Router();
const {handleGenerateNewShortURL, handleAnalytics} = require('../controller/urlController');



router.post('/' , handleGenerateNewShortURL);


router.get('/analytics/:shortID' , handleAnalytics);



module.exports = router;