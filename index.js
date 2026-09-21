console.log("hello :D");
const pinContainer = document.getElementById("pin-container");
const searchContainer = document.getElementById("search-content")
function makePin(name, locationTop, locationLeft) {
    const newPin = document.createElement('div');
    newPin.className = "pin";
    newPin.id = `${name}`;
    newPin.style.top = String(locationTop) + "%";
    newPin.style.left = String(locationLeft) + "%";
    pinContainer.appendChild(newPin);
    const newPinInfo = document.createElement('div');
    newPin.appendChild(newPinInfo);
    newPinInfo.className = "pin-info";
    const newPinInfoSpan = document.createElement('span');
    newPinInfo.appendChild(newPinInfoSpan);
    newPinInfoSpan.textContent = String(name);
}
function makeSearchContent(name) {
    const newFandom = document.createElement('div');
    newFandom.className = "fandom";
    newFandom.id = name;
    newFandom.textContent = name;
    searchContainer.appendChild(newFandom);
}
async function loadFandomData() {
    try {
        const response = await fetch('./fandom_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        for(const fandom of data.fandoms){
            makePin(fandom.fandomName, fandom.location[0], fandom.location[1]);
            makeSearchContent(fandom.fandomName);
        }
    }
    catch (error) {
        console.error("Could not fetch the JSON file:", error);
    }
}
loadFandomData();
