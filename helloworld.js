// var message: string = 'Hello World!';
// console.log(message);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Define the base class 'Animal'
var Animal = /** @class */ (function () {
    // Constructor for Animal
    function Animal(name, species) {
        this.name = name;
        this.species = species;
    }
    return Animal;
}());
// Define the derived class 'Tiger' extending 'Animal'
var Tiger = /** @class */ (function (_super) {
    __extends(Tiger, _super);
    function Tiger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Method to roar
    Tiger.prototype.roar = function () {
        console.log("The tiger named ".concat(this.name, " is roaring."));
    };
    return Tiger;
}(Animal));
// Create a Tiger object
var myTiger = new Tiger("Saber", "Bengal Tiger");
// Access and call the roar method
myTiger.roar(); // Output: The tiger named Saber is roaring.
