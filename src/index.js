import PixabayApi from './js/pixabay-api.js';
import { markupCreator } from './js/markup-creator.js';
import { Notify } from 'notiflix';

Notify.init({  
  failure: {
    notiflixIconColor: 'white',
  }
});

const refs = {
  form: document.querySelector('form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
}

const { form, gallery, loadMoreBtn } = refs;

const api = new PixabayApi();
loadMoreBtn.style.display = 'none';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  api.searchQuery = form.searchQuery.value.trim();
  if (!api.searchQuery) {
    form.reset();
    return;
  }

  api.resetPage();
  try {
    const pics = await api.getPics();
    if (!pics.data.hits.length)
      throw new Error();
    
    const markup = await markupCreator(pics.data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  try {
    const pics = await api.getPics()
    
    const markup = await markupCreator(pics.data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    
    if (api.page > (pics.data.totalHits / 40) + 1) {
      throw new Error();
    }

  } catch (error) {
    loadMoreBtn.style.display = 'none';
    Notify.failure("We're sorry, but you've reached the end of search results.")
  }
});