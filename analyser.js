class Analyser {
    constructor() {
        // AudioContext
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        this.analyser = audioCtx.createAnalyser();
        this.analyser.fftSize = 256;

        navigator.mediaDevices.getUserMedia( {
            audio: true
        }).then( stream => {
            // MediaStreamSourceNodeを生成し，マイクからの入力を格納する
            let source = audioCtx.createMediaStreamSource(stream);
            // MediaStreamSourceNode→AnalyserNode
            source.connect(this.analyser);
        }).catch(err => {
            console.log(err);
        });
    }

    getByteTimeDomainData() {
        let bufferLength = this.analyser.frequencyBinCount;
        let dataArray = new Uint8Array( bufferLength );
        this.analyser.getByteTimeDomainData( dataArray );
        return dataArray;
    }

    getByteFrequencyData() {
        let bufferLength = this.analyser.frequencyBinCount;
        let dataArray = new Uint8Array( bufferLength );
        this.analyser.getByteFrequencyData( dataArray );
        return dataArray;
    }
}



