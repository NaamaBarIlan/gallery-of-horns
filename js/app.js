'use strict';

function startApp(){
  loadData();
}


function loadData(){

  // const tester = data => data.forEach(object => dataArray.push(object));

  const success = images => dispalyPage(images);

  // const success = images => console.log(images);
  const failure = error => console.error(error);

  $.get('data/page-1.json', 'json')
    .then(success)
    .catch(failure);
}

function dispalyPage(images) {

	// console.log('images', images);

  images.forEach(image => {
    const $newImage = $('#photo-template').clone();

    $newImage.find('h2').text(image.title);
    // $newImage.find('h3').text(snack.rank);
    // $newImage.find('p').text(snack.type);
    // $newImage.removeClass('photo-template');

    // data attributes, don't have display meaning, but have meaning for the dev:
    // $newImage.attr('data-type', images.type);

    $('.photo').append($newImage);

  });
}


$(startApp)
