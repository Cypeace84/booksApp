let booksList = document.querySelector('.books-list');

const templates = Handlebars.compile(
  document.querySelector('#template-book').innerHTML
);
const filtersDom = document.querySelector('.filters');

function render() {
  for (let book in dataSource.books) {
    let bookElem = dataSource.books[book];

    let countRatingWidth = bookElem.rating * 10;
    let ratingWidth = countRatingWidth.toString();
    bookElem.ratingWidth = ratingWidth;
    const ratingBgc = determineRatingBgc(bookElem.rating);
    bookElem.ratingBgc = ratingBgc;
    const generatedHTML = templates(bookElem, ratingBgc);
    bookElem = utils.createDOMFromHTML(generatedHTML);

    booksList.appendChild(bookElem);
  }
}
let favoriteBooks = [];
const filters = [];
console.log('filters', filters);

function initActions() {
  console.log('fBooks', favoriteBooks);

  booksList.addEventListener('dblclick', function (event) {
    event.preventDefault();

    if (event.target.offsetParent.classList.contains('book__image')) {
      //czemu nie .book__image??
      let id = event.target.offsetParent.getAttribute('data-id');
      if (event.target.offsetParent.classList.contains('favorite')) {
        event.target.offsetParent.classList.remove('favorite');
        removeFromArray(favoriteBooks, id);
      } else {
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(id);
      }
    }
  });

  filtersDom.addEventListener('click', function (event) {
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
        filters.push(event.target.value);
        console.log('value:', event.target.value);
      } else {
        removeFromArray(filters, event.target.value);
      }
    filterBooks();
  });
}

function filterBooks() {
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

function removeFromArray(arr, element) {
  if (arr.includes(element)) {
    const index = arr.indexOf(element);
    arr.splice(index, 1);
  }
}
function determineRatingBgc(rating) {
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
render();
initActions();

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
