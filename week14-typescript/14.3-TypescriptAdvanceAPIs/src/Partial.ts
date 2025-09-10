interface Users1 {
    id : number,
    name : string,
    age : number,
    email : string,
    password : string
}

type UpdateProps2 = Pick<Users1, 'name' | 'age' | 'email' >;
type UpdatePropsOptional = Partial<UpdateProps2>;
//partial lets us mark keys optional