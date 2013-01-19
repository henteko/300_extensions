(function(undefined) {
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.create({url: "http://benjaminfulford.com/300.html"});
    });

    //定期実行の宣言
    chrome.alarms.onAlarm.addListener(function(alarm) {
        if(alarm.name == 'refresh300') {
            set();
        }
    });

    chrome.runtime.onInstalled.addListener(function() {
        chrome.alarms.create('refresh300', {periodInMinutes: 1440});
    });

    set();
})();

function set(){
    var url = "http://benjaminfulford.com/300.html";
    $.get(url, function(data) {
        var count = 0;
        var $span = $(data).find("span");
        var span_length = $span.length;
        $.each($span, function(id) {
            if(id != (span_length - 1)) {
                var $_span = $($span[id]);
                count += $_span.find("br").length;
            }
        });
        chrome.browserAction.setBadgeText({text:String(count)});
    });
}
