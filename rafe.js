function saveToJson() {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            let data = res.data
            resolve(data)
        })
       
    });
    

};
async function my() {
    let a = await saveToJson()
    console.log(a)
};
my()