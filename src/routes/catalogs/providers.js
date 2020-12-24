const { Router } = require('express')

const { providers } = require('../../usesCases')

const { auth, access } = require('../../middlewares')

const ROUTER = Router()

ROUTER.post('/', auth, access('administrator'), async (req, res) => {
  try {
    const { body } = req
    const { store } = req.user
    const provider = await providers.create(body, store)
    res.json({
      success: true,
      data: {
        provider
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
    const providersByStore = await providers.getByStore(store)
    res.json({
      success: true,
      data: {
        providers: providersByStore
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

ROUTER.get('/', auth, access('administrator'), async (req, res) => {
  try {
    const allProviders = await providers.getAll()
    res.json({
      success: true,
      data: {
        providers: allProviders
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

ROUTER.get('/:id', auth, access('administrator'), async (req, res) => {
  try {
    const { id } = req.params
    const provider = await providers.getById(id)
    res.json({
      success: true,
      data: {
        provider
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

ROUTER.patch('/:id', auth, access('administrator'), async (req, res) => {
  try {
    const { id } = req.params
    const provider = await providers.updateById(id)
    res.json({
      success: true,
      data: {
        provider
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
    await providers.deleteById(id)
    res.json({
      success: true,
      data: {
        message: 'Provider deleted successfully'
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
