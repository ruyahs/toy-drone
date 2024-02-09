export default class GridSystem{

	constructor(height, width){
		this.containerHeight = height  
		this.containerWidth = width   
		this.maxCellHeight = Math.floor(this.containerHeight / 10)  
		this.maxCellWidth = Math.floor(this.containerWidth / 10) 
		this.gridRanges  = []   

		let x = 0  
		let y = 0   
		while(this.containerHeight > y ){
            
			while(this.containerWidth > x) {
				this.gridRanges.push(
					{
						xStart : x , 
						xEnd : x + this.maxCellWidth ,
						yStart : y , 
						yEnd : y + this.maxCellHeight                    
					})  
				x = x +  this.maxCellWidth  
			}
			x = 0 
			y = y + this.maxCellHeight

		}
      
	}

	getCenterFromGridPoint(gridPoint){
		return {
			x :  gridPoint.xStart + ( this.maxCellWidth / 2 )   ,
			y :  gridPoint.yStart + ( this.maxCellHeight / 2 )  
		}
	}

	findGridPoint(x , y ){
		return this.gridRanges
			.filter(z => x > z.xStart )
			.filter(z => x < z.xEnd)
			.filter(z => y > z.yStart)
			.filter(z => y < z.yEnd)[0]

	}

	isThereSpaceEnoughToShoot(x,y,rotation){

		var XRange = x + (this.maxCellWidth * 2) * Math.cos((Math.PI/180) *  rotation)  
		var YRange = y + (this.maxCellHeight  * 2) * Math.sin((Math.PI/180) *  rotation) 
		if(XRange > this.containerWidth | XRange <  0 |YRange > this.containerHeight | YRange < 0){
			return false  
		}
		return true  
	}
	getAttackSquare(x,y,rotation){
		var XRange = x + (this.maxCellWidth * 2) * Math.cos((Math.PI/180) *  rotation)  
		var YRange = y + (this.maxCellHeight  * 2) * Math.sin((Math.PI/180) *  rotation) 
		return this.findGridPoint(XRange , YRange)  
	}





}