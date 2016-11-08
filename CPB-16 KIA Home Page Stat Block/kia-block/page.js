jQuery(function() {
    // Grab Team Leaders
    var baseFeed;
    var BaseVar,
        baseCategory;
    var stat_category_kia = 'points'; //possible values include: 'points' , 'rebounds' or 'assists'
    if (stat_category_kia == 'rebounds') {
        baseFeed = 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2016/teams/statistics/cavaliers/leaders_detail_rebounds_02.json';
        // baseFeed = 'mock.json';
        baseVar = 'data.reb';
        baseCategory = 'Rebounds per Game'

    } else if (stat_category_kia == 'assists') {
        baseFeed = 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2016/teams/statistics/cavaliers/leaders_detail_assists_02.json';
        baseVar = 'data.ast';
        baseCategory = 'Assists per Game'
    } else {
        baseFeed = 'http://data.nba.com/data/v2015/json/mobile_teams/nba/2016/teams/statistics/cavaliers/leaders_detail_points_02.json';
        baseVar = 'data.pts';
        baseCategory = 'Points per Game'
    }

    jQuery.getJSON(baseFeed, function(data) {
            jQuery('#statcat').html(baseCategory);
            if (stat_category_kia == 'rebounds') {
                var lead = data.reb;
            } else if (stat_category_kia == 'assists') {
                var lead = data.ast;
            } else {
                var lead = data.pts;
            }
            var leaderName = '<p>' + lead.pl[0].fn + ' ' + lead.pl[0].ln + '</p>';
            jQuery('#leader-name').append(leaderName);
            var leaderTotal = '<h2>' + lead.pl[0].val + '</h2>';
            jQuery('#leader-number').append(leaderTotal);
            var leaderPic = '<img src="http://stats.nba.com/media/players/700/' + lead.pl[0].pid + '.png" class="img-responsive" style="margin-top:-35px;"/>';
            jQuery('#kia-leader-pic').append(leaderPic);
            for (var i = 1; i <= 4; i++) {
                leaderRank = i + 1;
                var leaderBoardNameValue = '<p class="leaderRow' + i + '"><span style="font-weight:bold;">' + leaderRank + '.</span> ' + lead.pl[i].fn + ' ' + lead.pl[i].ln + '<span style="float:right; font-weight:bold;">' + lead.pl[i].val + '</span></p>';
                jQuery('#leader-board').append(leaderBoardNameValue);
            }
        })
        .done(function() {})
        .fail(function() {
            console.log("Fail - Team Leaders");
        });
});
