const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("ICAF Backend Api Running"));

//Define Routes

//-------------------Admin---------------------
app.use("/api/authadmin", require("./routes/authadmin.route"));

//-------------------Attendee---------------------
app.use("/api/authattendee", require("./routes/authAttendee.route"));

//-------------------Editor---------------------
app.use("/api/autheditor", require("./routes/authEditor.route"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
