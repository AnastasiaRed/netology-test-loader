import getJson from './api';

const PATH = 'https://raw.githubusercontent.com/netology-code/ajs-task/master/netology.json';

const createGroupsTemplate = (list) => {
  const groupsTemplate = `
    <ul class="nav-list nav-list--inner hidden">
      ${list.map((item) => `<li><a href="${item.link}">${item.title}</a></li>`).join('')}            
    </ul>
  `;
  return groupsTemplate;
};

const createDirectionsTemplate = (list) => {
  const directionsTemplate = `
    <ul class="nav-list">
      ${list.map((item) => `
        <li class="nav-list__item">
          <a href="${item.direction.link}" class="nav-list__link">
            <h2 class="nav-list__title">${item.direction.title}</h2>
            <p class="nav-list__text">${item.groups.length} курса</p>
          </a>
          ${item.groups.length ? createGroupsTemplate(item.groups) : ''}
        </li>
    `).join('')}        
    </ul>
  `;
  return directionsTemplate;
};

const createNavMarkup = (data) => {
  const mainTemplate = `
    <section class="container nav-container">
      <h1 class="nav-container__headline">Изучайте <span class="text text--primary">актуальные темы</span></h1>
      ${data.length ? createDirectionsTemplate(data) : '<p>Нет доступных курсов</p>'}
      <a href="#" class="nav-container__btn" title="Задать вопрос менеджеру"><img width="40" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjRkZGRkZGIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHg9IjBweCIgeT0iMHB4Ij48dGl0bGU+QXJ0Ym9hcmQgMjc8L3RpdGxlPjxwYXRoIGQ9Ik01MCwyMEEzMCwzMCwwLDAsMCwyMCw1MGEyNy44OCwyNy44OCwwLDAsMCwzLjM1LDEzLjc0bC0zLDguMjFhNiw2LDAsMCwwLDcuNjksNy42OWw4LjIxLTNBMjcuODgsMjcuODgsMCwwLDAsNTAsODBhMzAsMzAsMCwxLDAsMC02MFptMCw1NGEyMS4wOCwyMS4wOCwwLDAsMS0xMy00TDI2LDc0bDQtMTFhMjEuMDgsMjEuMDgsMCwwLDEtNC0xM0EyNCwyNCwwLDEsMSw1MCw3NFoiPjwvcGF0aD48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIzNyIgY3k9IjUwIiByPSIzIj48L2NpcmNsZT48Y2lyY2xlIGN4PSI2MyIgY3k9IjUwIiByPSIzIj48L2NpcmNsZT48L3N2Zz4=" alt=""></a>
    </section>`;
  return mainTemplate;
};

export default function init(selector) {
  const placeholder = document.querySelector(selector);
  if (!placeholder) {
    throw new Error(`Element ${selector} not found`);
  }

  getJson(PATH)
    .then((data) => {
      const markup = createNavMarkup(data.data);
      placeholder.innerHTML = markup;
      placeholder.classList.add('loaded');
    })
    .catch((e) => {
      throw new Error(e.message);
    });
}
