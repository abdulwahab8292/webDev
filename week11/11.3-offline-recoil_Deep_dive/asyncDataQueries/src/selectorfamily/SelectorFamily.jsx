import { selectorFamily, atomFamily } from "recoil";
import axios from 'axios'

const TodosAtomFamily = atomFamily({
    key: "todosAtomsFamily",
    default : selectorFamily({
        key : "todoSelectorFamily",
        get : (id) => async ({get}) => {
            const res = await axios.get(`https://dummyjson.com/todos/${id}`) // Fixed string interpolation syntax
            return res.data // Added return statement to get the todo data
        }
    })
})
export default TodosAtomFamily;