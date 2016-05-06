var GoogleSpreadsheet = require("google-spreadsheet");
var async = require("async");
var _ = require("lodash");
var uuid = require('uuid');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('16muDjiwktwBMU5sTmhxPlwX5sly8VK-wvd1OVBFPPYk');
var sheet;
var rowLength;

module.exports = addRow;

function addRow(req) {
    // console.log(req);
    // console.log(req.firstname);
    // console.log(req.lastname);
    // console.log(req.email);
    // console.log(req.phone);
    req.mid = uuid.v1();

    async.series([
        function setAuth(step) {
            // console.log('setAuth');
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
            // console.log('getInfo');
            doc.getInfo(function(err, info) {
                // console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
                sheet = info.worksheets[0];
                // console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
                // console.log(sheet);
                step();
            });
        },
        // function setHeader(step) {
        //     sheet.setHeaderRow(["col1", "col2", "col3"],function(){
        //      console.log("asdf");
        //     });
        //     step();
        // },
        // function workingWithRows(step) {
        //     // google provides some query options
        //     sheet.getRows({
        //         offset: 3,
        //         limit: 1
        //     }, function(err, rows) {
        //      console.log(rows[0]);
        //         // console.log('Read ' + rows.length + ' rows');
        //         // rowLength = rows.length;
        //         console.log(rows[0].id);
        //         rows[0].del(function(){
        //          console.log('deleted');
        //         });
        //         step();
        //     });
        // },
        function appendRow(step) {
            var row = req;
            sheet.addRow(row, function(err) {
                console.log(err);
                step();
            });
        },
        // function workingWithCells(step) {
        //     var editRows = [2, 3];
        //     var editCols = [1, 2, 3];
        //     sheet.getCells({
        //         'min-row': 2,
        //         'max-row': 3,
        //         'min-col': 1,
        //         'max-col': 3,
        //         'return-empty': true
        //     }, function(err, cells) {
        //      // # single
        //         // console.log(cells[0].id);
        //         // var cell = cells[0];
        //         // if (cell) {
        //         //     console.log('Cell R' + cell.row + 'C' + cell.col + ' = ' + cell.value);
        //         //     cell.setValue('test upd1', function() { console.log('updated') });
        //         // }

        //         // # multiple
        //         var cell;
        //         _.map(editRows, function(i, e1) {
        //             _.map(editCols, function(j, e2) {
        //                 cell = _.find(cells, { 'row': i, 'col': j });
        //                 if (cell) {
        //                     console.log('Cell R' + cell.row + 'C' + cell.col + ' = ' + cell.value);
        //                     cell.setValue('b1 upd', function() { console.log('updated') });
        //                 }
        //             });
        //         });
        //         sheet.bulkUpdateCells(cells, function(){console.log('batch updated')});

        //         step();
        //     });
        // }
    ]);
}
