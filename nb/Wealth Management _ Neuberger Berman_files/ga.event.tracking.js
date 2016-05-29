$(document).ready(function () {

    $("a").click(function () {

        var href = $(this).attr("href");
        var text = $(this).text();
        // Identify current page location once location object has been scrubbed
        var currentPage = new String(window.location);
        generateTrack(currentPage, href, text);
    });

});




function generateTrack(currentPage, clickHref, downloadFileName) {

    var otherData = otherData;
    dataString = new String("");
    contentFlag = new String("");

    // Parse URL data sent from the click event
    dataString += clickHref;

    var fileExtension = getFileExtension(clickHref);

    // downloadable types 
    fileTypes = new Array("pdf", "ppt", "doc", "xls", "zip", "docx", "ppsx", "xlsx", "pptx");

    //Case: URL contains the download file or going through another page to do the download
    var directDownload = false;
    for (zx = 0; zx < fileTypes.length; zx++) {
        if (fileExtension.indexOf(fileTypes[zx]) != -1) {
            contentFlag += "[Download: " + fileTypes[zx] + "]";
            directDownload = true;
            break;
        }
    }

    var category = 'Download';
    var label = ''
    var title = downloadFileName
    var fileName = ''

    //direct download is when the file was requested is the actual document
    if (directDownload) {
        action = 'DirectClick'
        fileName = getFileNameFromUrl(dataString);
        label = '[Download: ' + fileName + '][Title: ' + title + '][Url:' + clickHref + ']';
        ga('send', 'event', category, action, label, { 'page': currentPage });
    }
    else {
        //download requested from a download file
        action = 'IndirectClick';
        fileEtc = dataString.substring(dataString.lastIndexOf("."));

        //confirm that this is a valid download there is downloadasset.aspx page
        if (clickHref.indexOf('downloadasset.aspx?asset=') != -1) {
            fileName = getFileNameFromQueryString(dataString);
            label = '[Download: ' + fileName + '][Title: ' + title + '][Url:' + clickHref + ']';
            ga('send', 'event', category, action, label, { 'page': currentPage });
        }
    }
}

function getFileExtension(url) {
    return (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).substr(url.lastIndexOf("."))
}
function getFileNameFromUrl(url) {
    url = url.split("?");
    url = url[0];
    return (url.substring(url.lastIndexOf("/") + 1));
}
function getFileNameFromQueryString(url) {
    url = url.split("?");
    qryString = url[1];
    //get from query string
    fileNameArray = qryString.split('%2f');

    return (fileNameArray[fileNameArray.length - 1]);
}
