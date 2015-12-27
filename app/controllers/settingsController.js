// Code goes here
var jetpack = require("fs-jetpack");
var IsThere = require("is-there");
var Datastore = require('nedb');
(function() {
    'use strict';

    angular.module('myApp', ['ngMessages']).controller('settingsController', [function() {
        //this.firstName = "Test";

        this.submit = function() {
            checkSettings(this.name, this.email);
            console.log(this.name);
        }
    }]);
})();

function checkSettings(username, email){
  //var app = remote.app;
  //var userDataDir = app.getPath('userData');
  //filename = userDataDir + '/settings.json'
  //IsThere(filename, function (exists) {
    //exists ? readJSONSettings() : createJSONSettings();
  //});
//}
function readJSONSettings(){

}
function createJSONSettings(){
  var obj = {
  'user_settings': [
    {'username': ''},
    {'email': ''}
  ],
  'connection_settings': [
    {'service': ''},
    {'aws': {'access_id':'', 'secret_key':'', 'region':''}},
    {'ftp': {'username':'', 'password':'', 'host':''}}
  ]
};
console.log(JSON.stringify(obj));
}
