import { render } from './render';
import { dataStorage } from './storage';
import { apiController } from './api';

export default class {
  setViewListeners() {
    const garageButton = document.getElementById('garage-view') as HTMLElement;
    const winnersButton = document.getElementById('winners-view') as HTMLElement;
    garageButton.addEventListener('click', function (): void {
      dataStorage.view = 'garage';
      render.renderView();
      console.log(dataStorage.view);
    });
    winnersButton.addEventListener('click', function (): void {
      dataStorage.view = 'winners';
      render.renderView();
      console.log(dataStorage.view);
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
        render.createCars();
      }
    });
  }
}
