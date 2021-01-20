const homeController = require("../controllers/home");
const validator = require("../controllers/validator");
const authVrfy = require("../middleware/autMiddleware");
const Helpers = require("../util/Helpers");

const express = require("express");
const route = express.Router();

// Get home [page]

route.get("/base", authVrfy.requireAuth, homeController.index);

//continue with this part

route.post(
  "/base/edit/:id",
  authVrfy.requireAuth,
  validator.validationInput,
  homeController.edit
);

//  edit password logged POST

route.post(
  "/base/editpassword/",
  authVrfy.requireAuth,
  validator.validationInput,
  homeController.editPassword
);

//  edit profil logged POST

route.post(
  "/base/editprofil",
  authVrfy.requireAuth,
  validator.validationInput,
  homeController.editProfil
);

// post fill profil
// for uploading multiple images
// multiple images upload.array('images', 100)
// single images
// upload.single("myImage")

route.post(
  "/base/profil/:id",
  [Helpers.upload.array("myImage", 5)],
  // authVrfy.requireAuth,
  // validator.validationInput,
  homeController.fillProfil
);

// get all tags [POST]

route.post("/base/tag/:id", homeController.tags);

// get all images

route.get("/upload/:filename", homeController.getImges)
module.exports = route;
