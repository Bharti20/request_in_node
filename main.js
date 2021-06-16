const axios = require('axios');
const fs = require('fs')
const os = require('os');
const url = 'https://saral.navgurukul.org/api/courses'
const readlinesync = require('readline-sync')
console.log()
console.log("******************************* Welcome To Saral Page  **********************************************")
console.log()
async function online(fname, link) {
    return new Promise((resolve, reject) => {
        if(fs.existsSync(fname)) {
            resolve(ConvertToJsPaticularCourse(fname))
        }else{
            axios.get(link).then((res) => {
                let data = res.data
                resolve(data)
                let sData = JSON.stringify(data, null, 2);
                fs.writeFileSync(fname, sData);
            })
        }
       

    });
}
async function availableCourses(allData){
    console.log()
    console.log("*************************** Available Courses ******************************")
    console.log()
    
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
    listOfSlug = []
    courses_ids= []
    console.log()
    console.log("********************** Parent Child Exercise **************************")
    console.log()
    let j = 0
    while(j<allCourseData["availableCourses"].length) {
        if(course_index == j+1) {
            let url2 ="https://saral.navgurukul.org/api/courses/"+String(courseIdsList[j])+"/exercises"
            let file_name = "exercises"+String(courseIdsList[j])+".json"
            await online(file_name, url2)
            console.log()
            console.log(allCourseData["availableCourses"][j]['name'])
            console.log()
            courseData = await ConvertToJsPaticularCourse(file_name)
            // console.log(courseData['data'].length)
            let z = 0
            while(z<courseData['data'].length) {
                courses_ids.push(courseData['data'][z]['id'])
                listOfSlug.push(courseData['data'][z]['slug'])
                console.log("   ",z+1 ,courseData['data'][z]["name"])
                if(courseData['data'][z]["childExercises"].length == 0){
                    console.log("       ",courseData['data'][z]["childExercises"])
                }else{
                    let index = 0
                    while(index<courseData['data'][z]["childExercises"].length) {
                        console.log("       ", courseData['data'][z]["childExercises"][index]['name'])
                        index++

                    }   
                }z++
            }
            console.log()
            console.log("********************************* Slugs ******************************************")
            console.log()
            let slug_index = 0
            while(slug_index<listOfSlug.length) {
                console.log(slug_index+1, listOfSlug[slug_index])
                slug_index++
            }
            console.log()
            let choose_slug = readlinesync.question('select a slug----')
            console.log()
            let i = 0
            while(i<listOfSlug.length) {
                if(choose_slug == i+1) {
                    let slug_url = "http://saral.navgurukul.org/api/courses/"+String(courseIdsList[j])+"/exercise/getBySlug?slug="+String(listOfSlug[i])
                    axios.get(slug_url).then((res) => {
                        let data = res.data
                        console.log(data['content'])
                    });break
                   
                }i++

            }

        }j++
    }
}




parentChild()
