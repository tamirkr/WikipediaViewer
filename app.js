/**
 * Created by Tamir on 29/05/2016.
 */
var app = angular.module("app", []);



app.component('wikipedia', {
    templateUrl: 'wikipediaTemplate.html',
    controller: function ($http, $log) {
        var ctrl = this;
        ctrl.article = "";
        ctrl.results = [];
        ctrl.randomArticle = function () {
            if(ctrl.article == undefined || ctrl.article.trim().length == 0) {
                return;
            }
            var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
            var cb = '&callback=JSON_CALLBACK';
            var link = 'https://en.wikipedia.org/?curid=';
            $http.jsonp(api + ctrl.article + cb)
                .success(function (data) {
                    var results = data.query.pages;
                    angular.forEach(results, function (x,y) {
                        ctrl.results.push({title: x.title, description: x.extract, page: link + x.pageid});
                    })
                }).error(function (msg, code) {
                    $log.error(msg, code);
            })
            ctrl.article = "";
        }

        ctrl.remove = function () {
            ctrl.results = [];
        }
    }
})