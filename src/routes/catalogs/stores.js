const { Router } = require('express')

const { stores } = require('../../usesCases')

// const { auth, access } = require('../../middlewares')

const errHandler = require('../../lib/errorHandling')

const ROUTER = Router()

ROUTER.post('/', async (req, res) => {
  try {
    const { body } = req
    const storeCreated = await stores.create(body)
    res.json({
      success: true,
      data: {
        store: storeCreated
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {
        message: errHandler.errorsHandling(error)
      }
    })
  }
})

ROUTER.get('/', async (req, res) => {
  try {
    const { page, perPage } = req.query
    const allStores = await stores.getAll(page, perPage)
    res.json({
      success: true,
      data: {
        stores: allStores
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

ROUTER.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const store = await stores.getById(id)
    res.json({
      success: true,
      data: {
        store
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

ROUTER.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const storeUpdated = await stores.updateById(id)
    res.json({
      success: true,
      data: {
        store: storeUpdated
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

ROUTER.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await stores.deleteById(id)
    res.json({
      success: true,
      data: {
        message: 'Store deleted successfully'
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
