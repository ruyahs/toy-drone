import { Container, Sprite, Texture, Ticker } from "pixi.js";
import zom from './images/ZombieBall.png'

export default class ZombieSpawner extends Container{

    constructor(){
        super() ; 
        this.zombies = [] ; 
        Ticker.shared.add(this.spawnAndHandleZombies , this) ; 

    }

    spawnAndHandleZombies(){
      

       for(let i = 0 ; i < this.zombies.length ; i ++ ){
       
            if(this.zombies[i].Zombie.position.x > 1200 | 
                this.zombies[i].Zombie.position.x <0 |
                this.zombies[i].Zombie.position.y > 800 | 
                this.zombies[i].Zombie.position.y < 0 ){

                    this.removeChild(this.zombies[i])
                    this.zombies.splice(i,1)

                }
       }

     
       if(this.zombies.length > 40){return}
       var a = new Zombie() ; 
       this.addChild(a) ; 
       this.zombies.push(a) ; 

    }





}


class Zombie extends Container{

    constructor(){
        super() ; 

        this.ZombieTexture = Texture.from(zom) ; 
        this.Zombie = Sprite.from(this.ZombieTexture) ; 
        this.Zombie.anchor.set(0.5) ; 
        this.Zombie.x  = Math.floor(Math.random() * 1200); 
        this.Zombie.y = Math.floor(Math.random() * 800 ) ; 
        this.addChild(this.Zombie) ; 
        Ticker.shared.add(this.walkAimLess,this) ; 
    }

    walkAimLess(){

        this.Zombie.x +=  5 * Math.cos((Math.PI/180) * (Math.random() * 360 ) ) ; 
        this.Zombie.y += 5 * Math.sin((Math.PI/180) * (Math.random() * 360 ) ) ;   

    }


}