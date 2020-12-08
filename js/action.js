async function generateShortURL(idElement){
    let inp_value = document.getElementById(idElement).value
    let responseData = await sendReqData(inp_value)
    await createQRCode(responseData)
    changeClassList('bgModal' , 'add' , 'block')
    changeClassList("body"    , 'add' , 'overflowY_hidden')

    let obj_data =  {
                        "type"          : "insert"                  ,
                        "domain_name"   : responseData.destination  ,
                        "shortURL"      : responseData.shortUrl    
                    }

    await reqParam(obj_data)

    let obj_prepare =   {
                            "key"       : ["destination" , "shortUrl"  , "qr_code"]    , 
                        }
    let tbody           = document.getElementById("tbody")
    let rowElementData  = document.createElement("TR")
    count_row = count_row + 1
    obj_prepare.key.forEach(async function(key , countData){
        let objElement = {
                            "element"   : rowElementData        ,
                            "type"      : "TD"                  ,
                            "id"        : "TD_" + count_row + "_" + countData     ,
                            "classname" : "bd1px padding1X0_5Y" ,
                            "text"      : responseData[key]
                        }
        
        await createDataElement(objElement)
        if(key === "qr_code"){
            qrcode  = await new QRCode(document.getElementById("TD_" + count_row + "_" + countData)); 
            qrcode.makeCode(responseData.destination)
        }
    })
    tbody.appendChild(rowElementData)
}

async function sendReqData(url){
    let data =  {
                    'type'  : "shortURL" , 
                    'url'   : url
                }
    let responseData = await reqParam(data)
    if(responseData.shortUrl !== undefined){
        document.getElementById("stortURL").innerHTML = responseData.shortUrl
    }
    return responseData
}

function createQRCode(resData){
    document.getElementById("qrcode").innerHTML = ""
    let qrcode = new QRCode(document.getElementById("qrcode"));
    qrcode.makeCode(resData.destination)
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

function closeModal(){
    setPositionQR()
    document.getElementById("linkinput").value = ""
    changeClassList('bgModal' , 'remove' , 'block')
    changeClassList("body"    , 'remove' , 'overflowY_hidden')
}