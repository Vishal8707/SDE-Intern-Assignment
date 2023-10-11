import express from "express";
import {userSignUp} from '../Controller/userController.js'
// import {createProduct, productList,getproductById} from '../controllers/productController.js'
// import {createCategory, getCategoryList} from "../controllers/categoryController.js"
// import {createCart, getCart,updateCart,deleteCart} from '../controllers/cartController.js'
// import {isAuthenticated, authorization} from '../middleware/auth.js'
// import {createOrder,orderHistory,ordersbyId} from '../controllers/orderController.js'
const router = express.Router()

// ============================================== USER ROUTES ==================================================

router.post("/v1/auth/signup" , userSignUp)
// router.post("/Login" , userLogin)


// ============================================= CATEGORY ROUTES ===============================================

// router.post("/createCategory" , createCategory)
// router.get("/getlistBycategoryId" , getCategoryList)

// ============================================== PRODUCT ROUTES ==============================================

// router.post("/product" , createProduct)
// router.get("/getproductsList/categoryId/:categoryId" , productList)
// router.get("/getproduct/productId/:productId" , getproductById)


// ========================================== CART ROUTES ======================================================

// router.post("/api/cart/add/:userId",isAuthenticated,authorization,createCart)
// router.get("/api/cart/:userId",isAuthenticated,authorization,getCart)
// router.put("/api/cart/update/:userId",isAuthenticated,authorization,updateCart)
// router.delete("/api/cart/deleteCart/:userId",isAuthenticated,authorization,deleteCart)


// ============================================== ORDER ROUTES =================================================

// router.post("/api/orders/place/:userId",isAuthenticated,authorization,createOrder)
// router.get("/api/orders/history/:userId",isAuthenticated,authorization,orderHistory)
// router.get("/api/orders/:userId",isAuthenticated,authorization,ordersbyId)


router.get("/test-me", function (req, res) {
    res.send({ test: "Test-API" });
  });

export default router