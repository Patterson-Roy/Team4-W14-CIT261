var addRecords = function(event) {
    event.preventDefault();
    var data = {}; // javascript object
    
    var xhtmlreq = new XMLHttpRequest();
    var name = document.getElementById("name");
    var address = document.getElementById("address");
    
    data.name = name;
    data.address = address;
    
    xhtmlreq.open("PUT","https://brilliant-fire-7921.firebaseio.com/users/jack.json",true);
    xhtmlreq.setRequestHeader("Content-Type", "application/json");
    xhtmlreq.send(JSON.stringify(data));
    
    name.value="";
    address.value="";
}


var getRecords = function(event) {
    event.preventDefault();
    var xhtmlreq= new XMLHttpRequest();
    xhtmlreq.open("GET","https://brilliant-fire-7921.firebaseio.com/users/jack.json");
    
    xhtmlreq.send(null);
    xhtmlreq.onreadystatechange = function(){
        if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
            console.log(xhtmlreq.responseText, xhtmlreq.responseType, xhtmlreq.responseXML);
            var data = JSON.parse(xhtmlreq.responseText);
            var name = document.getElementById("name");
            var address = document.getElementById("address");
            name.value = data.name;
            address.value = data.address;
            var output = document.getElementById("output");
            output.value = data.name + " " + data.address;
        }
    }
}

var delRecords = function(event){
    event.preventDefault();
    var xhtmlreq = new XMLHttpRequest();
    xhtmlreq.open("DELETE","https://brilliant-fire-7921.firebaseio.com/users/jack.json");
    xhtmlreq.send(null);
    xhtmlreq.onreadystatechange = function(){
        if(xhtmlreq.readyState == 4 && xhtmlreq.status == 204){
            console.log("delete successful");
            var output = document.getElementById("output");
            output.value = "";
        }
        else{
            output.value = "error";
        }
    }
}

var init = function(event){
    document.getElementById("add-records").addEventListener(addRecords);
    document.getElementById("delete-records").addEventListener(delRecords);
    document.getElementById("get-records").addEventListener(getRecords);
}

document.addEventListener("DOMContentLoaded",init);