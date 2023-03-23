// EXERCISE 1
class Animal {
    private readonly name: string;
  
    public constructor(name: string) {
      this.name = name;
    }
  
    public getName(): string {
      return this.name;
    }
  
    move(meters: number) {
      console.log(`${this.name} moved ${meters}m.`);
    }
  }
  
  class Snake extends Animal {
    move(meters: number) {
      console.log("Slithering...");
      super.move(meters);
      // should call on parent's `move` method, w/ a default
      // slither of 5 meters
    }
  }
  
  //let sn = new Snake("snake1");
  //sn.move(5);
  
  // EXERCISE 2
  // • Create an interface `Coords` that has numeric `latitude` and `longitude` properties.
  // • Extend the existing interface `City` (without modifying it inline) by adding a
  //   `coords` property of type `Coords`.
  // • Fix whatever is wrong with `tampa`
  
  // [do not edit] (pretend this is coming from external `foo.d.ts` lib)
  interface City {
    name: string;
  } // [/do not edit]
  
  interface Coords {
    latitude: number;
    longitude: number;
  }
  
  interface CoordinatedCity extends City {
    coords: Coords;
  }
  
  const montreal: CoordinatedCity = {
    coords: {
      latitude: 42.332,
      longitude: -73.324
    },
    name: "Montréal"
  };
  
  function getCityInfo(city: CoordinatedCity) {
    const coords = `(${city.coords.latitude.toFixed(
      3
    )}, ${city.coords.longitude.toFixed(3)})`;
    return `${city.name.toUpperCase()} is located at ${coords}.`;
  }
  
  console.log(getCityInfo(montreal));
  