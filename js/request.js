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
                                    'destination': linkURL    ,
                                 })
    }
    else if(obj_data.type === "insert"){
        url     = "connect.php?"
        data    = "type=" + obj_data.type +"&domain=" + obj_data.domain_name + "&shortURL=" + obj_data.shortURL
    }
    else if(obj_data.type === "getData"){
        url     = "connect.php?"
        data    = "type=" + obj_data.type
    }

    return new Promise(function(resolve, reject) 
    {
        var xhr = new XMLHttpRequest();
        xhr.open(method , url)
        if(obj_data.type === "shortURL"){
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('apikey', 'a2754c2cfed049a794fc362f379e22fc');
            xhr.responseType = 'json';
        }
        else{
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
    
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if(obj_data.type === "shortURL"){
                    resolve(xhr.response)
                }else{
                    resolve(xhr.responseText)
                }
            } else {
                if(obj_data.type === "shortURL"){
                    console.log("BREAK Status: "+ xhr.response)
                }else{
                    console.log("BREAK Status: "+ xhr.responseText)
                }
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
            url = checkstr + url
    }
    return url
}