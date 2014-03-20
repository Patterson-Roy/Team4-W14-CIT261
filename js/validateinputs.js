function CheckValues (){
    var arr = [];
    var sID ;
    arr = Array.prototype.slice.call(document.getElementsByClassName("required"));
    var count = 0;
    
    arr.forEach(function(item,index){
        item.value = item.value.replace( /,/g, "" ); // strip any commas
        if(typeof(item.value) === "undefined" || item.value === "" || item.value == "0" || item.value == null){
            count++;
            sID = item.id;
        }
        else{
            item.value = NumberWithCommas(item.value);
        }
    });
    
    
    if(count >1){
        var message = "only one entry can be blank";
        createMessage(message, 3);
        return false;
    }
    else if(count == 0){
        var message = "atleast one entry must be blank";
        createMessage(message, 3);
        return false;
    }
    
    this.whatToCalculate = sID;
    
    return true;
    
}

function validateInputs() {
    var arr = [];
    arr = Array.prototype.slice.call(document.getElementsByClassName("required"));
    for(var i = 0; i < arr.length; i++){
        arr[i].value = arr[i].value.replace( /,/g, "" )
        arr[i].value = Number(arr[i].value);
        if(isNaN(arr[i].value) || arr[i].value < 0){
            var message = "Please enter correct integer values.";
            showHideError(arr[i].id, message);    
                return false;
        }else{
        continue;
        }
    }
                return true;
    
//    arr.forEach(function(item,index){
//        item.value = parseFloat(item.value.replace( /,/g, "" )); // strip any commas
//        if(!typeof(item.value) === "number" || item.value < 0 ){
//            alert("Please enter correct integer values.");
//            return false;
//        }
//        else{
//            item.value = NumberWithCommas(item.value);
//            return true;
//        }
//    });
}

