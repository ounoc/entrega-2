/*-------------- funciones --------------*/
function crearTexto(textContent,position,top,left,fontSize,color,className){
    let texto = document.createElement("p")
    texto.textContent = textContent
    texto.style.position = position
    texto.style.top = top
    texto.style.left = left
    texto.style.fontSize = fontSize
    texto.style.color = color
    texto.className = className
    document.body.appendChild(texto)
    return texto
}
/* funcion para crear botones */
function crearBoton(textContent, position, top, left, fontSize, color, className, bool = false, onClickAction ) {
    let boton = document.createElement("button")
    boton.textContent = textContent
    boton.style.position = position
    boton.style.top = top
    boton.style.left = left
    boton.style.fontSize = fontSize
    boton.style.color = color
    boton.className = className
    if (typeof onClickAction === "function") {
        boton.addEventListener("click", onClickAction, { once: Boolean(bool) })
    }
    document.body.appendChild(boton)
    return boton
}
/* funcion para crear inputs */
function crearInput(type, placeholder, position, top, left, fontSize, color, className) {
    let input = document.createElement("input")
    input.type = type
    input.placeholder = placeholder
    input.style.position = position
    input.style.top = top
    input.style.left = left
    input.style.fontSize = fontSize
    input.style.color = color
    input.className = className
    input.style.height = "50px"
    document.body.appendChild(input)
    return input
}

/*funcion borrar que funciona cuando quiere y tengo q usar otras alternativas*/
function borrar() {
    let elementos = document.querySelectorAll(".void, .boton")
    elementos.forEach(elemento => {
        elemento.classList.add("out")
        elemento.offsetHeight;
        elemento.style.opacity = "0"
        elemento.style.transition = "opacity 0.5s ease-out"
        elemento.addEventListener("transitionend", function(event) {
            if (event.propertyName === "opacity") {
                elemento.remove()
            }
        }, { once: true })
    })
}

/* funcion para encontar el nombre de usuario para distintas aplicaciones etc etc */
function findUserName(nombreUsuario) {
    let usuarios = JSON.parse(localStorage.getItem("users")) || []
    return usuarios.find(u => u.newUserName === nombreUsuario) || null
}
function checkUserSession() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo")) || JSON.parse(sessionStorage.getItem("usuarioActivo"))
    
    if (usuarioActivo) {
        mostrarMenu(usuarioActivo)
    }
}

/* funcion para mostrar el menu si hay un usuario conectado */
function mostrarMenu(usuario) {
    borrar()
    crearTexto(`Bienvenido, ${usuario.newName}`, "absolute", "-20px", "20px", "30px", "white", "in")
    crearBoton("Cerrar Sesión", "absolute", "10px", "1650px", "30px", "white", "boton", false, cerrarSesion)
}

