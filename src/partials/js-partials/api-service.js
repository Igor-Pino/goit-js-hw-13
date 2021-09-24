console.log('hi')

export default class ApiService {
constructor() {
    this.searchQuery = '';
    this.API_KEY = '23521074-c1847750f84d7ba2d97c15f75';
    this.BASE_URL = 'https://pixabay.com/api/';
    this.page = 1;

}

    async fetchImageByTag() {
        const url = `${this.BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=8&key=${this.API_KEY}`
        const response = await fetch(url);
        const data = await response.json();
        this.incrementPage();
        return data.hits;
    
  
    }

    incrementPage (){
        this.page += 1;
    }

    resetPage () {
        this.page = 1;
    }

    get query () {
        return this.searchQuery
    }

    set query (newQuery){
        this.searchQuery = newQuery
    }


}