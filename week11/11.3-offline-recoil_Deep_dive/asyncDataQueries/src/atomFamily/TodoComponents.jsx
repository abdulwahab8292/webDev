import { useRecoilValue } from "recoil";
import TodoAtomFamily from "./TodoAtomFamily";
import TodosAtomFamily from "../selectorfamily/SelectorFamily";

function TodoComponents({ id }) {
    const todo = useRecoilValue(TodoAtomFamily(id));
    const todo2 = useRecoilValue(TodosAtomFamily(id));

    return (
        <div>
            <div>{todo.title}</div>
            <div>{todo.completed ? "Completed" : "Not Completed"}</div>
            <div>{todo2.todo}</div>
            <div>{todo2.completed ? "True" : "False"}</div>
        </div>
    );
}

export default TodoComponents;