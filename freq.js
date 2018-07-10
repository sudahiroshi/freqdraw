// AudioContext
var audioCtx = new AudioContext();

// MediaStreamSource

// AnalyserNodeを生成
var analyser = audioCtx.createAnalyser();

// マイクの音を取り込む処理
function mic() {
    if( navigator.mediaDevices.getUserMedia ) {
        navigator.mediaDevices.getUserMedia( {
            audio: true
        }).then( function(stream) {
            // MediaStreamSourceNodeを生成し，マイクからの入力を格納する
            var mediastreamsource = audioCtx.createMediaStreamSource(stream);
            // see : http://dotnsf.blog.jp/archives/1053182894.html
            window.dotnsf_hack_for_mozzila = mediastreamsource;
            // MediaStreamSourceNode→AnalyserNode
            mediastreamsource.connect(analyser);
        }, function(reason) {
            console.log("error");
        });
    } else {
        navigator.getUserMedia = navigator.getUserMeida || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({
                audio: true
            },
            function(stream) {
                // MediaStreamSourceNodeを生成し，マイクからの入力を格納する
                var mediastreamsource = audioCtx.createMediaStreamSource(stream);
                // MediaStreamSourceNode→AnalyserNode
                mediastreamsource.connect(analyser);
            },
            function(e) {
                console.log("error");
            }
        );
    }
}

window.addEventListener("load", mic, false);
