var map = new google.maps.Map(document.getElementById('map'), { 
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  center:new google.maps.LatLng(37.09024, -95.712891),
  zoom:4,
});

var geocoder = new google.maps.Geocoder();

function geocode () {
  geocoder.geocode({
     'address': document.getElementById('search').value
  }, 
  function(results, status) {
     if(status == google.maps.GeocoderStatus.OK) {
        new google.maps.Marker({
           position: results[0].geometry.location,
           map: map,
        });
        map.setZoom(14);
        map.setCenter(results[0].geometry.location);
     }
  });
}


$(function() {
    // avoid passing timestamp param to Cicero and set handling for multiple-value params
    $.ajaxSetup({cache:true, traditional:true});
    $('.address-form').submit(function() {
        $('.officials').empty();
        $('.status-text').text('Officials are loading...');
        var search_loc = $('.address-input').val();
        $.getJSON('http://cicero.azavea.com/v3.1/official?callback=?',
            {token: '48t-be7d709ddcc3a59bbec4',
             user: '1131',
             search_loc: search_loc },
            function(data) {
                if(data.response.results.candidates == 0) {
                    $('.status-text').text('No results for ' + search_loc);
                    return false;
                }
                $.each(data.response.results.candidates, function(index, location){
                    $('.status-text').text('Showing the elected officials for ' + location.match_addr);
                    $.each(location.officials, function(index, official){
                        $('.officials').append('<tr><td rowspan="2">' + official.office.title + '</td><td>' + 
                          official.first_name + ' ' + official.last_name + '</td><td rowspan="2">' + 
                          official.party + '</td></tr><tr><td><a href=' + 
                          official.urls + 'class="url">' + official.urls + '</a></td></tr><tr class="blank"><td colspan="3"></td></tr>');
                        $('.url').click(function() {
                          $.get($(this).attr('href'));
                        });
                    });
                });
        });
        return false;
    });
});
