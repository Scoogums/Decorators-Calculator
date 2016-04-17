/**
 * @fileOverview This file contains the main logic of the Decorators Calculator. It contains code for
 * all of the buttons and references to all HTML elements.
 * @author B00276551
 * @version 1
 */

var wallObject, windowObject, doorObject, floorObject;
var length, width, height, windowLength, windowWidth, windowSelect, doorLength, doorWidth, doorSelect, label, checkbox;
var output = "";
var windowsHidden = true, doorsHidden = true;
var templateArray = [];

/**
 * This is the main code for the Decorators Calculator Application. At start up it checks to see if any Templates
 * have been created and stored in local storage. If not, it will store the current blank templateArray into
 * local storage. This makes sure that when the code that checks for default Templates runs, the application will not
 * crash.
 *
 * Next, some UI elements are hidden, the HTML elements are assigned to their variables, the Template list is populated
 * with any user generated Templates and then the default Templates are checked for. If they don't exist, they are
 * reinstated.
 *
 * The rest of the code deals with assign functions to the buttons.
 */
$().ready(function () {
    if (localStorage["templateArray"]){
        loadStoredTemplates();
    } else localStorage["templateArray"] = JSON.stringify(templateArray);
    hideElements();
    initializeHtmlElements();
    populateTemplateList();
    checkForExamples("Everything is made from Gold");
    checkForExamples("Flash Sale");
    checkForExamples("Default");
    $( "#calculateButton" ).click(function()
    {
        calculateLogic();
    });
    $( "#testingButton" ).click(function()
    {
        populateElements();
    });

    $( "#clearButton" ).click(function()
    {
        clearElements();
    });
    $( "#priceChangeButton" ).click(function()
    {
        changePrice(parseInt(materialSelect.value), newMaterialValue.value)
    });
    $('#unhide1').change(function(){
        windowsHidden = false;
        hideAndShow(textToHide1, inputs2, checkboxGroup3, hideWindows);
    });
    $('#unhide2').change(function(){
        doorsHidden = false;
        hideAndShow(textToHide2, inputs3, checkboxGroup4, hideDoors);
    });
    $('#hideWindows').change(function(){
        hideAndShow(textToHide1, inputs2, checkboxGroup3, unhide1, "window");
    });
    $('#hideDoors').change(function(){
        hideAndShow(textToHide2, inputs3, checkboxGroup4, unhide2, "door");
    });
    $('#saveButton').click(function(){
        storeValues();
    });
    $('#loadButton').click(function(){
        populateElements();
    });
    $('#saveTemplate').click(function(){
        if ($("#templateName")[0].value == "") {
            alert("Please enter a name for the template.");
        } else {
            addTemplate();
        }
    });
    $('#loadTemplate').click(function(){
        loadTemplate();
    });
    $('#deleteTemplate').click(function(){
        deleteTemplate();
    });
    $('#clickToHide').click(function () {
        $('#hideTemplates').fadeToggle();
    });
});

/**
 * This function performs some basic error checking on the user inputs and then calls the main method for calculating
 * the price of all the materials, assuming the checks have been satisfied.
 *
 * The calculateMaterials method populates the output string, which is then sent as a parameter of the displayOutputPage
 * method which opens up a new tab with the decorators report.
 */
function calculateLogic () {
    initializeObjects();
    var goAhead = true;
    if (length.value === "" || width.value === "" || height.value === "") {
        alert("Please enter the dimensions of your room.");
        goAhead = false;
    }
    if (windowsHidden == false) {
        if (windowLength.value === "" || windowWidth.value === "") {
        alert("Please enter the dimensions of your windows.");
            goAhead = false;
        }
    }
    if (doorsHidden == false) {
        if (doorLength.value === "" || doorWidth.value === "") {
        alert("Please enter the dimensions of your doors.");
            goAhead = false;
        }
    }
    var usedSpace = parseInt((doorObject.getArea(doorSelect.value) + windowObject.getArea(windowSelect.value)));
    if (usedSpace >= wallObject.getAreaClean()) {
        alert("The combined area of doors and windows cannot exceed that of the walls. Please change your figures.");
        goAhead = false;
    }
    if (goAhead == true) {
        calculateMaterials();
        displayOutputPage(output);
        output = "";
    }
};

/**
 * Sets up the HTML elements to their corresponding variables.
 */
