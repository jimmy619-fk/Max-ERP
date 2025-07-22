const { employees, shifts } = require("../models/mockData");

exports.getAllShifts = (req, res) => {
  res.json(shifts);
};

exports.createShift = (req, res) => {
  const { employeeId, startTime, endTime, shiftType, date } = req.body;

  if (!employeeId || !startTime || !endTime || !shiftType || !date) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  if (new Date(startTime) >= new Date(endTime)) {
    return res
      .status(400)
      .json({ error: "End time must be after start time!" });
  }

  const employee = employees.find((e) => e.id === employeeId);
  if (!employee) {
    return res.status(400).json({ error: "Employee not found!" });
  }

  const newShift = {
    id: shifts.length + 1,
    employeeId,
    employeeName: employee.name,
    startTime,
    endTime,
    shiftType,
    date,
  };

  shifts.push(newShift);
  res.status(201).json(newShift);
};
