import { render } from './render';
import { dataStorage } from './storage';
import { apiController } from './api';
import { randomiser } from './randomiser';
import { animator } from './animation';
import { EngineStatus } from './interfaces';
import { SvgInHtml } from './animation';

export default class {
  setViewListeners() {
    const garageButton = document.getElementById('garage-view') as HTMLElement;
    const winnersButton = document.getElementById('winners-view') as HTMLElement;
    const userModel = document.getElementById('create-text') as HTMLInputElement;
    const userColor = document.getElementById('create-color') as HTMLInputElement;
    const updateText = document.getElementById('update-text') as HTMLInputElement;
    const updateColor = document.getElementById('update-color') as HTMLInputElement;

    garageButton.addEventListener('click', function (): void {
      dataStorage.view = 'garage';
      render.renderView();
    });
    winnersButton.addEventListener('click', function (): void {
      dataStorage.view = 'winners';
      render.renderView();
      dataStorage.updateTextValue = updateText.value;
      dataStorage.updateColorValue = updateColor.value;
      dataStorage.createTextValue = userModel.value;
      dataStorage.createColorValue = userColor.value;
    });
  }

  setCreateListener() {
    const createButton = document.getElementById('create') as HTMLElement;
    const userModel = document.getElementById('create-text') as HTMLInputElement;
    const userColor = document.getElementById('create-color') as HTMLInputElement;

    createButton.addEventListener('click', function () {
      if (!userModel.value) {
        userModel.placeholder = 'You need to enter model to create a car!';
      } else {
        apiController.createNewCar(userModel.value, userColor.value);
        userModel.value = '';
        render.updateCars();
      }
    });
  }

  setSelectListeners() {
    const selectButtons = document.querySelectorAll('div[data-select]');

    selectButtons.forEach((elem: Node) => {
      (elem as HTMLElement).addEventListener('click', async function () {
        dataStorage.currentCar = +((elem as HTMLElement).dataset.select as string);
        apiController.getCarInfo(dataStorage.currentCar);
      });
    });
  }

  setRemoveListeners() {
    const removeButtons = document.querySelectorAll('div[data-remove]');

    removeButtons.forEach((elem: Node) => {
      (elem as HTMLElement).addEventListener('click', async function () {
        apiController.deleteCar(+((elem as HTMLElement).dataset.remove as string)).then(() => render.updateCars());
        dataStorage.currentCar = 0;
      });
    });
  }

  setUpdateListener() {
    const updateText = document.getElementById('update-text') as HTMLInputElement;
    const updateColor = document.getElementById('update-color') as HTMLInputElement;
    const updateButton = document.getElementById('update') as HTMLElement;

    updateButton.addEventListener('click', function () {
      if (dataStorage.currentCar === 0) {
        updateText.value = '';
        updateText.placeholder = 'Select car first!';
      } else {
        apiController
          .updateCarInfo(dataStorage.currentCar, updateText.value, updateColor.value)
          .then(() => render.updateCars());
        updateText.value = '';
      }
    });
  }

  setGenerateListener() {
    const generator = document.getElementById('generate') as HTMLElement;

    generator.addEventListener('click', function () {
      Promise.all(randomiser.getRandomCars()).then(() => {
        render.updateCars();
      });
    });
  }

  setPageListeners() {
    const prevButton = document.getElementById('prev') as HTMLElement;
    const nextButton = document.getElementById('next') as HTMLElement;

    prevButton.addEventListener('click', function () {
      if (dataStorage.garagePage > 1) {
        dataStorage.garagePage -= 1;
        render.updateCars();
      }
    });

    nextButton.addEventListener('click', function () {
      if (dataStorage.garagePage < Math.ceil(dataStorage.carCount / 7)) {
        dataStorage.garagePage += 1;
        render.updateCars();
      }
    });
  }

  setDriveListeners() {
    const startButtons = document.querySelectorAll('.start');

    startButtons.forEach((startButton: Node) => {
      (startButton as HTMLElement).addEventListener('click', async () => {
        const id = ((startButton as HTMLElement).dataset.start as unknown) as number;
        if (!(startButton as HTMLElement).classList.contains('disabled')) {
          this.driveStarter(+id);
        }
      });
    });
  }

