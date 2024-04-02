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
  var carouselInner = $(".carousel-inner");
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


