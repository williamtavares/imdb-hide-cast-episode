// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/**
 * Add your Analytics tracking ID here.
 */
var _AnalyticsCode = 'UA-39802197-12';
/**
 * Below is a modified version of the Google Analytics asynchronous tracking
 * code snippet.  It has been modified to pull the HTTPS version of ga.js
 * instead of the default HTTP version.  It is recommended that you use this
 * snippet instead of the standard tracking snippet provided when setting up
 * a Google Analytics account.
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
/**
 * Track a click on a button using the asynchronous tracking API.
 *
 * See http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html
 * for information on how to use the asynchronous tracking API.
 */
function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}

$(document).ready(function() {

  //Here we set the radio button for the stored value
  chrome.storage.sync.get('castEpisodeVisibility', function (result) {
    const value = result.castEpisodeVisibility;
    $("input[type=radio][name=character-appearance][value='" + value + "'").prop('checked', true);
  });

  //Store selected value
  $( "input[type=radio][name=character-appearance]" ).change(function() {
    const state = this.value;
    //Store selected value
    chrome.storage.sync.set({'castEpisodeVisibility': state}, function() {
      chrome.tabs.query({}, function (tabs){
          for (var i=0; i<tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, {"castEpisodeVisibilityState": state});
          }
        });        
    });
  }); 

});