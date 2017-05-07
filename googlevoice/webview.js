module.exports = (Franz, options) => {

  function tryGetCount(countSelectionFunction) {
    try {
        return parseInt(countSelectionFunction()) || 0;
    } catch (e) {
        return 0;
    }
  }

  function getMessages() {
    var count =
        tryGetCount(function(){
            // Get count for old Google Voice UI
            return document.querySelector('.msgCount').innerHTML.replace(/[\(\) ]/gi,"");
        }) + tryGetCount(function() {
            // Get count for new Google Voice UI
            return document.querySelector('[view-type="/messages"] div[aria-label="Unread count"]').innerHTML;
        });

    var missedCalls = tryGetCount(function() {
        return document.querySelector('[view-type="/calls"] div[aria-label="Unread count"]').innerHTML;
    });

    var voicemails = tryGetCount(function() {
        return document.querySelector('[view-type="/voicemail"] div[aria-label="Unread count"]').innerHTML;
    });

    Franz.setBadge(count, (missedCalls + voicemails));
  }

  Franz.loop(getMessages);
}
