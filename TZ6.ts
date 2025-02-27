function DecoCar(constructor: Function) {
    Object.seal(constructor.prototype);
}
  
@DecoCar
class Car{
    private _model: string;
    private _year : number;
    constructor(public model: string, public year: number) {
        this._model = model;
        this._year = year;
    }
}

const car = new Car("Tesla", 2021);
console.log(Object.isExtensible(Object.getPrototypeOf(car)));

//Декоратор метода
function toUpperCase(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        if (typeof result === "string") {
            return result.toUpperCase();
        }
        return result;
    };
}

class Cars {
    private _model: string;
    private _year: number;

    constructor(model: string, year: number) {
        this._model = model;
        this._year = year;
    }

    @toUpperCase
    getInfoCar(): string {
        return `Model this car: ${this._model}, Year this car: ${this._year}`;
    }
}



const cars = new Cars('Tesla', 2021);
console.log(cars.getInfoCar());