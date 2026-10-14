/* Add the real PDF at assets/documents/resume.pdf, then set this to that relative path. */
const RESUME_PATH = "";

function safeWebPath(value) {
  if (typeof value !== "string" || value.trim() === "") return "";
  const candidate = value.trim();
  try {
    const parsed = new URL(candidate, document.baseURI);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "";
    return candidate;
  } catch {
    return "";
  }
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function addExternalLink(container, rawUrl, label, accessibleName) {
  const url = safeWebPath(rawUrl);
  if (!url) return;
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", accessibleName);
  link.append(document.createTextNode(label + " "));
  link.append(makeElement("span", "", "↗"));
  container.append(link);
}

function createProjectCard(project) {
  const article = makeElement("article", "project-card");
  const art = makeElement("div", "project-card__art");
  const imageUrl = safeWebPath(project.image);

  if (imageUrl) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = typeof project.imageAlt === "string" ? project.imageAlt : `${project.name} project artwork`;
    image.loading = "lazy";
    image.decoding = "async";
    if (/\.ico(?:$|\?)/i.test(imageUrl)) image.classList.add("is-icon");
    image.addEventListener("error", () => {
      image.remove();
      art.setAttribute("aria-hidden", "true");
      const initials = project.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
      art.append(makeElement("span", "project-card__initials", initials));
    }, { once: true });
    art.append(image);
  } else {
    art.setAttribute("aria-hidden", "true");
    const initials = project.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
    art.append(makeElement("span", "project-card__initials", initials));
  }

  const content = makeElement("div", "project-card__content");
  const eyebrow = makeElement("div", "project-card__eyebrow");
  eyebrow.append(makeElement("span", "", project.category));
  if (project.featured === true) eyebrow.append(makeElement("span", "project-badge", "Featured"));
  if (typeof project.status === "string" && project.status.trim()) {
    eyebrow.append(makeElement("span", "project-badge project-badge--status", project.status));
  }

  content.append(eyebrow);
  content.append(makeElement("h3", "", project.name));
  content.append(makeElement("p", "project-card__description", project.description));

  if (Array.isArray(project.technologies) && project.technologies.length > 0) {
    const list = makeElement("ul", "project-tech");
    list.setAttribute("aria-label", `Technologies used in ${project.name}`);
    for (const technology of project.technologies) {
      if (typeof technology === "string" && technology.trim()) {
        list.append(makeElement("li", "", technology.trim()));
      }
    }
    if (list.childElementCount) content.append(list);
  }

  const links = makeElement("div", "project-card__links");
  addExternalLink(links, project.githubUrl, "GitHub", `View ${project.name} on GitHub (opens in a new tab)`);
  if (project.liveDemoUrl) {
    addExternalLink(links, project.liveDemoUrl, "Live demo", `Open the ${project.name} live demo (opens in a new tab)`);
  }
  if (links.childElementCount) content.append(links);

  article.append(art, content);
  return article;
}

async function loadProjects() {
  const grid = document.getElementById("project-grid");
  const status = document.getElementById("project-status");
  if (!grid || !status) return;

  try {
    const response = await fetch("projects.json", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`projects.json returned ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("projects.json must contain an array");

    const projects = data
      .filter((project) => project && typeof project.name === "string" && project.name.trim() && typeof project.description === "string" && typeof project.category === "string")
      .sort((left, right) => Number(right.featured === true) - Number(left.featured === true));

    grid.replaceChildren(...projects.map(createProjectCard));
    grid.setAttribute("aria-busy", "false");
    status.textContent = projects.length ? `${projects.length} projects are ready to explore below.` : "There are no projects to browse right now.";
  } catch (error) {
    console.error("Unable to load the project list:", error);
    grid.replaceChildren();
    grid.setAttribute("aria-busy", "false");
    status.textContent = "The project list could not be loaded. Please try again later.";
  }
}

async function enableResumeIfPresent() {
  const button = document.getElementById("resume-button");
  const status = document.getElementById("resume-status");
  if (!button || !RESUME_PATH) return;

  const path = safeWebPath(RESUME_PATH);
  if (!path) return;
  try {
    const response = await fetch(path, { method: "HEAD", cache: "no-store" });
    if (!response.ok) return;
    const link = document.createElement("a");
    link.className = button.className;
    link.href = path;
    link.setAttribute("download", "Zafar-Resume.pdf");
    link.textContent = "Download Resume";
    link.setAttribute("aria-label", "Download Zafar’s resume as a PDF");
    button.replaceWith(link);
    if (status) status.textContent = "Download the current resume as a PDF.";
  } catch (error) {
    // Keep the disabled “Resume Coming Soon” button if the PDF cannot be reached.
    console.warn("Resume file is not available; download remains disabled.", error);
  }
}

function setupNavigation() {
  const button = document.getElementById("menu-toggle");
  const navigation = document.getElementById("primary-nav");
  if (!button || !navigation) return;

  const closeMenu = (returnFocus = false) => {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation menu");
    navigation.dataset.open = "false";
    if (returnFocus) button.focus();
  };

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    button.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navigation.dataset.open = String(!isOpen);
  });

  navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") closeMenu(true);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeMenu();
  });
}

setupNavigation();
loadProjects();
enableResumeIfPresent();
