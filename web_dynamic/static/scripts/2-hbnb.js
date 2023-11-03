
$(document).ready(function() {
    $.get('http://localhost:5001/api/v1/status/')
    .done(function(data) {
        if (data['status'] === 'OK')
            $('#api_status').addClass('available');
    })
    .fail(function() {
        $('#api_status').addClass('notavailable');
    });
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
