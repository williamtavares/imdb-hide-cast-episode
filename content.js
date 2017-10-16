//Here we find all of episode information and add a div wrapper and a class to reference
//Only if the class does not exist yet on the page, since this is our own custom class, it would
//be very rare for this class to already exist from imdb
if($("table.cast_list").find(".ihcec-character-episode-container").length == 0) {
    $("table.cast_list").find("td.character").find("div").contents().filter(function () {
        return this.nodeType === 3 && $.trim(this.nodeValue).length;
    }).wrap("<div class='ihcec-character-episode-container' style='display: inline-block;margin-left: 10px;'></div>");
}

//Depending on what the user picked as an option in the app, we automatically set it to their preference
//once the page loads and then update the DOM
chrome.storage.sync.get('castEpisodeVisibility', function (result) {
    modifyDOM(result.castEpisodeVisibility);
});

//Here we listen to for an event if the user makes a change and proceed to update the DOM
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        modifyDOM(request.castEpisodeVisibilityState);
    }
);

//This portion we handle the hovering of blacked out content
$(".ihcec-character-episode-container").hover(
    function() {
        if($(this).hasClass("blackOut")){
            $(this).css({'background-color':'', 'color':'#444'});
        }
    }, function() {
        if($(this).hasClass("blackOut")){
            $(this).css({'background-color':'black', 'color':'black'});        
        }
    }
);

function modifyDOM(state) {
    if(state == 'hide') {
        console.log("hide hit");
        $(".ihcec-character-episode-container").removeClass("blackOut");
        $(".ihcec-character-episode-container").css({'background-color':'', 'color':'#f6f6f5'});
    } else if(state == 'show') {
        console.log("show hit");
        $(".ihcec-character-episode-container").removeClass("blackOut");
        $(".ihcec-character-episode-container").css({'background-color':'', 'color':'#444'});
    } else if(state == 'blackOut') {
        console.log("blackOut hit");
        $(".ihcec-character-episode-container").addClass("blackOut");
        $(".ihcec-character-episode-container").css({'background-color':'black', 'color':'black'});
    }
}