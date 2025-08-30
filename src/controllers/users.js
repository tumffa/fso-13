const router = require('express').Router()

const { Blog, User } = require('../models')


router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: ['id', 'title', 'author', 'url', 'likes']
      }
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const readParam = req.query.read
    let readFilter = undefined
    if (readParam === 'true') readFilter = true
    if (readParam === 'false') readFilter = false

    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'username'],
      include: {
        association: 'reading_blogs',
        attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
        through: {
          attributes: ['id', 'read'],
          where: readFilter !== undefined ? { read: readFilter } : undefined
        }
      }
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const { name, username, reading_blogs } = user.toJSON()
    const readings = reading_blogs.map(blog => {
      const { reading_list, ...blogFields } = blog
      return {
        ...blogFields,
        readinglists: reading_list ? [{ id: reading_list.id, read: reading_list.read }] : []
      }
    })
    res.json({ name, username, readings })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { username, name, passwordHash } = req.body
    const user = await User.create({ username, name, passwordHash })
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const { username } = req.params
    const { name } = req.body
    const [updatedRows] = await User.update(
      { name },
      { where: { username } }
    )
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    const updatedUser = await User.findOne({ where: { username } })
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router