class Storage {
  carCount: number;

  garagePage: number;

  winnersCount: number;

  winnersPage: number;

  view: string;

  constructor() {
    this.carCount = 0;
    this.garagePage = 1;
    this.winnersCount = 0;
    this.winnersPage = 1;
    this.view = 'garage';
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
