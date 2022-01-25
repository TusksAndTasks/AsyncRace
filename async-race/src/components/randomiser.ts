import { Car } from './interfaces';
import { apiController } from './api';

const modelsCars: Array<string> = [
  'Roadster',
  'S',
  'X',
  '3',
  'Y',
  'Cybertruck',
  'X5',
  'X7',
  'X3',
  'X6',
  'GT4',
  'FXX',
  '599 GTO',
  'Enzo',
  '458 Italia',
  '250 GTO',
  'Priora',
  '4x4',
  'Rio',
  'Focus',
  'Kalina',
  'Vesta',
  'Spark',
  'Lacetti',
  'Nexia',
  'Matiz',
  'Cobalt',
  'Captiva',
  'A7',
  'A5',
  'A3',
  'A8',
  'TT',
  'Corolla',
  'Camry',
  'RAV4',
  'Impreza',
  'WRX',
  'ES',
  'LS',
  'RX',
  'GX',
  'LX',
  'GS',
  'LC500',
  'Gallardo',
  'Aventador',
  '911',
  'Cayenne',
  'FX37',
];

const brandsCars: Array<string> = [
  'Audi',
  'Alfa Romeo',
  'Alpina',
  'Aston Martin',
  'Axon',
  'Ford',
  'Ferrari',
  'Fiat',
  'GAZ',
  'GMC',
  'Honda',
  'Hummer',
  'Hyundai',
  'Infiniti',
  'Isuzu',
  'JAC',
  'Jaguar',
  'Jeep',
  'Kamaz',
  'Lada',
  'Lexus',
  'Lotus',
  'MAN',
  'Maybach',
  'MAZ',
  'Mazda',
  'McLaren',
  'Nissan',
  'Opel',
  'Paccar',
  'Pagani',
  'Pontiac',
  'Porsche',
  'Renault',
  'Å koda',
  'Smart',
  'Subaru',
  'Suzuki',
  'Tesla',
  'Toyota',
  'UAZ',
  'Volvo',
  'ZAZ',
  'XPeng',
  'TVR',
  'Saab',
  'RAM',
  'Chevrolet',
  'Mazzanti',
  'Daewoo',
];

class Randomiser {
  getRandomModel(): string {
    return `${brandsCars[Math.floor(Math.random() * 50)]} ${modelsCars[Math.floor(Math.random() * 50)]}`;
  }

  getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  getRandomCars(): Array<Promise<Car | undefined>> {
    const cars = [];

    for (let i = 0; i < 100; i++) {
      cars.push(apiController.createNewCar(this.getRandomModel(), this.getRandomColor()));
    }

    return cars;
  }
}

export const randomiser = new Randomiser();
