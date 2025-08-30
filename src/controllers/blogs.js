const express = require('express')
const router = express.Router()
const { Blog, User } = require('../models')


router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

router.post('/', async (req, res, next) => {
  try {
    const authorization = req.get('authorization')
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const token = authorization.substring(7)
    let decodedToken
    try {
      decodedToken = jwt.verify(token, SECRET)
    } catch (err) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findByPk(decodedToken.id)
    if (!user) {
      return res.status(401).json({ error: 'user not found' })
    }
    const newBlog = await Blog.create({ ...req.body, userId: user.id })
    res.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const { likes } = req.body
  try {
    if (typeof likes !== 'number' || isNaN(likes)) {
      const err = new Error('Likes value is required and must be a number')
      err.name = 'LikesValidationError'
      throw err
    }
    const [updatedRows] = await Blog.update(
      { likes },
      { where: { id } }
    )
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    const updatedBlog = await Blog.findByPk(id)
    res.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const deleted = await Blog.destroy({ where: { id } })
  if (deleted) {
    res.status(204).end()
  } else {
    res.status(404).json({ error: 'Blog not found' })
  }
})

module.exports = router