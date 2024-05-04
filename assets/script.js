const API_KEY = "efd43181d6d14d05a137b1eec02876b7";

const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load', ()=> fetchNews("India"));


function reload(){
    window.location.reload();
}
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    if (data.articles) {
        bindData(data.articles);
    } else {
        // Handle the case where data.articles is undefined or null
        console.error("Articles data is missing.");
    }
}


function bindData(articles){
    const cardContainer = document.getElementById('cards-container');
    const newCardTemplate = document.getElementById('template-news-card');
    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if(article.urlToImage==null) return;

        const cardClone = newCardTemplate.content.cloneNode(true);
        filllData(cardClone, article);
        cardContainer.appendChild(cardClone);
    })
} 

function filllData(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata"
    })

    newsSource.innerHTML = `${article.source.name} | ${date}`; 

    cardClone.firstElementChild.addEventListener('click', ()=> {
        window.open(article.url, "_blank");
    })

}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);

    const navItems = document.querySelectorAll('.nav-item'); // Select all navigation items
    navItems.forEach(item => {
        if (item.id === id) {
            item.classList.add('active'); // Add 'active' class to the clicked item
        } 
        else {
            item.classList.remove('active'); // Remove 'active' class from other items
        }
    });
}

const searchButton = document.getElementById('search-button');

const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', ()=> {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query); 
})


