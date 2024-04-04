/** @format */
$(document).ready(function () {
  fetchQuotes(); // Fetch quotes initially

  function fetchQuotes() {
    // Display loader
    $(".loader").show();

    $.ajax({
      url: "https://smileschool-api.hbtn.info/quotes",
      method: "GET",
      success: function (data) {
        $(".loader").hide();

        // Update carousel with fetched quotes
        updateCarousel(data);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching quotes:", error);
        $("#loader").hide();
      },
    });
  }
});

function updateCarousel(quotes) {
  // Get carousel inner element
  var carouselInner = $(".carousel-inner-quotesection");
  carouselInner.empty(); // Clear existing quotes

  // Iterate through fetched quotes and create carousel items
  quotes.forEach(function (quote, index) {
    var activeClass = index === 0 ? "active" : ""; // Add 'active' class to first quote
    var item = `
                    <div class="carousel-item ${activeClass}">
                        <div class="row mx-auto align-items-center">
                            <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                                <img src="${quote.pic_url}" class="d-block align-self-center" alt="Carousel Pic">
                            </div>
                            <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                                <div class="quote-text">
                                    <p class="text-white">${quote.text}</p>
                                    <h4 class="text-white font-weight-bold">${quote.name}</h4>
                                    <span class="text-white">${quote.title}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    console.log(item);
    carouselInner.append(item); // Append carousel item
  });

  // Trigger carousel initialization
  carouselInner.find(".carousel-item").first().addClass("active");
}

// TASK 2
function populateTutorials() {
  const carousel = $('#tutorial-carousel');

  $.ajax({
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      method: "GET",
      beforeSend: function () {
          $('#loading-tutorials').removeClass('d-none');
      },
      success: function (response) {
          response.forEach((tutorial, index) => {
              const card = createCard(tutorial);
              carousel.append(card);

              if (index === 0) {
                  card.addClass('active');
              }
          });

          initializeCarousel(carousel);
      },
      error: function () {
          alert("Error loading tutorials");
      },
      complete: function () {
          $('#loading-tutorials').addClass('d-none');
          $('#tutorial-carousel').removeClass('d-none');
      }
  });
}

function createCard(tutorial) {
  const card = $('<div>').addClass('card p-3');
  const thumbnail = $('<img>').addClass('card-img-top').attr('src', tutorial['thumb_url']);
  const overlay = $('<div>').addClass('card-img-overlay d-flex justify-content-center align-items-center text-center');
  const playButton = $('<img>').addClass('play-overlay').attr('src', 'images/play.png').attr('width', '64px');
  overlay.append(playButton);
  const body = $('<div>').addClass('card-body');
  const title = $('<h5>').addClass('card-title font-weight-bold').text(tutorial['title']);
  const description = $('<p>').addClass('card-text text-muted').text(tutorial['sub-title']);
  const author = $('<div>').addClass('creator d-flex align-items-center');
  const authorImage = $('<img>').addClass('rounded-circle').attr('src', tutorial['author_pic_url']).attr('width', '30px');
  const authorName = $('<h6>').addClass('pl-3 m-0 main-color').text(tutorial['author']);
  author.append(authorImage, authorName);
  const footer = $('<div>').addClass('info pt-3 d-flex justify-content-between');
  const rating = $('<div>').addClass('rating d-flex');
  for (let i = 1; i < 6; i++) {
      const star = i <= tutorial['star'] ? $('<img>').attr('src', 'images/star_on.png') : $('<img>').attr('src', 'images/star_off.png');
      star.attr('width', '15px').attr('height', '15px');
      rating.append(star);
  }
  const time = $('<span>').addClass('main-color').text(tutorial['duration']);
  footer.append(rating, time);
  body.append(title, description, author, footer);
  card.append(thumbnail, overlay, body);
  return card;
}

function initializeCarousel(carousel) {
  carousel.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: $('.prev1'),
      nextArrow: $('.next1'),
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 2,
              },
          },
          {
              breakpoint: 576,
              settings: {
                  slidesToShow: 1,
              },
          },
      ],
  });
}
