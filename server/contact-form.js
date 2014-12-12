Meteor.methods({
  sendEmail: function(data) {
    check(data, Schema.contactForm);

    var text = "Name: " + data.name + "\n\n"
    + "Email: " + data.email + "\n\n\n\n"
    + "Subject: " + data.subject + "\n\n"
    + data.message;

    this.unblock();

    Email.send({
      to: Meteor.settings.contactForm.emailTo,
      from: data.email,
      subject: "Website Contact Form - Message From " + data.name,
      text: text
    });
  }
});
