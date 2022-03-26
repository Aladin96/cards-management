const mongoose = require("mongoose");

const Discipline = mongoose.model(
  "Discipline",
  new mongoose.Schema(
    {
      discipline: { type: String, required: true },
    },
    { timestamps: true }
  )
);

exports.Discipline = Discipline;
