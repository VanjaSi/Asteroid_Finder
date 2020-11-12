
import {asyncFetch}  from './api.js';
import {getDates, showError, createTable, resetAll, createDataList, returnTableData, createCollectionList, deleteFromCollectionList, addToDataList} from './ui.js'
import{storeItem, deleteItem, getItems, clearAll} from './storage.js'



loadEventListeners();
 
function loadEventListeners(){

    document.getElementById('search-btn').addEventListener('click', getAsteroids);
    document.getElementById('asteroids-search').addEventListener('keypress', selectAsteroid);
    document.getElementById('collection-list').addEventListener('click', deleteAsteroid);
    document.getElementById('next-page').addEventListener('click', nextPage);
    
}


function getAsteroids(){
    
    resetAll();
    clearAll();
    

    const dates = getDates();
    const dateValid = validateForm(dates);
    
    if(dateValid){
        
        asyncFetch(dateValid.start, dateValid.end)
        
        .then(request => {
            const asteroids = [];
                for (const ast in request) {
                
                    request[ast].forEach(element => {
                        if(element.is_potentially_hazardous_asteroid === true ){
                            
                            asteroids.push({
                                    id : element.id,
                                    name: element.name,
                                    date: element.close_approach_data[0].close_approach_date,
                                    kmHour: element.close_approach_data[0].relative_velocity.kilometers_per_hour,
                                    diameterMin: element.estimated_diameter.kilometers.estimated_diameter_min,
                                    diameterMax: element.estimated_diameter.kilometers.estimated_diameter_max
                                });    
                        }
                    });   
            } 

            createTable(asteroids);
            const data = returnTableData();
            createDataList(data); 

        })
        .catch(error => {
            showError(error, 'error');
        });
    
    }
    
}


function selectAsteroid(e){

    if(e.which === 13){
        
        const searchInput = document.getElementById('asteroids-search');
        const options = Array.from(document.getElementsByTagName('option'));
        
        options.forEach(option => {

            if(searchInput.value.trim() === option.value){
                createCollectionList(option.dataset.id, option.value);
                searchInput.value = '';
                option.remove();

                //store to LS
                const item = {id: option.dataset.id, name: option.value}
                storeItem(item);
            }
            
        });
    }
}

//Deletes asteroid from ul collection list, ls and adds back to datalist
function deleteAsteroid(e){
    
    if(e.target.classList.contains('remove-item')){

        const itemToDelete = e.target.parentElement;
        //delete fron ul collection list
        deleteFromCollectionList(itemToDelete);

        //add back as datalist option
        addToDataList(itemToDelete);


        //delete from LS
        deleteItem(itemToDelete.dataset.id);
        
    }
    
}


function nextPage(){

    const data = getItems();
    
    if(data.length > 0){
        location.href="druga.html";
    }else{
        alert('Please select Asteroids from data list')
    }
    
}

function validateForm(inputs){

    if(!inputs.start == "" && !inputs.end == ""){
        const start = new Date(inputs.start);
        const end = new Date(inputs.end);

        const dateDiffTime = end.getTime() - start.getTime();
        const diffDays = dateDiffTime / (1000 * 3600 * 24);
        if(diffDays > 7 || diffDays < 0){

            showError('Dates must be valid. Date difference must not exceed 7 days.','error');
            return false;
        }
    }else{
        showError('Please select dates.','error');
        return false;
    }
    return inputs;

}

