var path = require("path");

var friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var userData = req.body;
        

        for (var i = 0; i < userData.scores.length; i++) {
            userData.scores[i] = parseInt(userData.scores[i]);
        }

        
        var totalDifference = 10000;
        
        var minimumDifference = 50;

        var userMatch = {
            name: "",
            photo: "",
        };


        for (var i = 0; i < friends.length; i++) {
            
            var totalDifference = 0;
            
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(userData.scores[j] - friends[i].scores[j]);
                totalDifference += difference;
            }

            if (totalDifference < minimumDifference) {
                userMatch.name = friends[i].name;
                userMatch.photo = friends[i].photo;

            }
        }

        friends.push(userData);

        res.json(userMatch);



    });
};

