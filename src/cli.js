require('dotenv').config()
const { Sequelize } = require('sequelize')
const express = require('express')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)
const Blog = require('./models/Blog')
Blog.initModel(sequelize)

app.get('/api/blogs', async (req, res) => {
	const blogs = await Blog.findAll()
	res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
	try {
		const blog = await Blog.create(req.body)
		res.status(201).json(blog)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

app.delete('/api/blogs/:id', async (req, res) => {
	const id = req.params.id
	const deleted = await Blog.destroy({ where: { id } })
	if (deleted) {
		res.status(204).end()
	} else {
		res.status(404).json({ error: 'Blog not found' })
	}
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})