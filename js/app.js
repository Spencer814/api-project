'use strict';

var map = new google.maps.Map(document.getElementById('map'), {
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  center:new google.maps.LatLng(37.09024, -95.712891),
  zoom:4,
});

var geocoder = new google.maps.Geocoder();

function geocode () {
  geocoder.geocode({
    'address': document.getElementById('street-address', 'city', 'state', 'zip').value
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
  $('.address-form').submit(function(e) {
    geocode();
    e.preventDefault();
  });

  $.ajaxSetup({cache:true, traditional:true});
  $('.address-form').submit(function() {
    $('.officials').empty();
    $('.status-text').text('Officials are loading...');
    var search_loc = $('#street-address').val() + " " + $('#city').val() + " " + $('#state').val() + " " + $('#zip').val();

    $.getJSON('https://cicero.azavea.com/v3.1/official?callback=?&key=c3f802b8affcebab0f0c60fb713b76c16373ca80',
      {search_loc: search_loc },

      function(data) {
        if(data.response.results.candidates == 0) {
          $('.status-text').text('No results for ' + search_loc + '-  Please enter a new address');
          return false;
        }

        var count = 1;
        $.each(data.response.results.candidates, function(index, location) {
          $('.status-text').text('Showing the elected officials for ' + location.match_addr);

          $.each(location.officials, function(index, official) {
            var urls = official.urls;
            $.each(urls, function(index, url) {
              var currentClass = "official_" + count;
              if (index == 0) {
                $('.officials').append('<tr><td rowspan="2" class="mid">' + official.office.title + '</td><td>' + official.first_name + ' ' + official.last_name + '</td><td rowspan="2" class="mid">' + official.party + '</td></tr><tr class=\'' + currentClass + '\'><td><a href=' + url + ' target="_blank">' + url + '</a></td></tr>');
              }
              if (index > 0) {
                $('.' + currentClass).after('<tr><td></td><td><a href=' + url + ' target="_blank">' + url + '</a></td><td></td></tr>');
              }
              if (urls.length == index + 1) {
                $('.officials').append('<tr class="blank"><td colspan="3"></td></tr>');
              }
            });

            count++;
          });

        });
      });

      return false;
  });
});
