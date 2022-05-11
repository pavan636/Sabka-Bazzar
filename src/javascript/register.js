import {apiCall} from "./utility";
import config from "./config";
import login from '../html/login.html'
function registervalidation() {
  const form = document.querySelector(".form");
  const firstEl = document.querySelector("#firstName");
  const lastEl = document.querySelector("#lastName");
  const emailEl = document.querySelector("#email");
  const passwordEl = document.querySelector("#password");
  const confirmpassEl = document.querySelector("#confirmPassword");
  const mainEl = document.querySelector("#main");

  const checkfname = () => {
    let valid = false;

    const firstname = firstEl.value.trim();

    if (!required(firstname)) {
      document.getElementById("for_first").innerHTML =
        "Firstname cannot be blank.";
    } else {
      document.getElementById("for_first").innerHTML = "";
      valid = true;
    }
    return valid;
  };
  const checklname = () => {
    let valid = false;
    const l_name = lastEl.value.trim();
    debugger;
    if (!required(l_name)) {
      document.getElementById("for_last").innerHTML =
        "Last name cannot be blank";
    } else {
      valid = true;
    }
    return valid;
  };

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

  const checkconfirmpass = () => {
    let valid = false;

    const password = passwordEl.value.trim();
    const confirmpass = confirmpassEl.value.trim();
    console.log(password, confirmpass);
    if (!required(confirmpass)) {
      document.getElementById("for_confirmpass").innerHTML =
        "Re-enter the Password";
    } else if (confirmpass !== password) {
      document.getElementById("for_confirmpass").innerHTML =
        "Password doesn't match";
    } else if (confirmpass === password) {
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
      fnameValid = checkfname(),
      lnameValid = checklname(),
      confirmpassvalid = checkconfirmpass(),
      PasswordValid = checkPassword();

    let isFormValid =
      EmailValid &&
      PasswordValid &&
      fnameValid &&
      lnameValid &&
      confirmpassvalid;

    if (isFormValid) {
      console.log("form valid");
      let user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        Email: document.getElementById("email").value,
        Password: document.getElementById("password").value,
      };
      const response = await apiCall(
        config.register,
        "POST",
        JSON.stringify(user)
      );
      if(response.status!==201){
        document.getElementById("for_email").innerHTML = response.message;
      }
      else{
        alert(response.message);
        window.location.href="/";
      }
    }
  });
}
export default registervalidation;
