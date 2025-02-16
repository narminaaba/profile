const loginForm = document.querySelector("#login-form");
const loginInputs = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
};
import controller from "./request.js";
import { endpoints } from "./api.js";

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const apiResponse = await controller.getAll(endpoints.users);
    const checkValidUser = apiResponse.data.find((x) => {
        return (
            x.email == loginInputs.email.value &&
            x.password == loginInputs.password.value
        );
    });
    if (checkValidUser) {
        localStorage.setItem("userID", JSON.stringify(checkValidUser.id));
        setTimeout(() => {
            window.location.replace("http://localhost:5173/user.html")
        }, 1000);
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
});