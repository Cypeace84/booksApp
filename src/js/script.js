// eslint-disable-next-line no-unused-vars
const templates = Handlebars.compile(
  document.querySelector('#template-book').innerHTML
);

class BooksList {
  constructor() {
    const thisBooksList = this;
    thisBooksList.filters = [];
    console.log(thisBooksList);
    thisBooksList.favoriteBooks = [];
    thisBooksList.getElements();
    thisBooksList.render();
    thisBooksList.initActions();
  }
  getElements() {
    const thisBooksList = this;
    thisBooksList.booksList = document.querySelector('.books-list');
    thisBooksList.filtersDom = document.querySelector('.filters');
  }

  render() {
    const thisBooksList = this;
    for (let book in dataSource.books) {
      let bookElem = dataSource.books[book];

      let countRatingWidth = bookElem.rating * 10;
      let ratingWidth = countRatingWidth.toString();
      bookElem.ratingWidth = ratingWidth;
      const ratingBgc = thisBooksList.determineRatingBgc(bookElem.rating);
      bookElem.ratingBgc = ratingBgc;
      const generatedHTML = templates(bookElem);
      thisBooksList.bookElem = utils.createDOMFromHTML(generatedHTML);

      thisBooksList.booksList.appendChild(thisBooksList.bookElem);
    }
  }

  initActions() {
    const thisBooksList = this;

    thisBooksList.booksList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('book__image')) {
        //czemu nie .book__image??
        let id = event.target.offsetParent.getAttribute('data-id');
        if (event.target.offsetParent.classList.contains('favorite')) {
          event.target.offsetParent.classList.remove('favorite');
          thisBooksList.removeFromArray(thisBooksList.favoriteBooks, id);
        } else {
          event.target.offsetParent.classList.add('favorite');
          thisBooksList.favoriteBooks.push(id);
        }
      }
    });

    thisBooksList.filtersDom.addEventListener('click', function (event) {
      const tagName = document.querySelector('.filters input');
      console.log('tagName', tagName);
      console.log('input type', event.target.type);
      if (
        event.target.tagName == 'INPUT' &&
        event.target.type == 'checkbox' &&
        event.target.name == 'filter'
      )
        if (event.target.checked) {
          thisBooksList.filters.push(event.target.value);
          console.log('value:', event.target.value);
        } else {
          thisBooksList.removeFromArray(
            thisBooksList.filters,
            event.target.value
          );
        }
      thisBooksList.filterBooks();
    });
  }

  filterBooks() {
    const thisBooksList = this;
    for (const book in dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of thisBooksList.filters) {
        if (dataSource.books[book].details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookId = dataSource.books[book].id;
      const bookById = document.querySelector('[data-id="' + bookId + '"]');
      if (shouldBeHidden) {
        bookById.classList.add('hidden');
      } else {
        bookById.classList.remove('hidden');
      }
    }
  }

  removeFromArray(arr, element) {
    if (arr.includes(element)) {
      const index = arr.indexOf(element);
      arr.splice(index, 1);
    }
  }
  determineRatingBgc(rating) {
    const thisBooksList = this;
    thisBooksList.backGround = '';
    if (rating < 6) {
      thisBooksList.backGround =
        'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      thisBooksList.backGround =
        'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      thisBooksList.backGround =
        'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      thisBooksList.backGround =
        'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return thisBooksList.backGround;
  }
}

const app = new BooksList();
//app();

//1 wersja init action//
// function initActions() {
//   console.log('fBooks', favoriteBooks);
//   let bookImagesDom = document.querySelectorAll('.book__image');
//   for (let bookImageDom of bookImagesDom) {
//     bookImageDom.addEventListener('dblclick', function (event) {
//       event.preventDefault();
//       const id = bookImageDom.getAttribute('data-id');
//       if (bookImageDom.classList.contains('favorite')) {
//         bookImageDom.classList.remove('favorite');
//         removeFromArray(favoriteBooks, id);
//       } else {
//         bookImageDom.classList.add('favorite');
//         favoriteBooks.push(id);
//       }
//     });
//   }
// }
