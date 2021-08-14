const publicKey = '5b600b15470a84298961f4f9d17d36b0';
const hash = '34ddb2ca0be74ea053c0941d64e727ee';
const timestamp = '1628959565';

const urlPath = window.location.href;
const id = urlPath.split('=');

if ( !id[1] ){
    window.location.href = 'index.html';
}

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

fetch('https://gateway.marvel.com:443/v1/public/characters/' + id[1] + '?ts=' + timestamp + '&apikey=' + publicKey +'&hash=' + hash, options)
.then(function(response) {
    return response.json();
})
.then(function(response) {
    const result = response.data.results;

    document.querySelector(".hero-photo img").src = thumbnail(result[0].thumbnail);
    document.querySelector(".hero-name").innerHTML = result[0].name;
    document.querySelector(".hero-series").innerHTML = returnItems(result[0].series.items);
    document.querySelector(".hero-events").innerHTML = returnItems(result[0].events.items);
    document.querySelector(".hero-description").innerHTML = result[0].description;
    document.querySelector(".hero-stories").innerHTML = returnItems(result[0].stories.items);
    document.querySelector(".hero-comics").innerHTML = returnItems(result[0].comics.items);
    
})
.catch(function(err) { 
    return err;
});