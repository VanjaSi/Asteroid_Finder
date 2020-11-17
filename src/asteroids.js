export class Asteroid{
    constructor(id,name,date,kmHour,diameterMin,diameterMax){
        
        this.id = id;
        this.name = name;
        this.date = date;
        this.kmHour = kmHour;
        this.diameterMin = diameterMin;
        this.diameterMax = diameterMax;
    }
    
}


export class AllAsteroids{

    constructor(){
        this._tableData = [];
        this._asteroidsDataCollection = [];
        this._listOfSelectedAsteroids= [];
        
    }
    updateAsteroidObject(event, asteroid){

        if(event === "select"){
            this._listOfSelectedAsteroids.push(asteroid);
            this._asteroidsDataCollection = this._asteroidsDataCollection.map(item => item.name !== asteroid.name ? item : false).filter(el => el);
        }else if(event === "delete"){
            this._asteroidsDataCollection.push(asteroid);
            this._listOfSelectedAsteroids = this._listOfSelectedAsteroids.map(item => item.name !== asteroid.name ? item : false)
            .filter(el => el)
        }
    }
    set tableData(asteroid){
        this._tableData.push(asteroid);
    }
    get tableData(){
        return this._tableData;
    }
    set asteroidsDataCollection(asteroid){
        this._asteroidsDataCollection.push(asteroid);
    }
    get asteroidsDataCollection(){
        return this._asteroidsDataCollection;    
    }
    get listOfSelectedAsteroids(){
        return this._listOfSelectedAsteroids;
    }
    
    resetData(){
        allAsteroids = new AllAsteroids();
    }

    selectedAsteroidFromDelete(asteroid){
        const newSelected = this._listOfSelectedAsteroids.find(item => item.name === asteroid);
        return newSelected
    }
}
export let allAsteroids = new AllAsteroids();
