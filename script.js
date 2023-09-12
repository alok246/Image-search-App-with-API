const accesskey = '';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container'); //shift+alt+downkey
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page = 1; // global variable create because we want to fetch in search form and loadMoreBtn both

// function to fetch images using unsplash API
// difference between api and rest api
const fetchImages = async (query, pageNo) => {
    try {
        if (pageNo === 1) {
            imagesContainer.innerHTML = '';  //only in search this work(purana image hat jayega) if page one hai otherwise if load more click then check page to already one hai  then appended
        }

        const url = `https://api.unsplash.com/search/photos/?client_id=2OZZ_1ehwZgIvrYXeLBop94PjdWFyhmkstfxhvAAxi8&query=${query}&per_page=28&page=${pageNo}`;
        //const url='https://api.unsplash.com/search/photos?page=1&query=office/?client_id=2OZZ_1ehwZgIvrYXeLBop94PjdWFyhmkstfxhvAAxi8>'
        const response = await fetch(url);
        const data = await response.json(); //for read or extract data

        // console.log("data ",data);
        //console.log(query);

        //const results = data.results;
        if (data.results.length > 0) {
            data.results.forEach((photo) => {
                //creating image div
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

                // creating overlay
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');

                //creating overlay text
                const overlayText = document.createElement('h3');
                overlayText.innerText = `${photo.alt_description}`;

                overlayElement.appendChild(overlayText);

                imageElement.appendChild(overlayElement);

                imagesContainer.appendChild(imageElement);
            });

            if (data.total_pages === pageNo) {
                loadMoreBtn.style.display = "none";
            }
            else {
                loadMoreBtn.style.display = "block";
            }
        }
        else {
            imagesContainer.innerHTML = `<h2>No image found.</h2>`;
            if (loadMoreBtn.style.display === "block")
                loadMoreBtn.style.display = "none";
        }
    }
    catch (error) {
        imagesContainer.innerHTML = `<h2>Failed to fetch images. please try again later.</h2>`;
    }
}
// we use api of unsplash.com
// adding Event Listener to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1; // always constant
        fetchImages(inputText, page);
    }
    else {
        imagesContainer.innerHTML = `<h2>please enter a search query.</h2>`;
    }
    //console.log(searchInput.value);
});


// adding Event Listener to loadMoreBtn to fetch more images
loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page); //pages changes
});