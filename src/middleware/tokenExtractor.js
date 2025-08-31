
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { User, Session } = require('../models')


const tokenExtractor = async (req, res, next) => {
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

    const session = await Session.findOne({ where: { token } })
    if (!session) {
      return res.status(401).json({ error: 'session expired or invalid' })
    }

    if (user.disabled) {
      await Session.destroy({ where: { user_id: user.id } })
      return res.status(403).json({ error: 'user account disabled' })
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = tokenExtractor
