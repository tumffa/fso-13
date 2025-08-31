const router = require('express').Router()
const { Session } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')

// DELETE /api/logout - remove all sessions for the logged-in user
router.delete('/', tokenExtractor, async (req, res, next) => {
  try {
    await Session.destroy({ where: { user_id: req.user.id } })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
