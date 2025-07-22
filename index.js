const express = require('express')
const userRouter = require('./src/routes/user')
const personRouter = require('./src/routes/person')
const database = require('./src/database')
const ApiUser = require('./src/api/user')
const authMiddleware = require('./src/middleware/auth')

const app = express()
const porta = 3000
app.use(express.json())

app.post('/api/v1/user/', ApiUser.Create)
app.post('/api/v1/login/', ApiUser.Login)

app.use(authMiddleware)

app.use('/api/v1/user', userRouter)
app.use('/api/v1/person', personRouter)

database.db.sync({
    force: false
}).then(() => {
    console.log('Banco de dados conectado com sucesso')
}).catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error)
})

app.listen(porta, () => {
    console.log('servidor rodando na porta ' + porta)
})