const { Router } = require('express')

const { users } = require('../../usesCases')

const { auth } = require('../../middlewares')

const ROUTER = Router()

ROUTER.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const token = await users.login(email, password)
    res.json({
      success: true,
      data: {
        token
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      data: {
        message: error.message
      }
    })
  }
})

ROUTER.get('/me', auth, async (req, res) => {
  try {
    const { id } = req.user
    const user = await users.getByToken(id)
    res.json({
      success: true,
      data: {
        user
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      data: {
        message: error.message
      }
    })
  }
})

module.exports = ROUTER
