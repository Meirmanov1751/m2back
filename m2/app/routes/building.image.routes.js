const express = require("express");
const router = express.Router();

const controller = require("../controllers/building.image.controller")

//building image
router.get("/buildingImage", controller.getBuildingImage);

router.post("/buildingImage",  controller.postBuildingImage);

router.get("/buildingImage/:id", controller.getByIdBuildingImage);

router.put("/buildingImage/:id",  controller.putBuildingImage );

router.delete("/buildingImage/:id", controller.deleteBuildingImage );

module.exports = router;
