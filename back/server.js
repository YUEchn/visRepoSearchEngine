const express = require("express")
const app = express()
const port = 3008
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cors = require("cors")
app.use(cors())

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));


// 设置跨域请求
app.all("*", function (req, res, next) {
  cors({
    origin: "*",
  })
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", "nodejs");
    res.header("Content-Type", "application/json; charset=UTF-8");
    res.setHeader("Cache-Control", "public, max-age=120");
    next();
  });

app.get('/', (req, res) => {
    res.send({a: "Hello world"})
    res.end();
})

app.listen(port, () => {
    console.log(`You are Listening on port ${port}`)
})

app.post("/getResult", (req, res) => {
  res.send({b: "Hellosss "})
  res.end();
  console.log(req.body)
})