import express from "express";
import {userSignUp,userSignIn} from '../Controller/userController.js'
import {createCommunity,getAll} from '../Controller/communityController.js'
import {createRole} from '../Controller/roleController.js'
import {createMembers} from '../Controller/memberController.js'

const router = express.Router()

// ============================================== USER ROUTES ==================================================

router.post("/v1/auth/signup" , userSignUp)
router.post("/v1/auth/signin" , userSignIn)


// ============================================= COMUUNITY ROUTES ===============================================

router.post("/v1/community" , createCommunity)
router.get("/v1/community" , getAll)
router.get("/v1/community/:id/members" , getAll)


// ============================================== ROLE ROUTES ==============================================

router.post("/v1/role" , createRole)


// ========================================== CART ROUTES ======================================================

router.post("/v1/member" , createMembers)



// ============================================== ORDER ROUTES =================================================

// router.post("/api/orders/place/:userId",isAuthenticated,authorization,createOrder)
// router.get("/api/orders/history/:userId",isAuthenticated,authorization,orderHistory)
// router.get("/api/orders/:userId",isAuthenticated,authorization,ordersbyId)


router.get("/test-me", function (req, res) {
    res.send({ test: "Test-API" });
  });

export default router