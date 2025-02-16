const registerForm = document.querySelector("#register");
import controller from "./request.js";
import { endpoints } from "./api.js";
import User from "./user.js";

const registerInputs = {
    fullName: document.querySelector("#fullName"),
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirmPassword")
};
const registerButton = document.querySelector("#register-btn");

registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const apiResponse = await controller.getAll(endpoints.users);
    const dublicateUser = apiResponse.data.find(
        (x) =>
            x.username == registerInputs.username.value ||
            x.email == registerInputs.email.value
    );
    const nondublicatePassword =
        registerInputs.confirmPassword.value !== registerInputs.password.value;
    if (dublicateUser) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
        return;
    } else if (nondublicatePassword) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
        return;
    } else {
        const newUser = new User(
            registerInputs.fullName.value.trim(),
            registerInputs.username.value.trim(),
            registerInputs.email.value.trim(),
            registerInputs.password.value.trim()
        );

        const postResponse = await controller.post(endpoints.users, newUser);
        if (postResponse.data) {
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
            });
            setTimeout(() => {
                window.location.replace("http://localhost:5173/login.html")
            }, 1500);
        }
    }
})