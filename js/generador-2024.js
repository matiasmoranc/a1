

//En CMS: Tool - LIVE CASINO - Carousel Generator - v2
//ultimo update: se quita la exclusión de los juegos de pragmatic
'use strict';

var lang = getCookie('LANG');
const tope_juegos_carousel = 15;

async function apiRequest(endpoint) {
  const response = await fetch(endpoint, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Connection': 'keep-alive',
      'Host': 'services.bodog.com',
      'language': lang
    }
  });
  const json = await response.json();
  return json;
}

function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
}

const arr_menues = [
  'menu-generador-livecasino-salas-latinas',
  'menu-generador-livecasino-melhores-jogos',
  'menu-generador-livecasino-roleta-ao-vivo',
  'menu-generador-livecasino-blackjack',
  'menu-generador-livecasino-games-show',
  'menu-generador-livecasino-baccarat-e-mais',


  //'menu-ver-mas-livecasino-baccarat-e-mais',
  //'menu-ver-mas-livecasino-games-show',
  //'menu-ver-mas-livecasino-blackjack-ao-vivo',
  //'menu-livecasino-melhores-jogos-pra-voce',
  //'menu-ver-mas-livecasino-roleta-ao-vivo'
];

async function run_casino_generator() {
  for (const [index, menu] of arr_menues.entries()) {
    fetchAndBuild(`https://www.bodog.com/content/v5/buckets/latam/languages/${lang}/slugs/${menu}`, index);
  }
}

run_casino_generator();

async function fetchAndBuild(url, index) {
  const skipCache = Math.floor(Math.random() * (1 - 5000)) + 1;
  const skip = `?skipCache=${skipCache}`;
  const response = await apiRequest(url + skip);

  if (response) {
    promoCarouselBuilder(response, index);
  }
}

