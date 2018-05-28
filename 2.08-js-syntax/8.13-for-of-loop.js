const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// your code goes here
for (const day of days){
    let val = day.charAt(0).toUpperCase() + day.substr(1);
    console.log(val);
}
