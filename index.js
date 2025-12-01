// Validación básica con RegEx
function validarEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function validarPassword(pass) {
    return pass.length >= 6;
}

// REGISTRO
/** Para que el registro pueda hacerse bien se debe poner un correo con extencion gmail y @,
para la contraseña deben ser 6 carácteres.**/
document.getElementById("formRegistro").addEventListener("submit", function(e){
    e.preventDefault();

    let email = document.getElementById("emailRegistro").value;
    let pass = document.getElementById("passRegistro").value;

    if (!validarEmail(email)) {
        alert("Correo no válido");
        return;
    }

    if (!validarPassword(pass)) {
        alert("La contraseña debe tener mínimo 6 caracteres");
        return;
    }

    // Guardar el usuario
    localStorage.setItem("usuario", JSON.stringify({ email: email, pass: pass }));
    alert("Cuenta creada exitosamente");
});

// INICIO DE SESIÓN 
/** Para el inicio de sesion se debe repetir el correo y la contraseña con la que se accedió y si se falla 3 
veces en cualquiera de los 2 se bloqueará por 30 segundos **/
let intentosFallidos = 0;
let bloqueado = false;

document.getElementById("formLogin").addEventListener("submit", function(e){
    e.preventDefault();

    if (bloqueado) return;

    let email = document.getElementById("emailLogin").value;
    let pass = document.getElementById("passLogin").value;

    let datos = JSON.parse(localStorage.getItem("usuario"));

    if (datos && email === datos.email && pass === datos.pass) {
        alert("Inicio de sesión exitoso");
        intentosFallidos = 0;
    } else {
        intentosFallidos++;

        if (intentosFallidos >= 3) {
            bloqueado = true;
            document.getElementById("bloqueoMensaje").innerText = 
                "Cuenta bloqueada por 30 segundos.";
            
            setTimeout(() => {
                bloqueado = false;
                intentosFallidos = 0;
                document.getElementById("bloqueoMensaje").innerText = "";
            }, 30000);
        } else {
            alert("Correo o contraseña incorrectos");
        }
    }
});

//  MOSTRAR / OCULTAR CONTRASEÑA 
document.getElementById("verPass").addEventListener("change", function(){
    let campo = document.getElementById("passLogin");
    campo.type = campo.type === "password" ? "text" : "password";
});

// RECUPERAR CONTRASEÑA 
/** Para recuperar se debe poner el correo con el que te registraste**/
document.getElementById("formRecuperar").addEventListener("submit", function(e){
    e.preventDefault();

    let email = document.getElementById("emailRecuperar").value;
    let datos = JSON.parse(localStorage.getItem("usuario"));

    if (datos && email === datos.email) {
        document.getElementById("mensaje").innerText = 
            "Se envió un correo con instrucciones (simulado).";
    } else {
        document.getElementById("mensaje").innerText = 
            "Este correo no está registrado.";
    }
});


