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

// insert commas for display to the form.
function NumberWithCommas(sValue) {
    var parts = sValue.toString().split("."); // split the number on the decimal
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // insert the commas
    return parts.join("."); // reassemble the number on the decimal
}

// validate the input to conform to email format
function ValidateEmail(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
    {  
        return true; 
    }
    return false;
} 





// This function is the button handler for saving a scenario
var saveScenario = function (event) {
    try{
        event.preventDefault();
        var item = {};
        var sUserID = localStorage.getItem('nerdherdcalc-userid');

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

                        //sUserID = sUserID.replace( /\./g, "" ); // strip out periods as firebase doesn't like them
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
            item.keyValue = sScenarioName.value + "|" + sType.value;
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
        
        removeClass(document.getElementById("scenario-name"), "inError");
        
        // get the button key 
        var key = event.target.keyValue;

        LoadScenario(key);
    }catch(exception){
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


// initialization function to load event listeners for static buttons and the like.
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






// the encoder and decoder might be abandoned

// firebase encode/decoder
var forbiddenChars = '.$[]#/'.split(''); //contains the firebase forbidden characters

// function is designed to take in a simple string and then replace the offensive characters with 
// %ascii_character%. It is designed to be called on any code that is sent to firebase.
function firebaseEncode(str)
{
    var encodedStr = str;
    
    for (var i = 0; i<forbiddenChars.length; i++)
    {
        while ( encodedStr.indexOf(forbiddenChars[i]) != -1 ) {
            encodedStr = encodedStr.replace(forbiddenChars[i], '%' + forbiddenChars[i].charCodeAt(0) + '%');
        };
        
       // encodedStr.replace(new RegExp(forbiddenChars[i], 'g'), '%' + forbiddenChars[i].charCodeAt(0) + '%');
    }
    
    return encodedStr;
}

// function is designed to take in a string that has been encoded with the matching encoder and reverse the string
// back to its human readiable form.
function firebaseDecode(encodedStr)
{
    var decodedStr = encodedStr;
    
    for (var i = 0; i<forbiddenChars.length; i++)
    {
        while ( decodedStr.indexOf('%' + forbiddenChars[i].charCodeAt(0) + '%') != -1 ) {
            decodedStr = decodedStr.replace('%' + forbiddenChars[i].charCodeAt(0) + '%', forbiddenChars[i]);
        };
        
       // encodedStr.replace(new RegExp(forbiddenChars[i], 'g'), '%' + forbiddenChars[i].charCodeAt(0) + '%');
    }
    
    return decodedStr;
}

