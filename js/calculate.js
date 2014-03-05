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
                    CalcRate(principal, payment, periods);
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
    totalPrincipal = totalPrincipal.toFixed(2);
    document.getElementById("principal").value = NumberWithCommas(totalPrincipal);
    
    //Calculate principal plus interest giving loan total and loan interest total
    var paymentInt = payment + (payment * rate);
    paymentInt = parseFloat(paymentInt);
    var totalInt = paymentInt * periods;
     totalInt = parseFloat(totalInt);
    var loanInt = totalInt - totalPrincipal;
    loanInt = parseFloat(loanInt);
    
    totalInt = Math.round(totalInt).toFixed(2);
    loanInt = Math.round(loanInt).toFixed(2);
    
    document.getElementById('total').value = NumberWithCommas(totalInt);
    document.getElementById('interest-total').value = NumberWithCommas(loanInt);
    return;
}
    
function CalcPayment(principal, rate, periods, ppy) {
var payment = (principal*(rate/ppy)) / (1- Math.pow((1+(rate/ppy)), -periods));
payment = payment.toFixed(2);
    document.getElementById("payment").value = NumberWithCommas(payment);
    
        //Calculate principal plus interest giving loan total and loan interest total
    var paymentInt = payment + (payment * rate);
    paymentInt = parseFloat(paymentInt);
    var totalInt = paymentInt * periods;
     totalInt = parseFloat(totalInt);
    var loanInt = totalInt - principal;
    loanInt = parseFloat(loanInt);
    
    totalInt = Math.round(totalInt).toFixed(2);
    loanInt = Math.round(loanInt).toFixed(2);
    
    document.getElementById('total').value = NumberWithCommas(totalInt);
    document.getElementById('interest-total').value = NumberWithCommas(loanInt);
    return;
}

function CalcPeriods(principal, rate, ppy, payment) {
    
    var pt1 = Math.log(payment) - Math.log(payment - (principal*rate) / ppy) ;
    var pt2 = Math.log(1 + rate/ppy);
    var periods =  pt1 / pt2
    periods = parseFloat(periods.toFixed(2));
    document.getElementById("periods").value = periods;
    
           //Calculate principal plus interest giving loan total and loan interest total
    var paymentInt = payment + (payment * rate);
    paymentInt = parseFloat(paymentInt);
    var totalInt = paymentInt * periods;
     totalInt = parseFloat(totalInt);
    var loanInt = totalInt - principal;
    loanInt = parseFloat(loanInt);
    
    totalInt = Math.round(totalInt).toFixed(2);
    loanInt = Math.round(loanInt).toFixed(2);
    
    document.getElementById('total').value = NumberWithCommas(totalInt);
    document.getElementById('interest-total').value = NumberWithCommas(loanInt);
    return;
}

function CalcRate(principal, payment, periods) {
    var rate = 1.001;
    var total = 0;
    while(Math.abs(total)<principal){
        rate -= .00001;
        if(rate <= 0) break;
        total = payment *((1-Math.pow(1+rate,-periods))/rate);
    }
    rate = (rate * 100 * periods) + .005;
    rate = parseFloat(rate.toFixed(3));
    document.getElementById("rate").value = rate;
    
                //Calculate principal plus interest giving loan total and loan interest total
    var paymentInt = payment + (payment * rate);
    paymentInt = parseFloat(paymentInt);
    var totalInt = paymentInt * periods;
     totalInt = parseFloat(totalInt);
    var loanInt = totalInt - principal;
    loanInt = parseFloat(loanInt);
    
    totalInt = Math.round(totalInt).toFixed(2);
    loanInt = Math.round(loanInt).toFixed(2);
    
    document.getElementById('total').value = NumberWithCommas(totalInt);
    document.getElementById('interest-total').value = NumberWithCommas(loanInt);
    return;
}

    
function calcPeriodsPerYear(){
    var ppy = document.getElementById("period-type");
    var strPPY = ppy.options[ppy.selectedIndex].text;
        switch(strPPY){
            case "Month":
                return 12;
            case "Quarter":
                return 4;
            case "Year":
                return 1;
    }
}

