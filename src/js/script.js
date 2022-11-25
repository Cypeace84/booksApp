let booksList = document.querySelector('.books-list');
const templates = Handlebars.compile(
  document.querySelector('#template-book').innerHTML
);

function render() {
  for (let book in dataSource.books) {
    let bookElem = dataSource.books[book];
    const generateHTML = templates(bookElem);
    bookElem = utils.createDOMFromHTML(generateHTML);

    booksList.appendChild(bookElem);
  }
}
let favoriteBooks = [];

function initActions() {
  console.log('fBooks', favoriteBooks);
  let bookImagesDom = document.querySelectorAll('.book__image');
  for (let bookImageDom of bookImagesDom) {
    bookImageDom.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const id = bookImageDom.getAttribute('data-id');
      if (bookImageDom.classList.contains('favorite')) {
        bookImageDom.classList.remove('favorite');
        removeFromArray(favoriteBooks, id);
      } else {
        bookImageDom.classList.add('favorite');
        favoriteBooks.push(id);
      }
    });
  }
}
function removeFromArray(arr, element) {
  if (arr.includes(element)) {
    const index = arr.indexOf(element);
    arr.splice(index, 1);
  }
}
render();
initActions();
