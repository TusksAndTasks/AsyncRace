export type SvgInHtml = HTMLElement & SVGElement;
import { apiController } from './api';
import { dataStorage } from './storage';

class Animator {
  animateCar(id: number, distance: number, velocity: number) {
    const car = document.querySelector(`#car-${id}`) as SvgInHtml;

    const start = 0;
    const end = -1200;
    let currentX = start;
    let isEngineBroken = false;

    async function sendDirveCheck() {
      isEngineBroken = (await apiController.checkEngine(id)) as boolean;
    }
    sendDirveCheck();

    const time = (Math.ceil(distance / velocity) / 1000) * dataStorage.fps;
    let step = 1200 / time;

    console.log(Math.ceil(distance / velocity));

    const commitStep = (timestamp: number) => {
      if (isEngineBroken) {
        step = 0;
      }

      if (dataStorage.stopCar.includes(id) && dataStorage.stopped === true) {
        car.setAttribute('transform', 'matrix(0.2 0 0 0.2 25 5.5) scale(-1,1) translate(0)');
        step = 0;
        const index = dataStorage.stopCar.indexOf(id);
        dataStorage.stopCar.splice(index, 1);
        dataStorage.stopped = false;
        return null;
      }

      currentX -= step;
      car.setAttribute('transform', `matrix(0.2 0 0 0.2 25 5.5) scale(-1,1) translate(${currentX})`);

      if (currentX > end) {
        requestAnimationFrame(commitStep);
      }
      if (currentX < end) {
        dataStorage.finished.push(+id);
      }
    };
    commitStep(0);
  }
}

export const animator = new Animator();
