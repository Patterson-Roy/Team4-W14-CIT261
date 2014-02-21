var clickIt = function (event) {
    event.preventDefault(); //stop the href link
    Calculate();
};

var fmtPrinc = function (event) {
    var principal = document.getElementById("principal").value;
    if (typeof(principal) !== "undefined" && principal !== null && principal !== "" && !isNaN(principal)) {
        document.getElementById("principal").value = NumberWithCommas(parseFloat(principal).toFixed(2));
    }
};

var resetIt = function (event) {
    event.preventDefault(); // stop propagation
    var arr = Array.prototype.slice.call(document.getElementsByClassName("required"));
    
    arr.forEach(function (item, index) {
        item.value = "";
        removeClass(item, "in-error");
        
    });
};

var saveScenario = function (event) {
    event.preventDefault();
    var secSave = document.getElementById("save-section");
    var secMain = document.getElementById("main");
    addClass(secMain, "hide-me");
    removeClass(secSave, "hide-me");
}

var btnOKClicked = function (event) {
    event.preventDefault();
    var sScenarioName = document.getElementById("scenario-name");
    if(typeof(sScenarioName.value) === undefined || sScenarioName.value === null || sScenarioName.value === ""){
        addClass(sScenarioName, "error");
        alert("Scenario name cannot be blank.");
        return;
    }
}

var newListener = function () {
    var submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', clickIt);
    
    var resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', resetIt);
    
    var prinFld = document.getElementById("principal");
    prinFld.addEventListener('change', fmtPrinc);
    
    var btnSave = document.getElementById("add-records");
    btnSave.addEventListener('click', saveScenario);
    
    var btnOK = document.getElementById("OK");
    btnOK.addEventListener('click', btnOKClicked);
};

document.addEventListener('DOMContentLoaded', newListener);
        
