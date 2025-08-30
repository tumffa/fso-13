const router = require('express').Router()
const { Blog } = require('../models')
const { fn, col } = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        'author',
        [fn('COUNT', col('id')), 'blogs'],
        [fn('SUM', col('likes')), 'likes']
      ],
      group: ['author'],
      order: [[fn('COUNT', col('id')), 'DESC']]
    })
    const result = authors.map(a => ({
      author: a.author,
      blogs: a.get('blogs').toString(),
      likes: a.get('likes') ? a.get('likes').toString() : '0'
    }))
    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
