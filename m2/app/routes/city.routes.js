const express = require("express");
const router = express.Router();

const controller= require("../controllers/city.conteroller")

//city
router.get("/city", controller.getCity);

router.post("/city", controller.postCity);

router.get("/city/:id", controller.getByIdCity);

router.put("/city/:id", controller.putCity );

router.delete("/city/:id", controller.deleteCity );

module.exports = router
