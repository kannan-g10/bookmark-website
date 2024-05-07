const API_URL =
  'https://crudcrud.com/api/b67035046989404492479b3ac932bf1b/bookmark';

const form = document.querySelector('form');
const ul = document.querySelector('ul');

let editValue = -1;

window.onload = getBookmarks();

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const url = document.querySelector('#url').value;

  if (editValue != -1) {
    handleEdit(title, url);
    editValue = -1;
  } else postBookmarks(title, url);

  form.reset();
}

function displayBookmarks({ title, url, _id }) {
  const li = document.createElement('li');
  const span = document.createElement('span');

  const deleteBtn = document.createElement('button');
  const editBtn = document.createElement('button');

  deleteBtn.innerText = 'Delete';
  editBtn.innerText = 'Edit';

  deleteBtn.addEventListener('click', () => handleDelete(_id));
  editBtn.addEventListener('click', () => handleEdit(title, url, _id));

  span.innerText = `${title} > ${url}`;

  li.append(span);
  li.append(deleteBtn);
  li.append(editBtn);

  ul.append(li);
}

async function getBookmarks() {
  ul.innerHTML = '';
  try {
    const response = await axios.get(API_URL);
    const data = response.data;
    data.forEach(item => displayBookmarks(item));
  } catch (err) {
    console.log(err);
  }
}

async function postBookmarks(title, url) {
  try {
    const response = await axios.post(API_URL, { title, url });
    getBookmarks();
  } catch (err) {
    console.log(err);
  }
}

async function handleDelete(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    const data = response.data;
    getBookmarks();
  } catch (err) {
    console.log(err);
  }
}

async function handleEdit(title, url, id) {
  try {
    console.log('edited', title, url);
    document.querySelector('#title').value = title;
    document.querySelector('#url').value = url;
    editValue = id;
    if (id == -1) {
      const response = await axios.put(`${API_URL}/${id}`, { title, url });
      const data = response.data;
    }
  } catch (err) {
    console.log(err);
  }
}
