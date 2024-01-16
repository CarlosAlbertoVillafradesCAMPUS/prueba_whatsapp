import pkg from 'whatsapp-web.js';

const { Client, LocalAuth } = pkg;
//autenticación local
const localAuth = new LocalAuth();
let ready = false
// Crear instancia del cliente de WhatsApp
const whatsapp = new Client({
    authStrategy: localAuth
});

whatsapp.on('ready', () => {
    ready = true
    console.log("Cliente listo");
});

whatsapp.on('authenticated', () =>{
    ready = true
    console.log("Cliente listo");
})

whatsapp.on('auth_failure', msg => {
    console.log("Error de autenticación:", msg);
});

whatsapp.on('disconnected', reason => {
    ready = false
    console.log("Desconectado:", reason);
}); 

export { whatsapp, ready };