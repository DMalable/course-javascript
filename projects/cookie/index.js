/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('input', function () {});

const tableHeaders = homeworkContainer.querySelectorAll('#list-table th');

//добавление новой строки по нажатию на кнопку
addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;

  const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});

  const fragment = document.createDocumentFragment();

  //удаление старого списка
  listTable.innerHTML = '';

  //формирование нового списка
  for (const key in cookies) {
    const newTr = document.createElement('tr');
    fragment.append(newTr);

    tableHeaders.forEach(() => {
      const newTd = document.createElement('td');
      newTr.append(newTd);
    });

    //кнопка "удалить cookie"
    const removeButton = document.createElement('button');
    removeButton.style.width = '60px';
    removeButton.style.height = '20px';
    //заполнение ячеек строки
    newTr.children[0].textContent = key || '';
    newTr.children[1].textContent = cookies[key] || '';
    newTr.children[2].append(removeButton);
  }
  listTable.append(fragment);
});

//удаление куки по кнопке
listTable.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const cookieName = e.target.closest('tr').firstElementChild.textContent;
    document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    e.target.closest('tr').remove();
  }
});