var initializeHtmlElements = function () {
    length = $("#length")[0];
    width = $("#width")[0];
    height = $("#height")[0];
    windowChecked = $("#unhide1")[0];
    windowLength = $("#windowLength")[0];
    windowWidth = $("#windowWidth")[0];
    windowSelect = $("#windowSelect")[0];
    doorChecked = $("#unhide2")[0];
    doorLength = $("#doorLength")[0];
    doorWidth = $("#doorWidth")[0];
    doorSelect = $("#doorSelect")[0];
    materialSelect = $("#materialSelect")[0];
    newMaterialValue = $("#newMaterialValue")[0];
};

/**
 * Logs some information in the console. Runs when calculateMaterials is run. Useful for testing.
 */
var consoleLogging = function() {
    console.log("Total surface area of floor: " + floorObject.getArea());
    console.log("Length and Width of windows: L" + windowLength.value + " W" + windowWidth.value);
    console.log("Length and Width of doors: L" + doorLength.value + " W" + windowLength.value);
    console.log("Amount of windows selected: " + windowSelect.value);
    console.log("Amount of doors selected: " + doorSelect.value);
    console.log("Area of one window: " + (windowLength.value * windowWidth.value));
    console.log("Area of one door: " + (doorLength.value * doorWidth.value));
    console.log("Total surface area taken up by windows: " + windowObject.getArea(windowSelect.value));
    console.log("Total surface area taken up by doors: " + doorObject.getArea(doorSelect.value));
    console.log("Total surface area taken up by windows & doors: " + (doorObject.getArea(doorSelect.value) + windowObject.getArea(windowSelect.value)));
    console.log("Original surface area of walls: " + wallObject.getAreaClean());
    console.log("Final surface area of walls: " + wallObject.getArea(windowObject.getArea(windowSelect.value)));
};


/**
 * This function contains the logic for calculating the price of materials and generating the output String.
 * The function iterates through all the material checkboxes in the application. If a material checkbox has been
 * ticked in the application (E.G. Paint under Walls, or Carpet under Floor) it calls their getCost method, which
 * takes in the checkbox.value (price of the material), checkbox.name(name of the material), a string for formatting
 * the output and, in the case of wallObject, the usedSpace value. usedSpace represents how much space has been
 * taken up by windows and doors.
 *
 */
function calculateMaterials () {
    var usedSpace = parseInt((doorObject.getArea(doorSelect.value) + windowObject.getArea(windowSelect.value)));
        output += "Original surface area of walls: " + wallObject.getAreaClean() + "m2</br>";
        output += "Surface area of walls: " + wallObject.getArea(usedSpace) + "m2</br>" + "Surface area of floor: " + floorObject.getArea() + "m2</br>";
        consoleLogging();
        for (var x = 1; x < 12; x++) {
            checkBox = $("#checkbox" + x)[0];
            if (document.getElementById("checkbox" + x).checked && (x < 4)) {
                output += wallObject.getCost(checkBox.value, checkBox.name, "Wall", usedSpace);
                console.log(checkBox.name + " has been ticked. It's value per unit is " + checkBox.value);
            } else if (document.getElementById("checkbox" + x).checked && (x < 8)) {
                output += floorObject.getCost(checkBox.value, checkBox.name, "Floor");
                console.log(checkBox.name + " has been ticked. It's value per unit is " + checkBox.value);
            } else if (document.getElementById("checkbox" + x).checked && (x < 10) && (windowsHidden == false)) {
                output += windowObject.getCost(checkBox.value, checkBox.name, "Window", windowSelect.value);
                console.log(checkBox.name + " has been ticked. It's value per unit is " + checkBox.value);
            } else if (document.getElementById("checkbox" + x).checked && (x < 12) && (doorsHidden == false)) {
                output += doorObject.getCost(checkBox.value, checkBox.name, "Door", doorSelect.value);
                console.log(checkBox.name + " has been ticked. It's value per unit is " + checkBox.value);
            }
        }
};

/**
 * This method changes the price for any of the material elements on the screen.
 * @param materialNumber {number} Material to be changed, taken from a select box.
 * @param value {number} The new price of the material.
 * @example
 *     materialSelect = $("#materialSelect")[0];
 *     newMaterialValue = $("#newMaterialValue")[0];
 *     changePrice(parseInt(materialSelect.value), newMaterialValue.value)
 */
var changePrice = function (materialNumber, value) {
    var label = document.getElementById("label" + materialNumber);
    var checkbox = document.getElementById("checkbox" + materialNumber);
    label.innerHTML = value;
    checkbox.value = value;
};


/**
 * Sets up the objects used in the program by taking values that the user has entered.
 */
var initializeObjects = function () {
    wallObject = new wall(length.value, width.value, height.value);
    windowObject = new windows(windowLength.value, windowWidth.value, height.value);
    doorObject = new door(doorLength.value, doorWidth.value, height.value);
    floorObject = new floor(length.value, width.value, height.value);
};

