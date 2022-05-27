import axios from 'axios';

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        // const params = {
        //     key: '27643895-f6cbf0652fd699c6e124c20c0',
        //     q: this.searchQuery,
        //     page: this.page,
        //     image_type: 'photo',
        //     orientation: 'horizontal',
        //     per_page: 40,
        //     safesearch: true,
        // };
        // const response = await axios.get(`https://pixabay.com/api/`, params);

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

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}