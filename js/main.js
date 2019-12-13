function checkResult() {
  if ($('.results').hasClass('current')) {
    $('.results').attr('data-result', $('.personalities .item.current h2').text());

    var tweet = encodeURI("I got " + $('.personalities .item.current h2').text() + " - what's your driving personality? https://try.njm.com/sixers/");
    $('.quizTwitter').attr("href", "https://twitter.com/intent/tweet?text=" + tweet);

    var facebook = "https://try.njm.com/sixers/" + encodeURI(($('.personalities .item.current h2').text().replace(' ', '-')).toLowerCase());
    $('.quizFacebook').attr('href', facebook);
  }
}

function assignPersonality() {
  if ($('.results').hasClass('current')) {
    var sortAnswers = [0, 0, 0, 0];
    $('.questionSlide .item.selected').each(function() {
      sortAnswers[$(this).index()] += 1;
    });
    var myResult = 0;
    for(var i = 0; i < sortAnswers.length; i++){
      if(sortAnswers[i] > myResult) myResult = i;
    }
    $('.personalities').find('[data-personality-number="' + myResult + '"]').addClass('current').siblings().removeClass('current');
    var myTitle = $('.personalities .item.current h2').text();
    var myDescription = $('.personalities .item.current p').text();
    $('.statSlide.results h3').text(myTitle);
    $('.statSlide.results .bio').text(myDescription);
  }
}

var mobileToggle = false;
function mobileSlides(){
  if($(window).width() < 600 && mobileToggle == false){
    mobileToggle = true;
    $('.statSlide').removeClass('old');
    $('.leftArrow').addClass('disabled');
    $('.rightArrow').removeClass('disabled');
    $('.statCarousel .statSlide').removeClass('current').removeClass('old');
    $('.dotNav .dot').first().addClass('current').siblings().removeClass('current');
    $('.statSlide.mobile.results').addClass('current').clone().prependTo('.statCarousel');
    $('.statSlide.mobile.retake').clone().appendTo('.statCarousel');
  }
  else if($(window).width() > 600 && mobileToggle == true){
    mobileToggle = false;
    $('.leftArrow').addClass('disabled');
    $('.rightArrow').removeClass('disabled');
    $('.statCarousel .statSlide').removeClass('old');
    $('.statCarousel .statSlide.scaled').addClass('current').siblings().removeClass('current');
    $('.statCarousel .statSlide.mobile').remove();
  }
}

$(document).ready(function(){
  mobileSlides();
});
$(window).resize(function(){
  mobileSlides();
});

$(document).delegate('.whiteButton', 'click', function(e){
  e.preventDefault();

  if($(this).parents('.quizSlide').hasClass('questionSlide')){
    if(!$(this).parents('.quizSlide').find('.item.selected').length){
      alert('Pick an answer.');
      return false;
    }
  }
  $(this).parents('.quizSlide').removeClass('current').next('.quizSlide').addClass('current');
  assignPersonality();
  checkResult();
});

$(document).delegate('.answers .item', 'click', function(e){
  e.preventDefault();
  $(this).addClass('selected').siblings().removeClass('selected');
});

$(document).delegate('.retake', 'click', function(e){
  e.preventDefault();
  $('.rightArrow').removeClass('disabled');
  $('.leftArrow').addClass('disabled');
  $('.statSlide').removeClass('old current').first().addClass('current');
  $('.quizSlide').first().addClass('current').removeClass('out').siblings().removeClass('current out');
  $('.quizSlide .item').removeClass('selected');
  $('.statCarousel .statSlide').first().addClass('current').siblings().removeClass('current');
  $('.dotNav .dot').first().addClass('current').siblings().removeClass('current');
});

$(document).delegate('.arrowBtn', 'click', function(e){
  e.preventDefault();

  if($(this).hasClass('rightArrow')){
    var nextSlide = $('.statSlide.current').next('.statSlide');
    if(nextSlide.length){
      $('.leftArrow').removeClass('disabled');
      $('.statSlide.current').removeClass('current');
      nextSlide.addClass('current').prev().addClass('old');
      $('.dotNav .dot.current').removeClass('current').next().addClass('current');
    }
    if(!$('.statSlide.current').next().length) $('.rightArrow').addClass('disabled');
  }
  else{
    var nextSlide = $('.statSlide.current').prev('.statSlide');
    if(nextSlide.length){
      $('.rightArrow').removeClass('disabled');
      $('.statSlide.current').removeClass('current');
      nextSlide.removeClass('old').addClass('current');
      $('.dotNav .dot.current').removeClass('current').prev().addClass('current');
    }
    if(!$('.statSlide.current').prev().length) $('.leftArrow').addClass('disabled');
  }
});
