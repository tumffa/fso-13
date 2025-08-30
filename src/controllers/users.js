const router = require('express').Router()

const { Blog, User } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
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