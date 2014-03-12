
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


function hasClass(el, name) {
   return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
}

function addClass(el, name){
    // remove all instances of the class first
    removeClass(el,name);
//    while(el.classList.contains(name)){
//       el.classList.remove(name);
//    }
    // now add the class
    el.classList.add(name);

//   if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
}

function removeClass(el, name)
{
    // remove all instances of the class first
    while(el.classList.contains(name)){
       el.classList.remove(name);
    }
//   if (hasClass(el, name)) {
//      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
//   }
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
        var sUserID = GetUserID();

        event.preventDefault();
        var item = {};

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
            return; // add failed, so just return here.
        }

        var sType = document.getElementById("loan-type");

        // build out the scenario button
        var btnButton = document.getElementById(sScenarioName.value + "-" + sType.value);
        if(!btnButton){
            item = document.createElement("button");
            out.appendChild(item);
            item.textContent = sScenarioName.value + " " +  sType.value;  // put the scenario key as the button name
            item.setAttribute("id",sScenarioName.value + "-" + sType.value);
            item.keyValue = sScenarioName.value + "|" + sType.value;
            item.addEventListener('click',btnScenario);// event handler
        }
    }catch( exception ){
    }
    return;
};

function LoadScenario(key){
    try{
        var data = JSON.parse(window.sessionStorage.getItem(key));
        
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
    
//    addClass(document.getElementById("out"), "hide-me");
    }catch(exception){
    }
}

var btnScenario = function(event) {
    try{
console.log(event.target.textContent);
        
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
    
};
 var btnGo = function(event){
     event.preventDefault();
    if(CheckValues() && validateInputs()){
        Calculate();
    }
     
 };


var init = function(event){
    document.getElementById("saveButton").addEventListener('click', saveScenario);
    document.getElementById("deleteButton").addEventListener('click', delRecords);
//    document.getElementById("get-all-records").addEventListener('click', getAllRecords);
    document.getElementById("open-load-screen").addEventListener('click', getAllRecords);
    
    

    document.getElementById("newButton").addEventListener('click', newScenario);
    document.getElementById("goButton").addEventListener('click', btnGo);
    
    document.getElementById("principal").addEventListener('change', fmtPrinc);
    document.getElementById("total").addEventListener('change', fmtTotal);
    document.getElementById("interest-total").addEventListener('change', fmtTotInt);
}

document.addEventListener("DOMContentLoaded",init);