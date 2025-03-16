class ProjectComponent extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
            <style>
                .project {
                    border: 1px solid yellow;
                    border-radius: 10px;
                    padding: 15px;
                    margin: 10px;
                    background: #fdebcc;
                    box-shadow: 2px 2px 10px yellow);
                    
                }
                img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 5px;
                }
                h2{
                    color: navy;
                }
                b{
                    text-decoration: underline;
                }
            </style>
            <div class="project">
                <h2></h2>
                <p id="type"></p>
                <p><b>Language:</b> <span id="language"></span></p>
                <p><b>Description: </b> <br><span id="description"></span></p>
                <a id="link" target="_blank">Click to view details!</a>
                <picture>
                    <img id="project-img" alt="">
                </picture>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector("h2").textContent = this.getAttribute("title");
        this.shadowRoot.querySelector("#type").textContent = this.getAttribute("type");
        this.shadowRoot.querySelector("#language").textContent = this.getAttribute("language");
        this.shadowRoot.querySelector("#description").textContent = this.getAttribute("description");
        this.shadowRoot.querySelector("#link").href = this.getAttribute("link");
        this.shadowRoot.querySelector("#project-img").src = this.getAttribute("result");
        this.shadowRoot.querySelector("#project-img").alt = this.getAttribute("title") + " image";
    }
}

customElements.define("project-card", ProjectComponent);


document.addEventListener("DOMContentLoaded", async () => {
    const projectsContainer = document.querySelector("main");

    // Check if data exists in localStorage
    let localData = localStorage.getItem("projects");

    if (!localData) {
        try {
            const response = await fetch("project-info.json"); // Fetch JSON from the file
            localData = await response.json();
            localStorage.setItem("projects", JSON.stringify(localData)); // Store in localStorage
        } catch (error) {
            console.error("Error loading project data:", error);
            return;
        }
    } else {
        localData = JSON.parse(localData); // Parse data from localStorage
    }

    // Populate project cards
    localData["project-cards"].forEach((proj) => {
        const projCard = document.createElement("project-card");
        projCard.setAttribute("title", proj.title);
        projCard.setAttribute("type", proj.type);
        projCard.setAttribute("language", proj.language);
        projCard.setAttribute("description", proj.description);
        projCard.setAttribute("link", proj.link);
        projCard.setAttribute("result", proj.result);

        projectsContainer.appendChild(projCard);
    });
});

document.getElementById("local-storage").addEventListener("click", async () => {
    try {
        const response = await fetch("projects.json");
        const projectData = await response.json();
        localStorage.setItem("projects", JSON.stringify(projectData));
        location.reload();
    } catch (error) {
        console.error("Error refreshing project data:", error);
    }
});



