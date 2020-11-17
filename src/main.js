
import {asyncFetch}  from './api.js';
import { Asteroid, allAsteroids} from './asteroids.js';
import {getDates, showError, resetAll,createTable,createDataList,buildUlCollectionList} from './ui.js'



init();
 
function init(){


    document.getElementById('search-btn').addEventListener('click', getAsteroids);
    
}


function getAsteroids(){


    resetAll();
    allAsteroids.resetData();

    const dates = getDates();
    const dateValid = validateForm(dates);
    
    if(dateValid){
        
        asyncFetch(dateValid.start, dateValid.end)
        
        .then(request => {
                for (const ast in request) {
                
                    request[ast].forEach(element => {
                        if(element.is_potentially_hazardous_asteroid === true ){
                            const id = element.id,
                                  name = element.name,
                                  date = element.close_approach_data[0].close_approach_date,
                                  kmHour = element.close_approach_data[0].relative_velocity.kilometers_per_hour,
                                  diameterMin = element.estimated_diameter.kilometers.estimated_diameter_min,
                                  diameterMax = element.estimated_diameter.kilometers.estimated_diameter_max;
                            
                            
                            const asteroid = new Asteroid(id,name,date,kmHour,diameterMin,diameterMax);
                            
                            allAsteroids.tableData = asteroid;
                            allAsteroids.asteroidsDataCollection = asteroid;     
                        }
                    });   
            } 


            const data = allAsteroids.tableData;
            const options = allAsteroids.asteroidsDataCollection;

            if(data.length){

                createTable(data);
                createDataList(options); 
                const btn = document.getElementById('asteroids-search').addEventListener('change', selectAsteroid);

            }else{
                showError('No Asteroids found for this date', 'error');

            }
            
        })
        .catch(error => {
            showError(error, 'error');
        });
    
    }    

}


function selectAsteroid(e){

        
        const searchInput = document.getElementById('asteroids-search');
        const options = allAsteroids.asteroidsDataCollection;

        options.forEach(asteroid => {

            if(searchInput.value.trim() === asteroid.name ){
                
                //adds item to collection list and removes it from data list
                allAsteroids.updateAsteroidObject("select", asteroid);
                
                //returns updated data and collection lists
                const dataList = allAsteroids.asteroidsDataCollection;
                const collectionList = allAsteroids.listOfSelectedAsteroids;

                //build the UI collection and data list options
                createDataList(dataList);
                buildUlCollectionList(collectionList);
                searchInput.value="";

                 
            }
           
            
        });
        document.getElementById('collection-list').addEventListener('click', deleteAsteroid);
        document.getElementById('next-page').addEventListener('click', ()=> nextPage());
                

}


function deleteAsteroid(e){
    
    if(e.target.classList.contains('remove-item')){

        //gets the name of asteroid to be deleted
        const itemToDelete = e.target.parentElement.textContent;

        //finds the item in collection 
        const selected = allAsteroids.selectedAsteroidFromDelete(itemToDelete);

        //deletes from collection list and adds to data list
        allAsteroids.updateAsteroidObject("delete", selected);


        //returns updated data and collection lists
        const dataList = allAsteroids.asteroidsDataCollection;
        const collectionList = allAsteroids.listOfSelectedAsteroids;

        //build the UI collection and data list options
        createDataList(dataList);
        buildUlCollectionList(collectionList);

    }
    
}



async function nextPage(){

    const promise = new Promise((resolve)=>{
         resolve(setToLS());
    });


    const response = await promise;
    location.href="druga.html";

}

function setToLS(){

        const collectionList = allAsteroids.listOfSelectedAsteroids;

        localStorage.removeItem('asteroids');

        const asteroids = JSON.parse(localStorage.getItem('asteroids')) || [];

        collectionList.forEach(asteroid => asteroids.push(asteroid));
        localStorage.setItem('asteroids', JSON.stringify(asteroids));
    
    
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