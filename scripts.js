let container = document.querySelector(".container");
let botonGrid = document.getElementById("aceptar-grid");
let botonLimpiarGrid = document.getElementById("limpiar-grid");
let anchoGrid = document.getElementById("rango-ancho");
let altoGrid = document.getElementById("rango-alto");
let botonColor = document.getElementById("color-input");
let botonBorrar = document.getElementById("borrar-btn");
let botonPintar = document.getElementById("pintar-btn");
let valorAncho = document.getElementById("valor-ancho");
let valorAlto = document.getElementById("valor-alto");

let eventos = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        mobe: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";

let dibujar = false;
let borrar = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

botonGrid.addEventListener("click", () => {
    container.innerHTML = "";
    let contador = 0;
    for (let i = 0; i < altoGrid.value; i++) {
        contador += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");

        for (let j=0; j < anchoGrid.value; j++) {
            contador += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${contador}`);
            col.addEventListener(eventos[deviceType].down, ()=>{
                dibujar = true;
                if(borrar) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = botonColor.value;
                }
            });

            col.addEventListener(eventos[deviceType].move, (e) => {
                let IdElemento = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(IdElemento);
            });

            col.addEventListener(eventos[deviceType].up, () => {
                dibujar = false;
            });

            div.appendChild(col);

        }

        container.appendChild(div);

    }
});

function checker(IdElemento) {
    let columnasGrid = document.querySelectorAll(".gridCol");
    columnasGrid.forEach((element) => {
        if(IdElemento == element.id) {
            if (dibujar && !borrar) {
                element.style.backgroundColor = botonColor.value;
            } else if (dibujar && borrar) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
} 

botonLimpiarGrid.addEventListener("click", () => {
    container.innerHTML = "";
});

botonBorrar.addEventListener("click", () => {
    borrar = true;
});

botonPintar.addEventListener("click", () => {
    borrar = false;
});

anchoGrid.addEventListener("input", () => {
    valorAncho.innerHTML = anchoGrid.value < 9 ? `0${anchoGrid.value}` : anchoGrid.value;
});

altoGrid.addEventListener("input", () => {
    valorAlto.innerHTML = altoGrid.value < 9 ? `0${altoGrid.value}` : altoGrid.value;
});

window.onload = () => {
    altoGrid.value = 0;
    anchoGrid.value = 0;
};