function getMax(nums : number[]) : number {
    let max = nums[0];
    for(let i = 1; i < nums.length; i++){
        if(nums[i] > max){
            max = nums[i];
        }
    }
    return max;
}

let nums = [5, 10, 15, 20, 25];

console.log(getMax(nums)); // 25