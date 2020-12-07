async function generateShortURL(idElement){
    let inp_value = document.getElementById(idElement).value
    let responseData = await sendReqData(inp_value)
    await createQRCode(responseData)
    changeClassList('bgModal' , 'add' , 'block')
}

async function sendReqData(url){
    let data =  {
                    'type'  : "shortURL" , 
                    'url'   : url
                }
    let responseData = await reqParam(data)
    console.log("data : " , responseData)
    if(responseData.shortUrl !== undefined){
        document.getElementById("stortURL").innerHTML = responseData.shortUrl
        
    }
    return responseData
}

function createQRCode(resData){
    document.getElementById("qrcode").innerHTML = ""
    let qrcode = new QRCode(document.getElementById("qrcode"));
    qrcode.makeCode(resData.destination)
    console.log("qrCode : " , qrcode)
    return qrcode
}

function changeClassList(elementID , type , classCSS){
    let DOM_element = document.getElementById(elementID)
    if(type === "add"){
        DOM_element.classList.add(classCSS)
    }
    else{
        DOM_element.classList.remove(classCSS)
    }
}