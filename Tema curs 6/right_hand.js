export default class RightHand {
  constructor(grid) {
    this.grid = grid;
  }

  updateLandmarks(landmarks) {
    this.landmarks = landmarks;
  }

  getRaisedFingers() {
    let raisedFingers = 0;
    const landmarks = this.landmarks;
    if (landmarks) {
      for (let i = 2; i <=5; i++) {
        const fingerTip = landmarks[4 * i];
        const fingerDIP = landmarks[4 * i - 1];
        if (fingerTip.y < fingerDIP.y) {
          raisedFingers++;
        }
      }
      if (landmarks[4].x > landmarks[3].x) {
        raisedFingers++;
      }
    }

    return raisedFingers;
  }
}