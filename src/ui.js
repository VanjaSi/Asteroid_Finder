
const selectors = {

    startDate : document.getElementById('date1'),
    endDate : document.getElementById('date2'),
    errorAlert : document.getElementById('error-div'),
    tableContainer : document.getElementById('table-container'),
    selectorContainer : document.getElementById('selected-container'),
    ulCollection : document.getElementById('collection-list'),
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



    
function clearDataList(){
        
    const dataOptions = Array.from(document.getElementById('asteroids-list').options);
        if(dataOptions.length){
            dataOptions.forEach(item => {
                item.remove();
            });
        }
}

    //builds data list
    function createDataList(asteroids){
        
        clearDataList();
        if(asteroids.length){
            asteroids.forEach(asteroid => {
                const option = document.createElement('option');
                option.setAttribute('value', asteroid.name);
                const dataList = document.getElementById('asteroids-list')
                dataList.appendChild(option);
            });
            selectors.selectorContainer.style.display = 'block';
        }
           
    }

    // builds the collection ui list

    function buildUlCollectionList(collection){
        deleteCollectionList();
        if(collection.length){
            collection.forEach(list => {
                const li = document.createElement('li');
                li.classList.add('collection-item');
                li.textContent = list.name;
                const i = document.createElement('i');
                i.className = 'fa fa-times remove-item';
                li.appendChild(i)
                selectors.ulCollection.appendChild(li);
            });
        }
      
    }

function deleteTable(){
    const tBody = document.getElementById('tbody');
    if(tBody.children){
        
            while(tBody.firstChild){
                tBody.firstChild.remove();
            }
        
    }

}

function createTable(asteroids){
        clearInputs();
        deleteTable();
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



function deleteCollectionList(){
    
    const collection = Array.from(document.getElementById('collection-list').children);
    if(collection){
        collection.forEach(item => {
            item.remove();
        });
    }
  
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
    resetAll,
    buildUlCollectionList,  
}
