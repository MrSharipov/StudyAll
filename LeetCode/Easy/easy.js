
//************* - 1 - ***************

/*

2620. Counter

Given an integer n, return a counter function. This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).

Example 1

Input: 
n = 10 
["call","call","call"]
Output: [10,11,12]
Explanation: 
counter() = 10 // The first time counter() is called, it returns n.
counter() = 11 // Returns 1 more than the previous time.
counter() = 12 // Returns 1 more than the previous time.

Example 1

Input: 
n = -2
["call","call","call","call","call"]
Output: [-2,-1,0,1,2]
Explanation: counter() initially returns -2. Then increases after each sebsequent call.

 */

/*

let n = -2;

let count = 1;
function counter () {
    if(count === 1) {
        count++;
        return n
    }
    return n += 1;
}

console.log(counter (n));
console.log(counter (n));
console.log(counter (n));

 */

//************* - 2 - ***************

/*
    Given a positive integer millis, write an asynchronous function that sleeps for millis milliseconds. It can resolve any value.
*/

/*
    Input: millis = 100
    Output: 100
    Explanation: It should return a promise that resolves after 100ms.
    let t = Date.now();
    sleep(100).then(() => {
    console.log(Date.now() - t); // 100
    });

    Input: millis = 200
    Output: 200
    Explanation: It should return a promise that resolves after 200ms.
*/

/* 
async function sleep(millis) {
    return await new Promise(resolve => setTimeout(resolve, millis));
}

let t = Date.now();
sleep(100).then(()=>{
    console.log(Date.now() - t);
});

*/

//************* - 3 - ***************
