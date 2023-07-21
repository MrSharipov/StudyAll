/*
----------- 10 lik saniq sistemasi ---------

225 -> 10 2*10(0) + 2*10(1) + 5*10(2)
10(0) = 1
10(1) = 10
10(2) = 100

----------- 2 lik saniq sistemasi ----------

- Always memory uses it, and it is the fastest

0 = 0
1 = 1
10 = 2
11 = 3
100 = 4
101 = 5
110 = 5
111 = 7
1000 = 8

50 = 32+16+2 = 2(5)+2(4)+2(1);
2(0) = 1        0110010
2(1) = 2
2(2) = 4
2(3) = 8
2(4) = 16
2(5) = 32

-------- Bitwise Operators ---------

& -> Bitwise AND
        1&1 = 1
        0&1 = 0
        1&0 = 0
        0&0 = 0
| -> Bitwise OR
        1|1 = 1
        0|1 = 1
        0|0 = 0
^ -> Bitwise XOR (farqli 1 / farqsiz 0)
        1^1 = 0
        1^0 = 1
        0^1 = 1
        0^0 = 0
~ -> Bitwise NOT

<< -> Bitwise left shift (сhap indexdagi sonni qaytaradi)
        10110 >> 3 -> 0 & 1 = 0
        10110 >> 2 -> 1 & 1 = 1
>> -> Bitwise right shift (o'ng indexdagi sonni chaqiradi)

https://www.youtube.com/watch?v=mesu75PTDC8&ab_channel=ProgrammingwithMosh

*/

const n = 7102;

function reverseDigitsLog(num) {
  if (num === 0) {
    console.log(num);
    return;
  }

  while (num !== 0) {
    let digit = num % 10;
    console.log(digit);
    num = Math.floor(num / 10);
  }
}

function reverseDigit(num) {
  let res = 0;
  while (num != 0) {
    res *= 10; // 0, 70
    let digit = num % 10; // 7, 1
    console.log("digit: " + digit);
    res += digit; // 7
    console.log("res: " + res);
    num = Math.floor(num / 10); // 1
    console.log("num: " + num);
  }

  console.log(res);
}

// reverseDigit(17);
// reverseDigitLog(n);

// 2lik sanoq tizimiga o'tkazish
let res = "";
function convertToBinary(num) {
  while (num !== 0) {
    let digit = num % 2;
    res += digit;
    num = Math.floor(num / 2);
  }
  const result = res.split("").reverse().join("");
  console.log(result);
}

// convertToBinary(2)

function is_power_of_two(num) {
  let bitCount = 0;

  while (num !== 0) {
    bitCount += num & 1;
    console.log({ bitCount });
    num = num >> 1;
  }

  return bitCount === 1;
}

let result = is_power_of_two(3);

console.log(result);
