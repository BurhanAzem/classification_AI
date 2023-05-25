const fileURLToPath =  require("url")
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const path = require('path')
const multer = require('multer')
const mydb = require("./config/db");

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js'); // Update the path according to your Swagger configuration file


const employer_router = require("./routes/employer_router");

const jobApplication_router = require("./routes/jobApplication_router");

const jobPost_router = require("./routes/jobPost_router");

const jobSeeker_router = require("./routes/jobSeeker_router");

const requirement_router = require("./routes/requirement_router");

const searchHistory_router = require("./routes/searchHistory_router");
const github_repo = require("./routes/github_repo");


// app.use("/assets", express.static(path.join(__dirname, 'public/assets')))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets")
},
filename: (req, file, cb) => {
    cb(null, file.originalname)
    }
})

const upload = multer({ storage })



app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/public/assets', express.static('public/assets'));

// for json encoding :
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 

// handling routes :
// app.use('/upload', express.static('Upload'));

app.use('/api/job-applications', jobApplication_router)

app.use("/api/employers", employer_router);

// app.use('/api/job-applications', jobApplication_router);

app.use('/api/job-posts', jobPost_router);

app.use("/api/job-seekers", jobSeeker_router);

app.use('/api/requirements', requirement_router);

app.use('/api/saved-jobs', searchHistory_router);

app.use('/api/fetch-repo', github_repo);


app.use(async (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    if (error.code === "P2025") {
      statusCode = 404;
      error.statusCode = 404;
    }
    res.status(statusCode || 500).send({
      status: false,
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
      errors: error.errors,
    });
  });
  

module.exports = app;
