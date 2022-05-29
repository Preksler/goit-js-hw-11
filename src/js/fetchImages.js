import axios from 'axios';

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = null;
    }

    async fetchImages() {
        const response = await axios.get(`https://pixabay.com/api/?key=27643895-f6cbf0652fd699c6e124c20c0&q=${this.searchQuery}&page=${this.page}&image_type=photo&orientation=horizontal&per_page=40&safesearch=true`);
        this.incrementPage();
        return response;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    getPage() {
        return this.page;
    }

    setHits(totalHits) {
        this.totalHits = totalHits - 40;
    }

    decrementHits() {
        this.totalHits -= 40;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}