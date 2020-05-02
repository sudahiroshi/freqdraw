// AudioContext
window.AudioContext = window.AudioContext || window.webktAudioContext;
var audioCtx = new AudioContext();

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
