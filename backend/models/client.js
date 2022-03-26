const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: {type: Date, required: true},
    gender: {type: String, required: true },
    cards: [{type: mongoose.Schema.Types.ObjectId, ref:"Card"}]

  },
  { timestamps: true }
)


clientSchema.methods.restoreCards = async function(id){
  return await this.cards.pull({_id: id});
}

const Client = mongoose.model("Client", clientSchema);

exports.Client = Client;