/* funcion para cerrar sesion */
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo")
    sessionStorage.removeItem("usuarioActivo")
    location.reload()
}
/* funciona para crear el apartado de inicio de sesion pq lo tengo q invocar un par de veces y no da para tirar todo este codigo asi no mas (ahorra lineas) */
function crearIniciarSesion(leftpx) {
    crearBoton("Iniciar Sesión", "absolute", "360px", leftpx, "30px", "white", "boton in", true, function () {
        borrar()
        crearTexto("Bienvenido a tu vlog personal", "absolute", "230px", "686px", "40px", "white", "void")
        crearInput("text", "Ingrese su Usuario", "absolute", "460px", "676px", "30px", "black", "inUp loginUser void")
        crearInput("password", "Ingrese su Contraseña", "absolute", "520px", "676px", "30px", "black", "inUp loginPassword void")

        /* checkbox "Permanecer conectado" */
        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.id = "stayLogged"
        checkbox.style.position = "absolute"
        checkbox.style.top = "560px"
        checkbox.style.left = "616px"

        let label = document.createElement("label")
        label.htmlFor = "stayLogged"
        label.textContent = "Permanecer conectado"
        label.style.position = "absolute"
        label.style.top = "560px"
        label.style.left = "676px"
        label.style.color = "white"
        label.style.fontSize = "18px"
        label.classList.add("stayLoggedLabel")
        label.classList.add("fadeInUp")

        document.body.appendChild(checkbox)
        document.body.appendChild(label)

        crearBoton("Ingresar", "absolute", "590px", "676px", "20px", "white", "boton inUp", false, function () {
            let inputUser = document.querySelector(".loginUser").value
            let inputPassword = document.querySelector(".loginPassword").value
            let stayLogged = document.getElementById("stayLogged").checked

            let usuarios = JSON.parse(localStorage.getItem("users")) || []
            let usuarioValido = usuarios.find(u => u.newUserName === inputUser && u.newPassword === inputPassword)

            if (usuarioValido) {
                document.querySelectorAll(".boton").forEach(e => e.remove())
                document.querySelectorAll(".void").forEach(e => e.remove())
                crearTexto("¡Sesión Iniciada!", "absolute", "610px", "826px", "30px", "white", "fadeInOut void");

                if (stayLogged) {
                    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido))
                } else {
                    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido))
                }
                location.reload()
                mostrarMenu(usuarioValido)
            } else {
                crearTexto("¡Usuario o contraseña incorrectos!", "absolute", "610px", "766px", "30px", "white", "fadeInOut texto")
            }
        })
    })
}
/* funcion para verificar si hay un usuario conectado al cargar la pagina */
function checkUserSession() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo")) || JSON.parse(sessionStorage.getItem("usuarioActivo"))

    if (usuarioActivo) {
        console.log("Usuario ya conectado: ", usuarioActivo) 
        mostrarMenu(usuarioActivo)
    } else {
        console.log("No hay usuario conectado")
    }
}
/*funcion para mostrar el menu si hay un usuario conectado */
function mostrarMenu(usuario) {
    borrar()
    console.log("Mostrando menú para: ", usuario.newName)
    crearTexto(`Bienvenido, ${usuario.newName}`, "absolute", "20px", "10px", "30px", "white", "in")
    crearBoton("Cerrar Sesión", "absolute", "10px", "1660px", "30px", "white", "boton", false, cerrarSesion)
}

/*funcion para cerrar sesion */
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo")
    sessionStorage.removeItem("usuarioActivo")
    location.reload()
}

/*funcion para verificar si el usuario ya esta logueado */
function isUserLogged() {
    return !!(localStorage.getItem("usuarioActivo") || sessionStorage.getItem("usuarioActivo")) /*convierte el return en bool*/
}

function abrirModal() {
    document.getElementById("overlay").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("overlay").style.display = "none";
}
function cargarVlog() {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))
    
    if (!usuarioActivo) return

    crearTexto("Vlog personal", "absolute", "10px", "826px", "50px", "white", "tittle")

    let background = document.createElement("div")
    background.id = "contenedor"
    background.style.position = "absolute"
    background.style.top = "100px"
    background.style.left = "696px"
    background.style.minHeight = "100px"
    background.style.width = "600px"
    background.style.background = "white"
    document.body.appendChild(background)

    let input = crearInput("text", "¿Qué estás pensando?", "absolute", "10px", "10px", "20px", "black", "input posts")
    background.appendChild(input)

    let botonpost = crearBoton("Postear", "absolute", "10px", "530px", "15px", "black", "boton-postear", false, function () {
        let contenido = document.querySelector(".posts").value.trim()
        if (contenido.length < 1) {
            alert("Tu publicación debe tener al menos un carácter")
            return
        }

        document.querySelector(".posts").value = ""

        let post = crearTexto(contenido, "relative", "", "10px", "20px", "black", "post")
        background.appendChild(post)

        usuarioActivo.posts = usuarioActivo.posts || []
        usuarioActivo.posts.push(contenido)
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo))
        actualizarUsuarioEnStorage(usuarioActivo)
    })
    background.appendChild(botonpost)

    cargarPostsUsuario(usuarioActivo, background)
}

function cargarPostsUsuario(usuario, contenedor) {
    if (!usuario.posts) return
    usuario.posts.forEach(post => {
        let postElement = crearTexto(post, "relative", "", "10px", "20px", "black", "post")
        contenedor.appendChild(postElement)
    })
}

function actualizarUsuarioEnStorage(usuarioActualizado) {
    let usuarios = JSON.parse(localStorage.getItem("users")) || []
    let index = usuarios.findIndex(u => u.newUserName === usuarioActualizado.newUserName)
    if (index !== -1) {
        usuarios[index] = usuarioActualizado
        localStorage.setItem("users", JSON.stringify(usuarios))
    }
}

