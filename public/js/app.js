const upBtn = document.getElementById("sign-up");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const feedback = document.getElementById("feedback");

closeFeedback();

upBtn.addEventListener("click", signUp);

function signUp(e) {
  // stop the form from saving
  e.preventDefault();
  // validating values
  if (!name.value || !email.value || !password.value) {
    feedback.style.display = "block";
  }
  // get all params for API
  const user = {
    name: name.value,
    email: email.value,
    password: password.value
  };
}

function closeFeedback() {
  feedback.style.display = "none";
}