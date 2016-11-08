    (function($) {
        $.getJSON(blockElkFeed, function(a) {
            var totalBlocks = a.sta.blk.tot;
            var totalDonation = totalBlocks * 100
            $('.total-blocks').html(totalBlocks);
            $('.total-donation').html('Total Amount Donated $' + totalDonation.formatMoney(0, '.', ','));
        });
        Number.prototype.formatMoney = function(c, d, t) {
            var n = this,
                c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? "." : d,
                t = t == undefined ? "," : t,
                s = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        };

        $.getJSON(blockLeadElkFeed, function(b) {
            var blocksLeaderFirstName = b.tle.blk.fn;
            var blocksLeaderLastName = b.tle.blk.ln;
            var blocksLeaderID = b.tle.blk.pid;
            var blocksLeaderTotal;
            var blocksLeaderTotal = b.tle.blk.ln;
            $('.name-blocks').html(blocksLeaderFirstName + " " + blocksLeaderLastName);
            $('.image-blocks-leader').html('<img class="img-responsive" src="http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/statscube/players/large/' + blocksLeaderFirstName + '_' + blocksLeaderLastName + '.png">');

            $.getJSON('http://data.nba.com/data/1m/v2015/json/mobile_teams/nba/2016/players/playercard_' + blocksLeaderID + '_02.json', function(c) {
                var seasonList = c.pl.ct.st;
                for (var i = 0; i < seasonList.length; i++) {
                    if (seasonList[i].val == '16-17') {
                        $('.blocks-leader-total').html("<h4>" + seasonList[i].blk + "</h4>");
                    }
                }
            });
        });
        
    })(jQuery);
