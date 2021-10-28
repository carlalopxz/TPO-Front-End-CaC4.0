const iconoMenu = document.getElementById("icono-menu");
const iconoMenuActivo = document.getElementById("icono-menu-activo");
const menu = document.getElementById("menu");
iconoMenu.addEventListener("click",()=>{
    menu.style.top = "0";
})

iconoMenuActivo.addEventListener("click",()=>{
    menu.style.top = "-100vh";
})
