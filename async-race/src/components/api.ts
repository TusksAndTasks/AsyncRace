import { dataStorage } from './storage';
import { Car } from './interfaces';

class ApiControls {
  async getGaragePage(page: number): Promise<void | Array<Car>> {
    try {
      const res = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`, {
        method: 'GET',
      });
      if (res.ok) {
        return (await res.json()) as Array<Car>;
      }
    } catch (err) {
      throw err;
    }
  }

  async createNewCar(name: string, color: string) {
    try {
      const res = await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, color: color }),
      });
    } catch (err) {
      throw err;
    }
  }
}

export const apiController = new ApiControls();
