type User = {
    name: string;
    ip: string;
}

type Admin = {
    details: User;
    permissions: string;
}

function getUserDetails(user: User | Admin): void {
    if ('permissions' in user) {
        console.log("You are Admin and have permission of validation");
        console.log(`Name: ${user.details.name}, IP: ${user.details.ip}`);
    } else {
        console.log(`Name: ${user.name}, IP: ${user.ip}`);
    }
}

// Example usage:
const userA: User = { name: "Alice", ip: "192.168.1.1" };
const admin: Admin = { details: { name: "Bob", ip: "192.168.1.2" }, permissions: "all" };

getUserDetails(userA);  
getUserDetails(admin); 
