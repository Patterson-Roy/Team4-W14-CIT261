function addRecords () {
    try{
        var sUserID = localStorage.getItem('nerdherdcalc-userid');
        var sScenarioName = document.getElementById("scenario-name").value;
        if(sUserID === null || 
           sUserID === "" || 
           typeof(sScenarioName) === undefined || 
           sScenarioName === "" || 
           sScenarioName === " " || 
           sScenarioName === null){
              console.log('add failed: user ID or scenario name not given.  User ID: ' + sUserID + '; scenario name: ' + sScenarioName +'.');
              return false;
        }
        
        var data = {}; // javascript object

        var xhtmlreq = new XMLHttpRequest();

        var sLoanType = document.getElementById("loan-type").value; // car, home, other
        var fRate = document.getElementById("rate").value;
        var fPrincipal = document.getElementById("principal").value;
        var iTerm = document.getElementById("periods").value;
        var sPdType = document.getElementById("period-type").value; // month, quarter, year
        var fPayment = document.getElementById("payment").value;
        var fTotal = document.getElementById("total").value;
        var fTotalInterest = document.getElementById("interest-total").value;

        data.principal = fPrincipal.replace( /,/g, "" ); // strip any commas;
        data.rate = fRate.replace( /,/g, "" ); // strip any commas;
        data.periodtype = sPdType;
        data.term = iTerm;
        data.payment = fPayment.replace( /,/g, "" ); // strip any commas
        data.total = fTotal.replace(/,/g,""); // strip any commas
        data.totalinterest = fTotalInterest.replace( /,/g, "" ); // strip any commas;

        xhtmlreq.open("PUT","https://blistering-fire-7540.firebaseio.com/" + window.btoa(sUserID) + "/" + window.btoa(sScenarioName) + "/" + sLoanType + ".json",true);
        xhtmlreq.setRequestHeader("Content-Type", "application/json");
        xhtmlreq.send(JSON.stringify(data));

        // save data for session storage
        sessionStorage.setItem(sScenarioName + "|" + sLoanType,JSON.stringify(data));
        return true;
    }catch(exception){
        return false;
    }
}


//var getRecord = function (event) {
//    event.preventDefault();
//    
//    var sUserID = localStorage.getItem('nerdherdcalc-userid');
//    if(sUserID === null || sUserID === "")
//        return;
//
//    
//    var sScenarioName = document.getElementById("scenario-name").value;
//    var sLoanType = document.getElementById("loan-type").value;
//    
//    var xhtmlreq= new XMLHttpRequest();
//    xhtmlreq.open("GET","https://blistering-fire-7540.firebaseio.com/" + sUserID + "/"+ sScenarioName + "/" + sLoanType +".json");
//    
//    xhtmlreq.send(null);
//    xhtmlreq.onreadystatechange = function(){
//        if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
//            var data = JSON.parse(xhtmlreq.responseText);
//            var output = document.getElementById("output");
//            if(typeof(data) !== "undefined" && data !== null){
//                document.getElementById("scenario-name").value = sScenarioName;
//                document.getElementById("loan-type").value = sLoanType; // car, home, other
//                document.getElementById("rate").value = NumberWithCommas(parseFloat(data.rate).toFixed(3));
//                document.getElementById("principal").value = NumberWithCommas(parseFloat(data.principal).toFixed(2));
//                document.getElementById("periods").value = parseInt(data.term);
//                document.getElementById("period-type").value = data.periodtype; // month, quarter, year
//                document.getElementById("payment").value = NumberWithCommas(parseFloat(data.payment).toFixed(2));
//                document.getElementById("total").value = NumberWithCommas(parseFloat(data.total).toFixed(2));
//                document.getElementById("interest-total").value = NumberWithCommas(parseFloat(data.totalinterest).toFixed(2));
//            }
//        }
//    }
//}


