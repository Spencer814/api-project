'use strict';

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
<<<<<<< HEAD

  // avoid passing timestamp param to Cicero and set handling for multiple-value params
  $('.address-form').submit(function(e) {
    geocode();
    e.preventDefault();
  });

  $.ajaxSetup({cache:true, traditional:true});
  $('.address-form').submit(function() {
    $('.officials').empty();
    $('.status-text').text('Officials are loading...');
    var search_loc = $('.address-input').val();

    $.getJSON('http://cicero.azavea.com/v3.1/official?callback=?',
      {token: '48x-8c3595634fa34fa280af',
      user: '1131',
      search_loc: search_loc },

      function(data) {
        if(data.response.results.candidates == 0) {
          $('.status-text').text('No results for ' + search_loc);
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

=======
    // avoid passing timestamp param to Cicero and set handling for multiple-value params
    $.ajaxSetup({cache:true, traditional:true});
    $('.address-form').submit(function() {
        $('.officials').empty();
        $('.status-text').text('Officials are loading...');
        var search_loc = $('.address-input').val();
        $.getJSON('http://cicero.azavea.com/v3.1/official?callback=?',
            {token: '48v-789875a1a74a0ce38488',
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
>>>>>>> 8270942712684008e8a1515974fce7acc18e0e93
        });
      });

      return false;
  });
});





// $(function() {

//   $('.senate').submit(function(e) {
//       e.preventDefault();
//       // zero out results if previous search has run
//       $('.results').html('');
//       // get the value of the tags the user submitted
//       var upper = $(this).find("input[name='upper']").val();
//       getSenate(upper);
//   });

//   $('.house').submit(function(e) {
//       e.preventDefault();
//       // zero out results if previous search has run
//       $('.results').html('');
//       // get the value of the tags the user submitted
//       var lower = $(this).find("input[name='lower']").val();
//       getHouse(lower);
//   });


//   var apiKey = 'api-key=2b909fcfdb97f230bd4cf89d294fdabd:8:74026221';
//   var baseUrl = 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/';
//   var upperUrl = baseUrl + '114/senate/members/current.json?' + apiKey;
//   var lowerUrl = baseUrl + '114/house/members/current.json?' + apiKey;
//   var voteUrl = baseUrl + 'members/' + memberId + '.json?' + apiKey;

//   var memberId = this.id,
//     reElection = this.next_election,
//     totalVotes = this.total_votes,
//     missedVotes = this.missed_votes;

//   var //committeeName = this.committees.name,
//     //committeeRank = this.committees.rank_in_party,
//     congress = this.congress,
//     chamber = this.chamber,
//     party = this.party,
//     seniority = this.seniority,
//     district = this.district,
//     state = this.state,
//     origBill = this.bills_sponsored,
//     coBill = this.bills_cosponsored,
//     missedVotePct = this.missed_votes_pct,
//     partyVotes = this.votes_with_party_pct;

//   var congressData = function(gather) {

//     $.done(function(result) {
  
//       var searchResults = showSearchResults(request.tagged, result.items, request.tag);

//       $('.search-results').html(searchResults);
//       //$.each is a higher order function. It takes an array and a function as an argument.
//       //The function is executed once for each item in the array.

//       $.each(result.items, function(i, item) {
//         var info = showInfo(item);
//         $('.results').append(info);
//       });
//     })

//     .fail(function(jqXHR, error) { //this waits for the ajax to return with an error promise object

//       var errorElem = showError(error);
//       $('.search-results').append(errorElem);
//     });
//   };

//   function vote() {

//     var request = {
//       site: 'New York Times',
//       order: 'desc',
//       sort: 'creation'
//     };

//     $.ajax({
//       url: voteUrl,
//       data: request,
//       dataType: "jsonp",
//       type: "GET",
//       success: function(vote) {
//         $('.results').append('<p>Name: ' + this.first_name + ' ' + this.last_name + '</p>');
//       }
//     });
// }

//   function senate() {

//     var request = {
//       //tagged: upper,
//       site: 'New York Times',
//       order: 'desc',
//       sort: 'creation'
//     };

//     $.ajax({
//       url: upperUrl,
//       data: request,
//       dataType: "jsonp",
//       type: "GET",
//       success: function(senateData) {
//         var getSenate = function(upper) {
//           request.congressData;
//         };
//       }
//     });
//   }

//   function house() {

//     var request = {
//       //tag: lower,
//       site: 'New York Times',
//       order: 'desc',
//       sort: 'creation'
//     };

//     $.ajax({
//       url: lowerUrl,
//       data: request,
//       dataType: "jsonp",
//       type: "GET",
//       success: function(houseData) {
//         var getHouse = function(lower) {
//           request.congressData;
//         };
//       }
//     });
//   }

//   $.when(senate(), house()).then(vote);


//   var showSearchResults = function(query) {

//     var results = 'Results for <strong>' + query + '</strong>';
//     return results;
//   };

//   var showError = function(error) {

//     var errorElem = $('.templates .error').clone();
//     var errorText = '<p>' + error + '</p>';
//     errorElem.append(errorText);
//   };

//   var showInfo = function(info) {

//     // clone our result template code
//     var result = $('.templates .info').clone();

//     // Set Information properties to show in result
//     var name = result.find('.name');
//     name.html('<p>Name: ' + this.first_name + ' ' + this.last_name + '</p>');

//     // Set Votes properties to show in result
//     var votes = result.find('.votes');
//     votes.html('<p>Total Votes: ' + this.total_votes + '</p><p>Missed Votes: ' + this.missed_votes + ' Percentage Missed: ' + this.missed_votes_pct + '</p><p>Percentage of votes aligned with Party: ' + this.votes_with_party_pct + '</p>');

//     // Set Social Media properties to show in result
//     var media = result.find('.media');
//     media.html('<p>Website: <a target="_blank" href=' + this.url + '>' + this.url + '</a></p><p>Facebook: <a target="_blank" href=https://www.facebook.com/' + this.facebook_account + '>' + this.facebook_account + '</a></p><p>Twitter: <a target="_blank" href=https://twitter.com/' + this.twitter_account + '>' + this.twitter_account + '</a></p><p>YouTube: <a target="_blank" href=https://www.youtube.com/user/' + this.youtube_account + '>' + this.youtube_account + '</a></p>');

//     // // Set display name to show and link in result
//     // var displayName = result.find('.display-name a');
//     // displayName.text(answerers.user.display_name);
//     // displayName.attr('href', answerers.user.link);

//     // // Set Votes to show in result
//     // result.find('.votes').text(answerers.user.reputation);

//     return result;
//     };
//  });


