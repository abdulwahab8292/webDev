interface Users {
    id : number,
    name : string,
    age : number,
    email : string,
    password : string
}

type UpdateProps = Pick<Users, 'name' | 'age' | 'email' >;
//Pick is used to reuse particular properties in another component.
//it can be used on interface and type