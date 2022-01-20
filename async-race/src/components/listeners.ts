import { render } from './render';
import { dataStorage } from './storage';

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
}
