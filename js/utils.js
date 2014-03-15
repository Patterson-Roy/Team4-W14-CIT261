
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


function GetPeriodIndicator(){
    return document.getElementById("period_type").value;
}


function NumberWithCommas(x) {
    var parts = x.toString().split("."); // split the number on the decimal
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // insert the commas
    return parts.join("."); // reassemble the number on the decimal
}

function ValidateEmail(mail){
    
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
    {  
        return true; 
    }
    return false;
} 


function hasClass(el, name) {
   return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
}

function addClass(el, name){
    // remove all instances of the class first
    removeClass(el,name);

    // now add the class
    el.classList.add(name);
}

function removeClass(el, name)
{
    // remove all instances of the class 
    while(el.classList.contains(name)){
       el.classList.remove(name);
    }
}

function GetUserID (){
    try{
        return localStorage.getItem('nerdherdcalc-userid');
    }catch(exception){
        return null;
    }
};

var saveScenario = function (event) {
    try{
        if(validateInputs() && CheckValues()){
        var sUserID = GetUserID();

        event.preventDefault();

        // if no previous user id, then prompt for it and store it as applicable.
        if(typeof(sUserID) === undefined || sUserID === null || 
            typeof(sUserID.value) === undefined || sUserID.value === null || sUserID.value === ""){

            // loop until either cancel or a valid value is keyed in.
            while(!ValidateEmail(sUserID)){
                sUserID = prompt("Enter valid email address","");

                // if cancel button on prompt was clicked, null is returned.
                if(sUserID === null){
                    return;
                }
                else{
                    // else, validate the value to email address.
                    if(ValidateEmail(sUserID)){
                        // save User ID to persistent local storage
                        localStorage.setItem('nerdherdcalc-userid', sUserID);
                        break;

                    }
                }
            }
        }

        var sScenarioName = document.getElementById("scenario-name");

        if(typeof(sScenarioName.value) === undefined || sScenarioName.value === null || sScenarioName.value === "" || sScenarioName === " "){
            addClass(sScenarioName, "inError");
            alert("Scenario name cannot be blank.");
            return;
        }else{
            removeClass(sScenarioName, 'inError');
        }
        // attempt to add the records to firebase

        if(!addRecords()){
            return false; // add failed, so just return here.
        }
        
        removeClass(document.getElementById("amortButton"), "hide-me");
        }
    }catch( exception ){
    }
    return;
};

function LoadScenario(key){
    try{
        var data = JSON.parse(window.sessionStorage.getItem(key));
        
        // get the key from the button key (parameter passed in)
        var arrMyArr = key.split("|");

        document.getElementById("scenario-name").value = arrMyArr[0]; // scenario name
        document.getElementById("loan-type").value = arrMyArr[1]; // car, home, other
        document.getElementById("rate").value = NumberWithCommas(parseFloat(data.rate).toFixed(3));
        document.getElementById("principal").value = NumberWithCommas(parseFloat(data.principal).toFixed(2));
        document.getElementById("periods").value = parseInt(data.term);
        document.getElementById("period-type").value = data.periodtype; // month, quarter, year
        document.getElementById("payment").value = NumberWithCommas(parseFloat(data.payment).toFixed(2));
        document.getElementById("total").value = NumberWithCommas(parseFloat(data.total).toFixed(2));
        document.getElementById("interest-total").value = NumberWithCommas(parseFloat(data.totalinterest).toFixed(2));
        
        removeClass(document.getElementById("amortButton"), "hide-me");

    
    }catch(exception){
    }
}

var btnScenario = function(event) {
    try{
        
        // click the close button on the scenario list
        
        document.getElementById("close-modal").click();
        
        removeClass(document.getElementById("scenario-name"), "inError");
        
        // get the button key 
        var key = event.target.keyValue;

        LoadScenario(key);
    }catch(exception){
        console.log(exception);
    }
};


var newScenario = function(event){
    event.preventDefault();
    var sClass = 'inError';
    document.getElementById("scenario-name").value = "";
    removeClass(document.getElementById("scenario-name"),sClass);
    document.getElementById("loan-type").value = "car"; // car, home, other
    removeClass(document.getElementById("loan-type"),sClass);
    document.getElementById("rate").value = "";
    removeClass(document.getElementById("rate"),sClass);
    document.getElementById("principal").value = "";
    removeClass(document.getElementById("principal"),sClass);
    document.getElementById("periods").value = "";
    removeClass(document.getElementById("periods"),sClass);
    document.getElementById("period-type").value = "mo"; // month, quarter, year
    removeClass(document.getElementById("period-type"),sClass);
    document.getElementById("payment").value = "";
    removeClass(document.getElementById("payment"),sClass);

    document.getElementById("total").value = "";
    document.getElementById("interest-total").value = "";
    
    addClass(document.getElementById("amortButton"), "hide-me");

};
 var btnGo = function(event){
     event.preventDefault();
    if(CheckValues() && validateInputs()){
        Calculate();
        removeClass(document.getElementById("amortButton"), "hide-me");
    }
     
 };

var btnAmortize = function (event){
    var nPrincipal = document.getElementById('principal').value;
    nPrincipal = nPrincipal.replace( /,/g, "" );
    nPrincipal = parseFloat(nPrincipal);
    var nPayment = document.getElementById('payment').value;
    nPayment = nPayment.replace( /,/g, "" );
    nPayment = parseFloat(nPayment);
    var nRate = document.getElementById('rate').value;
    nRate = nRate.replace( /,/g, "" );
    nRate = parseFloat(nRate);
    var period = calcPeriodsPerYear();
    var nPdRate = (nRate * .01)/period;

    AmortizeLoan(nPrincipal, nPayment, nRate, nPdRate);
    
    document.getElementById("loan-amt").textContent=document.getElementById('principal').value;
};

var btnAmortCancel = function (event){
    event.preventDefault();
    addClass(document.getElementById('amortization-container'),'hide-me');
    document.getElementById('amortize-table').innerHTML = "";
};

var init = function(event){
    document.getElementById("saveButton").addEventListener('click', saveScenario);
    document.getElementById("deleteButton").addEventListener('click', delRecords);
    document.getElementById("open-load-screen").addEventListener('click', getAllRecords);

    document.getElementById("newButton").addEventListener('click', newScenario);
    document.getElementById("goButton").addEventListener('click', btnGo);

    document.getElementById("amortButton").addEventListener('click', btnAmortize);
    document.getElementById("amort-cancel").addEventListener('click', btnAmortCancel);
    
    document.getElementById("principal").addEventListener('change', fmtPrinc);
    document.getElementById("total").addEventListener('change', fmtTotal);
    document.getElementById("interest-total").addEventListener('change', fmtTotInt);
}

document.addEventListener("DOMContentLoaded",init);