// Bunyasit Uasopon (BOY) 10191

const HOST =    {
                    "HOST_SHORT_URL" : "https://api.rebrandly.com/v1/links" ,
                }

function reqParam(obj_data){
    let method  = "POST"
    let url     = ""
    let data    = ""

    if(obj_data.type === "shortURL"){
        let linkURL  = obj_data.url
            linkURL  = checkURL(linkURL , "www.")
            linkURL  = checkURL(linkURL , "https://")

        url     = HOST.HOST_SHORT_URL
        data    = JSON.stringify({
                                    // 'destination': 'https://www.youtube.com/channel/UCHK4HD0ltu1-I212icLPt3g'    ,
                                    // 'domain'     : {fullName: "rebrand.ly"}
                                    'destination': linkURL    ,
                                    // 'domain'     : {fullName: "rebrand.ly"}
                                 })
    }

    return new Promise(function(resolve, reject) 
    {
        var xhr = new XMLHttpRequest();
        
        xhr.open(method , url)
        //Send the proper header information along with the request
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('apikey', 'a2754c2cfed049a794fc362f379e22fc');
    
    xhr.responseType = 'json';
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                resolve(xhr.response)
            } else {
                console.log("BREAK Status: "+ xhr.response)
                reject("BREAK Status: "+ xhr.status)
            }
        }
    }
        xhr.ontimeout = function () {
            reject('Timeout')
        }
        xhr.send(data)
    })
}

function checkURL(data , checkstr){
    let boolURL = data.includes(checkstr)
    let url     = data
    if(boolURL === false){
        // if(checkstr === 'www.' && data.includes('https://'))
        //     url = 
        // else
            url = checkstr + url
    }
    return url
}