function prevPage() {
    if ( current_page > 1 ) {
        current_page--;
        changePage( current_page );
    }
}

function startPage() {
    current_page = 1;
    changePage(1);
}

function nextPage() {
    if ( current_page < numPages() ) {
        current_page++;
        changePage(current_page);
    } 
}

function endPage() {
    current_page = numPages();
    changePage(numPages());
}

function clickPage() {
    document.addEventListener('click', function(e) {
        if ( e.target.nodeName == "A" && e.target.classList.contains("clickPageNumber") ) {
            current_page = e.target.textContent;
            changePage(current_page);
        }
    });
}

function pageNumbers() {
    let pageNumber = document.getElementById('page-number');
        pageNumber.innerHTML = "";

    for(let i = 1; i < numPages() + 1; i++) {
        pageNumber.innerHTML += "<a class='clickPageNumber'>" + i + "</a>";
    }
}

function numPages() {
    const finalData = resultSearch.length > 0 ? resultSearch : result;
    return Math.ceil(finalData.length / records_per_page);  
}

function addEventListeners() {
    prevButton.addEventListener('click', prevPage);
    nextButton.addEventListener('click', nextPage);
    startButton.addEventListener('click', startPage);
    endButton.addEventListener('click', endPage); 
}
      
function selectedPage() {
    let page_number = document.getElementById('page-number').getElementsByClassName('clickPageNumber'); 
    
    for (let i = 0; i < page_number.length; i++) {
        if (i == current_page - 1) {
            page_number[i].classList.add('active');
        } 
        else {
            page_number[i].classList.remove('active');
        }
    }   
}

function changePage(page) {
    if (page < 1) {
        page = 1;
    } 
    if (page > (numPages() -1)) {
        page = numPages();
    }
 
    divResult.innerHTML = "";
    paginationDiv.style.display = "flex";

    const finalData = resultSearch.length > 0 ? resultSearch : result;

    for (let i = (page -1) * records_per_page; i < (page * records_per_page) && i < finalData.length; i++) {
        divResult.innerHTML += '<article class="hero-list" onclick="window.location.href=\'single.html?id='+ finalData[i].id +'\'">'+
                                    '<div class="hero-list-container"><div class="hero">'+
                                        '<span class="hero-photo"><img src="' + thumbnail(finalData[i].thumbnail) + '" alt="' + finalData[i].name + '"></span>'+
                                        '<span class="hero-name"><h4>' + finalData[i].name + '</h4></span>'+
                                    '</div>'+
                                    '<div class="hero-series">' + returnItems(finalData[i].series.items) + '</div>'+
                                    '<div class="hero-events">' + returnItems(finalData[i].events.items) + '</div></div>'+
                                '</article>';
    }

    selectedPage();
}