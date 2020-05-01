const router = require('express').Router()

const {User} = require('../db/models')

// GET /api/users/
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though users' passwords are encrypted, it won't help if we send everything to anyone who asks
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// POST /api/users/
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// PUT /api/users/:userId
router.put('/:userId', async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.userId,
      },
    })
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/users/:userId
router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId,
      },
    })
    res.sendStatus(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
