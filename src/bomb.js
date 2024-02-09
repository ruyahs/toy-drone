import { Container, Sprite, Texture } from "pixi.js"
import bombTexture  from "./images/bomb.png"
import explodes  from "./images/bigBoom.png"
export default class Bomb extends Container{
    
	constructor(position){
		super()  
		this.mainTexture =  Texture.from(bombTexture) 
		this.explodedTexture = Texture.from(explodes)
		this.bomb = Sprite.from(this.mainTexture)
        
		this.addChild(this.bomb)  
		this.scale.x = 0.3  
		this.scale.y = 0.3  
		this.bomb.anchor.x = 0.5  
		this.bomb.anchor.y=  0.5  
		this.intialPosition = position  
	}

	switchTexture(){      
		this.bomb.texture = this.explodedTexture  
	}

}