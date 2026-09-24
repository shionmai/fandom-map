console.log("hello :D");
const pinContainer = document.getElementById("pin-container");
const searchContainer = document.getElementById("search-content")
const searchInput = document.getElementById("search-input")
function makePin(name, locationTop, locationLeft, fandomLabels) {
    const newPin = document.createElement('div');
    newPin.className = "pin";
    newPin.id = `pin-${name}`;
    newPin.style.top = String(locationTop) + "%";
    newPin.style.left = String(locationLeft) + "%";
    const newPinShape = document.createElement('div');
    newPinShape.className = "pin-shape";
    newPin.appendChild(newPinShape);
    const newPinInfo = document.createElement('div');
    newPin.appendChild(newPinInfo);
    newPinInfo.className = "pin-info";
    const newPinInfoSpan = document.createElement('span');
    newPinInfo.appendChild(newPinInfoSpan);
    newPinInfoSpan.textContent = String(name);
    for(const label of fandomLabels){
        const labelInSearch = document.getElementById(label);
        labelInSearch.addEventListener('mouseenter', () => {
            newPin.classList.add('pin-active');
            newPinShape.classList.add('pin-shape-active');
            newPinInfo.style.display = "flex";
        });
        labelInSearch.addEventListener('mouseleave', () => {
            newPin.classList.remove('pin-active');
            newPinShape.classList.remove('pin-shape-active');
            newPinInfo.style.display = "";
        });
    }
    pinContainer.appendChild(newPin);
}
function makeSearchContent(name) {
    const newFandom = document.createElement('div');
    newFandom.className = "fandom";
    newFandom.id = name;
    newFandom.textContent = name;
    searchContainer.appendChild(newFandom);
}
function sortSearch(){
    const divArray = Array.from(searchContainer.children);
    divArray.sort((a,b) => { 
        return a.textContent.trim().localeCompare(b.textContent.trim());
    });
    divArray.forEach(item => {
        searchContainer.appendChild(item);
    });
}
async function loadFandomData() {
    try {
        const response = await fetch('./fandom_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        for(const fandom of data.fandoms){
            let label = "";
            let fandomLabels = []
            for(const name of fandom.fandomName){
                label += name + "\n";
                fandomLabels.push(name);
                makeSearchContent(name);
            }
            makePin(label, fandom.location[0], fandom.location[1], fandomLabels);
        }
        sortSearch();
    }
    catch (error) {
        console.error("Could not fetch the JSON file:", error);
    }
}
loadFandomData();
function search(query){
    query = query.toLowerCase().trim();
    for(const item of searchContainer.children){
        const itemText = item.textContent.toLowerCase();
        if(itemText.includes(query)){
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }
}
searchInput.addEventListener("input", function(event) {
    search(event.target.value)
})
