//axios vs fetch
function main() {
    try {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then(async (responsonse)=>{
            const data = await responsonse.json();
            console.log(data);
        })
    } catch (error) {
        console.error(error);
    }
}
main();