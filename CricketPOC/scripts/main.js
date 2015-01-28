var getPlayerInfoPart1 = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20cricket.player.profile%20where%20player_id%3D'
    , getPlayerInfoPart2 = '&format=json&diagnostics=true&env=store%3A%2F%2F0TxIGQMQbObzvU4Apia0V0'
    ;

var getPlayerDetails = function( playerId ) {
    var getPlayerDetailsAPI = getPlayerInfoPart1 + playerId + getPlayerInfoPart2;
    
    $.getJSON( getPlayerDetailsAPI, setPlayerDetails );
};

var setPlayerDetails = function( data, status ) {
    if ( status === 'success' ) {      
        
        $('.player-img img').attr('src', data.query.results.PlayerProfile.PersonalDetails.PlayerThumbImgName);
        var playerDOB = new Date( data.query.results.PlayerProfile.PersonalDetails.DateOfBirth );        
        var matchStats = data.query.results.PlayerProfile.CareerDetails.MatchStats;
        $('.playerDOB').text( playerDOB.toDateString() );
        $('.batting').text( data.query.results.PlayerProfile.CareerDetails.Style.Batting );
        
        for( var i=0; i<matchStats.length; i++ ) {
            if ( matchStats[i].mtype === 'ODI' ) {
                
                for ( var j=0; i < matchStats[i].Batting.length; j++ ) {
                    
                    if ( matchStats[i].Batting[j].value === 'all' ) {
                
                        $('.num-matches').text( matchStats[i].Batting[j].Matches );
                        $('.strike-rate').text( matchStats[i].Batting[j].StrikeRate );
                        $('.average').text( matchStats[i].Batting[j].Average );
                        $('.tot-runs').text( matchStats[i].Batting[j].Runs );
                        
                        break;
                    }                    
                }
                break;
            }
        }
    }
};

$( function() {
    $('#sender').focus();
    $( "#receiver" ).on( 'keypress', function( e ) {
        if ( e.keyCode === 13 ) {
            //setNames();
        }    
    });
    
    $( "#message-input" ).on( 'keypress', function( e ) {
        if ( e.keyCode === 13 ) {
            //sentMessage();
        }    
    });        

    $("#submit").click( function( evt ) { 
        getPlayerDetails( $( evt.currentTarget ).data().playerId ); 
    } );
});

//https://developer.yahoo.com/yql/console/?env=store://0TxIGQMQbObzvU4Apia0V0&_uiFocus=cricket#h=select+*+from+cricket.player.profile+where+player_id%3D2962