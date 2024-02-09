import{Sprite, Spritesheet, Container,BaseTexture , AnimatedSprite, Ticker} from 'pixi.js'
import DroneSpritesheet from './images/sprite-drone-sheet.png' ; 
import bomb from './bomb';
import Bomb from './bomb';

export default class Drone extends Container{


    constructor(){
        super() ; 

        var SpriteAtlasInformation = AtlasData() ; 
        this.droneSheet = new Spritesheet(
            BaseTexture.from(SpriteAtlasInformation.meta.image) , 
            SpriteAtlasInformation        
        )      
        this.anim = null ; 
        this.animSpeed = 0.5 ; 

            Ticker.shared.add(this.updateTicker , this)
        this.TargetX = 400 ; 
        this.TargetY = 400 ; 
        this.TargetRotation = 0 ; 
        this.bombs = []  ; 
       
    }

    updateTicker(){
      

        this.updateAllProjectiles() ; 

        if(this.TargetX != this.x  ){
            this.x = this.x +(1 * (this.TargetX >  this.x ? 1: -1) ); 
        }
        if(this.TargetY != this.y  ){
            this.y = this.y +(1 * (this.TargetY >  this.y ? 1: -1 )); 
        }

        if(this.angle !=  this.TargetRotation ){
            this.angle = this.angle + (1*(this.TargetRotation >= this.angle ? 1 : -1)) ; 
        }
    }

    turnLeft(){
        
        this.TargetRotation = this.TargetRotation - 90 ;     
    }
    turnRight(){
        this.TargetRotation = this.TargetRotation + 90 ; 
    }
    reportPosition(){
        return{x : this.anim.position.x , y: this.anim.position.y}           
    }
   
    moveDrone(cellMaxHeight , cellMaxWidth ){
       
        if((this.TargetX + (cellMaxWidth ) * Math.cos((Math.PI/180) *  this.TargetRotation) ) > (cellMaxWidth *10) ){
            return  ; 
        }
        if((this.TargetX + (cellMaxWidth ) * Math.cos((Math.PI/180) *  this.TargetRotation) ) < 0 ){
            return ; 
        }
        if((this.TargetY + (cellMaxHeight) * Math.sin((Math.PI/180) *  this.TargetRotation)) > ( cellMaxHeight * 10 ) ){
            return  ; 
        }
        if((this.TargetY + (cellMaxHeight ) * Math.sin((Math.PI/180) *  this.TargetRotation)) < 0 ){
            return  ; 
        }
     
        this.TargetX = this.TargetX + (cellMaxWidth / 2) * Math.cos((Math.PI/180) *  this.TargetRotation) ; 
        this.TargetY = this.TargetY + (cellMaxHeight / 2) * Math.sin((Math.PI/180) *  this.TargetRotation) ; 


        
    }

    attack(){
        const bombs = new Bomb(this.position) ;
        this.addChild(bombs) ; 
        this.bombs.push(bombs) ; 

    }

    updateAllProjectiles(){
        for(let i = 0 ; i < this.bombs.length ; i++ ){
            
        
            this.bombs[i].position.y = this.bombs[i].position.y + 10 *  Math.sin(this.bombs[i].angle * (Math.PI / 180)) 
            this.bombs[i].position.x = this.bombs[i].position.x +  10 * Math.cos(this.bombs[i].angle * (Math.PI / 180)) ; 
              if( this.bombs[i].position.x > 240 |  this.bombs[i].position.y > 160){
                this.bombs[i].switchTexture() ; 
            }

            if(this.bombs[i].position.x < 0  | this.bombs[i].position.x > 390|this.bombs[i].position.y < 0 | this.bombs[i].position.y > 390){
                this.removeChild(this.bombs[i])
                this.bombs.splice(i,1)
            }
           
        }     
    }



    async getDroneTextures(){
        await this.droneSheet.parse() ; 
    }

    playAnimation(){
        this.anim = new AnimatedSprite(this.droneSheet.animations.flying) ; 
        this.anim.animationSpeed =  this.animSpeed ; 
        this.anim.play() ; 
        this.anim.anchor.x = 0.5 ; 
        this.anim.anchor.y = 0.5 ; 
        this.addChild(this.anim) ; 
    }



}

const AtlasData = () => {
    return {
        frames: {
            rotor1: {
                frame: { x: 10, y:10, w:480, h:480 },
                sourceSize: { w: 480, h: 480 },
                spriteSourceSize: { x: 0, y: 0, w: 480, h: 480 } 
                
            },
            rotor2: {
                frame: { x: 509, y:10, w:480, h:480 },
                sourceSize: { w: 480, h: 480 },
                spriteSourceSize: { x: 0, y: 0, w: 480, h: 480 }
            },
            rotor3:{
                frame: { x: 1009, y:10, w:480, h:480 },
                sourceSize: { w: 480, h: 480 },
                spriteSourceSize: { x: 0, y: 0, w: 480, h: 480 }
            },
            rotor4:{
                frame: { x: 1510, y:10, w:480, h:480 },
                sourceSize: { w: 480, h: 480 },
                spriteSourceSize: { x: 0, y: 0, w: 480, h: 480 }
            }

        },
        meta: {
            image: DroneSpritesheet,
            format: 'RGBA8888',
            size: { w: 2000, h: 500 },
            scale: 4
        },
        animations: {
            flying: ['rotor1','rotor2','rotor3','rotor4'] //array of frames by name
        }

    }
}

