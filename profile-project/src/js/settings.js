const id = new URLSearchParams(window.location.search).get('id');
const settingsForm = document.querySelector("#settings");

import controller from "./request.js";
import { endpoints } from "./api.js";
import User from "./user.js";

const settingsInputs = {
    fullName: document.querySelector("#fullName"),
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirmPassword"),
    bio: document.querySelector("#bio"),
    createdAt: document.querySelector("#createdAt")
};
const settingsButton = document.querySelector("#settings-btn");

settingsForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const apiResponse = await controller.getAll(endpoints.users);
    const dublicateUser = apiResponse.data.find(
        (x) =>
            x.fullName == settingsInputs.fullName.value);
    const nondublicatePassword =
        settingsInputs.confirmPassword.value !== settingsInputs.password.value;

    if (nondublicatePassword) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
        return;
    } else if (dublicateUser) {
        const updateUser = new User(
            settingsInputs.fullName.value.trim(),
            settingsInputs.username.value.trim(),
            settingsInputs.email.value.trim(),
            settingsInputs.password.value.trim(),
            settingsInputs.confirmPassword.value.trim(),
            settingsInputs.bio.value,
            settingsInputs.createdAt.value.trim()
        );
        settingsButton.addEventListener("click", async function (e) {
            const updateOneResponse = await controller.updateOne(endpoints.users, updateUser, id);
            if (updateOneResponse.data) {
                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                });
                setTimeout(() => {
                    window.location.replace("http://localhost:5173/user%20detail.html")
                }, 1500);
            }
        })
    }
})