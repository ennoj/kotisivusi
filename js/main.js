/////////////////////// MATERIALIZE CSS //////////////////////////
document.addEventListener('DOMContentLoaded', function() {
  let addLink = document.querySelectorAll('#add-link');
  M.Modal.init(addLink);
});

/////////////////////// LINKIT SECTION ///////////////////////////
const form = document.querySelector('#add-link-form');
const linkList = document.querySelector('.collection');
const linkUrl = document.querySelector('#link-url');
const linkName = document.querySelector('#link-name');

// LATAA KAIKKI EVENT LISTENERIT
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getLinks);
  form.addEventListener('submit', addLink);
  linkList.addEventListener('click', removeLink);
}

// NOUDA LINKIT LOCALSTORAGESTA
function getLinks() {
  let links;
  if (localStorage.getItem('links') === null) {
    links = [];
  } else {
    links = JSON.parse(localStorage.getItem('links'));
  }

  links.forEach(function(link) {
    // Luo elementit
    const li = document.createElement('li');
    const a = document.createElement('a');
    const deleteLink = document.createElement('a');

    // Lisää href ja nimeä linkki (a)
    a.href = link.url;
    a.appendChild(document.createTextNode(link.name));

    // Lisää classit
    li.className = 'collection-item';
    deleteLink.className = 'delete-item secondary-content';

    // Iconin sisältö
    deleteLink.innerHTML = '<i class="material-icons">remove_circle</i>';

    // Lisää li a:n alaisuuteen
    li.appendChild(a);

    // Append link to li
    li.appendChild(deleteLink);

    // Append li to ul
    linkList.appendChild(li);
  });
}
// LISÄÄ LINKKI
function addLink(e) {
  if (linkUrl.value === '' || linkName.value === '') {
    alert('Täytä molemmat kentät');
  }

  // Luo elementit
  const li = document.createElement('li');
  const a = document.createElement('a');
  const deleteLink = document.createElement('a');

  // Lisää href ja nimeä linkki (a)
  a.href = linkUrl.value;
  a.appendChild(document.createTextNode(linkName.value));

  // Lisää classit
  li.className = 'collection-item cyan lighten-5';
  deleteLink.className = 'delete-item secondary-content';
  deleteLink.href = '#';

  // Iconin sisältö
  deleteLink.innerHTML = '<i class="material-icons">remove_circle</i>';

  // Lisää li a:n alaisuuteen
  li.appendChild(a);

  // Append link to li
  li.appendChild(deleteLink);

  // Append li to ul
  linkList.appendChild(li);

  // LISÄÄ LOCALSTORAGEEN
  let linksToStorage = {
    name: linkName.value,
    url: linkUrl.value
  };
  storeLinks(linksToStorage);

  // Nollaa kentät
  linkUrl.value = 'https://www.';
  linkName.value = '';

  // Näytä collection ul ja piilota huomio <p>
  document.querySelector('.collection').style.display = 'block';
  document.querySelector('.noLinksYet').style.display = 'none';
  console.log(deleteLink);

  e.preventDefault();
}

// LISÄÄ LOCALSTORAGEEN
function storeLinks(link) {
  let links;
  if (localStorage.getItem('links') === null) {
    links = [];
  } else {
    links = JSON.parse(localStorage.getItem('links'));
  }

  links.push(link);

  localStorage.setItem('links', JSON.stringify(links));
}

// POISTA LINKKI
function removeLink(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Oletko varma?')) {
      e.target.parentElement.parentElement.remove();

      // Poista myös LOCALSTORAGESTA
      removeFromLS(e.target.parentElement.parentElement);
    }
  }
}

// POISTA LOCALSTORAGESTA
function removeFromLS(linkItem) {
  let links;
  if (localStorage.getItem('links') === null) {
    links = [];
  } else {
    links = JSON.parse(localStorage.getItem('links'));
  }

  links.forEach(function(link, index) {
    /* console.log(link);
    console.log(linkItem.children[0].textContent);
    console.log(link.name);*/

    if (linkItem.children[0].textContent === link.name) {
      links.splice(index, 1);
    }
  });

  localStorage.setItem('links', JSON.stringify(links));
}

/////////////////////// KELLO SECTION ///////////////////////////
// DOM ELEMENTIT
const time = document.getElementById('time'),
  dmy = document.getElementById('dmy'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

// AIKA
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // NÄYTÄ AIKA
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  setTimeout(showTime, 1000);
}

// PVM
function showDmy() {
  let today = new Date(),
    d = today.getDate(),
    m = today.getMonth(),
    y = today.getFullYear();

  // NÄYTÄ PVM
  dmy.innerHTML = `${d}<span>.</span>${m}<span>.</span>${y}`;

  setTimeout(showDmy, 60000);
}

// LISÄÄ NOLLAT
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// ASETA TAUSTAKUVA
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // AAMU
    document.getElementById('clock').style.backgroundImage =
      "url('./img/morning.jpg')";
    greeting.textContent = 'Hyvää huomenta, ';
  } else if (hour < 18) {
    // ILTAPÄIVÄ
    document.getElementById('clock').style.backgroundImage =
      "url('./img/afternoon.jpg')";
    greeting.textContent = 'Hyvää iltapäivää, ';
  } else {
    // ILTA
    document.getElementById('clock').style.backgroundImage =
      "url('./img/night.jpg')";
    greeting.textContent = 'Hyvää iltaa, ';
    document.getElementById('clock').style.color = 'white';
  }
}

// HAE NIMI
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = 'NIMESI';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// ASETA NIMI
function setName(e) {
  if (e.type === 'keypress') {
    // Varmista että käyttäjä painaa ENTERiä
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// HAE MOTIVAATIO
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = 'PÄIVÄSI MOTIVAATIO';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// ASETA MOTIVAATIO
function setFocus(e) {
  if (e.type === 'keypress') {
    // Varmista että käyttäjä painaa ENTERiä
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

// EVENT LISTENERIT
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName); // Jos käyttäjä klikkaa pois

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus); // Jos käyttäjä klikkaa pois

// KÄYNNISTÄ
showTime();
showDmy();
setBgGreet();
getName();
getFocus();
