import './styles.css';
import { render } from './components/render';
import { fpsCounter } from './components/fps';

fpsCounter.refreshLoop();

render.renderView();
