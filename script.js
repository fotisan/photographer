const burger = document.querySelector(".burger");
const menu = document.querySelector("#menu");
const closeBtn = document.querySelector(".menu-close");

function openMenu(){
  menu.hidden = false;
  burger.setAttribute("aria-expanded", "true");
  document.documentElement.style.overflow = "hidden";
}

function closeMenu(){
  menu.hidden = true;
  burger.setAttribute("aria-expanded", "false");
  document.documentElement.style.overflow = "";
}

burger.addEventListener("click", () => {
  const isOpen = burger.getAttribute("aria-expanded") === "true";
  isOpen ? closeMenu() : openMenu();
});

closeBtn.addEventListener("click", closeMenu);

menu.addEventListener("click", (e) => {
  if (e.target === menu) closeMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !menu.hidden) closeMenu();
});
