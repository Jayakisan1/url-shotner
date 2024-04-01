
// imports
const express = require('express');
const {DBconnect} = require('./connect');
const mongoURL = require('./model/url');
const path = require('path');
const dotenv = require('dotenv');


const app = express();
app.set("view engine", "ejs");
app.set("views" , path.resolve(__dirname , "./views"));
dotenv.config();

// routes
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const urlRoute = require('./route/urlRoute');
const staticRoute = require('./route/staticRoute');


//for DB connect




DBconnect(process.env.MONGO_URI).then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.log('Error connecting to DB', err);
});



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

//Routes
app.get('/test' , async (req , res) => {
    console.log('Home Page')
    const allURLS = await mongoURL.find({});
    return res.render("home" , 
    {urls:allURLS}
    );
})

app.use('/', staticRoute);
app.use('/url', urlRoute);



app.get('/:shortID' , async (req , res) => {
    console.log('Redirecting')
    const shortID = req.params.shortID;
    const entry = await mongoURL.findOneAndUpdate({
        shortID: shortID
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    
    });
    return res.redirect(entry.redirectURL);
});



