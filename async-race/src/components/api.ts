import { dataStorage } from './storage';
import { Car } from './interfaces';

class ApiControls {
  async getGaragePage(page: number): Promise<void | Array<Car>> {
    try {
      const res = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`, {
        method: 'GET',
      });
      if (res.ok) {
        dataStorage.carCount = +(res.headers.get('X-Total-Count') as string);
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
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      throw err;
    }
  }

  async getCarInfo(id: number) {
    try {
      const updateText = document.getElementById('update-text') as HTMLInputElement;
      const updateColor = document.getElementById('update-color') as HTMLInputElement;
      const res = await fetch(`http://127.0.0.1:3000/garage?id=${id}`, {
        method: 'GET',
      });
      if (res.ok) {
        const car = (await res.json()) as Array<Car>;
        updateText.value = car[0].name;
        updateColor.value = car[0].color;
      }
    } catch (err) {
      throw err;
    }
  }

  async updateCarInfo(id: number, name: string, color: string) {
    try {
      await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, color: color }),
      });
    } catch (err) {
      throw err;
    }
  }

  async deleteCar(id: number) {
    try {
      await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      throw err;
    }
  }
}

export const apiController = new ApiControls();
