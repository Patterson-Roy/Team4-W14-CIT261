function CheckValues (){
    var arr = [];
    var sID ;
    arr = Array.prototype.slice.call(document.getElementsByClassName("required"));
    var count = 0;
    
    arr.forEach(function(item,index){
        item.value = item.value.replace( /,/g, "" ); // strip any commas
        if(typeof(item.value) === "undefined" || item.value === "" || item.value == "0" || isNaN(item.value)){
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

