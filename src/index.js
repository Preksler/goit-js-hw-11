import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImagesApiService from './js/fetchImages';
import imagesMarkup from './js/imagesMarkup';

const refs = {
    form: document.querySelector('#search-form'),
    galleryList: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};

const imagesApiService = new ImagesApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    imagesApiService.query = e.currentTarget.elements.searchQuery.value;
    imagesApiService.resetPage();
    imagesApiService.fetchImages()
        .then(({ data }) => {
            clearImagesContainer();
            appendImagesMurkup(data.hits)
        })
        .catch(err => {console.log(err);});
}

function appendImagesMurkup(images) {
    refs.galleryList.insertAdjacentHTML('beforeend', imagesMarkup(images));
}

function onLoadMore() {
    imagesApiService.fetchImages()
        .then(({ data }) => { appendImagesMurkup(data.hits) });
}

function clearImagesContainer() {
    refs.galleryList.innerHTML = '';
}