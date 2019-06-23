'use strict';

function startApp(){
  loadData(1);
}

function loadData(pageNum){

  // const tester = data => data.forEach(object => dataArray.push(object));

  const success = images => {
    displayPage(images);
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

    // console.log('image card markup', imageCardMarkup);

  });
	
  makeFilterDropDown(images);
  makeSortDropDown(images);
  // console.log('hornsArray: ', hornsArray);
}

function makeFilterDropDown(images){

  // console.log('images in filter', images);
  // create an array to hold keywords
  const keywordsArray = [];
  // console.log('makedropdown keywordsArray', keywordsArray);

  // push all keywords into the keyword array:
  images.forEach((element, i)=> {
    // check if the array already has that word before pushing
    if(!keywordsArray.includes(element.keyword)){
      keywordsArray.push(element.keyword) 
    } 
  });

  $(`#filter-button`).empty();

  keywordsArray.forEach((arrayElement) => {
    $('#filter-button').append($('<option>', {value: arrayElement, text: arrayElement}))
  });

  // Event Listeners:

  $('#filter-button').on('change', handleFilterChange);
  $('nav li').on('click', handlePageNum);
}

function makeSortDropDown(images) {

  //TO DO.. add a Change Event hadnler, add a listener, grab the value, 
  //clear the DOM, pull the images array and then sort it (horns, title)
  //sort the collection before we pull

  console.log('images in sort', images);

  const numOfHornsArray = [];
  const titleOfHornsArray = [];

  images.forEach((element, i)=> {
    numOfHornsArray.push(element.horns);
    numOfHornsArray.sort((a, b) => a - b);
  });

  console.log('sorted numOfHornsArray: ', numOfHornsArray);

  images.forEach((element, i)=> {
    titleOfHornsArray.push(element.title);
    titleOfHornsArray.sort();
  });

  console.log('titleOfHornsArray: ', titleOfHornsArray);

  $(`#sort-button`).empty();
  $('#sort-button').append($('<option>', {value: numOfHornsArray, text: 'Sort by number of horns'}));
  $('#sort-button').append($('<option>', {value: titleOfHornsArray, text: 'Sort by Title'}));

  // Event Listener:
  $('#sort-button').on('change', handleSortEvent);
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

const handleSortEvent = event => {

  const sortOption = $(event.target).val();

  if(sortOption === 'horns'){
    $('.photo section').hide();
    $(`.${sortOption}`).show();
  } if(sortOption === 'title'){
    $('.photo section').hide();
    $(`.${sortOption}`).show();
  }

  console.log('handleSortEvent, sortOption:', sortOption);
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
