const express = require('express')
const router = express.Router()
const blog = require('../../models/blog')
const sequelize = require('../../util/db')
blog.initModel(sequelize)

router.get('/', async (req, res) => {
  const blogs = await blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await blog.create(req.body)
    res.status(201).json(blog)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const deleted = await blog.destroy({ where: { id } })
  if (deleted) {
    res.status(204).end()
  } else {
    res.status(404).json({ error: 'Blog not found' })
  }
})

module.exports = router