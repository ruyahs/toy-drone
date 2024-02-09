import { Container, DisplacementFilter, Sprite, Texture, Ticker, WRAP_MODES } from "pixi.js"
import sky from "./images/sky.png" 
import displacement from "./images/displacement_map_repeat.jpg"  

export default class Clouds extends Container{

	constructor(){
		super()  
    


        

		this.cloudTexture =  Texture.from(sky)  
		this.cloudsAbove =  Sprite.from(this.cloudTexture)  
		this.cloudsAbove.anchor.set(0.5)  
		this.cloudsAbove.alpha = 0.7  
        
		this.addChild(this.cloudsAbove)  
		Ticker.shared.add(this.SpinTheSky,this)  
		this.displacementAsset = Sprite.from(displacement)
		this.displacementAsset.texture.baseTexture.wrapMode - WRAP_MODES.REPEAT  
		this.displacementFilter =  new DisplacementFilter(this.displacementAsset)  
		this.displacementFilter.padding = 10  
		this.displacementAsset.position = this.cloudsAbove.position  
		this.addChild(this.displacementAsset)
		this.cloudsAbove.filters = [this.displacementFilter]  
		this.displacementFilter.scale.x = 200  
		this.displacementFilter.scale.y = 200  
		this.displacementAsset.anchor.set(0.5)  
		this.displacementAsset.width = 2000  
		this.displacementAsset.height= 2000  


        
        
	}

	SpinTheSky(){
		this.angle  += (Math.random() * 0.2 )
		this.displacementAsset.x ++ 
		if(this.displacementAsset.x > this.displacementAsset.width){
			this.displacementAsset.x = 0  
		}
	}




}