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
    if (value && !options.pattern.test(value)) {
        return 'should have 6-30 non-space characters';
    }
}
validators.password.options = { pattern: /[^\s]{6,30}/ };

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