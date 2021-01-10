const express = require('express');
const itemsRoutes = require('./itemsRoutes');

const app = express();
app.use(express.json());

//middleware for the request date
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

app.use("/items", itemsRoutes);

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

module.exports = app;
