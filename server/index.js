const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

//Routers

const postCliente = require('./routes/Clientes.js');
app.use("/clientes", postCliente);

db.sequelize.sync().then(()=> {
    app.listen(3004, () => {
        console.log("Server running on port 3004");
    })
})