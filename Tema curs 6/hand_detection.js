import RightHand from "./right_hand.js";

export default class HandDetection {
  constructor(grid) {
    this.grid = grid;
    this.previouslyRaisedFingers = null;
  }

  init() {
    this.initializeElements();
    this.initializeHolistic();
    this.initializeCamera();
    this.addButtonHandler();
    this.rightHand = new RightHand(this.grid);

  }

  initializeElements() {
    this.videoElement = document.getElementById("video-input");
    this.canvasElement = document.getElementById("canvas-output");
    this.canvasCtx = this.canvasElement.getContext("2d");
  }

  initializeHolistic() {
    this.holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });

    this.holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    this.holistic.onResults(this.onResults.bind(this));
  }

  initializeCamera() {
    const camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.holistic.send({ image: this.videoElement });
      },
      width: 780,
      height: 439,
    });
    camera.start();
  }

  onResults(results) {
    this.canvasCtx.save();
    this.canvasCtx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.canvasCtx.drawImage(
      results.image,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.rightHand.updateLandmarks(results.rightHandLandmarks);
    this.handleRaisedFingers();
    this.canvasCtx.restore();
  }

  addButtonHandler() {
    document.querySelector('#playLoop')?.addEventListener('click', async () => {
      const synth = new Tone.Synth().toDestination();
      const loop = new Tone.Loop((time) => {
        synth.triggerAttackRelease("C4", "32n");
      }, "8n").start(0);
      await Tone.Transport.start();
    })
  }

  handleRaisedFingers() {
    let currentlyRaisedFingers = this.rightHand.getRaisedFingers();
    if (this.previouslyRaisedFingers != currentlyRaisedFingers) {
      this.previouslyRaisedFingers = currentlyRaisedFingers;
      document.querySelector('#raisedFingers').innerText = `Number of raised fingers: ${this.rightHand.getRaisedFingers()}`;
      Tone.Transport.bpm.value = 40 - (5 * this.previouslyRaisedFingers);
    }
  }
}
