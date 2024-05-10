const CRUD_API_URL =
  'https://crudcrud.com/api/b67035046989404492479b3ac932bf1b/bookmark';

const API_URL = 'http://127.0.0.1:3000/bookmarkData';

const form = document.querySelector('form');
const ul = document.querySelector('ul');

let editValue = -1;
form.addEventListener('submit', handleSubmit);

window.onload = getBookmarks();

async function handleSubmit(e) {
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

async function postBookmark(title, url) {
  try {
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

function displayBookmarks(data) {
  ul.innerHTML = '';

  data.forEach(bookmark => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    deleteBtn.id = 'delete';
    editBtn.id = 'edit';
    span.innerText = `${bookmark.title} > ${bookmark.url}`;
    deleteBtn.innerText = 'Delete';
    editBtn.innerText = 'Edit';

    deleteBtn.addEventListener('click', () => deleteBookmarks(bookmark._id));
    editBtn.addEventListener('click', () =>
      editBookmarks(bookmark.title, bookmark.url, bookmark._id)
    );

    li.append(span);
    li.append(deleteBtn);
    li.append(editBtn);

    ul.append(li);
  });
}

async function deleteBookmarks(id) {
  try {
    const response = await axios.delete(API_URL + '/' + id);
    getBookmarks();
  } catch (err) {
    console.log(err);
  }
}

async function editBookmarks(title, url, id) {
  document.querySelector('#title').value = title;
  document.querySelector('#url').value = url;

  editValue = id;
}

async function editBookmarksData(title, url, id) {
  const response = await axios.put(API_URL + '/' + id, { title, url });
  getBookmarks();
  editValue = -1;
}
