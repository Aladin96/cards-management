const mongoose = require("mongoose");


const uniteSchema = new mongoose.Schema(
  {
    name_unite: { type: String, required: true },
    adress: {type: String, required: false},
    phone: {type: String, required: false },
    obs: {type: String, required: false},
    cards: [{type: mongoose.Schema.Types.ObjectId, ref: "Card"}]
  },
  { timestamps: true }
);

uniteSchema.methods.restoreCards = async function (id) {
  return await this.cards.pull({_id: id});
}

const Unite = mongoose.model("Unite", uniteSchema);



exports.Unite = Unite;
