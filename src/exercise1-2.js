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
// EXERCISE 1
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.getName = function () {
        return this.name;
    };
    Animal.prototype.move = function (meters) {
        console.log("".concat(this.name, " moved ").concat(meters, "m."));
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Snake.prototype.move = function (meters) {
        console.log("Slithering...");
        _super.prototype.move.call(this, meters);
        // should call on parent's `move` method, w/ a default
        // slither of 5 meters
    };
    return Snake;
}(Animal));
var montreal = {
    coords: {
        latitude: 42.332,
        longitude: -73.324
    },
    name: "Montréal"
};
function getCityInfo(city) {
    var coords = "(".concat(city.coords.latitude.toFixed(3), ", ").concat(city.coords.longitude.toFixed(3), ")");
    return "".concat(city.name.toUpperCase(), " is located at ").concat(coords, ".");
}
console.log(getCityInfo(montreal));
