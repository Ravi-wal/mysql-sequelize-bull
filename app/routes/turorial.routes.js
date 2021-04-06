module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller");
  const queue = require("../controllers/bull.queue");

  var router = require("express").Router();

 
  router.post("/", tutorials.create);


  router.get("/", tutorials.findAll);
  router.get("/queues", queue.execQueue);
  router.get("/:id", tutorials.findOne);
  router.put("/:id", tutorials.update);
  app.use('/api/tutorials', router);
};
