let arr = [1,2,5,6,3,4,10,7]

let evenElements = arr.map(function(item){
    if(item % 2 == 0)
        return item
    else    
        return ++item
})

console.log(evenElements)

let names = ["Apple","Orange","WaterMelon"]
let stringLengths = names.map(function(item){
    return item.length
})

console.log(stringLengths)

arr.forEach(function(item){
  console.log(item)
})
console.log(arr)