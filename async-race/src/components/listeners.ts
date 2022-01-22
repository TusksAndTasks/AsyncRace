import { render } from './render';
import { dataStorage } from './storage';
import { apiController } from './api';
import { randomiser } from './randomiser';

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
}
