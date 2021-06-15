const axios = require('axios');
const fs = require('fs')
const os = require('os');
const url = 'https://saral.navgurukul.org/api/courses'

function saveToJson() {
    axios.get(url).then((res) => {
        let data = res.data
        console.log(data)
        let jsonData = JSON.stringify(data, null, 2);
        fs.writeFile('courses.json', jsonData, (error) => {
            if(error) {
                console.log(`Got error, ${error.message}`)
                return 
            }
        })
    })

}
console.log(saveToJson())

// function foo() {
//     // RETURN the promise
//     return axios.get(url).then(function(response){
//         return response.json(); // Process it inside the `then`
//     });
// }

// foo().then(function(response){
//     // Access the value inside the `then`
// })