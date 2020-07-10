//TODO: random library


class Random {
  constructor(seed) {
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed ? seed : null;
  }

  // XorShift
  next() {
    let t;
    t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
  }

  random() {
    if (this.w != null) {
      const r = Math.abs(this.next());
      return (r % (10000)) / 10000.0;
    } else {
      return Math.random();
    }
  }

  chooseFrom(choices) {
    let index = Math.floor(this.random() * choices.length);
    return choices[index]
  }

  chooseBetween(range, discrete = true) {
    let randValue = this.random() * (range[1] - range[0]) + range[0];
    if (discrete)
      randValue = Math.floor(randValue);
    return randValue;
  }
}

export {Random};

