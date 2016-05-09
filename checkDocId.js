var docId = "16muDjiwktwBMU5sTmhxPlwX5sly8VK-wvd1OVBFPPYk";

module.exports = checkDocId;

function checkDocId(dId) {
    var isValidDoc = false;
    if (dId && docId === dId) {
        isValidDoc = true;
    }
    return isValidDoc;
}
