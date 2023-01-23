const express = require('express');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require("@adminjs/mongoose");
const adminConfig = require("./app/config/admin");

const Role = require("./app/models/role.model");
const User = require("./app/models/user.model");
const {Building} = require("./app/models/building.model");
const {BuildingImage} = require("./app/models/building.image.model");
const {Apartment} = require("./app/models/apartment.model");
const {ApartmentImage} = require("./app/models/apartment.image.model");
const {City} = require("./app/models/city.model");
const {RefreshToken} = require("./app/models/refreshToken.model")

const cityRoutes = require('./app/routes/city.routes');
const buildingRoutes = require('./app/routes/building.routes');
const buildingImageRoutes = require('./app/routes/building.image.routes');
const apartmentRoutes = require('./app/routes/apartment.routes');
const apartmentImageRoutes = require('./app/routes/apartment.image.routes');

AdminJS.registerAdapter(AdminJSMongoose);

app.use(express.json())

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api', cityRoutes );
app.use('/api', buildingRoutes );
app.use('/api', buildingImageRoutes );
app.use('/api', apartmentRoutes );
app.use('/api', apartmentImageRoutes );

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = 5000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to m2 application." });
});

const authenticate = async (email, password) => {
  if (email === adminConfig.DEFAULT_ADMIN.email && password === adminConfig.DEFAULT_ADMIN.password) {
    return Promise.resolve(adminConfig.DEFAULT_ADMIN);
  };
  return null;
}

async function start() {
  const adminJs = new AdminJS({
    resources:[
      {resource: Building},
      {resource: Apartment},
      {resource: City},
      {resource: BuildingImage},
      {resource: ApartmentImage},
      {resource: Role},
      {resource: User},
      {resource: RefreshToken},
    ],
    rootPath: "/admin",
    });
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  );
// Build and use a router to handle AdminJS routes.
  const router = AdminJSExpress.buildRouter(adminJs, adminRouter);
  app.use(adminJs.options.rootPath, router);
  try {
    await mongoose.connect("mongodb+srv://Daulet:qazaqway@cluster0.rhykf.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
          console.log("Successfully connect to MongoDB.");
          initial();
        })
      .catch(err => {
          console.error("Connection error", err);
          process.exit();
        });
    app.listen(PORT, () => console.log(`AdminJS started on http://localhost:${PORT}${adminJs.options.rootPath}`))
  } catch (e) {
    console.log(`server error ${e.message}`)
    process.exit(1)
  };
};

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};

start()

module.exports = app;

