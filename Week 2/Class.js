class rectangle{
    constructor(height , width, color ){
        this.height = height;
        this.width = width;
        this.color = color;
    }

    area(){
        return this.height * this.width;
    }

    paint(){
       console.log(`The color of the rectangle is ${this.color}`);
    }

}

const react = new rectangle(10,20,'red');

console.log(react.area());
react.paint()