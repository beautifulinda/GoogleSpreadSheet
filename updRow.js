var GoogleSpreadsheet = require("google-spreadsheet");
var async = require("async");
var _ = require("lodash");

// spreadsheet key is the long id in the sheets URL
var doc;
var sheet;
var rowLength;

module.exports = updRow;

function updRow(req) {
    var reqData = req.data,
        creds = req.cred,
        docKey = req.key;

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
        function workingWithRows(step) {
            sheet.getRows({
                offset: 1,
                limit: sheet.rowCount - 1
            }, function(err, rows) {
                _.map(rows, function(el, idx) {
                    if (el.mid === reqData.mid) {
                        el.first_name = reqData.first_name;
                        el.last_name = reqData.last_name;
                        el.phone = reqData.phone;
                        el.email = reqData.email;
                        el.save(function() {
                            console.log('saved');
                        });
                    }
                });
                step();
            });
        }
    ]);
}