/*-------------- aca terminan las funciones --------------*/

/*-------------- botones etc --------------*/
document.addEventListener("DOMContentLoaded", () => {
    checkUserSession()

    if (!isUserLogged()) {
        crearBoton("Click para continuar", "absolute", "160px", "776px", "30px", "white", "boton in", true, function () {
            borrar()
            crearTexto("Bienvenido a tu vlog personal", "absolute", "230px", "686px", "40px", "white", "fadeInUp void")
            /*crear cuenta */
            crearBoton("Crear Cuenta", "absolute", "360px", "956px", "30px", "white", "boton in", true, function () {
                borrar()
                crearTexto("Bienvenido a tu vlog personal", "absolute", "230px", "686px", "40px", "white", "void")
                crearInput("text", "Ingrese su Usuario", "absolute", "460px", "676px", "20px", "black", "void inUp createUser")
                crearInput("password", "Ingrese su Contraseña", "absolute", "520px", "676px", "20px", "black", "void inUp createPassword")
                crearInput("text", "Ingrese su Nombre", "absolute", "580px", "676px", "20px", "black", "void inUp createName")

                crearBoton("Crear Cuenta", "absolute", "650px", "826px", "20px", "white", "boton inUp", false, function () {
                    let newUserName = document.querySelector(".createUser").value.trim()
                    let newPassword = document.querySelector(".createPassword").value.trim()
                    let newName = document.querySelector(".createName").value.trim()
                    let usuarios = JSON.parse(localStorage.getItem("users")) || [] 

                    if (usuarios.some(u => u.newUserName === newUserName)) {
                        crearTexto("¡Este usuario ya está registrado!", "absolute", "610px", "756px", "30px", "white", "fadeInOut texto")
                        return
                    }
    
                    if (newUserName.length < 3) {
                        crearTexto("¡Tu usuario debe tener mínimo 3 caracteres!", "absolute", "610px", "696px", "30px", "white", "fadeInOut texto")
                        return
                    }
                    
                    if (newPassword.length < 6) {
                        crearTexto("¡Tu contraseña debe tener mínimo 6 caracteres!", "absolute", "610px", "696px", "30px", "white", "fadeInOut texto")
                        return
                    }

                    if (newName === "") {
                        crearTexto("¡Pon tu nombre!", "absolute", "610px", "836px", "30px", "white", "fadeInOut texto")
                        return
                    }
                    /*crea el usuario*/
                    let newUser = { newUserName, newPassword, newName }
                    usuarios.push(newUser)
                    localStorage.setItem("users", JSON.stringify(usuarios))

                    crearTexto("¡Cuenta creada con éxito!", "absolute", "610px", "786px", "30px", "white", "fadeInOut texto")

                    document.querySelectorAll(".boton").forEach(e => e.remove())
                    document.querySelectorAll(".void").forEach(e => e.remove())
                    crearIniciarSesion("786px");
                })
            })
            crearIniciarSesion("676px")
        })
    }else{ /*menu y toa la shit*/
        crearTexto("Vlog personal","absolute","10px","826px","50px","white","tittle")

        let postTop = 70
        let backgroundtop = 100
        let postlength = document.querySelectorAll(".posts").length

        let background = document.createElement("div")
        background.id = "contenedor"
        background.style.top = "100px"
        background.style.left = "696px"
        background.style.minHeight = `${backgroundtop}px`
        document.body.appendChild(background)

        let input = crearInput("text","¡¿Que estas pensando?!","absolute","10px","10px","30px","black","input posts")
        background.appendChild(input)
        let botonpost = crearBoton("Postear","absolute","0px","530px","15px","black","boton-postear",false,function(){
            let contenido = document.querySelector(".posts").value
            if (contenido.length < 1){
                alert("Tu publicacion tiene q tener un caracter al menos")
            }else{
                document.querySelector(".posts").value = ""
                let post = crearTexto(contenido,"absolute",`${postTop}px`,"10px","30px","black","post")
                post.style.maxHeight = "450px"

                postTop += 60
                backgroundtop += 60

                background.style.minHeight = `${backgroundtop}px`
                background.appendChild(post)
                console.log(backgroundtop)
            }
        })
        background.appendChild(botonpost)
    }
})
