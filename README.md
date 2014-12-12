# Simple contact form for Meteor applications

Add a simple mailable contact form to your Web application.

## Installation

`meteor add bredikhin:contact-form`

## Usage

Configure on the server:

```javascript
Meteor.settings.contactForm = {
  emailTo: 'someone@somewhere.com'
};
...
```

Display on the client:

```html
{{>contactForm}}
...
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 [Ruslan Bredikhin](http://ruslanbredikhin.com/)
