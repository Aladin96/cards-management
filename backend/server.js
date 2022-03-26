require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db")
const {requireAuth} = require("./middleware/auth");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Connect to DATABASE 
connectDB();

// Routes

app.use("/card", requireAuth, require("./routes/card"));
app.use("/deliver_cards", requireAuth, require("./routes/deliver_cards"));
app.use("/restore_cards", requireAuth, require("./routes/restore_cards"));
app.use("/movement_entry", requireAuth, require("./routes/movementEntry"));
app.use("/movement_out", requireAuth, require("./routes/movementOut"));
app.use("/units", requireAuth, require("./routes/units"));
app.use("/client", requireAuth, require("./routes/client"));
app.use("/disciplines", requireAuth, require("./routes/disciplines"));
app.use("/colors", requireAuth, require("./routes/colors"));
app.use("/season", requireAuth, require("./routes/season"));
app.use("/statistics", require("./routes/statistics"));
app.use("/auth", require("./routes/auth"));

app.use("/test", require("./routes/test"))

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`Listning at port: ${port}`));


process.on("unhandledRejection", (err, promise)=>{
  console.log(`logged Error: ${err}`);
  server.close(() => process.exit(1));
})
