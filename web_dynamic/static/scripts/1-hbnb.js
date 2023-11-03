
$(document).ready(function() {
    const amenities = {}
    $('.amenity-checkbox').on('change', function () {
        if ($(this).is(':checked')) {
            amenities[$(this).data('id')] = $(this).data('name')
        } else {
            delete amenities[$(this).data('id')]
        }
        const amenitiesList = Object.values(amenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    })
    
})
