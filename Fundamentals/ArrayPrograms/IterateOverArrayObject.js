let arr = [
    {
        name :  "sai",
        age: 10
    },
    {
        name :  "Sumanth",
        age: 20
    },
    {
        name :  "reddy",
        age: 30
    }
];

for(let obj of arr)
{
    console.log(obj)
}

for(let key in arr)
{
    console.log(key)
    console.log(arr[key])
}