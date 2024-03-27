/** @format */

/* Task 1 BELOW*/
$(document).ready(function () {
  fetchQuotes();

  function fetchQuotes() {
    // Display loader
    $(".carousel-inner").html(
      '<div class="carousel-item active"><div class="text-center">Loading quotes...</div></div>'
    );

    // Fetch quotes from API
    $.ajax({
      url: "https://smileschool-api.hbtn.info/quotes",
      method: "GET",
      success: function (data) {
        // Hide loader
        $(".carousel-inner").html(""); // Clear existing quotes

        // Update carousel with fetched quotes
        updateCarousel(data);
      },
      error: function (error) {
        console.error("Error fetching quotes:", error);
        // Hide loader
        $(".carousel-inner").html(
          '<div class="carousel-item active"><div class="text-center">Error fetching quotes</div></div>'
        );
      },
    });
  }

  function updateCarousel(quotes) {
    // Get carousel inner element
    var carouselInner = $(".carousel-inner");

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
      carouselInner.append(item); // Append carousel item
    });

    // Trigger carousel initialization
    $("#carouselExampleControls").carousel();
  }
});
/* Task 1 complete */
