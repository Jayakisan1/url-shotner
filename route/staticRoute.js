const express = require('express');

const URLdb = require('../model/url');
const router = express.Router();


router.get('/' , async (req, res) => {
    const allURLs = await URLdb.find({});
    //console.log(allURLs)
    
    return res.render('home' , {
        urls: allURLs
    });
});


module.exports = router;