function promoCarouselBuilder(response, index) {
  console.log('promoCarouselBuilder');
  console.log(response);
  let orderNum = index;
  const slug = response?.slug;
  const title = response?.fields?.title.split('/')[0];
  const items = response?.fields?.items;

  const see_more_link = response?.fields?.uriSuffix.split('-carousel')[0];

  let texto_ver_mas = '/cms/BDG/OwDQSYPXSZi8UErTKK930w/Casino-veja-mais.webp';

  if (lang == 'es') {
    texto_ver_mas = '/cms/BDG/DtnvDji3Taq6k9zNgSW1CQ/Casino-ver-mas.webp';
  }
  if (lang == 'en') {
    texto_ver_mas = '/cms/BDG/ExhzYVC0RGaImTUMK3cWQ/Casino-see-more.webp';
  }

  if (items) {
    let url_idioma = '';

    switch (lang) {
      case 'pt':
        url_idioma = '';
        break;

      case 'es':
        url_idioma = 'es/';
        break;

      case 'en':
        url_idioma = 'en/';
    }

    let html_juegos = '';

    for (let i = 0; (i < items.length) &amp;&amp; (i < tope_juegos_carousel); i++) {
      let item = items[i];
      let card_url = '';
      let card_alt = '';
      let game_title = '';
      let game_provider = '';
      let game_flag = '';
      let flag_url = '';

      //Si tiene la propiedad 'linkText' es un external link (es de evolution)
      if (item?.linkText === undefined) {
        card_url = item.fields.card_image.url;
        card_alt = item.fields.card_image.alt;
        game_title = item.fields.title;
        let category = item.fields.category.slug;
        let subcategory = item.fields?.subcategory?.slug;
        let uriSuffix = item.uriSuffixes[lang];
        let game_provider_tag = '';
        game_provider = '';
        game_flag = '';

        game_provider_tag = item?.fields.tags?.split('@@');
        if (game_provider_tag &amp;&amp; game_provider_tag[0] &amp;&amp; game_provider_tag[1]) {
          game_provider = capitalizeWords(game_provider_tag[0]);
          game_flag = game_provider_tag[1]
        }

        if (game_flag == 'pt' || game_flag == 'PT') {
          flag_url = '/cms/BDG/eZ5uoxySZCalhQvurOH+g//bandera-BR.webp';
        }
        else if (game_flag == 'es' || game_flag == 'ES') {
          flag_url = '/cms/BDG/MhTdtmkbS+CZHR79gZ7lA//bandera-ES.webp';
        }
        else {
          flag_url = '/cms/BDG/QZrGMZdjQtGm6rkkRfw3Tw//pixel.png';
        }

        if (game_provider == 'Pragmatic' || game_provider.includes('Pragmatic')) {
          game_provider += ' Play';
        }

        let card = `
          <div class='card-carousel-livecasino'>
            <a href='https://www.bodog.com/${url_idioma}live-dealer-lobby?overlay=casino/${category}/${subcategory}/${uriSuffix}'>
              <img class='bandera' src='${flag_url}' />
              <span class='card-content-container'>
                <span class='card-game-provider'>${game_provider}</span>
                <br>
                <span class='card-game-title'>${game_title}</span>
              </span>
              <img src='https://www.bodog.com${card_url}' alt='${game_title}' />
            </a>
          </div>
          `;

        if (game_provider != 'Pragmatic Play') {
            html_juegos += card;
        } 
      }
      else {
        let game_info = item.linkText?.split('@@');
        game_title = game_info[0];
        card_alt = game_title
        card_url = item.linkUrl;
        game_provider = 'Evolution'
        game_flag = game_info[1]; //bandera

        if (game_flag == 'pt' || game_flag == 'PT') {
          flag_url = '/cms/BDG/eZ5uoxySZCalhQvurOH+g//bandera-BR.webp';
        }
        else if (game_flag == 'es' || game_flag == 'ES') {
          flag_url = '/cms/BDG/MhTdtmkbS+CZHR79gZ7lA//bandera-ES.webp';
        }
        else {
          flag_url = '/cms/BDG/QZrGMZdjQtGm6rkkRfw3Tw//pixel.png';
        }


        let card = `
        <div class='card-carousel-livecasino'>
          <a href='https://www.bodog.com/evolution'>
            <img class='bandera' src='${flag_url}' />
            <span class='card-content-container'>
              <span class='card-game-provider'>${game_provider}</span>
              <br>
              <span class='card-game-title'>${game_title}</span>
            </span>
            <img src='${card_url}' alt='${game_title}' />
          </a>
        </div>
      `;

        if (game_provider != 'Pragmatic Play') {
            html_juegos += card;
        } 
      }
    }

    // ** Revisar link de href, cambiar '/casino' por '/livecasino' si es necesario
    let card = `
        <div>
            <a href='https://www.bodog.com/${url_idioma}casino/${see_more_link}'>
                <img src='${texto_ver_mas}' alt='ver mas' class='see-more-img'>
            </a>
        </div>
        `;
    html_juegos += card;
    const html_carousel = `
        <div class='glider-info'>
            <div class='glider-title'>
                <h3>${title}</h3>
            </div>
            <div class='glider-controls'>
                <div class='gliderLineal hide' id='glider-icon-row-${slug}' >
                    <img style='width: 45px !important;' src='https://www.bodog.com/cms/BDG/V7Xodu6eStmoGNxizxlrjw/casino-icon-B.webp' alt='line view' />
                </div>
                <div class='gliderCuadricula' id='glider-icon-grid-${slug}' >
                    <img style='width: 45px !important;' src='https://www.bodog.com/cms/BDG/hNL4U67ORcCejC4Q1SjOA/casino-icon-A.webp' alt='grid view' />
                </div>
            </div>
        </div>
        <div class='glider-contain'>
            <div class='glider select-glider' id='glider-${slug}'>
                ${html_juegos}
            </div>
            <button class='glider-prev' id='glider-prev-${slug}'>«</button>
            <button class='glider-next' id='glider-next-${slug}'>»</button>
            <div id='dots-${slug}'></div>
        </div>
        `;




    const textarea_html_juegos = `
        <textarea data-mce-onclick='select_all(this)'>
            ${html_carousel}
        </textarea>
        `;
    const carouseles2 = document.getElementById('carouseles');

    if (carouseles2) {
      carouseles2.innerHTML += `<div style='order: ${orderNum};'><h3 style=' margin-top:30px;margin-bottom:5px; margin-left: 20px; font-family: 'Barlow Semi Condensed', sans-serif; font-size: 1rem'><span style='font-weight: 600;'>${title}</span> <br>Uri Suffix: ${slug}</h3> ${textarea_html_juegos}</div>`;
    }

  }
}

function select_all(elem) {
  elem.focus(); // Focus on textarea 

  elem.select(); // Select all text 

  document.execCommand('Copy');
}

function capitalizeWords(inputString) {
  // Dividir el string en palabras usando espacios y guiones bajos
  const words = inputString.split(/[\s_]+/);

  // Capitalizar la primera letra de cada palabra
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // Unir las palabras para formar el string resultante
  const resultString = capitalizedWords.join(' ');

  return resultString;
}

