import { dataStorage } from './storage';
import listeners from './listeners';
const listener = new listeners();

class Render {
  body: HTMLElement;

  constructor() {
    this.body = document.querySelector('body') as HTMLElement;
  }

  renderView() {
    if (dataStorage.view === 'garage') {
      this.renderGarage();
      listener.setViewListeners();
    }
    if (dataStorage.view === 'winners') {
      this.renderWinners();
      listener.setViewListeners();
    }
  }

  renderGarage() {
    this.body.innerHTML = `<header>
      <nav>
          <div class="nav-button" id="garage-view">To garage</div>
          <div class="nav-button" id="winners-view">To winners</div>
      </nav>
  </header>
  <div class="control-panel">
      <div class="create-panel">
          <input type="text" class="text-input">
          <input type="color" class="color-input" value="#000000">
          <div class="commit-button">Create</div>
      </div>
      <div class="update-panel">
          <input type="text" class="text-input">
          <input type="color" class="color-input" value="#000000">
          <div class="commit-button">Update</div>
      </div>
      <div class="main-panel">
          <div class="nav-button">Race</div>
          <div class="nav-button">Reset</div>
          <div class="commit-button">Generate cars</div>
      </div>
  </div>
  <div class="garage-section">
      <h1>Garage (0)</h1>
      <h2>Page #1</h2>
  </div>
  <div class="page-select">
      <div class="commit-button">Prev</div>
      <div class="commit-button">Next</div>
  </div>`;
  }

  renderWinners() {
    this.body.innerHTML = `<header>
    <nav>
        <div class="nav-button" id="garage-view">To garage</div>
        <div class="nav-button" id="winners-view">To winners</div>
    </nav>
   </header>
   <h1>Winners (0)</h1>
   <h2>Page #1</h2>
   <div class="winners-container">
       <div class="number-column">
           <div class="column-description">Number</div>
       </div>
       <div class="car-column">
           <div class="column-description">Car</div>
       </div>
       <div class="name-column">
           <div class="column-description">Name</div>
       </div>
       <div class="wins-column">
           <div class="column-description">Wins</div>
       </div>
       <div class="time-column">
           <div class="column-description">Time</div>
       </div>
   </div>
   <div class="page-select">
       <div class="commit-button">Prev</div>
       <div class="commit-button">Next</div>
   </div>`;
  }
}

export const render = new Render();
