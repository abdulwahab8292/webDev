function main() {
    fetch ("https://mocki.io/v1/7cd8a7ca-01cd-4a9f-931b-a2cd66b923cf ")
        .then(async (response)=>{
            const json = await response.json();
            console.log(json)
        })
}
main();
console.log("---------------------------------------")
async function main2() {
    try {
        const response = await fetch("https://mocki.io/v1/7cd8a7ca-01cd-4a9f-931b-a2cd66b923cf ");
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message)
    }
    
}
main2();