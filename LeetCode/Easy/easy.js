
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

/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false

*/



// let s = "()[]{}";
// let s = "(]";
// let s = "()";
let s = "{[]}"

var isValid = function(s) {

    if (s.length === 0) {
        return false;
    }

    let stack = [];
    const brackets = {
        '(': ')',
        '[': ']',
        '{': '}',
    }


    if (!brackets[s[0]]) {
        return false;
    }

    for (let i = 0; i < s.length; i++) {
        
        if(brackets[s[i]]) { // opening bracket

            console.log("brackets[s[i]]: " + brackets[s[i]])
            console.log("s[i]: " + s[i])

            stack.push(s[i]);
        }
        else if (brackets[stack[stack.length - 1]] === s[i]) { // closing bracket & matching brackets
            console.log("stack[stack.length - 1]: " + stack[stack.length - 1])
            console.log("brackets[stack[stack.length - 1]]: " + brackets[stack[stack.length - 1]]);
            console.log("s[i]: " + s[i])

            stack.pop();
        }
        else {
            return false;
        }
    }

    return stack.length === 0;

    //************* Following code is not for all cases ****************

    // let elements = s.split('');

    // if(elements.length % 2 !== 0) {
    //     return false
    // }

    // let res;
    // for (let i = 0; i < elements.length; i += 2) {
    //     console.log(elements[i])
    //     switch(elements[i]){
    //         case "(" :
    //             console.log("1")
    //             res = elements[i+1] === ")";
    //             console.log("res: "  + res)
    //             break;
    //         case "{" :
    //             console.log("2")
    //             res = elements[i+1] === "}";
    //             console.log("res: "  + res)
    //             break;
    //         case "[" :
    //             console.log("3")
    //             res = elements[i+1] === "]";
    //             console.log("res: "  + res)
    //             break;
    //     }
    // }
    // return res;
};

console.log(isValid(s));