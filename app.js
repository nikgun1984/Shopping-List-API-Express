const express = require('express');
const ExpressError = require('./expressError');
const itemsRoutes = require('./itemsRoutes');

const app = express();

app.use("/items", itemsRoutes);

app.use(express.json());

app.get('/favicon.ico', (req,res) => res.sendStatus(204));

app.use(function(err,req,res,next){
    let status = err.status || 500;

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    })
});

app.listen(3000, function(){
    console.log("The Server is now running...")
})
