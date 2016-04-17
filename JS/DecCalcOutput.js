/**
 * @fileOverview Contains code primarily centered on moving data outside of the application. Contains code
 * for the email and copy to clipboard functions.
 * @author B00276551
 * @version 1
 */

/** @module Output Functions */

var email;

/**
 * This script is attached to the DecCalcOutput.html page. It controls what happens when the user presses
 * the buttons.
 */
$().ready(function () {
    if (document.getElementById("Output")) {
        $("#Output").html(sessionStorage.pageData);
    };
    email = $("#emailAddress")[0];
    $( "#copy" ).click(function()
    {
        copyTextToClipboard('#Output')
        alert("Text Copied.");
    });
    $( "#email" ).click(function()
    {
        sendEmail();
    });
    $( "#close" ).click(function()
    {
        self.close ();
    });
});

/**
 * Tested on Chrome Version 47.0.2526.73m and Firefox 42.0 using Windows Mail.
 * Formats text, replacing the Html </br> tags with line breaks. If the user
 * chooses to enter an email into the input field it will be inserted in the
 * To: field of their mail client.
 * Code from http://stackoverflow.com/questions/7977165/how-to-write-in-mailto-body-link-to-current-page
 * modified to change </br> tags to line breaks.
 */
function sendEmail() {
    var output = sessionStorage.pageData;
    output = output.replace(/<\/br>/gi,'\n');
    var body = output;
    var subject= "Decorators Report";
    body += window.location.href;
    body += ">";
    var uri = "mailto:" + email.value + "?subject=";
    uri += encodeURIComponent(subject);
    uri += "&body=";
    uri += encodeURIComponent(body);
    window.open(uri);
};

/**
 * Copies text to the clipboard. It works decently although it doesn't format the text, so it is
 * a large clump with no line breaks.
 * Code adapted from http://stackoverflow.com/questions/22581345/click-button-copy-to-clipboard-using-jquery
 * @param element {string} The text to be copied to the clipboard..
 */
function copyTextToClipboard(element) {
    var $copy = $("<input>");
    $("body").append($copy);
    $copy.val($(element).text()).select();
    document.execCommand("copy");
    $copy.remove();
}

