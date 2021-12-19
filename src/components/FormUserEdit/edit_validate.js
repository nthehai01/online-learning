
export default function Validate_edit(State) {
    let error_message = {};
    const regexp = /^\S*$/
    const fullname = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/; // 3 words
    const phone_ = /[0-9]\d{9}/
    const picture_ = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
   
    if (!fullname.test(State.fullname) && State.fullname) {
        error_message.fullname = 'Full name is invalid'
    }

    if (!phone_.test(State.phone) && State.phone !== "") {
        error_message.phone = 'Phone is invalid'
    }


    //^[A-Za-z]\\w{5,29}$
    if (!/\S+@\S+\.\S+/.test(State.email) && State.email !== "") {
        error_message.email = 'Email address is invalid';
    }

 
    if (State.currentPassword.length > 0 && State.currentPassword.length < 6) {
        error_message.currentPassword = 'Password needs at least 6 characters';
    }

    if (State.currentPassword.length > 0 && State.newPassword.length === 0) { //nếu có pass=> có confimpass

        error_message.newPassword = 'ConfirmPassword is required';
    }

    if (State.currentPassword.length > 0 && State.newPassword.length > 0 && State.newPassword.length < 6) { //nếu có pass=> có confimpass

        error_message.newPassword = 'ConfirmPassword is required';
    }

    if (!picture_.test(State.picture) && State.picture.length > 0) {
        error_message.picture = 'Picture is invalid';
    }



    return error_message;
}