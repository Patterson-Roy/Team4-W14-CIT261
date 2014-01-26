var addRecords = function (event) {
    event.preventDefault();
    output.textContent = "";
    var recKey="";

    var data = {}; // javascript object
    
    var xhtmlreq = new XMLHttpRequest();
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    
    if((name !== typeof "undefined" && name !== "" && name !== null) &&
       (address !== typeof "undefined" && address !== "" && address !== null)){
        data.name = name;
        data.address = address;
        recKey=name+address;
        xhtmlreq.open("PUT","https://blistering-fire-7540.firebaseio.com/testdata.json",true);
        xhtmlreq.setRequestHeader("Content-Type", "application/json");
        xhtmlreq.send(JSON.stringify(data));
    }else{
        output.textContent = "record not added fields are empty";
    }
    
    document.getElementById("name").value="";
    document.getElementById("address").value="";
}


var getRecords = function (event) {
    event.preventDefault();
    document.getElementById("output").textContent="";
    var xhtmlreq= new XMLHttpRequest();
    xhtmlreq.open("GET","https://blistering-fire-7540.firebaseio.com/testdata.json");
    
    xhtmlreq.send(null);
    xhtmlreq.onreadystatechange = function(){
        if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
            console.log(xhtmlreq.responseText, xhtmlreq.responseType, xhtmlreq.responseXML);
            var data = JSON.parse(xhtmlreq.responseText);
            var output = document.getElementById("output");
            if(data !== typeof "undefined" && data !== null){
                output.textContent = data.name + " " + data.address;
            }
        }
    }
}

var delRecords = function(event){
    event.preventDefault();
    document.getElementById("output").textContent="";
    var xhtmlreq = new XMLHttpRequest();
    var output = document.getElementById("output");
    xhtmlreq.open("DELETE","https://blistering-fire-7540.firebaseio.com/testdata.json");
    xhtmlreq.send(null);
    xhtmlreq.onreadystatechange = function(){
        if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
            console.log("delete successful");
            output.textContent = "";
        }
    }
}

var init = function(event){
    document.getElementById("add-records").addEventListener('click',addRecords);
    document.getElementById("delete-records").addEventListener('click',delRecords);
    document.getElementById("get-records").addEventListener('click',getRecords);
}

document.addEventListener("DOMContentLoaded",init);