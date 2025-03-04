// Import styles and necessary JS
import "./style.scss";
import "./components/header/header.scss";
import "./components/footer/footer.scss";
import "./components/about/about.scss";
import "./pages/home/home.scss";
import "./pages/contact/contact.scss";
import {setupEvents} from './pages/contact/validator';
import logo from "./assets/profile.jpeg";
import internshipBG1 from "./assets/intern2.png";
import internshipBG2 from "./assets/intern1.png";

const appDiv = document.getElementById("app");

// A simple navigation function
function navigate(route) {
  history.pushState(null, "", route);
  render();
}

/**
 * Function to load HTML dynamically
 * Pass callback function in case any function needs execute post rendering
 * @param {*} id 
 * @param {*} file 
 * @param {*} callback 
 */
function loadComponent(id, file, callback) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    })
    .catch((error) => console.error(`Error loading ${file}:`, error));
}

/**
 * Function to load skill section on home page
 * imports necessary images only.
 */
function loadTechSkills() {
  const skillsContainer = document.querySelector(".details__skills--items");

  if (!skillsContainer) {
    console.error("Element with class 'details__skills--items' not found!");
    return;
  }

  const techSkills = [
    { name: "JavaScript", src: "./assets/js-logo.svg" },
    { name: "Node.js", src: "./assets/node-js.svg" },
    { name: "Flutter", src: "./assets/flutter.svg" },
    { name: "Dart", src: "./assets/dart-logo.svg" },
    { name: "HTML", src: "./assets/html-logo.svg" },
    { name: "Google Play Console", src: "./assets/google-play-logo.svg" },
  ];

  techSkills.forEach((tech) => {
    const img = document.createElement("img");
    img.className = "details__skills--items--img";
    img.alt = tech.name;
    import(`${tech.src}`)
      .then((module) => {
        img.src = module.default;
      })
      .catch((err) => console.error(`Error loading ${tech.name} logo:`, err));

    skillsContainer.appendChild(img);
  });
}

// Run this function after components are loaded
// Function to render content dynamically inside `appDiv`
function render() {
  const { pathname } = window.location;

  if (pathname === "/") {
    loadComponent("app", "./pages/home/home.html", () => {
      const imgElement = document.querySelector(".details__image");
      imgElement.src = logo;
      loadTechSkills();
      fetch("./components/about/about.html")
        .then((response) => response.text())
        .then((data) => {
          appDiv.insertAdjacentHTML("beforeend", data);
          const imgElement1 = document.querySelector(".experienceImg1");
          const imgElement2 = document.querySelector(".experienceImg2");
          imgElement1.src = internshipBG1;
          imgElement2.src = internshipBG2;
        })
        .catch((error) => console.error(`Error loading ./components/about/about.html:`, error));
    });
  } else if (pathname === "/about") {
    loadComponent("app", "./components/about/about.html",()=>{
      const imgElement1 = document.querySelector(".experienceImg1");
          const imgElement2 = document.querySelector(".experienceImg2");
          imgElement1.src = internshipBG1;
          imgElement2.src = internshipBG2;
    });
  } else if (pathname === "/contact") {
    loadComponent("app", "./pages/contact/contact.html",  ()=> setupEvents());
  } else {
    appDiv.innerHTML = `<h1>404 - Page Not Found</h1>`;
  }
}

loadComponent("header", "./components/header/header.html");
loadComponent("footer", "./components/footer/footer.html");

document.body.addEventListener("click", (e) => {
  if (e.target.matches("#home")) {
    navigate("/");
  } else if (e.target.matches("#about")) {
    navigate("/about");
  } else if (e.target.matches("#contact")) {
    navigate("/contact");
  }
});

// Handle browser back/forward navigation
window.addEventListener("popstate", render);

// Initial render
render();
