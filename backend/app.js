const express = require("express");
const app = express();
const authRouter = require("./router/authRouter");
const databaseConnection = require("./config/databaseConfig");
const cookieParser = require("cookie-parser");

databaseConnection();



app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter)

app.use('/', (req, res)=>{
    res.status(200).json(
        {
            succuess: true,
            data: 'JWTauth server'
        }
    )
})

module.exports = app;