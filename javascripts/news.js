import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const news = await fetch("/news.json").then((response) => response.json());

function renderNewsItem(newsItem, newsContainer) {
    `
    <div class="news-item">
        <span class="news-item-date">Aug 2024</span>
        <span class="news-item-title">Our paper "iConPAL" will appear in IEEE SecDev 2024</span>
        <img class="news-item-icon" src="img/icons/pdf.svg">
        <span class="news-item-content">Our paper "iConPAL" will appear in IEEE SecDev 2024</span>
    </div>
    `;
    const newsItemElement = document.createElement("div");
    newsItemElement.classList.add("news-item");

    const newsItemDate = document.createElement("span");
    newsItemDate.classList.add("news-item-date");
    newsItemDate.textContent = newsItem.date;
    newsItemElement.append(newsItemDate);

    const newsItemTitle = document.createElement("span");
    newsItemTitle.classList.add("news-item-title");
    newsItemTitle.textContent = newsItem.title;
    newsItemElement.append(newsItemTitle);

    if (newsItem.icon) {
        let newsItemIconContainer = document.createElement("div");
        if (newsItem.link) {
            newsItemIconContainer = document.createElement("a");
            newsItemIconContainer.href = newsItem.link;
            newsItemIconContainer.target = "_blank";
            newsItemIconContainer.rel = "noreferer noopener";
            newsItemIconContainer.style.cursor = 'pointer';
        }
        const newsItemIcon = document.createElement("img");
        newsItemIcon.src = 'img/icons/' + newsItem.icon;
        newsItemIcon.alt = newsItem.icon;
        newsItemIcon.classList.add("news-item-icon");
        newsItemIconContainer.classList.add("news-item-icon-container");
        newsItemIconContainer.append(newsItemIcon);
        newsItemElement.append(newsItemIconContainer);
    }

    if (newsItem.content) {
        const newsItemContent = document.createElement("span");
        newsItemContent.classList.add("news-item-content");
        newsItemContent.innerHTML = marked.parse(newsItem.content);
        newsItemElement.append(newsItemContent);
    }

    newsContainer.append(newsItemElement);
}


function createNews() {
    const newsContainer = document.querySelector(".news-container");
    if (!newsContainer) {
        return;
    }

    news.slice(0, 5).forEach((newsItem) => {
        renderNewsItem(newsItem, newsContainer);
    });

    if (news.length <= 5) {
        return;
    }

    const newsMoreContainer = document.createElement("div");
    newsMoreContainer.classList.add("news-more-container");
    newsContainer.append(newsMoreContainer);

    const newsMoreButtonContainer = document.createElement("div");
    newsMoreButtonContainer.textContent = "Learn More";
    newsMoreButtonContainer.classList.add("news-more-button-container");
    const newsMoreButton = document.createElement("img");
    newsMoreButton.classList.add("news-more-button");
    newsMoreButton.alt = "Learn More";
    newsMoreButton.src = "img/icons/more.svg";
    newsMoreButtonContainer.addEventListener("click", () => {
        newsMoreButtonContainer.style.display = "none";
        news.slice(5).forEach((newsItem) => {
            renderNewsItem(newsItem, newsMoreContainer);
        });
    });
    newsMoreButtonContainer.append(newsMoreButton);
    newsContainer.append(newsMoreButtonContainer);
};

createNews();
