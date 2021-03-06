// Subsriptions
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Meteor.subscribe('emojis');

Meteor.subscribe('chats', function () {
  return Chats.find().fetch();
});

Meteor.subscribe('userData', function () {
  return Meteor.users.find().fetch();
});

Template.available_user_list.helpers({
  users: function () {
    return Meteor.users.find();
  }
});

Template.available_user.helpers({
  getAvatar: function (userId) {
    var user = Meteor.users.findOne({
      _id: userId
    });
    return user.profile.avatar;
  },

  getUsername: function (userId) {
    var user = Meteor.users.findOne({
      _id: userId
    });
    console.log(user.profile.avatar);
    return user.profile.username;
  },

  isMyUser: function (userId) {
    if (userId == Meteor.userId()) {
      return true;
    } else {
      return false;
    }
  }

});

Template.chat_page.helpers({

  messages: function () {
    var chat = Chats.findOne({
      _id: Session.get("chatId")
    });
    return chat.messages;
  },

  other_user_name: function () {
    var otherUser;
    var chat = Chats.findOne({
      _id: Session.get("chatId")
    });

    if (chat.user1Id != Meteor.userId()) {
      otherUser = chat.user1Id;
    } else {
      otherUser = chat.user2Id;
    }

    return Meteor.users.findOne({
      _id: otherUser
    }).profile.username;
  },

  other_user_avatar: function () {
    var otherUser;
    var chat = Chats.findOne({
      _id: Session.get("chatId")
    });

    if (chat.user1Id != Meteor.userId()) {
      otherUser = chat.user1Id;
    } else {
      otherUser = chat.user2Id;
    }

    return Meteor.users.findOne({_id: otherUser}).profile.avatar;
  }

});

Template.chat_message.helpers({

  getUserById: function (sentBy) {
    return Meteor.users.findOne({
      _id: sentBy
    }).profile.username;
  },
  avatar: function (sentBy) {
    return Meteor.users.findOne({
      _id: sentBy
    }).profile.avatar;
  },

  messageBackgroundClass: function (sentBy) {
    if (sentBy == Meteor.userId()) {
      return "bubble you";
    } else {
      return "bubble me";
    }
  }

});

// Events

Template.chat_page.events({

  'submit .js-send-chat': function (event) { // this event fires when the user sends a message on the chat page
    event.preventDefault(); // stop the form from triggering a page reload
    Meteor.call('sendMessage', Session.get("chatId"), event.target.chat.value);
    event.target.chat.value = ""; // reset the form
  }

});
