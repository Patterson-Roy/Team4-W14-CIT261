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


var btnOKClicked = function (event) {
    event.preventDefault();
    var bError = false;
    var sUserID = document.getElementById("user-id");
    var sScenarioName = document.getElementById("loan-name");
    if(typeof(sScenarioName.value) === undefined || sScenarioName.value === null || sScenarioName.value === ""){
        addClass(sScenarioName, "inError");
        alert("Scenario name cannot be blank.");
        bError = true;
    }
    if(typeof(sUserID.value) === undefined || sUserID.value === null || sUserID.value === ""){
        addClass(sUserID, "inError");
        alert("Invalid User Name cannot be blank.");
        bError = true;
    }
    
    
    if(bError) return;
    
//    addRecords();
    
    removeClass(sUserID, "inError");
    removeClass(sScenarioName, "inError");
    addClass(document.getElementById("save-window"), "hide-me"); 
    return;
}

var btnCancelClicked = function(event){
    var sUserID = document.getElementById("user-id");
    var sScenarioName = document.getElementById("scenario-name");
    removeClass(sUserID, "inError");
    removeClass(sScenarioName, "inError");
    addClass(document.getElementById("save-window"), "hide-me"); 
    return;
}

var saveScenario = function (event) {
    event.preventDefault();
    var secSave = document.getElementById("save-window");
    var secMain = document.getElementById("main");
    removeClass(secSave, "hide-me");
    
}

var btnScenario = function(event) {
    console.log("hello");
}
