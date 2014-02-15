var m_sUserID = localStorage.getItem("userid"); // "secret user";

if(m_sUserID == "" || m_sUserID == null)
    m_sUserID = "secret user";

var addRecords = function (event) {
    event.preventDefault();

    var data = {}; // javascript object
    
    var xhtmlreq = new XMLHttpRequest();
    
    var sScenarioName = document.getElementById("loan-name").value;
    var sLoanType = document.getElementById("loan-type").value; // car, home, other
    var fRate = document.getElementById("rate").value;
    var fPrincipal = document.getElementById("principal").value;
    var iTerm = document.getElementById("periods").value;
    var sPdType = document.getElementById("period-type").value; // month, quarter, year
    var fPayment = document.getElementById("payment").value;
    var fTotal = document.getElementById("total").value;
    var fTotalInterest = document.getElementById("interest-total").value;
    
    if((typeof(sScenarioName) !== "undefined" && sScenarioName !== "" && sScenarioName !== null)){
        data.principal = fPrincipal.replace( /,/g, "" ); // strip any commas;
        data.rate = fRate.replace( /,/g, "" ); // strip any commas;
        data.periodtype = sPdType;
        data.term = iTerm;
        data.payment = fPayment.replace( /,/g, "" ); // strip any commas
        data.total = fTotal.replace(/,/g,""); // strip any commas
        data.totalinterest = fTotalInterest.replace( /,/g, "" ); // strip any commas;
        
        xhtmlreq.open("PUT","https://blistering-fire-7540.firebaseio.com/" + m_sUserID + "/" + sScenarioName + "/" + sLoanType + ".json",true);
        xhtmlreq.setRequestHeader("Content-Type", "application/json");
        xhtmlreq.send(JSON.stringify(data));
    }else{
        alert("record not added fields are empty");
    }
}


var getRecord = function (event) {
    event.preventDefault();
    
    var sScenarioName = document.getElementById("loan-name").value;
    var sLoanType = document.getElementById("loan-type").value;
    
    var xhtmlreq= new XMLHttpRequest();
    xhtmlreq.open("GET","https://blistering-fire-7540.firebaseio.com/" + m_sUserID + "/"+ sScenarioName + "/" + sLoanType +".json");
    
    xhtmlreq.send(null);
    xhtmlreq.onreadystatechange = function(){
        if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
            console.log(xhtmlreq.responseText, xhtmlreq.responseType, xhtmlreq.responseXML);
            var data = JSON.parse(xhtmlreq.responseText);
            var output = document.getElementById("output");
            if(typeof(data) !== "undefined" && data !== null){
                document.getElementById("loan-name").value = sScenarioName;
                document.getElementById("loan-type").value = sLoanType; // car, home, other
                document.getElementById("rate").value = NumberWithCommas(parseFloat(data.rate).toFixed(3));
                document.getElementById("principal").value = NumberWithCommas(parseFloat(data.principal).toFixed(2));
                document.getElementById("periods").value = parseInt(data.term);
                document.getElementById("period-type").value = data.periodtype; // month, quarter, year
                document.getElementById("payment").value = NumberWithCommas(parseFloat(data.payment).toFixed(2));
                document.getElementById("total").value = NumberWithCommas(parseFloat(data.total).toFixed(2));
                document.getElementById("interest-total").value = NumberWithCommas(parseFloat(data.totalinterest).toFixed(2));
            }
        }
    }
}


var getAllRecords = function (event) {
    event.preventDefault();
    
    var out = document.getElementById("out");
    out.innerHTML = ""; // clear the HTML from previous reads
    
    var item = {};
    
    var xhtmlreq= new XMLHttpRequest();
    xhtmlreq.open("GET","https://blistering-fire-7540.firebaseio.com/" + m_sUserID + ".json");
    
    xhtmlreq.send(null);
    xhtmlreq.onreadystatechange = function(){
        if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
            console.log(xhtmlreq.responseText, xhtmlreq.responseType, xhtmlreq.responseXML);
            var data = JSON.parse(xhtmlreq.responseText);
            if(typeof(data) !== "undefined" && data !== null){
                // data is an Object type.  The keys is an inherited function of Object that returns an array of keys to that object.
                // we can do a forEach on the data object this way to get the parts and pieces we need for the app.
                Object.keys(data).forEach(function (key, index) {
                    item=document.createElement("div");
                    out.appendChild(item);
                    item.textContent = "outerkey: " + key;
                    Object.keys(data[key]).forEach(function (key1, index1){
                        item = document.createElement("div");
                        out.appendChild(item);
                        
                        console.log("inner loop key: ", key1, "  index:", index1);
                        item.textContent = "key: " + key1 + "  index: "+ index1 + "   principal: " + data[key][key1].principal + "   rate: " + data[key][key1].rate;
                    });
                });
            }
        }
    }
}

var delRecords = function(event){
    event.preventDefault();
    
    var sScenarioName = document.getElementById("loan-name").value;
    var sLoanType = document.getElementById("loan-type").value;
    
    document.getElementById("output").textContent="";
    document.getElementById("output1").textContent="";
    document.getElementById("output2").textContent="";
    var xhtmlreq = new XMLHttpRequest();
    var output = document.getElementById("output");
    xhtmlreq.open("DELETE","https://blistering-fire-7540.firebaseio.com/" + m_sUserID + "/"+ sScenarioName + "/" + sLoanType + ".json");
    xhtmlreq.send(null);
    xhtmlreq.onreadystatechange = function(){
        if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
            console.log("delete successful");
            output.textContent = "";
        }
    }
}

var newScenario = function(event){
    event.preventDefault();
    document.getElementById("loan-name").value = "";
    document.getElementById("loan-type").value = ""; // car, home, other
    document.getElementById("rate").value = "";
    document.getElementById("principal").value = "";
    document.getElementById("periods").value = "";
    document.getElementById("period-type").value = ""; // month, quarter, year
    document.getElementById("payment").value = "";
    document.getElementById("total").value = "";
    document.getElementById("interest-total").value = "";
    
}

var init = function(event){
    document.getElementById("add-records").addEventListener('click', addRecords);
    document.getElementById("delete-records").addEventListener('click', delRecords);
    document.getElementById("get-records").addEventListener('click', getRecord);
    document.getElementById("get-all-records").addEventListener('click', getAllRecords);
    document.getElementById("new").addEventListener('click', newScenario);
    document.getElementById("calculate").addEventListener('click', Calculate);
    
    document.getElementById("principal").addEventListener('change', fmtPrinc);
    document.getElementById("total").addEventListener('change', fmtTotal);
    document.getElementById("interest-total").addEventListener('change', fmtTotInt);
    

}

document.addEventListener("DOMContentLoaded",init);