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

  fps: number;

  stopCar: Array<number>;

  stopped: boolean;

  finished: Array<number>;

  stateOfRace: boolean;

  startTime?: Date;

  sort: string;

  order: string;

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
    this.fps = 60;
    this.stopCar = [];
    this.stopped = false;
    this.finished = [];
    this.stateOfRace = false;
    this.startTime = undefined;
    this.sort = 'id';
    this.order = 'ASC';
  }

  switchView() {
    if (this.view === 'garage') {
      this.view = 'winners';
    }
    if (this.view === 'winners') {
      this.view = 'garage';
    }
  }

  refresh() {
    this.currentCar = 0;
    this.stopCar = [];
    this.stopped = false;
    this.finished = [];
    this.stateOfRace = false;
    this.startTime = undefined;
  }
}

export const dataStorage = new Storage();
