const express = require('express')
const dotenv = require('dotenv')
const pg = require('pg')

dotenv.config()


const { Sequelize, Model, DataTypes } = require("sequelize");

// si se ejecuta localmente con "npm start" se usa esta linea
// const sequelize = new Sequelize('postgres://StreamClub:DatosauriosFiuba@localhost/user_db')

// si se ejecuta con "docker-compose up" se usa esta linea
const sequelize = new Sequelize('postgres://StreamClub:DatosauriosFiuba@user_db_service/user_db')
// const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
    },
    displayname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
});

const app = express()
const port = 8080

app.get('/', async (req, res) => {
    res.status(200).json({ status: 'UAPI listening in port 8080' });
})

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.send(users)
})

app.get('/drop_users', async (req, res) => {
    await User.drop();
    await User.sync({ force: true });
    res.send('Tabla de usuarios dropeada!')
})

app.get('/create_user', async (req, res) => {
    const _ = await User.create({
        username: 'user1',
        displayName: 'displayName1',
        email: 'example@example.com',
        password: 'password1'
    });
    res.send('user1 creado!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})