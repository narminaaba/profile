import { endpoints } from "./api.js";
import controller from "./request.js";

const loginRegister = document.querySelector("#login-register");
window.addEventListener("load", async function (e) {
  const userID = JSON.parse(this.localStorage.getItem("userID"));
  const apiUsers = await controller.getAll(endpoints.users);
  const checkValidLogin = apiUsers.data.find((x) => x.id == userID);
  if (checkValidLogin) {
    loginRegister.innerHTML = "";
    loginRegister.innerHTML += `
         <span class=" btn btn-light nav-item">
              <a class="sign" href="./user detail.html">${checkValidLogin.fullName}</a>
            </span>
            <button class="btn btn-dark bg-primary nav-item" style="width: 7rem;">
              <a id="log-out" class="login" href="user.html">Log out</a>
            </button>
        `;
    const logOutBtn = this.document.querySelector("#log-out");
    logOutBtn.addEventListener("click", function () {
      localStorage.removeItem("userID");
      loginRegister.innerHTML = "";
      loginRegister.innerHTML += `
         <span class=" btn btn-light nav-item">
              <a class="sign" href="register.html">Sign up</a>
            </span>
            <button  id="log-out" class="btn btn-dark bg-primary mx-4 nav-item" style="width: 7rem;">
              <a class="login" href="login.html">Login</a>
            </button>
        `;
      setTimeout(() => {
        window.location.replace("http://localhost:5173/index.html")
      }, 1500);
    })
  }
})
