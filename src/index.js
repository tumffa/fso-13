const express = require('express')
const config = require('./util/config')
const app = express()

app.use(express.json())

try {
  const blogsRouter = require('./controllers/blogs')
  app.use('/api/blogs', blogsRouter)
} catch (error) {
  console.error('Error loading blogs router:', error)
  process.exit(1)
}

const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})