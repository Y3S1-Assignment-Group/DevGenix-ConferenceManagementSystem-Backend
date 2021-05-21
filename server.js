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

//-------------------Presenter---------------------
app.use("/api/authPresenter", require("./routes/authPresenter.route"));

//-------------------Editor---------------------
app.use("/api/autheditor", require("./routes/authEditor.route"));

//-------------------Conference---------------------
app.use("/api/conference", require("./routes/conference.route"));

//-------------------Reviewer---------------------
app.use("/api/authReviewer", require("./routes/authReviewer.route"));

//-------------------Researcher ---------------------
app.use("/api/authResearcher", require("./routes/authResearcher.route"));

//-------------------Research Papers---------------------
app.use("/api/ResearchPapers", require("./routes/researchpapers.route"));

//-------------------workshops---------------------
app.use("/api/Workshops", require("./routes/workshops.route"));

//-------------------Latest news---------------------
app.use("/api/LatestNews", require("./routes/latestNews.route"));

//-------------------Templates---------------------
app.use("/api/Templates", require("./routes/templates.route"));

//-------------------Payment---------------------
app.use("/api/Payment", require("./routes/payment.route"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
