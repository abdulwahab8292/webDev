import { atomFamily } from "recoil";
import Todos  from "./Todo";

const TodoAtomFamily = atomFamily({
    key : "TodoAtomFamily",
    default : (id) => Todos.find((x)=>x.id === id)
}); 
export default TodoAtomFamily;