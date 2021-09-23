import './sass/main.scss';
import debounce from 'lodash.debounce';
import ApiService from './partials/js-partials/api-service';
import imageCardTpl from './templates/image-card_templates.hbs';

const refs = {
    searchForm: document.querySelector('.search-form'),
    imageContainer: document.querySelector('.gallery-js'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
}


const apiService = new ApiService()

refs.searchForm.addEventListener('input', debounce(onInputChange, 1000))
refs.loadMoreBtn.addEventListener('click', onLoadMore)





function onInputChange(e) {
    clearImageContainer()
    apiService.query = e.target.value;
    if(apiService.query === '') {return alert('input something')}
    apiService.resetPage()

    apiService.fetchImageByTag().then(appendImageMarkup);


}


function onLoadMore() {
  
    apiService.fetchImageByTag().then(appendImageMarkup)
}

function appendImageMarkup (data) {
    const markup = imageCardTpl(data);
    refs.imageContainer.insertAdjacentHTML('beforeend', markup)
    console.log(data)


}


function clearImageContainer () {
    refs.imageContainer.innerHTML = '';
}