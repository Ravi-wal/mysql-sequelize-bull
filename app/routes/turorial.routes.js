module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller");
  var router = require("express").Router(); 
 
  router.post("/", tutorials.create);


  router.get("/", tutorials.findAll);
  router.get("/:id", tutorials.findOne);
  router.put("/:id", tutorials.update);
  app.use('/api/tutorials', router);
};
