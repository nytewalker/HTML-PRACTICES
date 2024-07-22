const accessKey = "zqE85D_NQSVwvpiwXc30qqjZBUI17SbCNkC1sG3oMKM";

const FormEl = document.querySelector('form');

const inputEl = document.getElementById("Search_input");

const searchBtn = document.getElementById("searchBtn");

const searchResults = document.querySelector(".searchResult");

const ShowMoreBtn = document.getElementById("ShowMoreBtn");

let inputData  = ""
let page = 1;

async function searchImage(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch (url)

    const data = await  response.json();
    const results = data.results


    if (page === 1){
        searchResults.innerHTML = ""
    }

    results.map((result) =>{
        const ImageWrapper = document.createElement('div')
        ImageWrapper.classList.add("searchFound")
        const Image = document.createElement("img")
        Image.src = result.urls.small
        Image.alt = result.alt_description
        const ImageLink = document.createElement("a")
        ImageLink.href = result.links.html

        ImageLink.target = "_blank"
        ImageLink.textContent = result.alt_description


        ImageWrapper.appendChild(Image);
        ImageWrapper.appendChild(ImageLink);
        searchResults.appendChild(ImageWrapper);
    });

    page++

    if(page > 1){
        ShowMoreBtn.style.display = "block"
    }
}

FormEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImage();
})

ShowMoreBtn.addEventListener("click", (event)=>{
    searchImage();
})
