
export function storeItem(item){

    const asteroids = JSON.parse(localStorage.getItem('asteroids')) || [];
    asteroids.push(item);
    localStorage.setItem('asteroids', JSON.stringify(asteroids));
    
}
export function getItems(){

    const asteroids = JSON.parse(localStorage.getItem('asteroids')) || [];
    return asteroids;
}

export function deleteItem(id){

    const asteroids = getItems();
    asteroids.forEach( (asteroid,index) => {
        if(id == asteroid.id){
            asteroids.splice(index, 1)
        }
    });
    localStorage.setItem('asteroids', JSON.stringify(asteroids));
    
}

export function clearAll(){
    localStorage.removeItem('asteroids');
}