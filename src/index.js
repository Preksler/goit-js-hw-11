import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesApiService from './js/fetchImages';
import imagesMarkup from './js/images-markup';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
    form: document.querySelector('#search-form'),
    galleryList: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    imagesApiService.query = e.currentTarget.elements.searchQuery.value;
    loadMoreBtn.show();
    loadMoreBtn.disable();
    imagesApiService.resetPage();
    imagesApiService.fetchImages()
        .then(({ data }) => {
            clearImagesContainer();
            imagesApiService.setHits(data.totalHits);
            appendImagesMurkup(data);
            if(data.totalHits > 0) {
                loadMoreBtn.enable();
            } else {
                loadMoreBtn.hide();
            }
        })
        .catch(err => {console.log(err);});
}

function appendImagesMurkup(data) {
    if (data.totalHits === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } 
    if (imagesApiService.getPage() === 2 && data.totalHits !== 0) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
 
    if (imagesApiService.totalHits <= 0 && data.totalHits !== 0) {
        loadMoreBtn.hide();
        Notify.failure(`We're sorry, but you've reached the end of search results.`);
    }
    refs.galleryList.insertAdjacentHTML('beforeend', imagesMarkup(data));
    lightBox();
}

function onLoadMore() {
    loadMoreBtn.disable();
    imagesApiService.decrementHits();
    imagesApiService.fetchImages()
        .then(({ data }) => {
            appendImagesMurkup(data);
            loadMoreBtn.enable();
            scrollBottom();
        });
    lightBox().refresh();
}

function clearImagesContainer() {
    refs.galleryList.innerHTML = '';
}

function lightBox() {
    return new SimpleLightbox('.gallery a', {
        caption: true,
        captionsData: 'alt',
        captionDelay: 250,
    });
}

function scrollBottom() {
      const { height: cardHeight } = refs.galleryList.firstElementChild.getBoundingClientRect();
        window.scrollBy({
        top: cardHeight * 2.8,
        behavior: "smooth",
        });
}