function orderPizza(ready) {
    return new Promise((resolve,reject)=>{
        if(ready){
            resolve("Pizza is ready");
        }else{
            reject("Pizza is not ready");
        }
    })
}

orderPizza(true).then((message)=>{
    console.log(message);
}).catch((message)=>{
    console.log(message);
})