Meteor.publish('emojis', function() {
  return Emojis.find();
});

Meteor.publish('chats', function () {
  return Chats.find({
    $or: [{
      user1Id: this.userId
    }, {
      user2Id: this.userId
    }]
  });
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({}, {
      fields: {
        profile: 1,
        _id: 1
      }
    });
  }
});
Accounts.onCreateUser(function(options, user) {
  console.log("Creating user "+user.username);
  user.profile = {};
  user.profile["avatar"] = Gravatar.imageUrl(user.emails[0].address);
  return user;
});
