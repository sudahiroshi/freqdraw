// AudioContext
window.audio = window.AudioContext || window.webkitAudioContext;
console.log( window.audio );
var audioCtx = new window.audio();

// MediaStreamSource

// AnalyserNodeを生成
var analyser = audioCtx.createAnalyser();

// マイクの音を取り込む処理
function mic() {
	navigator.mediaDevices.getUserMedia( {
        audio: true
    }).then( stream => {
        // MediaStreamSourceNodeを生成し，マイクからの入力を格納する
        var mediastreamsource = audioCtx.createMediaStreamSource(stream);
        // MediaStreamSourceNode→AnalyserNode
        mediastreamsource.connect(analyser);
    }).catch(err => {
        console.log(err);
    });
}


window.addEventListener("load", mic, false);
