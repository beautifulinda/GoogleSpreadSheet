var GoogleSpreadsheet = require("google-spreadsheet");
var async = require("async");
var _ = require("lodash");

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('16muDjiwktwBMU5sTmhxPlwX5sly8VK-wvd1OVBFPPYk');
var sheet;
var rowLength;

module.exports = updRow;

function updRow(req) {

    async.series([
        function setAuth(step) {
            // see notes below for authentication instructions!
            var creds = require('./HajimeTest-fb1431adcb9b.json');
            // OR, if you cannot save the file locally (like on heroku)
            var creds_json = {
                client_email: 'hajimetest-1289@appspot.gserviceaccount.com',
                private_key: 'fb1431adcb9b964ae9c1f02bf160f822025982fe'
            }
            doc.useServiceAccountAuth(creds, step);
        },
        function getInfoAndWorksheets(step) {
            doc.getInfo(function(err, info) {
                sheet = info.worksheets[0];
                step();
            });
        },
        function workingWithRows(step) {
            console.log(req);
            // google provides some query options
            sheet.getRows({
                offset: 1,
                limit: sheet.rowCount - 1
            }, function(err, rows) {
                _.map(rows, function(el, idx) {
                    if (el.mid === req.mid) {
                        el.first_name = req.first_name;
                        el.last_name = req.last_name;
                        el.phone = req.phone;
                        el.email = req.email;
                        el.save(function() {
                            console.log('saved');
                        });
                    }
                });

                // console.log('Read ' + rows.length + ' rows');
                // rowLength = rows.length;
                // console.log(rows[0].id);
                // rows[0].del(function(){
                //  console.log('deleted');
                // });
                step();
            });
        }
    ]);
}
