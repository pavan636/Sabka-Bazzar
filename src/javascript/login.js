import {apiCall} from "./utility";
import config from "./config";
function loginvalidation() {
  const emailEl = document.querySelector("#field-1");
  const passwordEl = document.querySelector("#field-2");
  const form = document.querySelector(".form");

  const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!required(email)) {
      document.getElementById("for_email").innerHTML = "Email cannot be blank.";
    } else if (!isEmailvalid(email)) {
      document.getElementById("for_email").innerHTML = "Email is not valid.";
    } else {
      document.getElementById("for_email").innerHTML = "";
      valid = true;
    }
    return valid;
  };

  const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();
    if (!required(password)) {
      document.getElementById("for_password").innerHTML =
        "Password cannot be blank.";
    } else if (!isPasswordvalid(password)) {
      document.getElementById("for_password").innerHTML =
        "Password must has at least 6 characters that include at least 1 lowercase, 1 uppercase, 1 number, and can not have space ";
    } else {
      document.getElementById("for_password").innerHTML = "";
      valid = true;
    }
    return valid;
  };

  const isEmailvalid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const isPasswordvalid = (password) => {
    const re =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/gm;
    return re.test(password);
  };
  const required = (value) => (value === "" ? false : true);
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    let EmailValid = checkEmail(),
      PasswordValid = checkPassword();

    let isFormValid = EmailValid && PasswordValid;

    if (isFormValid) {
      console.log("form valid");

      let user = {
        Email: document.getElementById("field-1").value,
        Password: document.getElementById("field-2").value,
      };
      const response = await apiCall(
        config.login,
        "POST",
        JSON.stringify(user)
      );
      if (response.message === "success") {
         alert(response.message)
        window.location.href = "/";
      } else {
        document.getElementById("for_password").innerHTML = response.message;
      }
    }
  });
}

export default loginvalidation;
