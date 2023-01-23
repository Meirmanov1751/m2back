const express = require("express");
const router = express.Router();

const controller = require("../controllers/building.controller")

//building
router.get("/building", controller.getBuilding);

router.post("/building", controller.postBuilding);

router.get("/building/:id", controller.getByIdBuilding);

router.put("/building/:id", controller.putBuilding );

router.delete("/building/:id", controller.deleteBuilding );

module.exports = router;
