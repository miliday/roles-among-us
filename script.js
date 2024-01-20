import { roles } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        rolesParent: document.querySelector(".page__roles"),
        searchInput: document.querySelector(".page__search"),
        emptyBox: document.querySelector(".page__empty-box"),
    }

    elements.roles = roles.map(item => {
        const card = document.createElement('div')
        card.classList.add("page__role", "card", "_img")

        const p = {
            start: `<p class="card__description">`,
            end: `</p>`
        }

        card.innerHTML = `
            <img class="card__img" src="${item.img}"/>
            <span class="card__type ${['_peace', '_neutral', '_traitor'][item.type]}">
                ${['Мирный', 'Нейтрал', 'Предатель'][item.type]}
            </span>
            <h2 class="card__name">${item.name}</h2>

            ${p.start}
                ${item.description.join(`${p.end}${p.start}`)}
            ${p.end}
        `

        elements.rolesParent.appendChild(card)

        return card
    })

    window.filterRoles = () => {
        const query = elements.searchInput.value.toLowerCase();

        let isEmpty = Array.from(elements.roles).reduce((acc, role) => {
            const title = role.querySelector('.card__name')
            const isMatch = title.textContent.toLowerCase().includes(query)

            acc = isMatch ? false : acc
            role.style.display = isMatch ? "" : "none";

            return acc
        }, true)

        elements.emptyBox.style.display = isEmpty ? "" : "none";
    };
});