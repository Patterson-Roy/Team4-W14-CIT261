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
    try{
        event.preventDefault();
        var item = {};
        var sUserID = localStorage.getItem('nerherdcalc-userid');

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

                        sUserID = sUserID.replace( /\./g, "" ); // strip out periods as firebase doesn't like them
                        // save User ID to persistent local storage
                        localStorage.setItem('nerdherdcalc-userid', sUserID);
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
            item.addEventListener('click',btnScenario);// event handler
        }
    }catch( exception ){
    }
    return;
}

function LoadScenario(key){
    try{
        var data = JSON.parse(sessionStorage.getItem(key));
        
        var arrMyArr = key.split("|");

        document.getElementById("loan-name").value = arrMyArr[0]; // scenario name
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
        
        // get the button text -- it's the key 
        var key = event.target.textContent;

        LoadScenario(key);
    }catch(exception){
    }
}
