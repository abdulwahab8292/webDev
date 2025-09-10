import { PrismaClient } from "@prisma/client";
export const client = new PrismaClient(
    {log: ["query", "info", "warn", "error"]}
);

async function createUser(){
//    await client.user.create({
//         data: {
//             username: "john_doe",
//             password: "securepassword",
//             age: 30,
//             city: "New York"
//         }
//     });
    await client.todo.create({
        data: {
            title: "Finish project",
            description: "Complete the Prisma project by end of the week",
            done: false,
            userId: 1
        }
    })
    const todos = await client.user.findMany({
        where: { id: 1 },
        include:{
            todos: true
        }
    })
    console.log(todos[0]?.todos);
}
createUser();
