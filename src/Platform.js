import { Container , Sprite } from "pixi.js";
import DroneTime from "./images/DroneTimeBackground.png" ; 

export class Platform extends Container{

    constructor(screenWidth,screenHeight){
        super(); 
        this.screenWidth   = screenWidth ; 
        this.screenHeight = screenHeight ; 
     
        this.BackgroundTexture = Sprite.from(DroneTime) ; 
        this.addChild(this.BackgroundTexture) ; 
    }

}