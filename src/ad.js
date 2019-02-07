export let preloadedRewardedVideo = null;
export function preload() {
    window.FBInstant.getRewardedVideoAsync(
        '2130997363884439_2200601390257369', // Your Ad Placement Id
    ).then(function (rewarded) {
        preloadedRewardedVideo = rewarded;
        return preloadedRewardedVideo.loadAsync();
    }).then(function () {
        console.log('Rewarded video preloaded')
        window.FBInstant.logEvent(
            'rewarded_video_preload',
            1,
            {}
        )
    }).catch(function (err) {
        console.error('Rewarded video failed to preload: ' + err.message);
        window.FBInstant.logEvent(
            'rewarded_video_preload_fail',
            1,
            { err_message: err.message }
        )
    });
}

export function playAd(success, failure) {
    preloadedRewardedVideo.showAsync()
        .then(function () {
            // Perform post-ad success operation
            success();
        })
        .catch(function (e) {
            failure();
        });
}