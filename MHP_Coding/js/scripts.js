// Source: https://dev.to/nirmal_kumar/retrieve-entire-data-from-paginated-api-recursively-3pl4
const limitPerPage=50;
const gotApi="https://www.anapioficeandfire.com/api/houses";

//API is limited to 50 instances per API call. Therefore, more than one page needs to be fetched
//loops through page numbers of API. Limit per page is set to maximum, 50. 
// awaits fetch and returns promise
const getHouses = async function (pageNo = 1) {
    let actualUrl = gotApi + `?page=${pageNo}&limit=${limitPerPage}`;
    var apiResults = await fetch(actualUrl)
        .then(resp => {
            return resp.json();
        });
    return apiResults;
}

//waits until all houses are fetched, loops through pages. 
// If no more pages with results are available, returns all houses in results and loop stops. 
const getAllHouses = async function (pageNo = 1) {
    const results = await getHouses(pageNo);
    if (results.length > 0) {
        return results.concat(await getAllHouses(pageNo + 1));
    } else {
        return results;
    }
};

// VUE instance to show elements in DOM
// fetched houses are put into a "card" that is dynamically created
//toggleClass is added to cards to show more info on click
let makeCards = function() { 
    const cardVue = new Vue ({ 
        el: "#cardContainer",
        data: {
            isActive: true,
            houses: "", 
            },
        methods: { 
            async fetchHouses() {
                this.houses = await getAllHouses();
                console.log(this.houses)
            },
            toggleClass: function(event){
                this.isActive =!this.isActive;
            }
           
            },
        mounted() {
            this.fetchHouses();
        }
    });
}
makeCards();



    



