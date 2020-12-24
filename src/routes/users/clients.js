const { Router } = require('express')

const { clients } = require('../../usesCases')

const { auth, access } = require('../../middlewares')

const errHandler = require('../../lib/errorHandling')

const ROUTER = Router()

ROUTER.post('/', auth, access('administrator'), async (req, res) => {
  try {
    const { store } = req.user
    const { body } = req
    const client = await clients.create(body, store)
    res.json({
      success: true,
      data: {
        client
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      data: {
        message: errHandler.errorsHandling(error)
      }
    })
  }
})

ROUTER.get('/store', auth, async (req, res) => {
  try {
    const { store } = req.user
    const allClients = await clients.getAllByStore(store)
    res.json({
      success: true,
      data: {
        clients: allClients
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
    const { store, id: userCurrent } = req.user
    const clientsByStore = await clients.getAllByStore(store, userCurrent)
    res.json({
      success: true,
      data: {
        clients: clientsByStore
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

// ROUTER.get('/:id', auth, access('administrator'), async (req, res) => {
//   try {
//     const { id } = req.params
//     const client = await clients.getById(id)
//     res.json({
//       success: true,
//       data: {
//         client
//       }
//     })
//   } catch (error) {
//     res.status(400)
//     res.json({
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
    const client = await clients.updateById(id)
    res.json({
      success: true,
      data: {
        client
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

ROUTER.delete('/:id', auth, access('administrator'), async (req, res) => {
  try {
    const { id } = req.params
    await clients.deleteById(id)
    res.json({
      success: true,
      data: {
        message: 'Client deleted successfully'
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
