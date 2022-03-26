const mongoose = require("mongoose");

const Card = mongoose.model(
  "Card",
  new mongoose.Schema(
    {
      num_card: { type: Number, required: true },
      color: { type: String, required: true },
      price: { type: Number, reuired: true },
      discipline: { type: String, required: true },
      start_date: { type: String, required: true },
      end_date: { type: String, required: true },
      status: { type: Boolean, default: false },
      season: {type: String},
      owner: {type: String, required: true},
      delivredBy: {type: String, default: ""},
      restoredBy: {type: String, default: ""},
      unit: {type: mongoose.Schema.Types.ObjectId, ref: "Unite" },
      client: {type: mongoose.Schema.Types.ObjectId, ref: "Client" }
    },
    { timestamps: true }
  )
);

exports.Card = Card;
