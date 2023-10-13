import express from "express";
import {
  userSignUp,
  userSignIn,
  getUsers
} from '../Controller/userController.js';
import {
  createCommunity,
  getAll,
  getMemberByid,
  getMyOwnCommunity ,
  getMyJoinedCommunity
} from '../Controller/communityController.js';
import {
  createRole,
  getallRole
} from '../Controller/roleController.js';
import {
  createMembers,
  deleteMember
} from '../Controller/memberController.js';
import {
  isAuthenticated
} from '../middleware/auth.js';

const router = express.Router();

// ============================================== USER ROUTES ==================================================

// Route for user signup
router.post("/v1/auth/signup", userSignUp);

// Route for user signin
router.post("/v1/auth/signin", userSignIn);

// Route to get user details (requires authentication)
router.get("/v1/auth/me/", isAuthenticated, getUsers);

// ============================================= COMMUNITY ROUTES ===============================================

// Route to create a new community (requires authentication)
router.post("/v1/community", isAuthenticated, createCommunity);

// Route to get all communities
router.get("/v1/community", getAll);

// Route to get members of a community by ID
router.get("/v1/community/:id/members", getMemberByid);

// Route to get communities associated with the logged-in user
router.get("/v1/community/me/:userId", isAuthenticated, getMyOwnCommunity);

// Route to get communities associated with the joined user
router.get("/v1/community/me/:userId", isAuthenticated, getMyJoinedCommunity);

// ============================================== ROLE ROUTES ==============================================

// Route to create a new role
router.post("/v1/role", createRole);

// Route to get all roles
router.get("/v1/role", getallRole);

// ========================================== MEMBERS ROUTES ======================================================

// Route to create a new member (requires authentication)
router.post("/v1/member", isAuthenticated, createMembers);

// Route to delete a member by ID (requires authentication)
router.post("/v1/member/:id", isAuthenticated, deleteMember);

// Test route
router.get("/test-me", function (req, res) {
  res.send({
    test: "Test-API"
  });
});

export default router;