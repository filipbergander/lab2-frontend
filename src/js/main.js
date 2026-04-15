import { render } from 'sass';
import '../sass/main.scss';
"use strict";

const companyInput = document.getElementById("company");
const titleInput = document.getElementById("title");
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const url = "http://127.0.0.1:5080/workexperience";

//renderExperience();
//createExperience();
//deleteExperience();
//updateExperience();
async function fetchData() {
    const response = await fetch(url)
    const experiences = await response.json();

    console.log(experiences);
    renderExperience(experiences);
}

export async function createExperience(experience) {
    const company = document.getElementById("company").value.trim();
    const title = document.getElementById("title").value.trim();
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();

    let experience = {
        companyName: company,
        jobTitle: title,
        location: location,
        description: description
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(experience)
    });

    const data = await response.json();
    console.log(data);
}

async function deleteExperience(id) {
    const response = await fetch("http://127.0.0.1:5080/workexperience/" + id, {
        method: "DELETE"
    });
    const data = await response.json();
}

async function updateExperience(id) {
    const response = await fetch("http://127.0.0.1:5080/workexperience/" + id, {
        method: "PUT"
    });
    const data = await response.json();
}

export function renderExperience(experiences) {
    const experienceList = document.getElementById("experience-list");
    // Om användaren inte befinner sig på startsidan
    if (!experienceList) {
        return;
    }
    // Tömmer listan innan en ny skapas
    experienceList.innerHTML = "";
    // Struktur inom DOM
    experiences.forEach(exp => {
        experienceList.innerHTML += `
        <article class="experience-item">
            <h3>${exp.companyName} - ${exp.location}</h3>
            <h4>${exp.jobTitle}</h4>
            <p> <span class="span-description">Arbetsbeskrivning:</span> ${exp.description}</p>
            <div id="experience-btns">
                <button data-id="${exp.id}" class="delete-btn">Radera</button>
                <button data-id="${exp.id}" class="update-btn">Uppdatera</button>
            </div>
        </article>
        `
    });

    // Hämtar in alla knappar som är renderade
    const deleteBtns = document.querySelectorAll(".delete-btn");
    // Eventlyssnare på varje knapp
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", async() => {
            const btnID = btn.dataset.id;
            await deleteExperience(btnID);
            fetchData();
            console.log("Du klickade på knappen")
        })
    });
}