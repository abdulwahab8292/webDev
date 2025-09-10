interface Vector2D{
    x: number;
    y: number;
}
function calculateLength(v: Vector2D){
    return Math.sqrt(v.x ** 2 + v.y ** 2);
}
interface NamedVector {
    name: string;
    x: number;
    y: number;
}
const v: NamedVector = {x:3, y:4, name: "Pythagoras"};

console.log(calculateLength(v)); 