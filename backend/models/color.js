const mongoose = require("mongoose");

const Color = mongoose.model(
  "Color",
  new mongoose.Schema(
    {
      color: { type: String, required: true },

    },
    { timestamps: true }
  )
);

exports.Color = Color;
