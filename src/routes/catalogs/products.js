const { Router } = require('express')

const { products } = require('../../usesCases')

const { auth, access } = require('../../middlewares')

const upload = require('../../lib/uploadImg')

const ROUTER = Router()

const singleUpload = upload.single('image')

ROUTER.post('/:idProduct/upload', (req, res) => {
  const { idProduct } = req.params

  singleUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        data: {
          message: err.message
        }
      })
    }
    try {
      const product = await products.addImage(idProduct, { image: req.file.location })
      return res.json({
        success: true,
        data: {
          product: product
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
})

ROUTER.post('/', auth, access('administrator', 'seller'), async (req, res) => {
  try {
    const { body } = req
    const { store } = req.user
    const product = await products.create(body, store)
    res.json({
      success: true,
      data: {
        product
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
    const productsByStore = await products.getByStore(store)
    res.json({
      success: true,
      data: {
        productsByStore: productsByStore
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
    const allProducts = await products.getAll()
    res.json({
      success: true,
      data: {
        products: allProducts
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

ROUTER.get('/:barcode/barcode', auth, access('administrator', 'seller'), async (req, res) => {
  try {
    const { barcode } = req.params
    const { store } = req.user
    const product = await products.getByBarcode(barcode, store)
    res.json({
      success: true,
      data: {
        product
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

ROUTER.get('/:id', auth, access('administrator', 'seller'), async (req, res) => {
  try {
    const { id } = req.params
    const product = await products.getById(id)
    res.json({
      success: true,
      data: {
        product
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

ROUTER.patch('/:id', auth, access('administrator', 'seller'), async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const product = await products.updateById(id, body)
    res.json({
      success: true,
      data: {
        product
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
    await products.deleteById(id)
    res.json({
      success: true,
      data: {
        message: 'Product deleted successfully'
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
