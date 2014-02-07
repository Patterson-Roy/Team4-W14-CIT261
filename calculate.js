function Calculate () {
    

    if(CheckValues()){
        switch (this.whatToCalculate){
                case "principal":
                    CalcPrincipal();
                    return;
                
                case "payment":
                    CalcPayment();
                    return;
                
                case "term":
                    CalcPeriods();
                    return;
                
                case "rate":
                    CalcRate();
                    return;
                
                default:
                    return;
        }
    }
}

