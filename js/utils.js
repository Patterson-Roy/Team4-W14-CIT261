var fmtPrinc = function (event) {
    var principal = document.getElementById("principal").value;
    if (typeof(principal) !== "undefined" && principal !== null && principal !== "" && !isNaN(principal)) {
        document.getElementById("principal").value = NumberWithCommas(parseFloat(principal).toFixed(2));
    }
};

var fmtTotal = function (event) {
    var total = document.getElementById("total").value;
    if (typeof(total) !== "undefined" && total !== null && total !== "" && !isNaN(total)) {
        document.getElementById("total").value = NumberWithCommas(parseFloat(total).toFixed(2));
    }
};

var fmtTotInt = function (event) {
    var totalInt = document.getElementById("interest-total").value;
    if (typeof(totalInt) !== "undefined" && totalInt !== null && totalInt !== "" && !isNaN(totalInt)) {
        document.getElementById("interest-total").value = NumberWithCommas(parseFloat(totalInt).toFixed(2));
    }
};


function hasClass(el, name) {
   return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
}

function addClass(el, name)
{
   if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
}

function removeClass(el, name)
{
   if (hasClass(el, name)) {
      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
   }
}


function GetPeriodIndicator(){
    return document.getElementById("period_type").value;
}


function NumberWithCommas(x) {
    var parts = x.toString().split("."); // split the number on the decimal
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // insert the commas
    return parts.join("."); // reassemble the number on the decimal
}

function ValidateEmail(mail){
/*
    if(typeof (mail) !== undefined && mail !== "" && mail !== null){
        return true;
    }else{
        return false;
    }
*/
    
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
    {  
        return true; 
    }
    return false;
} 


var saveScenario = function (event) {
    event.preventDefault();
    var item = {};
    var sUserID = localStorage.getItem('userid');
    if(typeof(sUserID) === undefined || sUserID === null || 
        typeof(sUserID.value) === undefined || sUserID.value === null || sUserID.value === ""){
        while(!ValidateEmail(sUserID)){
            sUserID = prompt("Enter valid email address","");
            // if cancel button on prompt was clicked, null is returned.
            if(sUserID === null){
                return;
            }
            else{
                if(ValidateEmail(sUserID)){
                    sUserID = sUserID.replace( /\./g, "" ); // strip out periods
                    // save User ID to persistent local storage
                    localStorage.setItem('userid', sUserID);
                    break;
                }
            }
        }
    }

    var sScenarioName = document.getElementById("loan-name");
    if(typeof(sScenarioName.value) === undefined || sScenarioName.value === null || sScenarioName.value === ""){
        addClass(sScenarioName, "inError");
        alert("Scenario name cannot be blank.");
        return;
    }else{
        removeClass(sScenarioName, "inError");
    }
    
    if(!addRecords()){
        return;
    }
    
    var sType = document.getElementById("loan-type");
    
    // build out the scenario button
    var btnButton = document.getElementById(sScenarioName.value + "-" + sType.value);
    if(!btnButton){
        item = document.createElement("button");
        out.appendChild(item);
        item.textContent = sScenarioName.value + " " +  sType.value;
        item.setAttribute("id",sScenarioName.value + "-" + sType.value);
        item.addEventListener('click',btnScenario);
    }
    
    return;
}

function LoadScenario(sScenarioName, sLoanType){
    var data = JSON.parse(sessionStorage.getItem(sScenarioName + sLoanType));
    
    document.getElementById("loan-name").value = sScenarioName;
    document.getElementById("loan-type").value = sLoanType; // car, home, other
    document.getElementById("rate").value = NumberWithCommas(parseFloat(data.rate).toFixed(3));
    document.getElementById("principal").value = NumberWithCommas(parseFloat(data.principal).toFixed(2));
    document.getElementById("periods").value = parseInt(data.term);
    document.getElementById("period-type").value = data.periodtype; // month, quarter, year
    document.getElementById("payment").value = NumberWithCommas(parseFloat(data.payment).toFixed(2));
    document.getElementById("total").value = NumberWithCommas(parseFloat(data.total).toFixed(2));
    document.getElementById("interest-total").value = NumberWithCommas(parseFloat(data.totalinterest).toFixed(2));
    
//    addClass(document.getElementById("out"), "hide-me");
}

var btnScenario = function(event) {
console.log(event.target.textContent);
    var key = event.target.textContent;
console.log(key.split(" "));
    var aMyArray = key.split(" ");
    var sScenarioName = aMyArray[0];
    var sLoanType = aMyArray[1];
    LoadScenario(sScenarioName, sLoanType);
}
