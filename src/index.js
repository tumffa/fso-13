const { Sequelize } = require('sequelize')
const express = require('express')
const config = require('../util/config')
const app = express()

app.use(express.json())

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`)
})