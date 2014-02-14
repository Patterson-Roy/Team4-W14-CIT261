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

var newListener = function () {
    var submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', clickIt);
    
    var resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', resetIt);
    
    var prinFld = document.getElementById("principal");
    prinFld.addEventListener('change', fmtPrinc);
};

document.addEventListener('DOMContentLoaded', newListener);
        
