const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config.json");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/routers");

mongoose
  .connect(config.connectionString)
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log(console.log("mongoDB is not connected")));

app.use(
  cors({ origin: "http://localhost:5173", credentials: true })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = 8000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
