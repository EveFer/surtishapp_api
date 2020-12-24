const { Router } = require('express')

const { users } = require('../../usesCases')

const { auth, access } = require('../../middlewares')

const ROUTER = Router()

ROUTER.post('/signup', async (req, res) => {
  try {
    const { body } = req
    const userCreated = await users.signUp(body)
    res.json({
      success: true,
      data: {
        user: userCreated
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

ROUTER.post('/worker', auth, access('administrator'), async (req, res) => {
  try {
    const { store } = req.user
    const { body } = req
    const worker = await users.createWorker(body, store, 'seller')
    res.json({
      success: true,
      data: {
        user: worker
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

ROUTER.get('/', auth, access('administrator'), async (req, res) => {
  try {
    const allUsers = await users.getAll()
    res.json({
      success: true,
      data: {
        users: allUsers
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {
        message: error.message
      }
    })
  }
})

ROUTER.get('/store', auth, access('administrator'), async (req, res) => {
  try {
    const { store } = req.user
    console.log('stoe:', store)
    const { id: userCurrent } = req.user
    console.log(userCurrent)
    const allUsersByStore = await users.getAllByStore(store, userCurrent)
    res.json({
      success: true,
      data: {
        users: allUsersByStore
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {
        message: error.message
      }
    })
  }
})

// ROUTER.get('/:id', auth, access('administrator'), async (req, res) => {
//   try {
//     const { id } = req.params
//     const user = await users.getById(id)
//     res.json({
//       success: true,
//       data: {
//         user
//       }
//     })
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       data: {
//         message: error.message
//       }
//     })
//   }
// })

ROUTER.patch('/:id', auth, access('administrator'), async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const userUpdated = await users.updateById(id, body)
    res.json({
      success: true,
      data: {
        user: userUpdated
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {
        message: error.message
      }
    })
  }
})
ROUTER.delete('/:id', auth, access('administrator'), async (req, res) => {
  try {
    const { id } = req.params
    await users.deleteById(id)
    res.json({
      success: true,
      data: {
        message: 'User deleted successfully'
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {
        message: error.message
      }
    })
  }
})

module.exports = ROUTER
