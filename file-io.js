var m_sUserID = "secret user";
var addRecords = function (event) {
    event.preventDefault();
    output.textContent = "";

    var data = {}; // javascript object
    
    var xhtmlreq = new XMLHttpRequest();
    var rate = document.getElementById("rate").value;
    var principal = document.getElementById("principal").value;
    var sWhatIf = document.getElementById("what-if").value;
    
    if((sWhatIf !== typeof "undefined" && sWhatIf !== "" && sWhatIf !== null)){
        data.principal = principal;
        data.rate = rate;
        
        xhtmlreq.open("PUT","https://blistering-fire-7540.firebaseio.com/" + m_sUserID + "/" + sWhatIf + ".json",true);
        xhtmlreq.setRequestHeader("Content-Type", "application/json");
        xhtmlreq.send(JSON.stringify(data));
    }else{
        output.textContent = "record not added fields are empty";
    }
    
//    document.getElementById("principal").value="";
//    document.getElementById("rate").value="";
    document.getElementById("what-if").value="";
}


var getRecords = function (event) {
    event.preventDefault();
    
    var sWhatIf = document.getElementById("what-if").value;
    
    document.getElementById("output").textContent="";
    var xhtmlreq= new XMLHttpRequest();
    xhtmlreq.open("GET","https://blistering-fire-7540.firebaseio.com/" + m_sUserID + "/"+ sWhatIf + ".json");
    
    xhtmlreq.send(null);
    xhtmlreq.onreadystatechange = function(){
        if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
            console.log(xhtmlreq.responseText, xhtmlreq.responseType, xhtmlreq.responseXML);
            var data = JSON.parse(xhtmlreq.responseText);
            var output = document.getElementById("output");
            if(data !== typeof "undefined" && data !== null){
                output.textContent = data.principal + " " + data.rate;
            }
        }
    }
}


var getAllRecords = function (event) {
    event.preventDefault();
    
    var sWhatIf = document.getElementById("what-if").value;
    
    document.getElementById("output").textContent="";
    var xhtmlreq= new XMLHttpRequest();
    xhtmlreq.open("GET","https://blistering-fire-7540.firebaseio.com/" + m_sUserID + ".json");
    
    xhtmlreq.send(null);
    xhtmlreq.onreadystatechange = function(){
        if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
            console.log(xhtmlreq.responseText, xhtmlreq.responseType, xhtmlreq.responseXML);
            var data = JSON.parse(xhtmlreq.responseText);
            if(data !== typeof "undefined" && data !== null){
                // data is an Object type.  The keys is an inherited function of Object that returns an array of keys to that object.
                // we can do a forEach on the data object this way to get the parts and pieces we need for the app.
                Object.keys(data).forEach(function (key, index) {
                    document.getElementById("output" + index).textContent = "key: " + key + "   principal: " + data[key].principal + "   rate: " + data[key].rate;
                });
            }
        }
    }
}

var delRecords = function(event){
    event.preventDefault();
    
    var sWhatIf = document.getElementById("what-if").value;
    
    document.getElementById("output").textContent="";
    document.getElementById("output1").textContent="";
    document.getElementById("output2").textContent="";
    var xhtmlreq = new XMLHttpRequest();
    var output = document.getElementById("output");
    xhtmlreq.open("DELETE","https://blistering-fire-7540.firebaseio.com/" + m_sUserID + "/"+ sWhatIf + ".json");
    xhtmlreq.send(null);
    xhtmlreq.onreadystatechange = function(){
        if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
            console.log("delete successful");
            output.textContent = "";
        }
    }
}

var init = function(event){
    document.getElementById("add-records").addEventListener('click', addRecords);
    document.getElementById("delete-records").addEventListener('click', delRecords);
    document.getElementById("get-records").addEventListener('click', getRecords);
    document.getElementById("get-all-records").addEventListener('click', getAllRecords);
}

document.addEventListener("DOMContentLoaded",init);