const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
const jsonParser = express.json();

const controllerBuilding = require("../controllers/building.controller")
const controllerBuildingImage = require("../controllers/building.image.controller")
const controllerApartment = require("../controllers/apartment.controller")
const controllerApartmentImage  = require("../controllers/apartment.image.controller")
const controllerCity = require("../controllers/city.conteroller")

//city
router.get("/city", controllerCity.getCity);

router.post("/city", jsonParser, controllerCity.postCity);

router.get("/city/:id", controllerCity.getByIdCity);

router.put("/city/:id", jsonParser, controllerCity.putCity );

router.delete("/city/:id", controllerCity.deleteCity );

//apartment
router.get("/apartment", controllerApartment.getApartment);

router.post("/apartment", jsonParser, controllerApartment.postApartment);

router.get("/apartment/:id", controllerApartment.getByIdApartment);

router.put("/apartment/:id", jsonParser, controllerApartment.putApartment );

router.delete("/apartment/:id", controllerApartment.deleteApartment );

//apartment image
router.get("/apartmentImage", controllerApartmentImage.getApartmentImage );

router.post("/apartmentImage", jsonParser, controllerApartmentImage.postApartmentImage );

router.get("/apartmentImage/:id", controllerApartmentImage.getByIdApartmentImage );

router.put("/apartmentImage/:id", jsonParser, controllerApartmentImage.putApartmentImage );

router.delete("/apartmentImage/:id", controllerApartmentImage.deleteApartmentImage );

//building
router.get("/building", controllerBuilding.getBuilding);

router.post("/building", jsonParser, controllerBuilding.postBuilding);

router.get("/building/:id", controllerBuilding.getByIdBuilding);

router.put("/building/:id", jsonParser, controllerBuilding.putBuilding );

router.delete("/building/:id", controllerBuilding.deleteBuilding );

//building image
router.get("/buildingImage", controllerBuildingImage.getBuildingImage);

router.post("/buildingImage", jsonParser, controllerBuildingImage.postBuildingImage);

router.get("/buildingImage/:id", controllerBuildingImage.getByIdBuildingImage);

router.put("/buildingImage/:id", jsonParser, controllerBuildingImage.putBuildingImage );

router.delete("/buildingImage/:id", controllerBuildingImage.deleteBuildingImage );

//test post
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.post("/posts", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const imageName = req.body.imageName;
  const title = req.body.title;
  const constent = req.body.content;

  const post = new Post({imagename: imageName, title: title, content: constent});
  post.save(function (err) {
    if (err) return console.log(err);
    res.send(req.body);
  });
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({_id: req.params.id});
    res.send(post);
  } catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  }
});

router.put("/posts/:id", jsonParser, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate({_id: req.params.id},
      {
        title: req.body.title,
        content: req.body.content
      });

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    await Post.deleteOne({_id: req.params.id});
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  }
});

module.exports = router;
