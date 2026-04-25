// AudioContext（ユーザー操作後に生成するためグローバル変数として宣言のみ）
var audioCtx = null;
var analyser = null;

// マイクの音を取り込む処理（ユーザー操作時に呼び出す）
function mic() {
    // AudioContextの生成（既に作成済みの場合はスキップ）
    if( !audioCtx ) {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        // AnalyserNodeを生成
        analyser = audioCtx.createAnalyser();
    }

    // suspendedの場合はresumeする
    if( audioCtx.state === 'suspended' ) {
        audioCtx.resume();
    }

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
