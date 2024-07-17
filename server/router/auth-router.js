 /*const express=require("express");
 const router=express.Router();
const authcontrollers=require("../controllers/auth-controller.js").default

 router.route("/").get(authcontrollers.home);

router.route("/register").get(authcontrollers.register);

 module.exports=router;*/
 // auth-router.js

const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller.js");
const validate=require("../middlewares/validate-middleware.js");
const {signupSchema,loginSchema}=require("../validators/auth-validatore.js");
const authMiddleware = require("../middlewares/auth-middleware");
router.route("/").get(authControllers.home);

router.route("/register").post(validate(signupSchema),authControllers.register);
router.route("/login").post(validate(loginSchema),authControllers.login);
router.route("/user").get(authMiddleware,authControllers.user);
module.exports = router;
