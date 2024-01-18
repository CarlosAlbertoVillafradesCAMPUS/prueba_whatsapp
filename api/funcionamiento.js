import pkg from 'whatsapp-web.js';
import fs from "fs"

const { Client, LocalAuth } = pkg;
//autenticación local
const localAuth = new LocalAuth();
let response = undefined;
// Crear instancia del cliente de WhatsApp
const whatsapp = new Client({
    authStrategy: localAuth,
    authTimeoutMs: 162000000 
});

whatsapp.on('auth_failure', msg => {
    console.log("Error de autenticación:", msg);
    whatsapp.initialize()
});

whatsapp.on('disconnected', reason => {
    console.log("Desconectado:", reason);
}); 

export { whatsapp, response };