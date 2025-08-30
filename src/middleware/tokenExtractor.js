const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { User } = require('../models')

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
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = tokenExtractor
