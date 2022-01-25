import { dataStorage } from './storage';

class FpsCounter {
  times: Array<number>;

  fps: number;

  counter: number;

  constructor() {
    this.times = [];
    this.fps = 60;
    this.counter = 0;
  }

  refreshLoop(): void {
    window.requestAnimationFrame(() => {
      const now = performance.now();
      while (this.times.length > 0 && this.times[0] <= now - 1000) {
        this.times.shift();
      }
      this.times.push(now);
      this.fps = this.times.length;
      this.counter++;
      if (this.counter > 150) {
        dataStorage.fps = this.fps;
        return this.fps;
      }
      this.refreshLoop();
    });
  }
}

export const fpsCounter = new FpsCounter();
