var GoogleSpreadsheet = require("google-spreadsheet");
var async = require("async");
var _ = require("lodash");
var uuid = require('uuid');

// spreadsheet key is the long id in the sheets URL
var doc;
var sheet;
var rowLength;

module.exports = addRow;

function addRow(req) {

    var reqData = req.data,
        creds = req.cred,
        docKey = req.key;
    reqData.mid = uuid.v1();

    async.series([
        function(step) {
            doc = new GoogleSpreadsheet(docKey);
            step();
        },
        function setAuth(step) {
            doc.useServiceAccountAuth(creds, step);
        },
        function getInfoAndWorksheets(step) {
            doc.getInfo(function(err, info) {
                sheet = info.worksheets[0];
                step();
            });
        },
        function appendRow(step) {
            var row = reqData;
            sheet.addRow(row, function(err) {
                // console.log(err);
                console.log("addRow saved");
                step();
            });
        }

    ]);
}
