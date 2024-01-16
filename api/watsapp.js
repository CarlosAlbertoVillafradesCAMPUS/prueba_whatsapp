import express from "express";
import { whatsapp, ready} from "./funcionamiento.js";
import fs from "fs"
import cors from "cors"
import qrcode from "qrcode"

const appExpress = express();
appExpress.use(express.json())
appExpress.use(cors())

let sesion = false;

appExpress.get("/sesion", async(req,res)=>{
    try {
        if (!sesion) {
            whatsapp.initialize();

            whatsapp.on('qr', async(qr) => {
                const urlCode = await qrcode.toDataURL(qr)
                sesion = true
                res.status(200).send({status:200, message:{urlCode}})
            });  
        }else{
            res.status(200).send({status:200, message:"Debes primero inicializar Whatsapp"})
        }
     } catch (error) {
         console.error("Error al generar el código QR:", error);
         res.status(500).send({status:500, message: "Error al generar el código QR." });
     }
 })

 appExpress.get("/logout", async(req,res)=>{
    try {
            sesion = false;
            await whatsapp.logout();

            fs.unlinkSync("../");
            fs.unlinkSync('../.wwebjs_cache');

            res.status(200).send({status: 200, message: "Logout de Whatsapp"});
        
    } catch (error) {
        res.status(400).send({status: 400, message: "Error al hacer Logout"});
    }
 })

appExpress.get("/prueba", async(req,res)=>{
    res.status(200).send({status:200, message: ready})
 })

appExpress.post("/message", async(req,res)=>{
    try {
        if (ready) {
            const { numero, mensaje } = req.body;
            const tel = numero;
            const chatId = tel.substring(1) + "@c.us";
            const numberDetails = await whatsapp.getNumberId(chatId);
    
            if (numberDetails) {
                const mensajeB = mensaje;
                await whatsapp.sendMessage(chatId, mensajeB);
                res.status(200).send({status:200, message: "enviado con exito"});
            } else {
                res.status(400).send({ status: 400, message: "Número no válido o no encontrado en WhatsApp." });
            }
        }else{
            res.status(400).send({ status: 400, message: "No se ha inicado sesion en whatsapp" });
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(400).json({ status: 400, message: "Error al procesar la solicitud." });
    }
})


const port = 5017;
appExpress.listen(port, ()=>console.log(`http://127.17.0.98:${port}`))