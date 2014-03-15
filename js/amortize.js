function AmortizeLoan(nStart, nPayment, nRate, nPdRate){
    var amortContainer = document.getElementById('amortization-container');
    removeClass(amortContainer,'hide-me');
    var tAmort = document.getElementById('amortize-table');
    tAmort.innerHTML = "";

    var nInterest = 0.00;
    var nPrincipal = 0.00;
    var nBalance = nStart;
    var iCounter = 1;

    while(nBalance > 0.00){
        nInterest = nBalance * nPdRate;
        nPrincipal = nPayment - nInterest;
        nBalance -= nPrincipal;
        if(nBalance < 0.00){
            nPrincipal += nBalance;
            nBalance = 0.00;
        }
        BuildTable(tAmort, iCounter, 
                   NumberWithCommas(nPayment.toFixed(2)), 
                   NumberWithCommas(nPrincipal.toFixed(2)), 
                   NumberWithCommas(nInterest.toFixed(2)), 
                   NumberWithCommas(nBalance.toFixed(2)));
        iCounter++;
    }
}

function BuildTable(tAmortTable, iCounter, nPayment, nPrincipal, nInterest, nBalance){
    var tRow = document.createElement('tr');
    var tData = AddRow(iCounter,iCounter, 1);
    tRow.appendChild(tData);
    tData = AddRow(nPayment,iCounter, 2);
    tRow.appendChild(tData);
    tData = AddRow(nInterest,iCounter, 3);
    tRow.appendChild(tData);
    tData = AddRow(nPrincipal,iCounter, 4);
    tRow.appendChild(tData);
    tData = AddRow(nBalance,iCounter, 5);
    tRow.appendChild(tData);

    tAmortTable.appendChild(tRow);
}

function AddRow(data, iCounter, iCell){
    var tData = document.createElement('td');
    tData.textContent = data;
    tData.id = 'row_' + iCounter + '_cell_' + iCell;
    addClass(tData, 'data-row');
    return tData;
}
