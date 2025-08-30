const { sequelize } = require('../util/db')
const { fn, col } = require('sequelize')
const express = require('express')
const router = express.Router()
const { Blog, User } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')

const { Op } = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const search = req.query.search
    const where = search
      ? {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { author: { [Op.iLike]: `%${search}%` } }
          ]
        }
      : undefined
    const blogs = await Blog.findAll({
      where,
      include: {
        model: User,
        attributes: ['id', 'username', 'name', 'createdAt', 'updatedAt']
      },
      order: [['likes', 'DESC']]
    })
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const newBlog = await Blog.create({ ...req.body, userId: req.user.id })
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

router.delete('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    if (blog.userId !== req.user.id) {
      return res.status(403).json({ error: 'Only the creator can delete this blog' })
    }
    await blog.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router