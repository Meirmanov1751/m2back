const model = require("../models/building.model");

exports.getBuilding = async (req, res) => {
  if(req.query["name"]){
    const building = await model.Building.find({"name": new RegExp(req.query["name"], "i")}).sort({"name": 1});
    res.send(building);
  } else {
    const building = await model.Building.find();
    res.send(building);
  };
};

exports.postBuilding = async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const name = req.body.name;
  const address = req.body.address;
  const passDate = req.body.passDate;
  const incomePercentage = req.body.incomePercentage;
  const cityId = req.body.cityId;
  const totalArea = req.body.totalArea;
  const decription = req.body.decription;

  res.send(req.body.name);

  const post = new model.Building({
    name: name,
    address: address,
    passDate: passDate,
    incomePercentage: incomePercentage,
    cityId: cityId,
    totalArea: totalArea,
    decription: decription,
  });
  post.save(function (err) {
    if (err) return console.log(err);
    console.log(req.body)
    res.send(JSON.parse(req.body));
  });
};

exports.getByIdBuilding = async (req, res) => {
  try {
    const building = await model.Building.findOne({_id: req.params.id});
    res.send(building);
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.putBuilding = async (req, res) => {
  try {
    const name = req.body.name;
    const address = req.body.address;
    const passDate = req.body.passDate;
    const incomePercentage = req.body.incomePercentage;
    const cityId = req.body.cityId;
    const totalArea = req.body.totalArea;
    const decription = req.body.decription;

    const building = await model.Building.findOneAndUpdate({_id: req.params.id}, {
      name: name,
      address: address,
      passDate: passDate,
      incomePercentage: incomePercentage,
      cityId: cityId,
      totalArea: totalArea,
      decription: decription,
    });

    await building.save();
    res.send(building);
  } catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.deleteBuilding = async (req, res) => {
  try {
    await model.Building.deleteOne({_id: req.params.id});
    res.status(204).send();
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};
