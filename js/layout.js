
var openModalID = null;

/* function showModal
 * The purpose of this function is to take the given elementID, promote it to the foreground and 
 * to display the blackout screen behind it. preventing the user from interacting with any of the
 * other elements on the page./
 */
function showModal(winID) {
    
    /*
    
    // check to see if the element is valid.
    var win = document.getElementById(winID);
    if (!(typeof(win) != 'undefined' && win != null))
    {
        // not exists.
        alert("Selected modal cannot be found. (" + winID + ")" );
        return;
    }
    
    // check for the existance of the blackout screen on the page.
    var blackout = document.getElementById("blackout");
    if (!(typeof(blackout) != 'undefined' && blackout != null))
    {
        // not exists.
        // alert("Blackout cannot be found, need to create." );
        
        blackout = document.createElement("div");
        blackout.id = "blackout";
        blackout.classList.add("transparent");
        document.body.appendChild(blackout);
    }
            
    // display the window on the screen
    document.getElementById("main").classList.add('blur');
    win.classList.remove('hidden');
    win.classList.add('modal');
    
    openModalID = winID;
    */
}


function hideModal() {
    
    var win = document.getElementById(openModalID);
    if (typeof(win) != 'undefined' && win != null)
    {

        remove('blackout');
        document.getElementById("main").classList.remove('blur');
        win.classList.remove('modal');
        win.classList.add('hidden');
        
    }
    
}

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
        scenarioDeleteButton.addEventListener("click", function () { removeScenarioByElement( scenarioDeleteButton ) });
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

    
    
    
    scenarioListWin.appendChild(newScenarioItem);
    
}

// the unique id will be returned from the listerner method
function removeScenarioByID( uniqueID )
{
    // 
}

function removeScenarioByElement( btnElement )
{
    // find the parent scenario-item
    selElement = btnElement.parentElement;
    
    // find the parent item
    while (!selElement.classList.contains('scenario-item'))
    {
        selElement = selElement.parentElement;
    }
    
    selElement.remove();
}

// utility

function remove(id)
{
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

// Event listeners
// document.getElementById("open-load-screen").addEventListener("click", function () { showModal("load-screen") });
// document.getElementById("close-modal").addEventListener("click", function () { hideModal() });

document.getElementById("btn-add-scenario").addEventListener("click", function () { addScenario("cash.png", "new Item", "Auto", "$3,000.00", "4.65%", guid() ) });