  async driveStarter(id: number) {
    const startButton = document.querySelector(`[data-start="${id}"]`) as HTMLElement;
    const stopButton = document.querySelector(`[data-stop="${id}"]`) as HTMLElement;
    const car = document.querySelector(`#car-${id}`) as SvgInHtml;
    const response = await apiController.startEngine(+id);
    car.setAttribute('transform', 'matrix(0.2 0 0 0.2 25 5.5) scale(-1,1) translate(0)');
    startButton.classList.add('disabled');
    stopButton.classList.remove('disabled');
    animator.animateCar(+id, (response as EngineStatus).distance, (response as EngineStatus).velocity);
  }

  setStopListeners() {
    const stopButtons = document.querySelectorAll('.stop');

    stopButtons.forEach((stopButton: Node) => {
      (stopButton as HTMLElement).addEventListener('click', async () => {
        const id = ((stopButton as HTMLElement).dataset.stop as unknown) as number;
        if (!(stopButton as HTMLElement).classList.contains('disabled')) {
          this.driveStopper(id);
        }
      });
    });
  }

  async driveStopper(id: number) {
    const stopButton = document.querySelector(`[data-stop="${id}"]`) as HTMLElement;
    const startButton = document.querySelector(`[data-start="${id}"]`) as HTMLElement;
    const car = document.querySelector(`#car-${id}`) as SvgInHtml;
    stopButton.classList.add('disabled');
    apiController.stopEngine(id).then(() => {
      dataStorage.stopCar.push(+id);
      dataStorage.stopped = true;
      console.log(dataStorage.finished);
      if (dataStorage.finished.includes(+id)) {
        const index = dataStorage.stopCar.indexOf(+id);
        const indexF = dataStorage.finished.indexOf(+id);
        car.setAttribute('transform', 'matrix(0.2 0 0 0.2 25 5.5) scale(-1,1) translate(0)');
        dataStorage.stopCar.splice(index, 1);
        dataStorage.finished.splice(indexF, 1);
        dataStorage.stopped = false;
      }
      car.setAttribute('transform', 'matrix(0.2 0 0 0.2 25 5.5) scale(-1,1) translate(0)');
      startButton.classList.remove('disabled');
    });
  }

  startRace() {
    const buttons = document.querySelectorAll('[data-start]');
    const racers: Array<Promise<unknown>> = [];

    buttons.forEach((elem: Node) => {
      const id = +(((elem as HTMLElement).dataset.start as unknown) as number);
      racers.push(this.driveStarter(id));
    });

    return racers;
  }

  setRaceListener() {
    const raceButton = document.getElementById('race') as HTMLElement;
    const resetButton = document.getElementById('reset') as HTMLElement;

    raceButton.addEventListener('click', () => {
      if (!raceButton.classList.contains('disabledButton')) {
        dataStorage.startTime = new Date();
        dataStorage.stateOfRace = true;
        raceButton.classList.add('disabledButton');
        Promise.all(this.startRace()).then(() => resetButton.classList.remove('disabledButton'));
      }
    });
  }

  stopRace() {
    const buttons = document.querySelectorAll('[data-stop]');
    const racers: Array<Promise<unknown>> = [];

    buttons.forEach((elem: Node) => {
      const id = +(((elem as HTMLElement).dataset.stop as unknown) as number);
      racers.push(this.driveStopper(id));
    });

    return racers;
  }

  setRaceResetListener() {
    const resetButton = document.getElementById('reset') as HTMLElement;
    const raceButton = document.getElementById('race') as HTMLElement;

    resetButton.addEventListener('click', () => {
      if (!resetButton.classList.contains('disabledButton')) {
        resetButton.classList.add('disabledButton');
        Promise.all(this.stopRace()).then(() => raceButton.classList.remove('disabledButton'));
      }
    });
  }

  setHideWinnerListener() {
    const winner = document.querySelector('.winnerbox') as HTMLElement;

    document.addEventListener('click', function (event) {
      if (!winner.classList.contains('hidden') && event.target !== winner) {
        winner.classList.add('hidden');
      }
    });
  }
}
