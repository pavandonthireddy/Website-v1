const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const dotenv = require("dotenv");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const { spawn } = require("child_process");
const http = require("http");
const socketIO = require("socket.io");
var fs = require("fs");
const uniqueString = require("unique-string");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const server = http.createServer(app);
const io = socketIO(server);
io.on("connection", socket => {
  console.log("New client connected" + socket.id);
  console.log(socket);
  socket.on("stream_data", params => {
    console.log(params);
    const path = require("path");
    const fileName = uniqueString();
    console.log("FileName: ", fileName);
    const python = spawn("/usr/bin/python3", [
      path.join(__dirname, "../Project_V4/hypothesis_engine.py"),
      params["hypoParams"]["startDate"],
      params["hypoParams"]["endDate"],
      params["hypoParams"]["portfolio"],
      params["hypoParams"]["neutralization"],
      params["hypoParams"]["longLeverage"],
      params["hypoParams"]["shortLeverage"],
      params["hypoParams"]["startingValue"],
      params["hypoParams"]["costThresholdBps"],
      params["hypoParams"]["advThreshold"],
      params["hypoParams"]["commissionBps"],
      params["engineParams"]["grammar"],
      params["engineParams"]["fitness_function"],
      params["engineParams"]["max_init_tree_depth"],
      // params["engineParams"]["min_init_tree_depth"],
      "None",
      params["engineParams"]["init_genom_length"],
      params["engineParams"]["interaction_probability"],
      params["engineParams"]["max_tree_depth"],
      params["engineParams"]["max_tree_nodes"],
      params["engineParams"]["population_size"],
      params["engineParams"]["selection_proportion"],
      params["engineParams"]["generations"],
      params["engineParams"]["generation_size"],
      params["engineParams"]["elite_size"],
      params["engineParams"]["crossover_probability"],
      params["engineParams"]["mutation_events"],
      params["engineParams"]["mutation_probability"],
      params["engineParams"]["tournament_size"],
      params["engineParams"]["random_seed"],
      fileName
    ]);
    python.stdout.on("data", function(data) {
      console.log(data.toString());
    });
    python.stderr.on("data", function(data) {
      console.log(data.toString());
    });

    var exec = require("child_process").exec;
    var interval = setInterval(function() {
      exec(`wc /home/contact/hypothesis/streamData/${fileName}.txt`, function(
        error,
        results
      ) {
        var lines = parseInt(results.split("  ")[0]);
        if (lines > 0) {
          // console.log(results);
          // console.log("Lines:", lines);
          fs.readFile(
            `/home/contact/hypothesis/streamData/${fileName}.txt`,
            function(err, data) {
              console.log(data.toString());

              // res.json({ result: data.toString() });
              io.sockets.emit("get_data", { result: data.toString() });
            }
          );
        }
      });
    }, 2000);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log("DB Connected");
});
mongoose.connection.on("error", err => {
  console.log(`DB connection erro: ${err}`);
});

app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );
app.use(cookieParser());
app.use(expressValidator());

app.use(cors());
app.use("/", authRoutes);
app.use("/", userRoutes);
app.post("/simulate", function(req, res) {
  const {
    startDate,
    endDate,
    portfolio,
    neutralization,
    longLeverage,
    shortLeverage,
    startingValue,
    costThresholdBps,
    advThreshold,
    commissionBps,
    strategyExpression
  } = req.body;

  const { PythonShell } = require("python-shell");

  const path = require("path");
  const options = {
    mode: "text",
    pythonPath: "/usr/bin/python3",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: path.join(__dirname, "../Project_V4"),
    args: [
      startDate,
      endDate,
      portfolio,
      neutralization,
      longLeverage,
      shortLeverage,
      startingValue,
      costThresholdBps,
      advThreshold,
      commissionBps,
      strategyExpression
    ]
  };
  PythonShell.run("hypothesis_test.py", options, function(err, results) {
    if (err) throw err;
    console.log("Results: ", results);
    const MongoClient = require("mongodb").MongoClient;
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
      if (err) throw err;
      const dbo = db.db("hypothesis");
      dbo
        .collection("plotdata")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          res.json({ result: result[result.length - 1], status: results[1] });
          db.close();
        });
    });
  });
});

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized!" });
  }
});

const port = process.env.PORT || 8080;

// app.listen(port, () => {
//   console.log(`Express Server is running port: ${port}`);
// });
server.listen(port, () => console.log(`Listening on port ${port}`));
