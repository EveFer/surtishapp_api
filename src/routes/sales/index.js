const { Router } = require('express')
const { sales } = require('../../usesCases')
const { auth, access } = require('../../middlewares')

const ROUTER = Router()

ROUTER.post('/', auth, access('administrator', 'seller'), async (req, res) => {
  try {
    const { body } = req
    const { store, id: seller } = req.user
    const sale = await sales.create(body, store, seller)
    res.json({
      success: true,
      data: {
        sale
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
    const { store } = req.user
    const allSales = await sales.getByStore(store)
    res.json({
      success: true,
      data: {
        sales: allSales
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
