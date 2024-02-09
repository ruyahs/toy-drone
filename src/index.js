import * as PIXI from "pixi.js";
import { Platform } from "./Platform";
import Drone from "./DroneSprite";
import GridSystem from "./GridSystem/GridSystem";
import bomb from "./bomb";
import Clouds from "./Clouds";
import ZombieSpawner from "./zombies";

var score = 0;

const app = new PIXI.Application({
  antialias: true,
  width: 1200,
  height: 800,
});
globalThis.__PIXI_APP__ = app;
document.body.appendChild(app.view);

const grid = new GridSystem(800, 1200);

const DronePlatform = new Platform(app.screen.width, app.screen.height);
app.stage.addChild(DronePlatform);

const zSpawner = new ZombieSpawner();
app.stage.addChild(zSpawner);

const skyAbove = new Clouds();

app.stage.addChild(skyAbove);

skyAbove.x = 600;
skyAbove.y = 400;

const _drone = new Drone();
await _drone.getDroneTextures();
_drone.playAnimation();

const basicText = new PIXI.Text("Score : 0");

basicText.x = 5;
basicText.y = 5;

app.stage.addChild(basicText);

app.stage.addChild(_drone);
app.stage.eventMode = "static";
app.stage.on("pointerdown", (e) => {
  var gridPoint = grid.findGridPoint(e.global.x, e.global.y);

  var cord = grid.getCenterFromGridPoint(gridPoint);

  _drone.TargetX = cord.x;
  _drone.TargetY = cord.y;
});
const handleNagation = (e) => {
  switch (e.keyCode) {
    case 100:
      _drone.turnLeft();
      break;
    case 102:
      _drone.turnRight();
      break;
    case 65:
      _drone.turnLeft();
      break;
    case 68:
      _drone.turnRight();
      break;
    case 37:
      _drone.turnLeft();
      break;
    case 104:
      _drone.moveDrone(grid.maxCellHeight, grid.maxCellWidth);
      break;
    case 87:
      _drone.moveDrone(grid.maxCellHeight, grid.maxCellWidth);
      break;
    case 39:
      _drone.turnRight();
      break;
    case 38:
      _drone.moveDrone(grid.maxCellHeight, grid.maxCellWidth);
      break;
    case 32:
      if (grid.isThereSpaceEnoughToShoot(_drone.x, _drone.y, _drone.angle)) {
        _drone.attack();
        var attackSquare = grid.getAttackSquare(
          _drone.x,
          _drone.y,
          _drone.angle
        );
        var t = zSpawner.zombies
          .filter((z) => z.Zombie.x > attackSquare.xStart)
          .filter((z) => z.Zombie.x < attackSquare.xEnd)
          .filter((z) => z.Zombie.y > attackSquare.yStart)
          .filter((z) => z.Zombie.y < attackSquare.yEnd);
   
        t.forEach((a) => {
          zSpawner.removeChild(a);
          zSpawner.zombies.splice(zSpawner.zombies.indexOf(a), 1);
         
          score = score + 1;
          basicText.text = `Score : ${score}`;
        });
      }

      break;
    case 82 :
        alert(
            `x : ${_drone.reportPosition().x} , y : ${_drone.reportPosition().y}`
          );
    break ; 
    default:
        console.log(e.keyCode) ; 
      break;
  }
};

document.addEventListener("keydown", handleNagation);
if (document.getElementsByClassName("btn").length > 0) {
  document.getElementsByClassName("btn")[0].onclick = () => {
    _drone.turnLeft();
  };

  document.getElementsByClassName("btn")[1].onclick = () => {
    _drone.attack();
  };

  document.getElementsByClassName("btn")[2].onclick = () => {
    _drone.moveDrone(grid.maxCellHeight, grid.maxCellWidth);
  };

  document.getElementsByClassName("btn")[3].onclick = () => {
    _drone.turnRight();
  };

  document.getElementsByClassName("btn")[4].onclick = () => {
    alert(
      `x : ${_drone.reportPosition().x} , y : ${_drone.reportPosition().y}`
    );
  };
}
