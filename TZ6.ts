function DecoratorCar(constructor: Function) {
    Object.seal(constructor.prototype);
}
  
@DecoratorCar
class Car{
    private _brand: string;
    private _year : number;
    constructor(public brand: string, public year: number) {
        this._brand = brand;
        this._year = year;
    }
}

const car = new Car("Lancia", 1999);
console.log(Object.isExtensible(Object.getPrototypeOf(car)));

function toUpperCase1(method: Function) {
    return function (this: any, ...args: any[]) {
        const result = method.apply(this, args);
        return result.toUpperCase();
    }
}

class Cars {
    private _brand: string;
    private _year: number;

    constructor(brand: string, year: number) {
        this._brand = brand;
        this._year = year;
    }

    @toUpperCase1
    getInfoCar(): string {
        return `Model this car: ${this._brand}, Year this car: ${this._year}`;
    }
}

const cars = new Cars('Lancia', 1999);
console.log(cars.getInfoCar());