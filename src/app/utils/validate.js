const validate = require('validate.js');

const validators = validate.validators;

// Presence validator default options
validators.presence.options = { allowEmpty: false, message: 'is required' };

// Email validator default options
validators.email.options = { message: '^Invalid email address' };

// Required validator - alias for presence validator
validators.required = validate.validators.presence;

// Password validator
validators.password = function(value, options) {
    options = validate.extend({}, this.options, options);
    if (!value) {
        return options.emptyMessage;
    } else if (!options.pattern.test(value)) {
        return options.invalidMessage;
    }
}
validators.password.options = { 
    pattern: /[^\s]{6,30}/,
    invalidMessage: 'should be 6-30 characters long and do not contain spaces',
    emptyMessage: 'is required'
}

export default function() {
    const errors = validate(...arguments);

    // Return first error message for every property
    if (errors) {
        for (let field in errors) {
            errors[field] = errors[field][0];
        }
    }
    
    return errors;
}