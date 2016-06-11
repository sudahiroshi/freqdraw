// windowが読み込まれてから実行
window.onload = function(){
    back();
    db();
    par();
}

//　背景
function back(){
    var canvas = document.getElementById('mainCanvas');
    var ctx = canvas.getContext('2d');

    //　破線
    ctx.setLineDash([1,6]);
    ctx.save();

    //　背景
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,mainCanvas.width,mainCanvas.height);
    ctx.closePath();

    //　枠線
    //　縦
    ctx.setLineDash([]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(1, 0);
    ctx.lineTo(1, mainCanvas.height);
    ctx.closePath();
    ctx.stroke();
    //　横
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(0, mainCanvas.height-1);
    ctx.lineTo(mainCanvas.width, mainCanvas.height-1);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    //　横のグリッド
    //　90db
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, mainCanvas.height/7);
    ctx.lineTo(mainCanvas.width, mainCanvas.height/7);
    ctx.closePath();
    ctx.stroke();

    //　80db
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, mainCanvas.height/7*2);
    ctx.lineTo(mainCanvas.width, mainCanvas.height/7*2);
    ctx.closePath();
    ctx.stroke();

    //　70db
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, mainCanvas.height/7*3);
    ctx.lineTo(mainCanvas.width, mainCanvas.height/7*3);
    ctx.closePath();
    ctx.stroke();

    //　60db
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, mainCanvas.height/7*4);
    ctx.lineTo(mainCanvas.width, mainCanvas.height/7*4);
    ctx.closePath();
    ctx.stroke();

    //　50db
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, mainCanvas.height/7*5);
    ctx.lineTo(mainCanvas.width, mainCanvas.height/7*5);
    ctx.closePath();
    ctx.stroke();

    //　40db
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, mainCanvas.height/7*6);
    ctx.lineTo(mainCanvas.width, mainCanvas.height/7*6);
    ctx.closePath();
    ctx.stroke();

    //　縦のグリッド
    //100Hz
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(mainCanvas.width/2-374, 0);
    ctx.lineTo(mainCanvas.width/2-374, mainCanvas.height);
    ctx.closePath();
    ctx.stroke();

    //500Hz
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(mainCanvas.width/2-300, 0);
    ctx.lineTo(mainCanvas.width/2-300, mainCanvas.height);
    ctx.closePath();
    ctx.stroke();

    //1000Hz
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(mainCanvas.width/2-210, 0);
    ctx.lineTo(mainCanvas.width/2-210, mainCanvas.height);
    ctx.closePath();
    ctx.stroke();

    //2000Hz
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(mainCanvas.width/2-30, 0);
    ctx.lineTo(mainCanvas.width/2-30, mainCanvas.height);
    ctx.closePath();
    ctx.stroke();

    //3000Hz
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(mainCanvas.width/2+150, 0);
    ctx.lineTo(mainCanvas.width/2+150, mainCanvas.height);
    ctx.closePath();
    ctx.stroke();

    //4000Hz
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(mainCanvas.width/2+332, 0);
    ctx.lineTo(mainCanvas.width/2+332, mainCanvas.height);
    ctx.closePath();
    ctx.stroke();


}

// 周波数表記
function par(){
    var canvas2 = document.getElementById('heightCanvas');
    var ctx2 = canvas2.getContext('2d');
    ctx2.font = "13px Helvetica";
    ctx2.fillText('100',80, 11, 100);
    ctx2.fillText('500',154, 11, 100);
    ctx2.fillText('1000',241, 11, 100);
    ctx2.fillText('2000',421, 11, 100);
    ctx2.fillText('3000',601, 11, 100);
    ctx2.fillText('4000',783, 11, 100);
    ctx2.fillText('(Hz)',866, 11, 100);
}

// dB表記
function db(){
    var canvas3 = document.getElementById('widthCanvas');
    var ctx3 = canvas3.getContext('2d');
    ctx3.font = "14px Helvetica";
    ctx3.fillText('(dB)',3, 13, 100);
    ctx3.fillText('100',3, 34, 100);
    ctx3.fillText(' 90',3, 73, 100);
    ctx3.fillText(' 80',3, 116, 100);
    ctx3.fillText(' 70',3, 159, 100);
    ctx3.fillText(' 60',3, 202, 100);
    ctx3.fillText(' 50',3, 245, 100);
    ctx3.fillText(' 40',3, 288, 100);
    ctx3.fillText(' 30',3, 325, 100);
}

//　周波数領域の描画
function freqDraw(){
    timerId = setInterval(function(){
    var canvas = document.getElementById('mainCanvas');
    var canvasCtx = canvas.getContext('2d');

    //　30db~100db
    var min = 30;
    var max = 100;
    var range = max - min;

    //　スペクトラムのデータを取得
    var spectrum = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatFrequencyData(spectrum);

    //　Canvasをクリア
    canvasCtx.clearRect(0,0,canvas.width,canvas.height);
    //　背景
    back();
    //　直線
    canvasCtx.setLineDash([]);
    //    ctx.strokeStyle = "black";
    //　描画
    canvasCtx.beginPath();
    for(var i=0,len = spectrum.length;i<len;i++){
        // x座標の算出 (元波形の1/8,~2500Hz)
        var x = (i / len)*5*canvas.width;
        // y座標の算出
        var y = (- 1 * ((spectrum[i]-analyser.maxDecibels)/range))*canvas.height;

        (i===0)?canvasCtx.moveTo(x+1,y):canvasCtx.lineTo(x+1,y);
    }

    canvasCtx.strokeStyle = "#0000ff";
    canvasCtx.stroke();

    },10);
}

function freqDraw2(){
    analyser.fftSize = 2048;
    var bufferLength = analyser.fftSize;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    var canvas = document.getElementById('mainCanvas');
    var canvasCtx = canvas.getContext('2d');
    timerId = setInterval(function(){
        //drawVisual = requestAnimationFrame(freqDraw2);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        var sliceWidth = canvas.width * 1.0 / bufferLength;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {

            var v = dataArray[i] / 128.0;
            var y = v * canvas.height/2;

            if(i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height/2);
        canvasCtx.stroke();
    },10);
}

function freqDraw3(){
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    //analyser.getByteTimeDomainData(dataArray);

    var canvas = document.getElementById('mainCanvas');
    var canvasCtx = canvas.getContext('2d');
    timerId = setInterval(function(){
        analyser.getByteFrequencyData(dataArray);

        //canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        //canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        //canvasCtx.lineWidth = 2;
        //canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        //　Canvasをクリア
        canvasCtx.clearRect(0,0,canvas.width,canvas.height);
        //　背景
        back();
        //　直線
        //canvasCtx.setLineDash([0,0]);
        //　描画
        canvasCtx.beginPath();

        var sliceWidth = canvas.width * 1.0 / bufferLength;
        var x = 0;

        canvasCtx.moveTo(0, 0);
        for(var i = 0; i < bufferLength; i++) {

            var v = 1 - ( dataArray[i] / 256 );
            var y = v * canvas.height;

            canvasCtx.lineTo(x, y);
            x += sliceWidth;
        }

        canvasCtx.lineTo(x, 0);
        canvasCtx.stroke();
    },10);
}

function getAverageVolume(array) {
    var values = 0;
    var average;

    var length = array.length;

    // get all the frequency amplitudes
    for (var i = 0; i < length; i++) {
        values += array[i];
    }

    average = values / length;
    return average;
}

//　描画開始
function start(){

    freqDraw();
}

//　描画を一時停止
function stop(){
    clearInterval(timerId);
}
