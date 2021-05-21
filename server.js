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
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  // await page.goto("https://playground.babylonjs.com/frame.html#PN1NNI#1"); // Or localhost:3000
  await page.goto("http://localhost:3000");

  page.evaluate("document.getElementsByTagName('canvas')[0].style.zIndex=500");
  page.evaluate(
    " document.getElementsByTagName('canvas')[0].style.height='100%'"
  );
  page.evaluate(
    "document.getElementsByTagName('canvas')[0].style.position='absolute'"
  );

  // take a screenshot, save it locally and serve it to the requested webpage, need to wait a bit for the webpage to load before calling
  app.get("/pic", async (req, res) => {
    // can run JS on the webpage to modify the scene
    page.evaluate("BABYLON.Engine.LastCreatedScene.activeCamera.alpha = 1.4;");

    // resize and send pic
    page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

    await page.screenshot({ path: "./public/example.png" });

    res.sendFile(__dirname + "/public/example.png");
  });
};

// lol look im python
main();
