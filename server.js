const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Arena = require('bull-arena');
const Bull = require('bull');

const app = express();
const arenaConfig = Arena({
  Bull,
  queues: [
    {
      name: "waltutorialsMail",
      hostId: "bull",
      redis: {
        port: "19658",
        host: "redis-19658.c82.us-east-1-2.ec2.cloud.redislabs.com",
        password: '1gyFqYQVBSgTvPZiArXNj9YRFAx2ckr4'
      },
    }
  ],
},
{
  basePath: '/arena',
  disableListen: true
});


app.use(cors());


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


app.get("/", (req, res) => {
  res.json({ message: "Welcome to WAL Tutorials." });
});

app.use('/', arenaConfig);
require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
