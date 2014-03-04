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
        
        // window.btoa is a base64 converter for use with firebase IO.
        xhtmlreq.open("PUT","https://blistering-fire-7540.firebaseio.com/" + window.btoa(sUserID) + "/" + window.btoa(sScenarioName) + "/" + sLoanType + ".json",true);
        xhtmlreq.setRequestHeader("Content-Type", "application/json");
        xhtmlreq.send(JSON.stringify(data));

        // save data for session storage
        sessionStorage.setItem(sScenarioName + "|" + sLoanType,JSON.stringify(data));
        return true;
    }catch(exception){
        console.log(exception);
        return false;
    }
}


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
        // window.btoa is a base64 converter for use with firebase IO.
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

                        Object.keys(data[key]).forEach(function (key1, index1){
                            item = document.createElement("button");
                            out.appendChild(item);

                            // window.atob is converter from base64 back to base 16.
                            sSessionKey = window.atob(key);
                            
                            item.textContent = sSessionKey + " " + key1 ;
                            item.setAttribute("id",sSessionKey + "-" + key1);
                            item.keyValue = sSessionKey + "|" + key1;
                            item.addEventListener('click',btnScenario);

                            // save data for session storage
                            sessionStorage.setItem(sSessionKey + '|' +  key1,JSON.stringify(data[key][key1]));
                        });
                    });
                }
            }
        }
    }catch(exception){
        console.log(exception);
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
        // the window.btoa is a base64 converter.  This conversion is for the Firebase table IO.
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
        console.log(exception);
        return false;
    }
}

