// var message: string = 'Hello World!';
// console.log(message);

// Define the base class 'Animal'
class Animal {
    // Properties
    name: string;
    species: string;
  
    // Constructor for Animal
    constructor(name: string, species: string) {
      this.name = name;
      this.species = species;
    }
  }
  
  // Define the derived class 'Tiger' extending 'Animal'
  class Tiger extends Animal {
    // Method to roar
    roar() {
      console.log(`The tiger named ${this.name} is roaring.`);
    }
  }
  
  // Create a Tiger object
  const myTiger = new Tiger("Saber", "Bengal Tiger");
  
  // Access and call the roar method
  myTiger.roar(); // Output: The tiger named Saber is roaring.
  