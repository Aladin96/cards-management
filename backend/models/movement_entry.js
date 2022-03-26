const mongoose = require("mongoose");

const MovementEntry = mongoose.model(
  "MovementEntry",
  new mongoose.Schema(
    {
      from: { type: Number, required: true },
      to: { type: Number, required: true },
      color: { type: String, required: true },
      price: { type: Number, reuired: true },
      discipline: { type: String, required: true },
      unit: {type: String, required: true},
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true },
      season: {type: String},
      count: {type: Number, required: true},
      restoredBy: {type: String, default: "-"}
    },
    { timestamps: true }
  )
);

exports.MovementEntry = MovementEntry;