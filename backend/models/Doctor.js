const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
