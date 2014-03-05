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
        alert("only one entry can be blank");
        return false;
    }
    else if(count == 0){
        alert("at least one enty has to be blank");
        return false;
    }
    
    this.whatToCalculate = sID;
    
    return true;
    
}

function validateInputs() {
    var arr = [];
    arr = Array.prototype.slice.call(document.getElementsByClassName("required"));
    for(var i = 1; i < arr.length; i++){
        arr[i].value = Number(arr[i].value.replace( /,/g, "" ));
        if(arr[i].value < 0 || !typeof(arr[i].value) === "number"){
        alert("Please enter correct integer values.");
            return false;
        }else{
        arr[i].value = NumberWithCommas(arr[i].value);
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

