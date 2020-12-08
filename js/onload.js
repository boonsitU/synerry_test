let count_row = 0

async function getData(){
    let obj_data =  {
                      "type"          : "getData"       
                    }
    let createData = await reqParam(obj_data)
        createData = JSON.parse(createData)    
    await prepareData(createData)
    setPositionQR()
}

function prepareData(data){
    let obj_prepare =   {
                            "data"      : data      ,
                            "txtHead"   : ["Domain Name" , "Short Name" , "QR Code"]    ,
                            "key"       : ["domain_name" , "short_name"  , "qr_code"]    , 
                        }
    createElement(obj_prepare)
}

function createElement(obj){
    let thead       = document.getElementById("thead")
    let tbody       = document.getElementById("tbody")
    let rowElement  = document.createElement("TR")
    
    obj.txtHead.forEach(function(keyHead , count){
        let objElement = {
                            "element"   : rowElement    ,
                            "type"      : "TH"          ,
                            "id"        : "TH_" + count ,
                            "classname" : "bd1px padding1X0_5Y colorTH"       ,
                            "text"      : keyHead
                         }
        createDataElement(objElement)
    })
    thead.appendChild(rowElement)

    obj.data.forEach(function(data , countRow){
        let rowElementData  = document.createElement("TR")
        obj.key.forEach(async function(key , countData){
            let objElement = {
                                "element"   : rowElementData        ,
                                "type"      : "TD"                  ,
                                "id"        : "TD_" + countRow + "_" + countData     ,
                                "classname" : "bd1px padding1X0_5Y" ,
                                "text"      : data[key]
                            }
            
            await createDataElement(objElement)
            if(key === "qr_code"){
                qrcode = await new QRCode(document.getElementById("TD_" + countRow + "_" + countData)); 
                objElement['text']  = qrcode.makeCode(data.domain_name)
            }
        })
        tbody.appendChild(rowElementData)
        count_row = countRow
    })
}

function createDataElement(input){
    let element         = document.createElement(input.type)
    if(input.id !== undefined){
        element.setAttribute("id" , input.id)
    }

    if(input.attribute !== undefined){
        let arr_attribute = Object.entries(input.attribute)
        arr_attribute.forEach(function(attribute){
            element.setAttribute(attribute[0] , arrRow[attribute[1]])
        })
    }

    if(input.classname !== undefined){
        element.className = input.classname
    }
    
    if(input.text !== undefined){
        let txt_element     = document.createTextNode(input.text)
        element.appendChild(txt_element)
    }
    input.element.appendChild(element)
}

function setPositionQR(){
    let i = 0
    console.log(document.getElementsByTagName("IMG"))
    let element_img = document.getElementsByTagName("IMG")
    while(element_img[i]){
        element_img[i].style.width     = "10em"
        element_img[i].style.height    = "10em"
        console.log("element : " , element_img[i])
        i++
        
    }
}