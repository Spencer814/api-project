'use strict';
var app = angular.module('apiApp', []);
app.controller('apiCtrl', function($scope) {
  $scope.states = [
    {'short':'AL', 'name':'Alabama'},
    {'short':'AK', 'name':'Alaska'},
    {'short':'AZ', 'name':'Arizona'},
    {'short':'AR', 'name':'Arkansas'},
    {'short':'CA', 'name':'California'},
    {'short':'CO', 'name':'Colorado'},
    {'short':'CT', 'name':'Connecticut'},
    {'short':'DE', 'name':'Delaware'},
    {'short':'DC', 'name':'District Of Columbia'},
    {'short':'FL', 'name':'Florida'},
    {'short':'GA', 'name':'Georgia'},
    {'short':'HI', 'name':'Hawaii'},
    {'short':'ID', 'name':'Idaho'},
    {'short':'IL', 'name':'Illinois'},
    {'short':'IN', 'name':'Indiana'},
    {'short':'IA', 'name':'Iowa'},
    {'short':'KS', 'name':'Kansas'},
    {'short':'KY', 'name':'Kentucky'},
    {'short':'LA', 'name':'Louisiana'},
    {'short':'ME', 'name':'Maine'},
    {'short':'MD', 'name':'Maryland'},
    {'short':'MA', 'name':'Massachusetts'},
    {'short':'MI', 'name':'Michigan'},
    {'short':'MN', 'name':'Minnesota'},
    {'short':'MS', 'name':'Mississippi'},
    {'short':'MO', 'name':'Missouri'},
    {'short':'MT', 'name':'Montana'},
    {'short':'NE', 'name':'Nebraska'},
    {'short':'NV', 'name':'Nevada'},
    {'short':'NH', 'name':'New Hampshire'},
    {'short':'NJ', 'name':'New Jersey'},
    {'short':'NM', 'name':'New Mexico'},
    {'short':'NY', 'name':'New York'},
    {'short':'NC', 'name':'North Carolina'},
    {'short':'ND', 'name':'North Dakota'},
    {'short':'OH', 'name':'Ohio'},
    {'short':'OK', 'name':'Oklahoma'},
    {'short':'OR', 'name':'Oregon'},
    {'short':'PA', 'name':'Pennsylvania'},
    {'short':'RI', 'name':'Rhode Island'},
    {'short':'SC', 'name':'South Carolina'},
    {'short':'SD', 'name':'South Dakota'},
    {'short':'TN', 'name':'Tennessee'},
    {'short':'TX', 'name':'Texas'},
    {'short':'UT', 'name':'Utah'},
    {'short':'VT', 'name':'Vermont'},
    {'short':'VA', 'name':'Virginia'},
    {'short':'WA', 'name':'Washington'},
    {'short':'WV', 'name':'West Virginia'},
    {'short':'WI', 'name':'Wisconsin'},
    {'short':'WY', 'name':'Wyoming'},
    {'short':'AS', 'name':'American Samoa'},
    {'short':'GU', 'name':'Guam'},
    {'short':'MP', 'name':'Northern Mariana Islands'},
    {'short':'PR', 'name':'Puerto Rico'},
    {'short':'VI', 'name':'Virgin Islands'}
  ]
})

var map = new google.maps.Map(document.getElementById('map'), {
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  center:new google.maps.LatLng(37.09024, -95.712891),
  zoom:4,
});

google.maps.event.addDomListener(window, 'resize', function() {
  var center = map.getCenter();
  google.maps.event.trigger(map, 'resize');
  map.setCenter(center);
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

  $('.address-form').submit(function(e) {
    geocode();
    e.preventDefault();
  });

  $.ajaxSetup({cache:true, traditional:true});
  $('.address-form').submit(function() {
    $('.officials').empty();
    $('.status-text').text('Officials are loading...');
    var search_loc = $('#street-address').val() + ' ' + $('#city').val() + ' ' + $('#state').val() + ' ' + $('#zip').val();

    $.getJSON('https://cicero.azavea.com/v3.1/official?callback=?&key=ce574014a03bd35595a01c7c664b899196e676e5',
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
              var currentClass = 'official_' + count;
              if (index == 0) {
                $('.officials').append('<tr><td rowspan="2" class="mid">' + official.office.title + '</td><td><a href=' + url + ' target="_blank">' + official.first_name + ' ' + official.last_name + '</a></td><td rowspan="2" class="mid">' + official.party + '</td></tr><tr class=\'' + currentClass + '\'><td class="primary"><a href=' + url + ' target="_blank">' + url + '</a></td></tr>');
              }
              if (index > 0) {
                $('.' + currentClass).after('<tr><td class="link"></td><td class="link"><a href=' + url + ' target="_blank">' + url + '</a></td><td class="link"></td></tr>');
              }
              if (urls.length == index + 1) {
                $('.officials').append('<tr class="blank"><td colspan="3" class="gap"></td></tr>');
              }
            });
            count++;
          });
        });
      });

      return false;
  });
});
