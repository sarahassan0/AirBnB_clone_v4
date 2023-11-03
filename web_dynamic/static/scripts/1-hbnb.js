
$(document).ready(function() {
    const amenities = {}
    $('.amenity-checkbox').on('change', function () {
        if ($(this).is(':checked')) {
            amenities[$(this).data('id')] = $(this).data('name')
        } else {
            delete amenities[$(this).data('id')]
        }
        // $.post('http://localhost:5000/1-hbnb', amenities, function (res) {
    
        // })
        const amenitiesList = Object.values(amenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    })
    
})
