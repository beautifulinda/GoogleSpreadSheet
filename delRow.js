var GoogleSpreadsheet = require("google-spreadsheet");
var async = require("async");
var _ = require("lodash");

// spreadsheet key is the long id in the sheets URL
// var doc = new GoogleSpreadsheet('16muDjiwktwBMU5sTmhxPlwX5sly8VK-wvd1OVBFPPYk');
var doc;
var sheet;
var rowLength;

module.exports = delRow;

function delRow(req) {
    var reqData = req.data,
        creds = req.cred,
        docKey = req.key;

    async.series([
        function(step){
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
            // google provides some query options
            sheet.getRows({
                offset: 1,
                limit: sheet.rowCount - 1
            }, function(err, rows) {
                _.map(rows, function(el, idx) {
                    if (reqData.mid && el.mid === reqData.mid) {
                        el.del(function() {
                            console.log('delRow deleted');
                        });
                    }
                });
                step();
            });
        }
    ]);
}
