import axios from 'axios';
const API_KEY = `37049181-477cd3b08f8c43486a46fa1dd`;

export default class PixabayApi {
    page;
    hits;

    constructor() {
        this.query = '';
        this.page = 1;
        this.hits = 0;
    }

    get searchQuery() {
        return this.query;
    }

    set searchQuery(newSearchQuery) {
        this.query = newSearchQuery;
    }

    async getPics() {
        const response = await axios.get(`https://pixabay.com/api/`, {
            params: {
                key: API_KEY,
                q: this.query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                per_page: '40',
                page: `${this.page}`
            }
        });
            
        this.incrementPage();
        this.incrementHits();
        return response;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    incrementHits() {
        this.hits += 40;
    }

    resetHits() {
        this.hits = 0;
    }
}