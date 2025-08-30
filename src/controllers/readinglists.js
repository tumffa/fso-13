
const router = require('express').Router()
const { ReadingList } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')


router.post('/', async (req, res, next) => {
  try {
    const { blog_id, user_id } = req.body
    if (!blog_id || !user_id) {
      return res.status(400).json({ error: 'blog_id and user_id are required' })
    }
    const entry = await ReadingList.create({ blog_id, user_id })
    res.status(201).json(entry)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const readingListEntry = await ReadingList.findByPk(req.params.id)
    if (!readingListEntry) {
      return res.status(404).json({ error: 'Reading list entry not found' })
    }
    if (readingListEntry.user_id !== req.user.id) {
      return res.status(403).json({ error: 'You can only update your own reading list entries' })
    }
    if (typeof req.body.read !== 'boolean') {
      return res.status(400).json({ error: 'read must be boolean' })
    }
    readingListEntry.read = req.body.read
    await readingListEntry.save()
    res.json({ id: readingListEntry.id, read: readingListEntry.read })
  } catch (error) {
    next(error)
  }
})

module.exports = router
