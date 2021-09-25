import './sass/main.scss';
import debounce from 'lodash.debounce';
import ApiService from './partials/js-partials/api-service';
import imageCardTpl from './templates/image-card_templates.hbs';
import * as basicLightbox from 'basiclightbox';
import { error, info, defaultStack, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
defaultModules.set(PNotifyMobile, {});

const { defaults } = require('@pnotify/core');
 
defaults.delay = 1500;
defaults.minHeight = '16px'


const refs = {

    searchForm: document.querySelector('.search-form'),
    imageContainer: document.querySelector('.gallery-js'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),   
        
}


const apiService = new ApiService()

refs.searchForm.addEventListener('input', debounce(onInputChange, 1000))
refs.loadMoreBtn.addEventListener('click', onLoadMore)


function appendImageMarkup (data) {
    const markup = imageCardTpl(data);
    refs.imageContainer.insertAdjacentHTML('beforeend', markup);  
      
    
}

function clearImageContainer () {
    refs.imageContainer.innerHTML = '';
}


function removeBtnClass () {
    refs.loadMoreBtn.classList.remove('is-hidden')
}

function addBtnClass () {
    refs.loadMoreBtn.classList.add('is-hidden')
}
function onInputChange(e) {
    clearImageContainer()
    addBtnClass()
    apiService.query = e.target.value.trim();
    if(!apiService.query) {return info('input something')}
    apiService.resetPage()
    apiService.fetchImageByTag()
    .then(data => { if(data.length === 0) {return info('nothing to show')};
    if (data.length === 0 || data.length < 8) {return appendImageMarkup(data)};
    appendImageMarkup(data), removeBtnClass()
})
    
}

function onLoadMore() {  
    apiService.fetchImageByTag().then(data => 
        {if(data.length === 0 || data.length < 8) {addBtnClass();};
        appendImageMarkup(data), imageScroll ()      
})}



function imageScroll () {
    refs.imageContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })   
}



