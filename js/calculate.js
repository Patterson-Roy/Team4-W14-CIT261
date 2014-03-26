function Calculate () {
    var principal = parseFloat(document.getElementById('principal').value.replace( /,/g, "" ));
    var payment = parseFloat(document.getElementById('payment').value.replace( /,/g, "" ));
    var rate = parseFloat(document.getElementById('rate').value.replace( /,/g, "" ));
    var term = parseInt(document.getElementById('periods').value.replace( /,/g, "" ));
    var data = {};


        switch (this.whatToCalculate){
                case "principal":
                    data = CalcPrincipal(payment, rate, term);
                    break;
                
                case "payment":
                    data = CalcPayment(principal, rate, term);
                    break;
                
                case "periods":
                    data = CalcTerm(principal, rate, payment);
                    break;
                
                case "rate":
                    data = CalcRate(principal, payment, term);
                    break;
                
                default:
                    break;
        }
        

        document.getElementById("principal").value = NumberWithCommas(data.principal.toFixed(2));
        document.getElementById("payment").value = NumberWithCommas(data.payment.toFixed(2));
        document.getElementById("rate").value = NumberWithCommas(data.rate.toFixed(3));
        document.getElementById("periods").value = data.term;
        
        document.getElementById("total").value=NumberWithCommas(data.total.toFixed(2));
        document.getElementById("interest-total").value=NumberWithCommas(data.totalInt.toFixed(2));

        if(document.getElementById('principal').value != undefined && document.getElementById('principal').value > "0" &&
                document.getElementById('payment').value != undefined && document.getElementById('payment').value >"0" &&
                document.getElementById('rate').value != undefined && document.getElementById('rate').value > "0"){
            
            document.getElementById('loan-amt').textContent = document.getElementById('principal').value;
            removeClass(document.getElementById("amortizeButton"), "hide-me");
        }
}

function CalcPrincipal (payment, rate, term) {
    var data = {};
    var interest = rate * .01;
    var period = getPeriodsPerYear();
    var periodInterest = interest/period;
    
    data.principal = payment * (1-Math.pow((1 + periodInterest),(0-term)))/periodInterest;
    data.rate = rate;
    data.term = term;
    data.payment = parseFloat(payment);
    
    data.total = payment * term;
    data.totalInt = data.total - data.principal;

    return data;
}
    
function CalcPayment (principal, rate, term) {
    var data = {};
    var interest = rate * .01;
    var period = getPeriodsPerYear();
    var periodInterest = interest/period;
     
    //var payment = principal * periodInterest/denominator;
    data.principal = principal;
    data.rate = rate;
    data.term = term;
    data.payment = (principal * periodInterest * Math.pow((1+periodInterest),term))/(Math.pow((1+periodInterest),term)-1);
    data.total = data.payment * term;
    data.totalInt = data.total - principal;
    
    return data ;
    
}

function CalcTerm (principal, rate, payment) {
    var data = {};
    var interest = rate * .01;
    var period = getPeriodsPerYear();
    
    var pt1 = Math.log(1 - (principal/payment * interest/period));
    var pt2 = Math.log(1 + interest/period);
    var term =  parseInt(Math.abs(pt1 / pt2) + .5);


    data.principal = principal;
    data.rate = rate;
    data.term = term;
    data.payment = payment;
    data.total = payment * term;
    data.totalInt = data.total - principal;

    return data;
}

function CalcRate (principal, payment, term) {
    var data = {};
    var total = 0.0;
 
/*
 * approximation starting point
i ≈ [ ( 1 + ( P/A ) ) ^ 1/q  - 1 ] ^q  - 1

Where,
 q = log[ 1 + (1/N) ] / log2 
 P = Payment Amount
 A = Initial Amount 
 N = Number of Payments  
*/
    
    var q = Math.log(1 + 1/term)/Math.LN2;
    
    var period = getPeriodsPerYear();
    
    var rate = ((Math.pow((Math.pow((1+payment/principal),(1/q))-1), q) -1)* 100 * period) + 1;
    var calcPay = payment + 1;
    
    while(total < principal && calcPay > payment){
        
        rate -= .0001;

        calcPay = CalcPayment(principal, rate, term).payment;
        total = payment *((1-Math.pow(1+rate,-term))/rate);
    }
    
    data.principal = principal;
    data.rate = rate;
    data.payment = payment;
    data.term = term;
    
    data.total = payment * term;
    data.totalInt = data.total - principal;
    
    return data;
}
    
function getPeriodsPerYear(){
    var ppy = document.getElementById("period-type");
    var strPPY = ppy.options[ppy.selectedIndex].text;
        switch(strPPY){
            case "Month":
                return 12;
                break;
            case "Quarter":
                return 4;
                break;
            case "Year":
                return 1;
                break;
            default:
                return 12;
                break;
    }
}
