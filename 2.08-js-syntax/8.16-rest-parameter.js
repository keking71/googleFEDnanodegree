/*
 * Programming Quiz: Using the Rest Parameter (1-5)
 */

// your code goes here

function average(...nums) {
    let total = 0;
    const len = nums.length;

    for (const num of nums){
        total += num;
    }

    if (total === 0) {
        return total;
    } else {
        let avg = total / len;
        return avg;
    }
}

console.log(average(2, 6));
console.log(average(2, 3, 3, 5, 7, 10));
console.log(average(7, 1432, 12, 13, 100));
console.log(average());
