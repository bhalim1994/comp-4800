const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/users.route.js");
const surveyRoutes = require("./routes/surveys.route.js");
const questionRoutes = require("./routes/questions.route.js");
const choiceRoutes = require("./routes/choices.route.js");
const submissionRoutes = require("./routes/submissions.route.js");
const answerRoutes = require("./routes/answers.route.js");
const reportRoutes = require("./routes/reports.route.js");
const passwordResetRoutes = require("./routes/passwordResets.route.js");
const questionBranchRoutes = require("./routes/questionBranches.route.js");

const cors = require("cors");
const { sequelize } = require("./models");
const corsOptions = require("./config/corsOptions");
const app = express();

const PORT = process.env.PORT || 3001;
const path = require("path");
app.use(cors(corsOptions));

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "COMP 4800 Project API",
      servers: ["http://localhost:5000"],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const verifyAccessToken = require("./utils/jwtVerifier");

app.use(express.static("outputFiles"));
app.use("/api/*", express.json());
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/reports", verifyAccessToken, reportRoutes);
app.use("/api/passwordResets", passwordResetRoutes);
app.use("/api/questionBranches", questionBranchRoutes);
app.use("/api/users", verifyAccessToken, userRoutes);
app.use("/api/questions", verifyAccessToken, questionRoutes);
app.use("/api/choices", verifyAccessToken, choiceRoutes);
app.use("/api/answers", verifyAccessToken, answerRoutes);

// Routes that do not start with /api will be all be served the compiled React project
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, async () => {
  try {
    console.log(`Server up on port ${PORT}`);
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
});
