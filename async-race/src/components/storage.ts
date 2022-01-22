class Storage {
  carCount: number;

  garagePage: number;

  winnersCount: number;

  winnersPage: number;

  view: string;

  createTextValue: string;

  updateTextValue: string;

  createColorValue: string;

  updateColorValue: string;

  currentCar: number;

  constructor() {
    this.carCount = 0;
    this.garagePage = 1;
    this.winnersCount = 0;
    this.winnersPage = 1;
    this.view = 'garage';
    this.createTextValue = '';
    this.createColorValue = '#ffffff';
    this.updateColorValue = '#ffffff';
    this.updateTextValue = '';
    this.currentCar = 0;
  }

  switchView() {
    if (this.view === 'garage') {
      this.view = 'winners';
    }
    if (this.view === 'winners') {
      this.view = 'garage';
    }
  }
}

export const dataStorage = new Storage();
