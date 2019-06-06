'use strict';

function startApp(){
  loadData();
}


function loadData(){

  // const tester = data => data.forEach(object => dataArray.push(object));

  const success = images => displayPage(images);

  // const success = images => console.log(images);
  const failure = error => console.error(error);

  $.get('data/page-1.json', 'json')
    .then(success)
    .catch(failure);
}

function displayPage(images) {

  // console.log('images', images);

  // images is the array, image is an item in the array(obj).
  images.forEach(creatureObj => {
    const $newImage = $('#photo-template').clone();

    $newImage.find('h2').text(creatureObj.title);
    $newImage.find('img').attr('src', creatureObj.image_url);
    $newImage.find('p').text(creatureObj.description);

    // $newImage.removeClass('photo-template');

    // data attributes, don't have display meaning, but have meaning for the dev:
    // $newImage.attr('data-type', images.type);

    $('.photo').append($newImage);

  });
	
  makeDropDown(images);
}

function makeDropDown(images){
  // create an array to hold keywords
  const keywords = [];

  // we need to push all keywords into the keyword array

  images.forEach((element, i)=> {
    // check if the array already has that word before pushing
    // if the word is not in the array
    if(!keywords.includes(element.keyword)){
      keywords.push(element.keyword) 
    }
  });

  console.log('keywords arr', keywords);
}


$(startApp)
