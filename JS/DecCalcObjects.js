/**
 * @fileOverview Constructors and methods for all of the objects.
 * @author B00276551
 * @version 1
 */

/**
 * @constructor
 * @param name {string} Name of the template
 * @param value1 {number} Holds the information for Walls, Paint.
 * @param value2 {number} Holds the information for Walls, Wallpaper.
 * @param value3 {number} Holds the information for Walls, Tiles.
 * @param value4 {number} Holds the information for Floor, Carpet.
 * @param value5 {number} Holds the information for Floor, Tiles.
 * @param value6 {number} Holds the information for Floor, Wooden Panels.
 * @param value7 {number} Holds the information for Floor, Vinyl.
 * @param value8 {number} Holds the information for Window, Blinds.
 * @param value9 {number} Holds the information for Window, Curtains.
 * @param value10 {number} Holds the information for Door, Gloss.
 * @param value11 {number} Holds the information for Door, Matte.
 */
function template (name, value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11) {
    this.templateName = name;
    this.price1 = value1;
    this.price2 = value2;
    this.price3 = value3;
    this.price4 = value4;
    this.price5 = value5;
    this.price6 = value6;
    this.price7 = value7;
    this.price8 = value8;
    this.price9 = value9;
    this.price10 = value10;
    this.price11 = value11;
}

/**
 * This object acts as a superclass for the wall, floor, door and window objects.
 * Though all the subclass objects will inherit the height parameter, not all of them
 * use it.
 * @constructor
 * @param length {number} Length of the object.
 * @param width {number} Width of the object.
 * @param height {number} Height of the object.
 */
function roomObject (length, width, height) {
    this.length = length;
    this.width = width;
    this.height = height;
};

/**
 * Object for holding the information about walls in the application.
 * @param length {number} Length of the object.
 * @param width {number} Width of the object.
 * @param height {number} Height of the object.
 * @extends roomObject
 * @constructor
 */
var wall = function () {
    roomObject.apply(this, arguments);
};

wall.prototype = new roomObject();

/**
 * Object for holding the information about floors in the application.
 * @param length {number} Length of the object.
 * @param width {number} Width of the object.
 * @param height {number} Height of the object.
 * @extends roomObject
 * @constructor
 */
var floor = function () {
    roomObject.apply(this, arguments);
};

floor.prototype = new roomObject();

/**
 * Object for holding the information about doors in the application.
 * @param length {number} Length of the object.
 * @param width {number} Width of the object.
 * @param height {number} Height of the object.
 * @extends roomObject
 * @constructor
 */
var door = function () {
    roomObject.apply(this, arguments);
};

door.prototype = new roomObject();

/**
 * Object for holding the information about windows in the application.
 * @param length {number} Length of the object.
 * @param width {number} Width of the object.
 * @param height {number} Height of the object.
 * @extends roomObject
 * @constructor
 */
var windows = function () {
    roomObject.apply(this, arguments);
};

windows.prototype = new roomObject();

/**
 * Calculates the area of an object. Only used if the object does not have it's own
 * getArea method.
 * @returns {number} Area
 */
roomObject.prototype.getArea = function () {
    return this.length * this.width;
};

/**
 * Gets the area of a wall object. The variable used space takes away any space that is being covered
 * by doors or walls.
 * @param usedSpace {number} Combined area of walls and doors.
 * @returns {number} Area
 */
wall.prototype.getArea = function (usedSpace) {
    return (2 * (this.length * this.height)) + (2 * (this.width * this.height)) - usedSpace;
};

/**
 * Gets the area of a wall object without taking away the area covered by doors or walls.
 * @returns {number} Area
 */
wall.prototype.getAreaClean = function () {
    return (2 * (this.length * this.height)) + (2 * (this.width * this.height));
}

/**
 * Gets the area of a window object. The result is multiplied by the amount of windows.
 * @param amount {number} Amount of windows.
 * @returns {number} Area
 */
windows.prototype.getArea = function (amount) {
    return (this.length * this.width) * amount;
}

/**
 * Gets the area of a door object. The result is multiplied by the amount of doors.
 * @param amount {number} Amount of doors.
 * @returns {number} Area
 */
door.prototype.getArea = function (amount) {
    return (this.length * this.width) * amount;
}

// 10m2 per liter of paint, 5m2 for 1 roll of wallpaper, 5 tiles per m2
// Door paint covers approx 12m2.
// Paint, gloss and matte are set to 2 decimal places.
// Wallpaper rolls, tile amounts, carpet, wood, vinyl are rounded up.

/**
 * This function is used to calculate the price of a given material. The string variable is used
 * to find which material has been selected by matching it to any of the if statements. Once matched,
 * price and usedSpace(if the material being selected belongs to a Wall object) are used to calculate
 * the price. All of this information is then formatted into a string and returned.
 * @param price {number} The price of the material per unit.
 * @param string {string} The name of the material.
 * @param nameString {string} The name of the object.
 * @param usedSpace {number} The amount of space taken up by doors and windows.
 * @returns {string} String containing details of the item and it's pricing.
 */
roomObject.prototype.getCost = function (price, string, nameString, usedSpace) {
    var priceHolder;
    var amount;
    var amountString;
    if (string == "paint") {
        priceHolder = (this.getArea(usedSpace) / 10) * price;
        amount = (this.getArea(usedSpace) / 10).toFixed(2);
        amountString = "litres";
    }
    if (string == "wallpaper") {
        priceHolder = (this.getArea(usedSpace) / 5) * price;
        amount = Math.ceil((this.getArea(usedSpace) / 5));
        amountString = "rolls";
    }
    if (string == "tiles") {
        priceHolder = (this.getArea(usedSpace)) * price;
        amount = Math.ceil((this.getArea(usedSpace) * 5));
        amountString = "tiles";
    }
    if (string == "carpet") {
        priceHolder = (this.getArea()) * price;
        amount = Math.ceil((this.getArea()));
        amountString = "m2 of carpet";
    }
    if (string == "wood") {
        priceHolder = (this.getArea()) * price;
        amount = Math.ceil((this.getArea()));
        amountString = "m2 of wooden panels";
    }
    if (string == "vinyl") {
        priceHolder = (this.getArea()) * price;
        amount = Math.ceil((this.getArea()));
        amountString = "m2 of vinyl";
    }
    if (string == "blinds") {
        priceHolder = price * usedSpace;
        amount = parseInt(usedSpace);
        amountString = "set of blinds";
    }
    if (string == "curtains") {
        priceHolder = price * usedSpace;
        amount = parseInt(usedSpace);
        amountString = "set of curtains";
    }
    if (string == "gloss") {
        priceHolder = (this.getArea(usedSpace / 12)) * price;
        amount = (this.getArea(usedSpace) / 12).toFixed(2);
        amountString = "litres";
    }
    if (string == "matte") {
        priceHolder = (this.getArea(usedSpace / 12)) * price;
        amount = (this.getArea(usedSpace) / 12).toFixed(2);
        amountString = "litres";
    }
    return "Cost of " + nameString + " with " + string + " will be £" + priceHolder.toFixed(2) + " and will require " + amount + " " + amountString + "</br>";
}