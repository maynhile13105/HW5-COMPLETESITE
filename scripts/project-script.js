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
                    background: var(--project-bg);
                    box-shadow: 2px 2px 10px yellow;
                    display: flex;
                    flex-direction: column
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

function loadProject(data, projectsContainer){
    const projCard = document.createElement("project-card");
    projCard.setAttribute("title", data.title);
    projCard.setAttribute("type", data.type);
    projCard.setAttribute("language", data.language);
    projCard.setAttribute("description", data.description);
    projCard.setAttribute("link", data.link);
    projCard.setAttribute("result", data.result);

    projectsContainer.appendChild(projCard);

}

document.getElementById("local-storage").addEventListener("click", async () => {

    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML="";

    let localData = localStorage.getItem("projects");

    if (!localData) {
        try {
            const response = await fetch("project-info.json"); 
            localData = await response.json();
            localStorage.setItem("projects", JSON.stringify(localData)); 
        } catch (error) {
            console.error("Error loading project data:", error);
            return;
        }
    } else {
        localData = JSON.parse(localData); // Parse data from localStorage
    }

    localData["project-cards"].forEach((proj) => {
        loadProject(proj, projectsContainer);
    });

    const announcement = document.getElementById("announcement-box");
    announcement.textContent = "Data is loaded from Local Storage!"

});

document.getElementById("remote-storage").addEventListener("click", async () => {

    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML = "";
    try{
        const response = await fetch("https://my-json-server.typicode.com/maynhile13105/HW5-COMPLETESITE/db");
        const remoteData = await response.json();

        // Populate project cards
        remoteData["project-cards"].forEach((proj) => {
            loadProject(proj, projectsContainer);
        });

        const announcement = document.getElementById("announcement-box");
        announcement.textContent = "Data is loaded from Remote Storage!"
    
    }catch (error) {
        console.error("Fetching remote project data: Failed - ", error);
    }

});

window.addEventListener("beforeunload", () => {
    localStorage.removeItem("projects");
});




