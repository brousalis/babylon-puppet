const BABYLON = require("babylonjs");

// lol margins
document.documentElement.style["overflow"] = "hidden";
document.documentElement.style.overflow = "hidden";
document.documentElement.style.width = "100%";
document.documentElement.style.height = "100%";
document.documentElement.style.margin = "0";
document.documentElement.style.padding = "0";
document.body.style.overflow = "hidden";
document.body.style.width = "100%";
document.body.style.height = "100%";
document.body.style.margin = "0";
document.body.style.padding = "0";

const canvas = document.createElement("canvas");
canvas.style.width = "100%";
canvas.style.height = "100%";

document.body.appendChild(canvas);

// bablyon
const engine = new BABYLON.Engine(canvas, true, {
  stencil: true,
  disableWebGL2Support: false,
  preserveDrawingBuffer: true,
});

engine.enableOfflineSupport = false;

const scene = new BABYLON.Scene(engine);

scene.clearColor = new BABYLON.Color4(1.0, 0.0, 0.0, 1.0);

// BABYLON.SceneLoader.ImportMeshAsync("", "", scene, function (scene) {
// do something with the scene
// });

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});

// create camera
const camera = new BABYLON.ArcRotateCamera(
  "ArcRotateCamera",
  1,
  0.8,
  5,
  new BABYLON.Vector3(0, 0, 0),
  scene
);
camera.attachControl(canvas, true);
camera.lowerRadiusLimit = 2.5;
camera.upperRadiusLimit = 10;
camera.pinchDeltaPercentage = 0.01;
camera.wheelDeltaPercentage = 0.01;

// create a sun effect made of 3 different particle system
// Definition: https://assets.babylonjs.com/particles/systems/sun.json
BABYLON.ParticleHelper.CreateAsync("sun", scene).then((set) => {
  set.start();
});
