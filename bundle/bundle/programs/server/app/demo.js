(function(){




if (Meteor.isClient) {
  
  Meteor.subscribe('count');
  
  Template.hello.helpers({
    counter: function () {
     var c = Count.findOne();
     Session.set('counter',c);
     return c.count;

    },
     server: function() {
      return Session.get('me');
     }
  });
  
  Template.hello.rendered = function() {
    Meteor.call('me',function(err,res) {
      Session.set('me',res);
    })
    
  }
  

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Count.update(
                   {_id: Session.get('counter')._id},
                   {$set: {count: Session.get('counter').count + 1}}
      ) 
 
    }
  });
}




})();
