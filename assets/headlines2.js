const indiaUrl = "https://newsapi.org/v2/top-headlines?country=in&apiKey=efd43181d6d14d05a137b1eec02876b7";

window.addEventListener('load', () => fetchNews0());

async function fetchNews0() {
    try {
        const res = await fetch(indiaUrl);
        const data = await res.json();
        console.log(data.articles.slice(0, 10));

        if (data.articles) {
            const articles = data.articles.slice(0, 10);
            fillCards(articles);
        } else {
            console.error("Articles data is missing");
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function fillCards(articles) {
    articles.forEach((article, index) => {
        const card = document.getElementById(`news-card${index}`);
        if (!card) return; // Skip if card element not found

        const newsImg = card.querySelector('.news-img');
        const newsSource = card.querySelector('.news-source');
        const paragraph = card.querySelector('.paragraph');

        if (article.urlToImage) {
            newsImg.src = article.urlToImage;
        } else {
            // Set a default image if urlToImage is missing
            newsImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9A0u33ZK0sQI7SmMaAOZq2obC8iplyCbqkJ2y3rTSPg&s';
            // return;
        }

        paragraph.textContent = article.title;

        const date = new Date(article.publishedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata"
        });

        newsSource.textContent = `${article.source.name} | ${date}`;

        card.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });
    });
}
