const publicKey = '5b600b15470a84298961f4f9d17d36b0';
const hash = '34ddb2ca0be74ea053c0941d64e727ee';
const timestamp = '1628959565';

const paginationDiv = document.querySelector(".pagination");
const divResult = document.querySelector("#js-api-marvel-result");
const prevButton = document.querySelector('#button-prev');
const nextButton = document.querySelector('#button-next');
const startButton = document.querySelector('#button-start');
const endButton = document.querySelector('#button-end');
const clickPageNumber = document.querySelectorAll('.clickPageNumber');

let current_page = 1;
let records_per_page = 4;
let result = [];
let resultSearch = [];

const options = {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json'
    })
};

function returnItems( items ){
    let listItems = '';

    for ( i = 0; i <= 2; i++ ){
        if ( items[i] ){
            listItems += '<p>' + items[i].name + '</p>';
        }
    }

    return listItems;
}

function thumbnail( data ){
    return data.path + '.' + data.extension;
}

fetch('https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=20&ts=' + timestamp + '&apikey=' + publicKey +'&hash=' + hash, options)
.then(function(response) {
    return response.json();
})
.then(function(response) {
    result = response.data.results;
    const formSearch = document.querySelector("#form-search");

    formSearch.addEventListener('submit', function(event){
        event.preventDefault();

        const inputSearch = document.querySelector("#search-hero").value.toLowerCase();

        if ( inputSearch == "" ){
            alert("erro");
            return false;
        }

        resultSearch = result.filter(data => data.name.toLowerCase().includes(inputSearch));

        if ( resultSearch.length > 0 ){
            init();
        }
        else {
            paginationDiv.style.display = "none";
            divResult.innerHTML = '<article class="hero-list" style="justify-content: center;"><p>Termo não encontrado!</p></article>';
        }

        return false;
    });

    if ( result ){
        init();
    }
})
.catch(function(err) { 
    return err;
});

function init(){
    changePage(1);
    pageNumbers();
    selectedPage();
    clickPage();
    addEventListeners();
    showMore();
}