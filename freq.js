//　AudioContext
var audioCtx = new AudioContext();

//　MediaStreamSource

//　AnalyserNodeを生成
var analyser = audioCtx.createAnalyser();

//　マイクの音を取り込む処理
function mic(){
    navigator.webkitGetUserMedia(
    {audio:true},
    function(stream){
    //　MediaStreamSourceNodeを生成し，マイクからの入力を格納する
    var mediastreamsource = audioCtx.createMediaStreamSource(stream);
    //　MediaStreamSourceNode→AnalyserNode
    mediastreamsource.connect(analyser);
    },function(e){
           console.log("error");
        }
    );
}

window.addEventListener("load",mic,false);
