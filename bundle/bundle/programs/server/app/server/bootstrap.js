(function(){Meteor.methods( {
    me: function() {
        var k = process.env.ME

        if (k) {
            return k;
        }
       else { return 'dont know';}


    }
})

Meteor.startup(function () {

    if (Count.find({}).count() === 0) {
            Count.insert({
                cid: "c",
                count: 1
            })
    }
})


})();
