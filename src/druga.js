import{fetchCloseToEarth} from './api.js'

window.addEventListener('DOMContentLoaded', getData);


function getItems(){
    const asteroids = JSON.parse(localStorage.getItem('asteroids')) || [];	    
    return asteroids;

}


function getData(){

    const items = getItems();

    const iterator = items[Symbol.iterator]();

    for (let nextId = iterator.next(); nextId.done !== true; nextId = iterator.next()) {

        fetchCloseToEarth(nextId.value.id)
        .then(results => handleResults({results, name :nextId.value.name}))
        .catch(err => console.error(err))
    
    }
}

function handleResults(obj){

    const dates = obj.results.map(item => new Date(item.close_approach_date).getUTCFullYear());

    const filteredDates = dates.filter( date => {
            
        if(date >= 1900 && date<=1999){
             return date;
        }
            
        });
        displayBars({ name: obj.name,
            numberOfTimes : filteredDates.length} )
        
}
function determineColor(x){

    let color;
    if(x <= 25) {
        color = 'rgb(5, 202, 21)';
    }else if( x <= 45){
        color = 'rgb(216, 219, 4)';
    }else if(x <= 75){
        color = 'rgb(219, 101, 4)';
    }else{
         color ='rgb(219, 4, 4)';
    }
    return color;
}

function displayBars(results){
    
   
    const wrapper = document.getElementById('progress-wrapper');
    const progresHolder = document.createElement('div');
          progresHolder.className ='progress-holder';

    const divlabel = document.createElement('span');
          divlabel.textContent = results.name;
    const divProgress = document.createElement('div');
          divProgress.classList.add('bar');
    const barDiv = document.createElement('div');
          barDiv.dataset.id = results.numberOfTimes;
          barDiv.classList.add('bar-div');
          barDiv.textContent = results.numberOfTimes;

          divProgress.appendChild(barDiv);
          progresHolder.appendChild(divlabel);
          progresHolder.appendChild(divProgress);

         wrapper.append(progresHolder);
         progressBars(results.numberOfTimes);
}


function progressBars(x){

    const bars = document.querySelector(`.bar-div[data-id="${x}"]`);
    const color = determineColor(x);

    bars.style.transition = "background 1s linear";
    bars.style.transition = "width 1s linear";


 
    const progressInterval = setInterval(paint, 1000);

    let i = 0;
    function paint(){
        if (x >= 100) {
            clearInterval(progressInterval);
            i = 0;
          } else {
            i++;
            bars.style.width = x +'%';
            bars.style.background = color;
          }
    }


}


const previousBtn = document.getElementById('previous-page');

previousBtn.addEventListener('click', backToMainPage);

function backToMainPage(e){

    location.href="index.html";
    
}


