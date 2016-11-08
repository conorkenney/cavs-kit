var seasontype = "02";
var cavsSchedFeed = 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2016/teams/cavaliers_schedule_' + seasontype + '.json';
var schedList;
var jq3 = jQuery.noConflict();
jq3(function($) {
	$.getJSON(cavsSchedFeed, function(data) {
            console.log("We're In!");
            schedList = data.gscd.g;
        })
        .done(function() {
            for (var i = 0; i < schedList.length; i++) {
            	console.log('initial '+ i);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}); 

var cavsTID = "1610612739";
var gamenum = 3;
var gameID = "0021600047";
var gcode = "20161101/HOUCLE";
var vidDropdownFeed = 'http://www.nba.com/cavaliers/api/1.1/json?type=video&schedule='+gcode+'&channels=Top%20Plays';
var vidDropdownFeed = 'mock.json';
