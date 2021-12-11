export default function Validate_login(State) {
    let error_message = {};
    const regexp = /^\S*$/


    if (!State.username.trim()) {
        error_message.username = 'Username is required';
    } else if (!regexp.test(State.username)) {
        error_message.username = 'Username is invalid'
    }

    if (!State.password) {
        error_message.password = 'Password is required';
    } else if (State.password.length < 6) {
        error_message.password = 'Password needs at least 6 characters';
    }





    return error_message;
}