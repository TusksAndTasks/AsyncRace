import { dataStorage } from './storage';
import { Car } from './interfaces';
import { EngineStatus } from './interfaces';
import { Winner } from './interfaces';

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

  async createNewCar(name: string, color: string): Promise<Car | undefined> {
    try {
      const res = await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, color: color }),
      });
      if (res.ok) {
        return (await res.json()) as Car;
      }
    } catch (err) {
      throw err;
    }
  }

  async getCarInfo(id: number): Promise<void> {
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

  async getCarInfoForWinners(id: number): Promise<Array<Car> | undefined> {
    try {
      const res = await fetch(`http://127.0.0.1:3000/garage?id=${id}`, {
        method: 'GET',
      });
      if (res.ok) {
        return (await res.json()) as Array<Car>;
      }
    } catch (err) {
      throw err;
    }
  }

  async updateCarInfo(id: number, name: string, color: string): Promise<void> {
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

  async deleteCar(id: number): Promise<void> {
    try {
      await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      throw err;
    }
  }

  async startEngine(id: number): Promise<EngineStatus | undefined> {
    try {
      const res = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
        method: 'PATCH',
      });
      if (res.ok) {
        return (await res.json()) as EngineStatus;
      }
    } catch (err) {
      throw err;
    }
  }

  async checkEngine(id: number): Promise<boolean | undefined> {
    try {
      const res = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
        method: 'PATCH',
      });
      if (res.status === 500) {
        return true;
      }
      if (res.status === 200) {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  async stopEngine(id: number): Promise<void> {
    try {
      await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`, {
        method: 'PATCH',
      });
    } catch (err) {
      throw err;
    }
  }

  async createWinner(id: number, time: number): Promise<void> {
    const checkResponse = await this.checkWinner(id);
    if (typeof checkResponse !== 'number' && typeof checkResponse !== 'undefined') {
      this.updateWinner(id, +checkResponse.wins + 1, time < checkResponse.time ? time : checkResponse.time);
    }
    if (checkResponse === 404) {
      try {
        await fetch('http://127.0.0.1:3000/winners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id, wins: 1, time: time }),
        });
      } catch (err) {
        throw err;
      }
    }
  }

  async checkWinner(id: number): Promise<Winner | number | undefined> {
    try {
      const res = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: 'GET',
      });
      if (res.ok) {
        return (await res.json()) as Winner;
      }
      if (res.status === 404) {
        return 404;
      }
    } catch (err) {
      throw err;
    }
  }

  async updateWinner(id: number, wins: number, time: number): Promise<void> {
    try {
      await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wins: wins, time: time }),
      });
    } catch (err) {
      throw err;
    }
  }

  async getWinners(): Promise<Array<Winner> | undefined> {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/winners?_page=${dataStorage.winnersPage}&_limit=10&_sort=${dataStorage.sort}&_order=${dataStorage.order}`,
        {
          method: 'GET',
        },
      );
      if (res.ok) {
        dataStorage.winnersCount = +(res.headers.get('X-Total-Count') as string);
        return (await res.json()) as Array<Winner>;
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteWinner(id: number): Promise<void> {
    try {
      await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      throw err;
    }
  }
}

export const apiController = new ApiControls();
