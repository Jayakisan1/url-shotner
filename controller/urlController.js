const shortid = require('shortid');
const URL = require('../model/url');


async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if(!body.redirectURL)
  {
    return res.status(400).json({error: 'Redirect URL is required'});
  }

  const shortID = shortid();
  await URL.create({
    shortID: shortID,
    redirectURL: body.redirectURL,
    visitHistory: []
  });
  return res.render("home" ,{
    id: shortID
  })
  
};



async function handleAnalytics(req , res) {
  console.log('Analytics');
  const shortID = req.params.shortID;
  const result = await URL.findOne({shortID});
  return res.json({totalClicks: result.visitHistory.length,
                    analytics: result.visitHistory});
};



module.exports = {handleGenerateNewShortURL , handleAnalytics};