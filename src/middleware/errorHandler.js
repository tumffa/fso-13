const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.message === 'Invalid JSON') {
  return response.status(400).json({ error: 'Invalid JSON' })
  }

  if (error.name === 'LikesValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({ error: error.errors?.[0]?.message || error.message })
  }

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: 'Invalid data for blog update' })
  }
  
  response.status(500).json({ error: 'Internal server error' })
}

module.exports = errorHandler
