function Calculate () {
    // Bring in values, convert from string to Float(int)
    var rate = parseFloat(document.getElementById("rate").value.replace(/,/g, ""));
    rate = rate/100;
    var principal = parseFloat(document.getElementById("principal").value.replace(/,/g, ""));
    var periods = parseFloat(document.getElementById("periods").value.replace(/,/g, ""));
    var ppy = parseFloat(calcPeriodsPerYear());
    var payment = parseFloat(document.getElementById("payment").value.replace(/,/g, ""));
  
        switch (this.whatToCalculate){
                case "principal":
                    CalcPrincipal(rate, periods, ppy, payment);
                    return;
                
                case "payment":
                    CalcPayment(principal, rate, periods, ppy);
                    return;
                
                case "periods":
                    CalcPeriods(principal, rate, ppy, payment);
                    return;
                
                case "rate":
                    CalcRate(principal, payment, ppy, periods);
                    return;
                
                default:
                    return;
        }
}

//principal = loan amount
//rate = interest rate
//periods = number of period.
//ppy = periods/year

function CalcPrincipal(rate, periods, ppy, payment) {
    var totalPrincipal = (payment * (1- Math.pow((1+(rate/ppy)), -periods))) / (rate/ppy);
    
    //Calculate principal plus interest giving loan total and loan interest total
    
    var loanTotal = payment * periods;
    loanTotal = parseFloat(loanTotal);
    var loanInt = loanTotal - totalPrincipal;
    loanInt = parseFloat(loanInt);

    document.getElementById("principal").value = NumberWithCommas(totalPrincipal.toFixed(2));
    document.getElementById('total').value = NumberWithCommas(loanTotal.toFixed(2));
    document.getElementById('interest-total').value = NumberWithCommas(loanInt.toFixed(2));
    return;
}
    
function CalcPayment(principal, rate, periods, ppy) {
    
        // calculate the payment value
    
    var payment = parseFloat((principal*(rate/ppy)) / (1- Math.pow((1+(rate/ppy)), -periods)));

        //Calculate principal plus interest giving loan total and loan interest total
        
    var loanTotal = payment * periods;
    loanTotal = parseFloat(loanTotal);
    var loanInt = loanTotal - principal;
    loanInt = parseFloat(loanInt);
    
        // now set the decimal precision to avoid rounding errors
    
    document.getElementById("payment").value = NumberWithCommas(payment.toFixed(2));

    // reformat the principal
    // string any commas first, then reformat for display
    document.getElementById("principal").value = document.getElementById("principal").value.replace(/,/g, "");
    document.getElementById("principal").value = NumberWithCommas(parseFloat(document.getElementById("principal").value).toFixed(2));
    
    document.getElementById('total').value = NumberWithCommas(loanTotal.toFixed(2));
    document.getElementById('interest-total').value = NumberWithCommas(loanInt.toFixed(2));
    return;
}

function CalcPeriods(principal, rate, ppy, payment) {
    
//    var pt1 = Math.log(payment) - Math.log(payment - (principal*rate) / ppy) ;
    var pt1 = Math.log(1 - (principal/payment * rate/ppy));
    var pt2 = Math.log(1 + rate/ppy);
    var periods =  parseInt(Math.abs(pt1 / pt2) + .5);
//    periods = parseInt(periods + .5);
    
       //Calculate principal plus interest giving loan total and loan interest total
    var loanTotal = payment * periods;
    loanTotal = parseFloat(loanTotal);
    var loanInt = loanTotal - principal;
    loanInt = parseFloat(loanInt);
    
    document.getElementById("periods").value = periods;

    // reformat the principal
    // string any commas first, then reformat for display
    document.getElementById("principal").value = document.getElementById("principal").value.replace(/,/g, "");
    document.getElementById("principal").value = NumberWithCommas(parseFloat(document.getElementById("principal").value).toFixed(2));
    
    document.getElementById('total').value = NumberWithCommas(loanTotal.toFixed(2));
    document.getElementById('interest-total').value = NumberWithCommas(loanInt.toFixed(2));
    return;
}

function CalcRate(principal, payment, ppy, periods) {
    
    var rate = 1.001;
    var total = 0;
    while(Math.abs(total)<principal){
        rate -= .00001;
        if(rate <= 0) break;
        total = payment *((1-Math.pow(1+rate,-periods))/rate);
    }
    rate = (rate * 100 * ppy) + .005;
    
        //Calculate principal plus interest giving loan total and loan interest total
    var loanTotal = payment * periods;
    loanTotal = parseFloat(loanTotal);
    var loanInt = totalInt - principal;
    loanInt = parseFloat(loanInt);
    
    document.getElementById("rate").value = NumberWithCommas(parseFloat(rate.toFixed(3)));

    // reformat the principal
    // string any commas first, then reformat for display
    document.getElementById("principal").value = document.getElementById("principal").value.replace(/,/g, "");
    document.getElementById("principal").value = NumberWithCommas(parseFloat(document.getElementById("principal").value).toFixed(2));
    
    document.getElementById('total').value = NumberWithCommas(loanTotal.toFixed(2));
    document.getElementById('interest-total').value = NumberWithCommas(loanInt.toFixed(2));
    return;
}

    
function calcPeriodsPerYear(){
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

