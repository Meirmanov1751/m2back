const model = require("../models/apartment.image.model");

exports.getApartmentImage = async (req, res) => {
  const building = await model.ApartmentImage.find();
  res.send(building);
};

exports.postApartmentImage = async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const image = req.body.image
  const apartmentId = req.body.apartmentId

  res.send(req.body.name);

  const post = new model.ApartmentImage({
      image : image,
      buildingId : apartmentId
  });
  post.save(function (err) {
    if (err) return console.log(err);
    console.log(req.body)
    res.send(JSON.parse(req.body));
  });
};

exports.getByIdApartmentImage = async (req, res) => {
  try {
    const building = await model.ApartmentImage.findOne({_id: req.params.id});
    res.send(building);
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.putApartmentImage = async (req, res) => {
  try {
    const image = req.body.image
    const apartmentId = req.body.apartmentId

    const building = await model.ApartmentImage.findOneAndUpdate({_id: req.params.id}, {
      image : image,
      apartmentId : apartmentId
    });

    await building.save();
    res.send(building);
  } catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.deleteApartmentImage = async (req, res) => {
  try {
    await model.ApartmentImage.deleteOne({_id: req.params.id});
    res.status(204).send();
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};
