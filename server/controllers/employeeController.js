const { employees } = require("../models/mockData");

exports.getAllEmployees = (req, res) => {
  res.json(employees);
};
