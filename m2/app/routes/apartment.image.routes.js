const express = require("express");
const router = express.Router();

const controller = require("../controllers/apartment.image.controller")

//apartment image
router.get("/apartmentImage", controller.getApartmentImage );

router.post("/apartmentImage", controller.postApartmentImage );

router.get("/apartmentImage/:id", controller.getByIdApartmentImage );

router.put("/apartmentImage/:id", controller.putApartmentImage );

router.delete("/apartmentImage/:id", controller.deleteApartmentImage );

module.exports = router;
