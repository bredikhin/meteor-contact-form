Meteor.settings.contactForm = {
  emailTo: 'to@test.com'
};
var emailData = {
  name: 'Test Name',
  email: 'from@test.com',
  subject: 'Test Subject',
  message: 'Test Message'
};
var dataSent = null;

// Email sending stub
Email = {
  send: function(data) {
    dataSent = data;
  }
};

Tinytest.add('Schema', function (test) {
  test.instanceOf(Schema, Object);
});

Tinytest.add('Schema - contactForm', function (test) {
  test.instanceOf(Schema.contactForm, SimpleSchema);
});

Tinytest.add('Schema - contactForm - name', function (test) {
  test.instanceOf(Schema.contactForm._schema.name, Object);
});

Tinytest.add('Schema - contactForm - email', function (test) {
  test.instanceOf(Schema.contactForm._schema.email, Object);
});

Tinytest.add('Schema - contactForm - subject', function (test) {
  test.instanceOf(Schema.contactForm._schema.subject, Object);
});

Tinytest.add('Schema - contactForm - message', function (test) {
  test.instanceOf(Schema.contactForm._schema.message, Object);
});

if (Meteor.isServer) {
  Tinytest.add('Meteor - methods - sendEmail - exists', function (test) {
    test.include(Meteor.server.method_handlers, 'sendEmail');
  });

  Tinytest.add('Meteor - methods - sendEmail - fails on malformed data', function (test) {
    test.throws(function() {
      Meteor.call('sendEmail', {something: 'wrong'});
    });
  });

  Tinytest.add('Meteor - methods - sendEmail - sends email successfully', function (test) {
    dataSent = null;
    Meteor.call('sendEmail', emailData);
    test.equal(dataSent.from, emailData.email);
    test.equal(dataSent.to, Meteor.settings.contactForm.emailTo);
    test.include(dataSent.text, emailData.subject);
    test.include(dataSent.text, emailData.message);
  });
}

if (Meteor.isClient) {
  Tinytest.add('Meteor - templates - contactForm - has a schema helper', function (test) {
    test.equal(typeof Template.contactForm.__helpers.get('contactFormSchema'), 'function');
    test.equal(Template.contactForm.__helpers.get('contactFormSchema')(), Schema.contactForm);
  });
}
