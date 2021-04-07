const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
const bullQueue = require("./bull.jobs");

exports.create = async (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  try{
      let data = await Tutorial.create(tutorial);
      await bullQueue.createQueue();
      res.send(data);
  } catch(err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
  }
};


exports.findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  try{
    var data = await Tutorial.findAll({ where: condition });
    res.send(data);
  }catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  }
};


exports.findOne = async (req, res) => {
  console.log('finding one');
  const id = req.params.id;
  try{
    var data = await Tutorial.findByPk(id);
    res.send(data);
  }catch(err) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id
    });
  }
};


exports.update = async (req, res) => {
  const id = req.params.id;
  try{
    var data = Tutorial.update(req.body, {
                                            where: { id: id }
                                          });

    if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
  }catch(err) {
    res.status(500).send({
      message: "Error updating Tutorial with id=" + id
    });
  }
  
};

