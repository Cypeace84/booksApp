const templates = Handlebars.compile(
  document.querySelector('#template-book').innerHTML
);

class BooksList {
  constructor() {
    const thisProduct = this;
    const favoriteBooks = [];
    const filters = [];
    console.log('filters', filters);
    thisProduct.render();
    thisProduct.initActions();
    thisProduct.getElements();
    thisProduct.determineRatingBgc();
    thisProduct.removeFromArray();
    thisProduct.filterBooks();
  }
  getElements() {
    const thisProduct = this;
    thisProduct.booksList = document.querySelector('.books-list');
    thisProduct.filtersDom = document.querySelector('.filters');
  }

  render() {
    const thisProduct = this;
    //this.data = dataSource.books;
    for (let book in dataSource.books) {
      let bookElem = dataSource.books[book];

      let countRatingWidth = bookElem.rating * 10;
      let ratingWidth = countRatingWidth.toString();
      bookElem.ratingWidth = ratingWidth;
      const ratingBgc = thisProduct.determineRatingBgc(bookElem.rating);
      bookElem.ratingBgc = ratingBgc;
      const generatedHTML = templates(bookElem);
      thisProduct.bookElem = utils.createDOMFromHTML(generatedHTML);

      thisProduct.booksList.appendChild(thisProduct.bookElem);
    }
  }

  initActions() {
    const thisProduct = this;
    //console.log('fBooks', favoriteBooks);

    thisProduct.booksList.addEventListener('dblclick', function (event) {
      event.preventDefault();

      if (event.target.offsetParent.classList.contains('book__image')) {
        //czemu nie .book__image??
        let id = event.target.offsetParent.getAttribute('data-id');
        if (event.target.offsetParent.classList.contains('favorite')) {
          event.target.offsetParent.classList.remove('favorite');
          thisProduct.removeFromArray(thisProduct.favoriteBooks, id);
        } else {
          event.target.offsetParent.classList.add('favorite');
          thisProduct.favoriteBooks.push(id);
        }
      }
    });

    thisProduct.filtersDom.addEventListener('click', function (event) {
      //event.preventDefault();
      const tagName = document.querySelector('.filters input');
      console.log('tagName', tagName);
      console.log('input type', event.target.type);
      if (
        event.target.tagName == 'INPUT' &&
        event.target.type == 'checkbox' &&
        event.target.name == 'filter'
      )
        if (event.target.checked) {
          thisProduct.filters.push(event.target.value);
          console.log('value:', event.target.value);
        } else {
          thisProduct.removeFromArray(thisProduct.filters, event.target.value);
        }
      thisProduct.filterBooks();
    });
  }

  filterBooks() {
    const thisProduct = this;
    for (const book in dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filters) {
        if (dataSource.books[book].details[filter]) {
          // console.log(
          //   'book.details[filter]',
          //   dataSource.books[book].details[filter]
          // );
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

  //!!!!!!!!!!!!!!!!!!!!!!!offsetParent jak działa???????!!!!!!!!!!!!!!!!!!!!!//
  // zwraca najbliższego przodka, który ma pozycję inną niż statyczna. czyli np. relative??///

  removeFromArray(arr, element) {
    const thisProduct = this;
    if (arr.includes(element)) {
      const index = arr.indexOf(element);
      arr.splice(index, 1);
    }
  }
  determineRatingBgc(rating) {
    const thisProduct = this;
    let backGround = '';
    if (rating < 6) {
      backGround = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      backGround = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      backGround = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      backGround = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return backGround;
  }
}

const app = new BooksList();
app();

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
