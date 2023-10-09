const NAME_REGEX = new RegExp('^[A-Za-z]+$');
const EMAIL_REGEX = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = new RegExp('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])');

export default { NAME_REGEX, EMAIL_REGEX, PASSWORD_MIN_LENGTH, PASSWORD_REGEX };
