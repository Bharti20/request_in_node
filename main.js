const axios = require('axios');
const fs = require('fs')
const os = require('os');
const url = 'https://saral.navgurukul.org/api/courses'
const readlinesync = require('readline-sync')

async function online(fname, link) {
    return new Promise((resolve, reject) => {
        if(fs.existsSync(fname)) {
            // let rawData = fs.readFileSync('courses.json');
            // let storeData = JSON.parse(rawData);
            // resolve(storeData)
            resolve(onvertToJsPaticularCourse(fname))
            // console.log(typeof(storeData))
        }else{
            axios.get(link).then((res) => {
                let data = res.data
                resolve(data)
                let sData = JSON.stringify(data, null, 2);
                // fs.writeFileSync('courses.json', sData);
                fs.writeFileSync(fname, sData);
            })
        }
       

    });
}

async function availableCourses(allData){
    // let allData = await saveToJson('courses.json')
    id_array = []
    let i = 0
    while(i<allData["availableCourses"].length) {
            id_array.push(allData["availableCourses"][i]['id'])
            console.log(i+1, allData["availableCourses"][i]['name'])
            i++
    

    }return id_array
    
};

async function convertToJs(){
    if(fs.existsSync('courses.json')) {
        let rawData = fs.readFileSync('courses.json');
        let storeData = JSON.parse(rawData);
        return storeData
    }else{
        axios.get(link).then((res) => {
            let data = res.data
            let sData = JSON.stringify(data, null, 2);
            fs.writeFileSync('courses.json', sData);
        })
    }


}


async function ConvertToJsPaticularCourse(name) {
    let rawData = fs.readFileSync(name);
    let storeData = JSON.parse(rawData);
    return storeData

}

async function parentChild() {
    let allCourseData = await convertToJs()
    let courseIdsList = await availableCourses(allCourseData);
    console.log()
    course_index=readlinesync.question("select a course---")
    let i = 0
    // while(i<allCourseData["availableCourses"].length) {
        if(course_index ==i+1) {
            url2 ="https://saral.navgurukul.org/api/courses/"+String(courseIdsList[i])+"/exercises"
            file_name = "exercises_",+String(courseIdsList[i])+".js"
            await online(file_name, url2)
            courseData = await ConvertToJsPaticularCourse(file_name)
            console.log(courseData)


        }
    //}





}
parentChild()







// async function my() {
//     let a = await promise
//     let b = await consolCourses
//     // console.log(a)
// };
// my()








// function saveToJson() {
//     axios.get(url).then((res) => {
//         let data = res.data
//         console.log(data)
//         let jsonData = JSON.stringify(data, null, 2);
//         fs.writeFile('courses.json', jsonData, (error) => {
//             if(error) {
//                 console.log(`Got error, ${error.message}`)
//                 return 
//             }
//         })
//     })

// }
// console.log(saveToJson())