var argv = require('optimist').argv;
var _ = require('underscore');
var Backbone = require('Backbone');
var dirty = require('dirty');
var wwwDir = argv.www || __dirname;
var mydb = dirty(argv.db || wwwDir + '/easyquick.db');

var MyModel = Backbone.Model.extend({
    defaults: {
        uid: null,
        title: 'null'
    },
    save: function () {
        mydb.set(this.get('uid'), this);
    }
});

var MyModels = Backbone.Collection.extend({
   model: MyModel
});

var myList = new MyModels();

mydb.on('load', function() {
    mydb.forEach(function(key, val) {
        myList.add(val);
    });
});

exports.mymodel = MyModel;
exports.mymodels = MyModels;

exports.myList = myList;