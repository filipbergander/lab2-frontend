"use strict";
// Hämtar in funktionen renderExperience 
import { renderExperience } from "./main.js";

const errorMsgList = document.getElementById("error-message");
const addExpForm = document.getElementById("add-experience-form");

addExpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let errors = [];

    const companyInput = document.getElementById("company");
    const titleInput = document.getElementById("title");
    const locationInput = document.getElementById("location");
    const descriptionInput = document.getElementById("description");

    const company = companyInput.value.trim();
    const title = titleInput.value.trim();
    const location = locationInput.value.trim();
    const description = descriptionInput.value.trim();

    if (company === "") {
        errors.push("Fyll i arbetsgivare!");
    }

    if (title === "") {
        errors.push("Fyll i titel för arbetet!")
    }

    if (location === "") {
        errors.push("Fyll i ort för arbetet!")
    }

    if (description.length === 0) {
        errors.push("Skriv en beskrivning av arbetet!")
    }

    if (errors.length > 0) {
        displayErrorMsg(errors);
    } else if (errors.length === 0) {
        renderExperience();
        window.location.href = "index.html";
    }
});

function displayErrorMsg(errors) {
    errorMsgList.innerHTML = "";

    errors.forEach((error) => {
        const li = document.createElement("li");
        li.textContent = error;
        errorMsgList.appendChild(li);
    });
}