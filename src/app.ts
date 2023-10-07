const express = require('express')
const dotenv = require('dotenv')
const pg = require('pg')

dotenv.config()

const pool = new pg.Pool({
    connectionString: process.env.DB_URL,
    // ssl: true 
    // VERIFICAR: revisar con este comando funciona en localhost, pero en la rama deployada de render puede que no
})
const app = express()
const port = 8080

app.get('/', async (req, res) => {
    const result = await pool.query('select now()')
    const hora = result.rows[0]
    return res.json(hora)
})

app.get('/users', async (req, res) => {
    const result = await pool.query('select * from pruebilla')
    const users = result.rows
    res.send(users)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

