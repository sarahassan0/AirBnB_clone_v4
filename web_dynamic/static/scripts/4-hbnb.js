$(document).ready(function () {
  const amenities = {};
  $.get("http://localhost:5001/api/v1/status/")
    .done(function (data) {
      if (data["status"] === "OK") $("#api_status").addClass("available");
    })
    .fail(function () {
      $("#api_status").addClass("notavailable");
    });

  $(".amenity-checkbox").on("change", function () {
    if ($(this).is(":checked")) {
      amenities[$(this).data("id")] = $(this).data("name");
    } else {
      delete amenities[$(this).data("id")];
    }
    const amenitiesList = Object.values(amenities).join(", ");
    $(".amenities h4").text(amenitiesList);
  });

  $.post(
    {
      url: "http://localhost:5001/api/v1/places_search/",
      contentType: "application/json",
    },
    JSON.stringify({}),
    function (data) {
      renderPlaces(data);
    },
    "json"
  );

  $("#apply-filter-place").on("click", function () {
    console.log(Object.keys(amenities));
    $.post(
      {
        url: "http://localhost:5001/api/v1/places_search/",
        contentType: "application/json",
      },
      JSON.stringify({ amenities: Object.keys(amenities) }),
      function (data) {
        $(".places").html("");
        renderPlaces(data);
      },
      "json"
    );
  });
});

function renderPlaces(data) {
  data.forEach((place) => {
    const article = $("<article></article>");
    const content = `
    <div class="title_box">
      <h2>${place?.name}</h2>
      <div class="price_by_night">${place?.price_by_night}</div>
    </div>
    <div class="information">
      <div class="max_guest">
        ${place?.max_guest} Guests
      </div>
      <div class="number_rooms">
        ${place?.number_rooms} Bedrooms
      </div>
      <div class="number_bathrooms">
        ${place?.number_bathrooms} Bathrooms
      </div>
    </div>
    <div class="user">
      <b>Owner:</b> ${place?.user?.first_name} ${place?.user?.last_name}
    </div>
    <div class="description">${place?.description}</div>
    `;
    article.append(content);
    $(".places").append(article);
  });
}
