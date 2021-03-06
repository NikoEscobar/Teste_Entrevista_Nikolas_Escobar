var request = require("request");
var expect = require("chai").expect;
var fetch = require("node-fetch");

var baseUrl = "https://jsonplaceholder.typicode.com/";
var apiIds = [];
var timeInMs = 10000;

async function GetApiData () {

var Ids = [];

fetch("https://jsonplaceholder.typicode.com/posts/")
    .then(function(result) {
        result.json().then(function(data) {
            for (var i = 0; i <100; i++) {
                Ids[i] = data[i];
            }

            GetValueJson(Ids);
        });
    });
}

function GetValueJson(value) {
    apiIds = value;
}

function StartTest() {

    describe('1 - Teste funcional', function () {

        it('Codigo de Status', function (done) {
            request.get({ url: baseUrl },
                function (error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    console.log("  1.1 - Codigo de Status: " + response.statusCode);
                    done();
                });
        });

    });
    describe('2 - Checagem de dados', function () {
        
        before(function(done) {
            this.timeout(timeInMs);
            GetApiData();
            if (apiIds != null) {
            done();
            }
        });

        //var numberOfTest = apiIds.tittle.length - 1;
        for (var i = 0; i < 99; i++) {
            it('2.1.'+i+' Dados Pagina '+i, function(done) {
                this.timeout(timeInMs);
                var n=i+1;
                request.get({ url: 'https://jsonplaceholder.typicode.com/posts/'+ n },
                    function(error, response, body) {
                            var bodyObj = JSON.parse(body);
                            expect(bodyObj.title).to.equal(apiIds[i].title);
                            //console.log(apiIds[1].title);
                        done();
                    });
            });
        }
    });

    describe('3 - Criação de registro', function() {
        it('Asserção de Codigo de Status', function(done) {
                request.post({ url: 'https://jsonplaceholder.typicode.com/posts', 
                form: {
                    'userId': '25',
                    'title': 'valor inserido',
                }
            },
            function(error, response, body) {
                var bodyObj = JSON.parse(body);
                expect(bodyObj.userId).to.equal("25");
                expect(bodyObj.title).to.equal("valor inserido");
                expect(response.statusCode).to.equal(201);
                console.log(response.statusCode);
                //console.log(bodyObj.userId);
                done();
            });
        });
    });
}

StartTest();