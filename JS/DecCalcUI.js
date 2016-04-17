/**
 * @fileOverview UI Functions, such as hiding elements or clearing user input from the application.
 * @author B00276551
 * @version 1
 */

/** @module User Interface */

/**
 * This function hides certain elements of the application while showing others, depending on the
 * parameters passed into it.
 * @param elementOne {object} Html Element to be hidden.
 * @param elementTwo {object} Html Element to displayed or hidden by animating it's opacity.
 * @param elementThree {object} Html Element to displayed or hidden by animating it's opacity.
 * @param elementFour {object} Html Element to have it's property changed to false.
 * @param hideString {string} String used to determine whether a door or window is to be hidden.
 */
function hideAndShow(elementOne, elementTwo, elementThree, elementFour, hideString) {
    $(elementOne).hide();
    $(elementTwo).fadeToggle();
    $(elementThree).fadeToggle();
    $(elementFour).prop('checked', false);
    if (hideString == "window") {
        windowsHidden = true;
        windowLength.value = "";
        windowWidth.value = "";
        windowSelect.value = 1;
        $(elementOne).show()
    }
    if (hideString == "door") {
        doorsHidden = true;
        doorLength.value = "";
        doorWidth.value = "";
        doorSelect.value = 1;
        $(elementOne).show()
    }
};

/**
 * Clears all of the elements on the page.
 */
var clearElements = function () {
    length.value = "";
    width.value = "";
    height.value = "";
    for (var x = 1;x<12;x++) {
        $("#checkbox" + x)[0].checked = false;
    };
    if (windowChecked.checked === true) {
        windowsHidden = false;
        windowChecked.checked = false;
        hideAndShow(textToHide1, inputs2, checkboxGroup3, hideWindows, "window");
    };
    if (doorChecked.checked === true) {
        doorsHidden = false;
        doorChecked.checked = false
        hideAndShow(textToHide2, inputs3, checkboxGroup4, hideDoors, "door");
    };
};

/**
 * Hides certain user input elements, called when the program first runs.
 */
var hideElements = function () {
    $('#hideTemplates').hide();
    $("#inputs2").hide();
    $("#inputs3").hide();
    $("#checkboxGroup3").hide();
    $("#checkboxGroup4").hide();

};

/**
 * Opens up a new tab in the users browser. Code taken from
 * http://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window-using-javascript
 * @param url {string} The URL to open.
 */
function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

/**
 * This functions sets up the information for displaying the output on another page.
 * It takes in the output data generated from the main page and stores it in session
 * storage.
 * @param data {string} Output data.
 */
function displayOutputPage(data) {
    sessionStorage.pageData = data;
    var url = "DecCalcOutput.html";
    openInNewTab(url);
};