var getAllRecords = function (event) {
    try{
        event.preventDefault();

        var sUserID = localStorage.getItem('nerdherdcalc-userid');
        if(sUserID === null || sUserID === "")
            return;

        var out = document.getElementById("out");
        out.innerHTML = ""; // clear the HTML from previous reads

        var item = {};

        var xhtmlreq= new XMLHttpRequest();
        xhtmlreq.open("GET","https://blistering-fire-7540.firebaseio.com/" + window.btoa(sUserID) + ".json");

        xhtmlreq.send(null);
        xhtmlreq.onreadystatechange = function(){
            if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
                var data = JSON.parse(xhtmlreq.responseText);
                if(typeof(data) !== "undefined" && data !== null){
                    // data is an Object type.  The keys is an inherited function of Object that returns an array of keys to that object.
                    // we can do a forEach on the data object this way to get the parts and pieces we need for the app.
                    Object.keys(data).forEach(function (key, index) {
                        item=document.createElement("div");
                        out.appendChild(item);

                        Object.keys(data[key]).forEach(function (sLoanType, index1){
                            item = document.createElement("button");
                            out.appendChild(item);
                            
                            var sScenarioName = window.atob(key);

                            item.textContent = sScenarioName + " " + sLoanType ;
                            item.setAttribute("id",sScenarioName + "-" + sLoanType);
                            item.keyValue = sScenarioName + "|" + sLoanType;
                            item.addEventListener('click',btnScenario);

                            // save data for session storage
                            sessionStorage.setItem(sScenarioName + '|' +  sLoanType,JSON.stringify(data[key][sLoanType]));
                        });
                    });
                }
            }
        }
    }catch(exception){
    }
}

var delRecords = function(event){
    try{
        event.preventDefault();

        var sScenarioName = document.getElementById("scenario-name").value;
        var sLoanType = document.getElementById("loan-type").value;
        var sUserID = localStorage.getItem('nerdherdcalc-userid');
        if(sUserID === null || 
           sUserID === "" || 
           typeof(sScenarioName) === undefined || 
           sScenarioName === "" || 
           sScenarioName === " " || 
           sScenarioName === null ||
           typeof(sLoanType) === undefined ||
           sLoanType === "" ||
           sLoanType === " " ||
           sLoanType === null){
              console.log('delete failed: user ID, scenario name, or loan type is not given.  User ID: ' + sUserID + '; scenario name: ' + sScenarioName + + '; loan type: ' + sLoanType + '.');
              return false;
        }
        

        // look in the local session storage for the item.  If not found, then return
        var hold = sessionStorage.getItem(sScenarioName + "|" + sLoanType);
        if (hold === null){
            return false;
        }
        
        // remove the record from the database and from local session storage.

        var xhtmlreq = new XMLHttpRequest();
        var output = document.getElementById("out");
        xhtmlreq.open("DELETE","https://blistering-fire-7540.firebaseio.com/" + window.btoa(sUserID) + "/"+ window.btoa(sScenarioName) + "/" + sLoanType + ".json");
        xhtmlreq.send(null);
        xhtmlreq.onreadystatechange = function(){
            if(xhtmlreq.readyState == 4 && xhtmlreq.status == 200){
console.log("delete successful");
                output.removeChild(document.getElementById(sScenarioName + "-" + sLoanType));
                sessionStorage.removeItem(sScenarioName + "|" + sLoanType);
            }
        }
        return true;
    }catch(exception){
        return false;
    }
}

var newScenario = function(event){
    event.preventDefault();
    document.getElementById("scenario-name").value = "";
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
    document.getElementById("add-records").addEventListener('click', saveScenario);
    document.getElementById("delete-records").addEventListener('click', delRecords);
    document.getElementById("get-all-records").addEventListener('click', getAllRecords);

    document.getElementById("new").addEventListener('click', newScenario);
    document.getElementById("calculate").addEventListener('click', Calculate);
    
    document.getElementById("principal").addEventListener('change', fmtPrinc);
    document.getElementById("total").addEventListener('change', fmtTotal);
    document.getElementById("interest-total").addEventListener('change', fmtTotInt);
}

document.addEventListener("DOMContentLoaded",init);