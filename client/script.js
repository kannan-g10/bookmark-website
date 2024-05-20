const CRUD_API_URL =
  'https://crudcrud.com/api/b67035046989404492479b3ac932bf1b/bookmark';

const API_URL = 'http://127.0.0.1:3000/bookmarkData';

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const focusInput = document.querySelector('input');

let editValue = -1;
form.addEventListener('submit', handleSubmit);

window.onload = getBookmarks();
window.onload = focusInput.focus();

function handleSubmit(e) {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const url = document.querySelector('#url').value;

  if (editValue == -1) {
    postBookmark(title, url);
  } else {
    editBookmarksData(title, url, editValue);
  }

  getBookmarks();

  form.reset();
}

function displayBookmarks(data) {
  ul.innerHTML = '';

  data.forEach(bookmark => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const a = document.createElement('a');
    const container = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    deleteBtn.id = 'delete';
    editBtn.id = 'edit';

    span.innerText = `${bookmark.title} > `;

    a.innerText = bookmark.url;
    a.setAttribute('href', bookmark.url);
    a.setAttribute('target', '_blank');

    deleteBtn.innerText = 'Delete';
    editBtn.innerText = 'Edit';

    deleteBtn.addEventListener('click', () => deleteBookmarks(bookmark._id));
    editBtn.addEventListener('click', () => {
      document.querySelector('#title').focus();
      editBookmarks(bookmark.title, bookmark.url, bookmark._id);
    });

    container.append(span);
    container.append(a);
    li.append(container);
    li.append(deleteBtn);
    li.append(editBtn);

    ul.append(li);
  });
}

async function postBookmark(title, url) {
  try {
    focusInput.focus();
    const response = await axios.post(API_URL, { title, url });
    getBookmarks();
  } catch (err) {
    console.log(err);
  }
}

async function getBookmarks() {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;
    displayBookmarks(data);
  } catch (err) {
    console.log(err);
  }
}

async function deleteBookmarks(id) {
  try {
    focusInput.focus();
    const response = await axios.delete(API_URL + '/' + id);
    getBookmarks();
  } catch (err) {
    console.log(err);
  }
}

async function editBookmarks(title, url, id) {
  document.querySelector('#title').value = title;
  document.querySelector('#url').value = url;
  focusInput.focus();
  editValue = id;
}

async function editBookmarksData(title, url, id) {
  const response = await axios.put(API_URL + '/' + id, { title, url });
  getBookmarks();
  focusInput.focus();
  editValue = -1;
}
