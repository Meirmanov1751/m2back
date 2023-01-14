const util = require("util");
const multer = require("multer");

const {GridFsStorage} = require("multer-gridfs-storage");
const bodyParser = require("body-parser");


var storage = new GridFsStorage({
  url: "mongodb+srv://Daulet:qazaqway@cluster0.rhykf.mongodb.net/?retryWrites=true&w=majority",
  options: {useNewUrlParser: true, useUnifiedTopology: true},
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `meirnamov-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      text: "wepfkwepofk",
      filename: `meirnamov-${file.originalname}`
    };
  }
});

var uploadFiles = multer({storage: storage}).array("file", 3);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
