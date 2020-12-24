const { Router } = require('express')

const { categories } = require('../../usesCases')

const { auth, access } = require('../../middlewares')

const ROUTER = Router()

ROUTER.post('/', auth, access('administrator'), async (req, res) => {
  try {
    const { body } = req
    const { store } = req.user
    const category = await categories.create(body, store)
    res.json({
      success: true,
      data: {
        category
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
    const categoriesByStore = await categories.getByStore(store)
    res.json({
      success: true,
      data: {
        providers: categoriesByStore
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
    const allCategories = await categories.getAll()
    res.json({
      success: true,
      data: {
        providers: allCategories
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
    const category = await categories.getById(id)
    res.json({
      success: true,
      data: {
        category
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
    const category = await categories.updateById(id)
    res.json({
      success: true,
      data: {
        category
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
    await categories.deleteById(id)
    res.json({
      success: true,
      data: {
        message: 'Category deleted successfully'
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
