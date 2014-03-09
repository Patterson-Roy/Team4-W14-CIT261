function addRecords () {
    try{
        var sUserID = GetUserID();

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

var getAllRecords = function (event) {
    try{
        event.preventDefault();
        var sUserID = GetUserID();

        if(sUserID === null || sUserID === "")
            return;

        var out = document.getElementById("out");
        var scenarioList = document.getElementById('scenario-list');
        out.innerHTML = ""; // clear the HTML from previous reads
        scenarioList.innerHTML = "";

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
                    Object.keys(data).forEach(function (sName, index) {
                                                
                        item=document.createElement("div");
                        out.appendChild(item);

                        Object.keys(data[sName]).forEach(function (sLoanType, index1){
                            item = document.createElement("button");
                            out.appendChild(item);

                            var sScenarioName = window.atob(sName);

                            item.textContent = sScenarioName + " " + sLoanType ;
                            item.setAttribute("id",sScenarioName + "-" + sLoanType);
                            item.keyValue = sScenarioName + "|" + sLoanType;
                            item.addEventListener('click',btnScenario);
                            
                            var icon = sLoanType === 'car'? 'images/icons/luxury3.png': sLoanType === 'home' ? 'images/icons/dwelling1.png' : sLoanType === 'other' ? 'images/icons/cash.png' : 'images/icons/cash.png';

                            // -- code to add the scenario to the load window
                            //          image, name,       loan type, loan amount, apr, uniqueID (javascript ref, no spaces)
//                            addScenario('images/icons/cash.png', sScenarioName, sLoanType, "3,000", "__", window.btoa(sScenarioName));
                            addScenario(icon, sScenarioName, sLoanType, NumberWithCommas(data[sName][sLoanType].principal), data[sName][sLoanType].rate, sName);
                            
                            // save data for session storage
                            sessionStorage.setItem(sScenarioName + '|' +  sLoanType,JSON.stringify(data[sName][sLoanType]));
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
        var sUserID = GetUserID();
        event.preventDefault();

        
        var sScenarioName = document.getElementById("scenario-name").value;
        var sLoanType = document.getElementById("loan-type").value;
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
              console.log('delete failed: user ID, scenario name, or loan type is not given or does not exist in the data base.  User ID: ', sUserID , '; scenario name: ', sScenarioName, '; loan type: ', sLoanType, '.');
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
        console.log('delete failed: ', exception);
        return false;
    }
}
