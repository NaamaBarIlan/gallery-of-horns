'use strict';

function startApp(){
  loadData(1);
}

function loadData(pageNum){

  // const tester = data => data.forEach(object => dataArray.push(object));

  const success = images => {
    displayPage(images);
    // console.log(images);
  }
  // const success = images => console.log(images);
  const failure = error => console.error(error);

  $.get(`data/page-${pageNum}.json`, 'json')
    .then(success)
    .catch(failure);
}

function displayPage(images) {

  // Clearing any old content before loading the new content:
  $('.photo').empty();


  const template = $('#handlebar-temp').html();

  // console.log('displayPage template', template);

  const render = Handlebars.compile(template);

  // console.log('displayPage render', render);

  // images is the array, creatureObj is an item in the array(obj):
  images.forEach(creatureObj => {

    const imageCardMarkup = render(creatureObj);

    $('.photo').append(imageCardMarkup);

  });
	
  makeDropDown(images);
}

function makeDropDown(images){
  // create an array to hold keywords
  const keywordsArray = [];

  console.log('makedropdown keywordsArray', keywordsArray);

  // we need to push all keywords into the keyword array

  images.forEach((element, i)=> {
    // check if the array already has that word before pushing
    // if the word is not in the array
    if(!keywordsArray.includes(element.keyword)){
      keywordsArray.push(element.keyword) 
    }
  });

  keywordsArray.forEach((arrayElement) => {
    $('select').append($('<option>', {value: arrayElement, text: arrayElement}))
  });  
  
  // console.log('keywords arr', keywordsArray);

  // Event Listeners:

  $('select').on('change', handleFilterChange);
  $('nav li').on('click', handlePageNum);
}

// Filter menu event handler:

const handleFilterChange = event => {

  // Clear filter keyword content:
  

  const dropOption = $(event.target).val();

  if(dropOption === 'default'){
    $('main section').show();
  } else {
    $('.photo section').hide();
    $(`.${dropOption}`).show();
  }
  console.log('Filter dropOption clicked:', dropOption);
}

// Pagination menu event handler:

const handlePageNum = event => {
  
  const pageNumber = $(event.target).attr('data-page');

  $('.photo').show();
  loadData(pageNumber);

  // console.log('page num', pageNumber);
  // console.log('click event', event.target);
}

$(startApp)
