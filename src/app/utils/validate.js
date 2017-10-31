const validate = require('validate.js');

const validators = validate.validators;

validators.presence.options = { allowEmpty: false, message: 'is required' };
validators.required = validate.validators.presence;

validators.email.options = { message: '^Invalid email address' };

export default function() {
    const errors = validate(...arguments);

    if (errors) {
        for (let field in errors) {
            errors[field] = errors[field][0];
        }
    }
    
    return errors;
}