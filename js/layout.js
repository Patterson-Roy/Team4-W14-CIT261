// 
// this javascript class was coded by Charles Jackson
//

/// Scenario Loading Screens

// the unique id will be returned from the listerner method
function addScenario( iconURL, name, type, value, apr, uniqueID )
{
    // check to see if the scenario-list exists
    var scenarioListWin = document.getElementById('scenario-list');
    if (!(typeof(scenarioListWin) != 'undefined' && scenarioListWin != null))
    {
        // not exists.
        alert("Selected scenario list cannot be found. (" + winID + ")" );
        return;
    }
    
    /*
        <section class="scenario-item grLtBlu">
            <img src="images/icons/cash.png" >
            <div class="title">Computer Loan</div>
            Other / $3,000.00 / 4.36%
            <div class="btn-panel">
                <button type="button" class="btn btn-danger">Delete</button>
                <button type="button" class="btn btn-primary">Load</button>
            </div>
        </section>
    */

    newScenarioItem = document.createElement("section");
    newScenarioItem.id = uniqueID;
    newScenarioItem.classList.add("scenario-item");
    newScenarioItem.classList.add("grLtBlu");
    
    // add the items to the scenario item
    scenarioImg = document.createElement("img");
    scenarioImg.id = uniqueID + "_img";
    scenarioImg.setAttribute('src', 'images/icons/cash.png');
    newScenarioItem.appendChild(scenarioImg);
    
    // add the title
    scenarioTitle = document.createElement("div");
    scenarioTitle.id = uniqueID + "_title";
    scenarioTitle.classList.add('title');
    scenarioTitle.innerHTML = name;
    newScenarioItem.appendChild(scenarioTitle);
    
    // add the details.
    newScenarioItem.innerHTML += type + ' / ' + value + ' / ' + apr;
    
    // add button panel
    scenarioButtonPanel = document.createElement("div");
    scenarioButtonPanel.id = uniqueID + "_btn_panel";
    scenarioButtonPanel.classList.add('btn-panel');
    
    // add buttons
        // add the button
        scenarioDeleteButton = document.createElement("button");
        scenarioDeleteButton.id = uniqueID + "_button";
        scenarioDeleteButton.classList.add('btn');
        scenarioDeleteButton.classList.add('btn-danger');
        scenarioDeleteButton.innerHTML = 'Delete';
        scenarioDeleteButton.setAttribute('type', 'button');
        scenarioDeleteButton.addEventListener("click", removeScenarioByElement, false );
        scenarioButtonPanel.appendChild(scenarioDeleteButton);

        // add the button
        scenarioLoadButton = document.createElement("button");
        scenarioLoadButton.id = uniqueID + "_button";
        scenarioLoadButton.classList.add('btn');
        scenarioLoadButton.classList.add('btn-primary');
        scenarioLoadButton.innerHTML = 'Load';
        scenarioLoadButton.setAttribute('type', 'button');
        scenarioButtonPanel.appendChild(scenarioLoadButton);
    
    newScenarioItem.appendChild(scenarioButtonPanel);

    // add item to the scenario list
    scenarioListWin.appendChild(newScenarioItem);
    
}

// the unique id will be returned from the listerner method
function removeScenarioByID( uniqueID )
{
    var selElement = document.getElementById(uniqueID);
    
    if (!(typeof(selElement) != 'undefined' && selElement != null))
    {
        // not exists.
        alert("The Selected Scenario cannot be found on the page" );
        return;
    }
    
    selElement.remove();

}

function removeScenarioByElement()
{
    // find the parent scenario-item
    var selElement = this.parentElement;
    
    // find the parent item
    while (!selElement.classList.contains('scenario-item'))
    {
        selElement = selElement.parentElement;
    }
    
    removeScenarioByID(selElement.id);
}


/// Messaging system

function createMessage ( msg )
{
    /*
    <div id="msg-area">
        <div class="sys-msg rounded-corners transparent">This is my message</div>        
    </div>
    */
    // find the message area
    msgArea = document.getElementById('msg-area');
    msgCount = parseInt( msgArea.getAttribute('count') ) || 0;
    msgArea.setAttribute( 'count', msgCount++ );
    
    var guidVal = guid();
    
    // this function will create a message on the screen 
    newMessage = document.createElement('div');
    newMessage.id = guidVal;
    newMessage.classList.add('sys-msg');
    newMessage.classList.add('rounded-corners');
    // newMessage.classList.add('transparent');
    // newMessage.classList.add('fade');
    newMessage.innerHTML = msg;
    msgArea.appendChild(newMessage);
    
    // fadeIn
    setTimeout( function () { fadeOut(guidVal); }, 500);    
    
    // hide the message after 5 seconds
    setTimeout( function () { autoHideMessage(guidVal); }, 5000);
    
    
    
}

function fadeOut ( msgID ) {
    document.getElementById( msgID ).classList.add( "fade" );
}

function autoHideMessage( msgID )
{
    document.getElementById(msgID).remove();

    msgArea = document.getElementById('msg-area');
    msgCount = parseInt( msgArea.getAttribute('count') );
    msgArea.setAttribute( 'count', msgCount-- );
}

/// utility functions

/*
function remove(id)
{
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}
*/

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

// Event listeners
document.getElementById("btn-add-scenario").addEventListener("click", function () { addScenario("cash.png", guid() , "Auto", "$3,000.00", "4.65%", guid() ) });