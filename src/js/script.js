let booksList = document.querySelector('.books-list');
//let book__image = document.querySelectorAll('.book__image');
const templates = Handlebars.compile(
  document.querySelector('#template-book').innerHTML
);
const filtersDom = document.querySelector('.filters');

function render() {
  for (let book in dataSource.books) {
    let bookElem = dataSource.books[book];
    const generateHTML = templates(bookElem);
    bookElem = utils.createDOMFromHTML(generateHTML);

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
  for (let book in dataSource.books) {
    let shouldByHidden = false;
    for (let filter of filters) {
      if (!dataSource.books[book].details[filter]) {
        console.log(
          'book.details[filter]',
          dataSource.books[book].details[filter]
        );
        shouldByHidden = true;

        break;
      } /*(shouldByHidden != true) */
      if ((shouldByHidden = true)) {
        let bookId = dataSource.books[book].id;
        let bookById = document.querySelector('[data-id = "' + bookId + '"]');

        bookById.classList.add('hidden');
      } else {
        let bookId = dataSource.books[book].id;
        let bookById = document.querySelector('[data-id = "' + bookId + '"]');
        bookById.classList.remove('hidden');
      }
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
