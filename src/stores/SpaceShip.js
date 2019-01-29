import { observable, action } from  'mobx'

class SpaceShip {
    @observable id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10) 
    @observable x
    @observable y
    constructor(x , y){
        this.x =x
        this.y = y
    }

    moveDirection = (direction) =>{
        if(direction === 40){
            // up
            this.x +=35
        }

        if (direction === 38){
            // down
            this.x -=35
        }

        if (direction=== 37){
            // left
            this.y -=35
        }

        if(direction === 39){
            //right
            this.y +=35
        }
    }

    @action move = (direction) => {
      this.moveDirection(direction)
    }

    @action shoot = () =>{
        return this
    }
}


const ship = new SpaceShip(300 , 5)


export default ship