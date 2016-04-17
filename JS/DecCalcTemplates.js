/**
 * @fileOverview This file contains all the code for Template functionality.
 * @author B00276551
 * @version 1
 */

/** @module Templates */

/**
 * This function loads the values of a stored Template object into the application. It checks which
 * Template the user has selected from the list and matches it to the Template in the array
 * of the same position. The method then iterates through the object, replacing the values
 * of the HTML elements with those of the Template.
 * @param arrayPosition {number} The position in the array of the template to be loaded.
 */
function loadTemplate(arrayPosition) {
    var templateList = document.getElementById("templateList");
    var selectedTemplate = templateList.options[templateList.selectedIndex].value;
    for (var x = 1;x<12;x++) {
        var test = "price" + x;
        $("#checkbox" + x)[0].value = templateArray[selectedTemplate][test];
        $("#label" + x)[0].innerHTML = templateArray[selectedTemplate][test];
    }
    console.log("Loading values from template: " + templateArray[selectedTemplate].templateName);
};

/**
 * This functions clears the current list of Templates. Used whenever a new Template is added
 * so that the list doesn't contain duplicates.
 */
function clearTemplateList()
{
    for(var x=$("#templateList")[0].options.length-1;x>=0;x--)
    {
        $("#templateList")[0].remove(x);
    }
};

/**
 * This function populates the list with the current Templates stored in the array, taken out of
 * local storage.
 */
function populateTemplateList() {
    clearTemplateList();
    for (var x = 0;x<templateArray.length;x++) {
        var templateListItem = document.createElement("option");
        templateListItem.text = templateArray[x].templateName;
        templateListItem.value = x;
        $("#templateList")[0].add(templateListItem);
    }
};

/**
 * This function adds a new Template to the array. The values added to the Template object are taken from
 * the HTML elements on the DecCalc.html page that represent the prices of various materials.
 */
function addTemplate() {
    var newTemplate = new template($("#templateName")[0].value, $("#checkbox1")[0].value, $("#checkbox2")[0].value, $("#checkbox3")[0].value,
        $("#checkbox4")[0].value, $("#checkbox5")[0].value, $("#checkbox6")[0].value, $("#checkbox7")[0].value,
        $("#checkbox8")[0].value, $("#checkbox9")[0].value, $("#checkbox10")[0].value, $("#checkbox11")[0].value);
    templateArray.push(newTemplate);
    console.log("Adding new template: " + newTemplate.templateName);
    saveStoredTemplates();
    loadStoredTemplates();
    populateTemplateList();
};

/**
 * This function checks to see whether any of the Default templates have been deleted. If they have been deleted
 * it calls the addExampleTemplates() method and passes on the name.
 * @param name {string} Name of a default template.
 */
function checkForExamples(name) {
    var tempArray = [];
    var templateFound = false;
    tempArray = JSON.parse(localStorage["templateArray"]);
    for (var x = 0;x<tempArray.length;x++) {
        if (tempArray[x].templateName == name) {
            templateFound = true;
        };
    };
    console.log("Template " + name + " search result: " + templateFound);
    if (templateFound == false) {
        addExampleTemplates(name)
    }
};

/**
 * This function adds a Default Template to the array of Templates. It is called by checkForExamples.
 * @param templateToAdd {string} Name of the Default Template to be addeed.
 */
function addExampleTemplates(templateToAdd) {
    var exampleTemplate;
    if (templateToAdd == "Everything is made from Gold") {
        console.log("Everything is made from Gold template missing. Restoring.")
        exampleTemplate = new template("Everything is made from Gold", 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000);
        templateArray.push(exampleTemplate);
    }
    if (templateToAdd == "Flash Sale") {
        console.log("Flash Sale template missing. Restoring.")
        exampleTemplate = new template("Flash Sale", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        templateArray.push(exampleTemplate);
    }
    if (templateToAdd == "Default") {
        console.log("Default Template missing. Restoring.")
        exampleTemplate = new template("Default", 2, 3, 3, 5, 10, 12, 6, 13, 25, 15, 13);
        templateArray.push(exampleTemplate);
    }
    saveStoredTemplates();
    loadStoredTemplates();
    populateTemplateList();
};

/**
 * This function deletes a Template that the user has selected from the list. It takes the value the user has selected
 * on the Template list and uses that to determine which template to delete. Since templates are on the list in the same
 * order as those inside the array, it uses this value and removes the corresponding entry in the array.
 */
function deleteTemplate () {
    var templateList = document.getElementById("templateList");
    var selectedTemplate = templateList.options[templateList.selectedIndex].value;
    alert ("Deleting Template: " + templateArray[selectedTemplate].templateName);
    console.log("Deleted Template: " + templateArray[selectedTemplate].templateName)
    templateArray.splice(selectedTemplate, 1);
    saveStoredTemplates();
    loadStoredTemplates();
    populateTemplateList();
};

/**
 * Saves the current templateArray into local storage.
 */
function saveStoredTemplates() {
    localStorage["templateArray"] = JSON.stringify(templateArray);
};

/**
 * Retrieves the current templateArray from local storage.
 */
function loadStoredTemplates() {
    templateArray = JSON.parse(localStorage["templateArray"]);
};
