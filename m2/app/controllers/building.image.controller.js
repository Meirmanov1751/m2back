const model = require("../models/building.image.model");

exports.getBuildingImage = async (req, res) => {
  const building = await model.BuildingImage.find();
  res.send(building);
};

exports.postBuildingImage = async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const image = req.body.image
  const buildingId = req.body.buildingId

  res.send(req.body.name);

  const post = new model.BuildingImage({
      image : image,
      buildingId : buildingId
  });
  post.save(function (err) {
    if (err) return console.log(err);
    console.log(req.body)
    res.send(JSON.parse(req.body));
  });
};

exports.getByIdBuildingImage = async (req, res) => {
  try {
    const building = await model.BuildingImage.findOne({_id: req.params.id});
    res.send(building);
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.putBuildingImage = async (req, res) => {
  try {
    const image = req.body.image
    const buildingId = req.body.buildingId

    const building = await model.BuildingImage.findOneAndUpdate({_id: req.params.id}, {
      image : image,
      buildingId : buildingId
    });

    await building.save();
    res.send(building);
  } catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.deleteBuildingImage = async (req, res) => {
  try {
    await model.BuildingImage.deleteOne({_id: req.params.id});
    res.status(204).send();
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};
