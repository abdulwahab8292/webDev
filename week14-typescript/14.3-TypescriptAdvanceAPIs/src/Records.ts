//Record is a cleaner way to write a object

type UsersRec = Record <string,{age: number, name: string}>;

const users: UsersRec = {
    "Abdul@123" : {age: 1, name: "Abdul"}
}