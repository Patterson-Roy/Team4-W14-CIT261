
var openModalID = null;

/* function showModal
 * The purpose of this function is to take the given elementID, promote it to the foreground and 
 * to display the blackout screen behind it. preventing the user from interacting with any of the
 * other elements on the page./
 */
function showModal(winID) {
    
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

function remove(id)
{
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}

// Event listeners
document.getElementById("open-load-screen").addEventListener("click", function () { showModal("load-screen") });
document.getElementById("close-modal").addEventListener("click", function () { hideModal() });
