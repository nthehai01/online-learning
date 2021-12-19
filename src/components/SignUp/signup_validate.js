export default function Validate_signup(State) {
  //Thang them vao

  //Done
  let error_message = {};
  const regexp = /^\S*$/;
  const fullname = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/; // 3 words
  const phone_ = /[0-9]\d{9}/;
  const picture_ = new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
  );
  if (!State.Fullname.trim()) {
    error_message.Fullname = "Full name is required";
  } //Thangsua
  else {
    console.log("Fullname", State.Fullname);
    let firstLetters = State.Fullname.split(/\s/).reduce(
      (response, word) => (response += word.slice(0, 1)),
      ""
    );
    for (const letter of firstLetters) {
      if (letter !== letter.toUpperCase()) {
        error_message.Fullname =
          "Each word needs to start with a capital letter!";
      }
    }
  }
  if (!State.phone.trim()) {
    error_message.phone = "Phone is required";
  } else if (State.phone.length < 10) {
    error_message.phone = "Phone is invalid";
  } else if (!phone_.test(State.phone)) {
    error_message.phone = "Phone is invalid";
  }

  if (!State.Username.trim()) {
    error_message.Username = "Username is required";
  } else if (!regexp.test(State.Username)) {
    error_message.Username = "Username is invalid";
  }
  //^[A-Za-z]\\w{5,29}$
  if (!State.email) {
    error_message.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(State.email)) {
    error_message.email = "Email address is invalid";
  }
  if (!State.password) {
    error_message.password = "Password is required";
  } else if (State.password.length < 6) {
    error_message.password = "Password needs at least 6 characters";
  }

  if (!State.confpassword) {
    error_message.confpassword = "Password is required";
  } else if (State.confpassword !== State.password) {
    error_message.confpassword = "Passwords do not match";
  }

  if (!State.picture) {
    error_message.picture = "Picture is required";
  } else if (!picture_.test(State.picture)) {
    error_message.picture = "Picture is invalid";
  }

  return error_message;
}
