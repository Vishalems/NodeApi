const express = require('express');
const morgan = require("morgan");

const router = require("./Routes/mainRoute");
const app = express();


app.use( morgan("dev") );
app.use("/api",router);

app.listen(3000);