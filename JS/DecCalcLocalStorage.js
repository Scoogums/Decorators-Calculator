/**
 * @fileOverview Contains code for storing the users input values into local storage. Consider renaming the file to something
 * more useful or rolling it up with DecCalcTemplates.
 * @author B00276551
 * @version 1
 */

/** @module Local Storage */

var storedElements = [];

/**
 * This file deals with storing the users input values into local storage. It populates an array called storedElements
 * by taking values from the various inputs boxes in the application. When the user wishes to retrieve this information,
 * the array is iterated through, placing values into the application.
 */

/**
 * This function populates the HTML elements of the application with the information stored in local storage.
 */
function populateElements () {
        storedElements = JSON.parse(localStorage["storedElements"]);
        clearElements();
        var f = 1;
        length.value = storedElements[0];
        width.value = storedElements[1];
        height.value = storedElements[2];
        windowChecked.checked = storedElements[3];
        if (windowChecked.checked === true) {
            hideAndShow(textToHide1, inputs2, checkboxGroup3, hideWindows, "window");
            windowsHidden = false;
        }
        ;
        windowSelect.value = storedElements[4];
        windowLength.value = storedElements[5];
        windowWidth.value = storedElements[6];
        doorChecked.checked = storedElements[7];
        if (doorChecked.checked === true) {
            hideAndShow(textToHide2, inputs3, checkboxGroup4, hideDoors, "door");
            doorsHidden = false;
        }
        ;
        doorSelect.value = storedElements[8];
        doorLength.value = storedElements[9];
        doorWidth.value = storedElements[10];
        for (var x = 11; x < 22; x++) {
            $("#checkbox" + f)[0].checked = storedElements[x];
            f++;
        };
};

/**
 * This function updates the array with the users current values. The array is then passed
 * into local storage.
 */
var storeValues = function() {
    var f = 1;
    storedElements[0] = length.value;
    storedElements[1] = width.value;
    storedElements[2] = height.value;
    storedElements[3] = windowChecked.checked;
    storedElements[4] = windowSelect.value;
    storedElements[5] = windowLength.value;
    storedElements[6] = windowWidth.value;
    storedElements[7] = doorChecked.checked;
    storedElements[8] = doorSelect.value;
    storedElements[9] = doorLength.value;
    storedElements[10] = doorWidth.value;
    for (var x = 11;x<22;x++) {
        storedElements[x] = $("#checkbox" + f)[0].checked;
        f++;
    }
    localStorage["storedElements"] = JSON.stringify(storedElements);
};