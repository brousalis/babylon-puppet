const express = require("express");
const http = require("http");
const puppeteer = require("puppeteer");

const port = 3000;
const app = express();

const main = async () => {
  app.set("view engine", "pug");

  app.use("/public", express.static("public"));

  app.get("/", function (req, res) {
    const app = req.query.app ? req.query.app : "app";
    res.render("app", { app: app });
  });

  const server = http.createServer(app);

  server.listen(port);

  console.log("Serving at: localhost:" + port);

  // puppeteer
  const browser = await puppeteer.launch({
    // args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:3000");

  page.evaluate("document.getElementsByTagName('canvas')[0].style.zIndex=500");
  page.evaluate(" document.getElementsByTagName('canvas')[0].style.height='100%'");
  page.evaluate("document.getElementsByTagName('canvas')[0].style.position='absolute'");

  app.get("/screenshot", async (req, res) => {
    // can run JS on the webpage to modify the scene
    page.evaluate("BABYLON.Engine.LastCreatedScene.activeCamera.alpha = 1.4;");

    // resize and send pic
    page.setViewport({ width: 300, height: 300, deviceScaleFactor: 1 });

    await page.screenshot({ path: "./public/example.png" });

    res.sendFile(__dirname + "/public/example.png");
  });
};

// lol look im python
main();
