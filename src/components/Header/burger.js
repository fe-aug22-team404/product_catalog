
const burgerMenu = document.querySelector(".header__link-cross");


export const toggleBurger = (event) => {
    event.currentTarget.classList.toggle("open");
    console.log(event.currentTarget);
}
