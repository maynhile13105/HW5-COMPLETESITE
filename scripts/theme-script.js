const theme_toggle_button = document.getElementById("theme");
const theme_label = document.getElementById("theme-label");
const theme_icon = document.getElementById("theme-icon");
if(!localStorage.getItem("theme")){
    localStorage.setItem("theme", "Daylight");
}
const current_theme = localStorage.getItem("theme");
document.documentElement.setAttribute('theme', current_theme);
if(current_theme === "Daylight"){
    theme_label.textContent= "Daylight";
    theme_icon.setAttribute("src", "/images/day-icon.svg");
    theme_icon.setAttribute("alt", "day-icon");
} else{
    theme_label.textContent= "Nightlight";
    theme_icon.setAttribute("src", "/images/night-icon.svg");
    theme_icon.setAttribute("alt", "night-icon");   
}

theme_toggle_button.addEventListener("click", (event) => {
    const theme = document.documentElement.getAttribute('theme');
    
    if(theme === "Daylight"){
        document.documentElement.setAttribute("theme", "Nightlight");
        localStorage.setItem("theme", "Nightlight");
        theme_label.textContent= "Nightlight";
        theme_icon.setAttribute("src", "/images/night-icon.svg");
        theme_icon.setAttribute("alt", "night-icon");
    } else {
        document.documentElement.setAttribute("theme", "Daylight");
        localStorage.setItem("theme", "Daylight");
        theme_label.textContent= "Daylight";
        theme_icon.setAttribute("src", "/images/day-icon.svg");
        theme_icon.setAttribute("alt", "day-icon");
    }
})
 