export default function imagesMarkup(data) {
    return data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `<div class="photo-card">
                    <a href="${largeImageURL}">
                        <img src="${webformatURL}" alt="${tags}" class="image" loading="lazy" />
                    </a>
                    <div class="info">
                        <p class="info-item">
                        <b>Likes: ${likes}</b>
                        </p>
                        <p class="info-item">
                        <b>Views: ${views}</b>
                        </p>
                        <p class="info-item">
                        <b>Comments: ${comments}</b>
                        </p>
                        <p class="info-item">
                        <b>Downloads: ${downloads}</b>
                        </p>
                    </div>
                </div>`
    }).join('');
}