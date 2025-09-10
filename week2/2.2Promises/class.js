/*In JavaScript, the this keyword refers to the object that is currently
 executing the function. In the context of your Rectangle class, 
 this is used to refer to the instance of the Rectangle object 
 that is being created or used.
*/
class Rectangle {
  constructor(length, width, color) {
    this.length = length;
    this.width = width;
    this.color = color;
  }
  area() {
    return this.length * this.width;
  }
  paint() {
    console.log(`paint: ${this.color}`);
  }
  destroy() {}
}
const rect1 = new Rectangle(12, 13, "Red");

console.log(rect1.area());
rect1.paint();
rect1.destroy();
