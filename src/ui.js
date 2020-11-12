
const selectors = {

    startDate : document.getElementById('date1'),
    endDate : document.getElementById('date2'),
    errorAlert : document.getElementById('error-div'),
    tableContainer : document.getElementById('table-container'),
    selectorContainer : document.getElementById('selected-container'),
    ulCollection : document.getElementById('collection-list'),
    asteroidsList : document.getElementById('asteroids-list'),
    tBody : document.getElementById('tbody')
}

function getDates(){
    return {

        start :selectors.startDate.value,
        end : selectors.endDate.value
    }
}
function showError(message, className){

        removeError();
        selectors.errorAlert.innerHTML = message;
        selectors.errorAlert.classList.add(className);
        setTimeout(()=> removeError(),3000);
    
}

function removeError(){
    selectors.errorAlert.classList.remove('error');
}

function clearInputs(){
    selectors.startDate.value = '';
    selectors.endDate.value = '';
}

function createTable(asteroids){

    clearInputs();
    asteroids.forEach( ast => {
        const tRow = document.createElement('tr');
        tRow.dataset.id = ast.id;
        tRow.classList.add('data-row');
        const tData = [ast.date, ast.name, ast.kmHour, ast.diameterMin, ast.diameterMax];

        tData.forEach( data => {
            const td = document.createElement('td');
            td.appendChild(document.createTextNode(data));
            tRow.appendChild(td);
        });
        selectors.tBody.appendChild(tRow);
    });
    
    selectors.tableContainer.style.display ='block';
    
}

function returnTableData(){

    return document.querySelectorAll('.data-row');
}



function createDataList(asteroids){
    asteroids.forEach(ast => {
        const option = document.createElement('option');
        option.value = ast.firstChild.nextSibling.innerHTML;
        option.dataset.id = ast.dataset.id;
        selectors.asteroidsList.appendChild(option);
    });
    selectors.selectorContainer.style.display = 'block';

}


function addToDataList(ast){
    
    const option = document.createElement('option');
    option.value = ast.textContent;
    option.id = ast.dataset.id;
    selectors.asteroidsList.appendChild(option);
}

function createCollectionList(id, value){

       const li = document.createElement('li');
       li.classList.add('collection-item');
       li.dataset.id = id;
       li.textContent = value;
       const i = document.createElement('i');
       i.className = 'fa fa-times remove-item';
       li.appendChild(i)
       selectors.ulCollection.appendChild(li);
}

function deleteFromCollectionList(current){
    const id = current.dataset.id;
    const list = document.querySelector(`.collection-item[data-id="${id}"]`);
    list.remove();
}

function resetAll(){
    const ulCollection = document.getElementById('collection-list');
    const asteroidsList = document.getElementById('asteroids-list');
    const tBody = document.getElementById('tbody');
    
    const selectors = [ulCollection,asteroidsList,tBody];
    if(selectors.length){
        selectors.forEach(item => {
            while(item.firstChild){
                item.firstChild.remove();
            }
        });
    }
   
}

export {
    getDates, 
    showError, 
    createTable, 
    createDataList, 
    createCollectionList, 
    deleteFromCollectionList,
    addToDataList, 
    returnTableData,
    resetAll
}
