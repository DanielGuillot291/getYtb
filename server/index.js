const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: ["https://get-ytb.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));

const fs = require('fs');
const ytdl = require('ytdl-core');

const path = require('path');
var downloadsDir = path.join(require('os').homedir(), 'Downloads');
console.log(downloadsDir);

app.get('/', (req, res)=>{
   res.send("API getYtb()"); 
});

app.get('/formdata', (req, res)=>{
   res.send("FormData!!");
});

app.post('/formdata', async (req, res)=>{
    const { textInput } = req.body;
    console.log("Obteniendo: " + textInput);

    //opciones para obtener el audio sin video
    const optionsAudio = {
        quality: 'highestaudio', //highestaudio, highest, lowest, 1080p, 720p, 360p, etc
        filter: 'audioonly' //audioonly, videoonly, videoandaudio
    };

    const downloadAudio = async (url, options) => {
        try{
            //obtenemos la info del video
            const info = await ytdl.getInfo(url);
            
            //obtenemos el formato del video
            const format = ytdl.chooseFormat(info.formats, options);

            //Creamos una stream de lectura desde la URL del video
            const readStream = ytdl(url, options);

            //Creamos una stream de escritura para guardar el archivo
            try{
                var writeStream = fs.createWriteStream(path.join(downloadsDir, `${info.videoDetails.title}.mp3`));
                https://www.youtube.com/watch?v=SSnYXgf2868&t=78s
                //Pipamos la stream de lectura a la de escritura
                readStream.pipe(writeStream);
            }catch(err){
                var downloadsDir = path.join(require('os').homedir(), 'Descargas');
                var writeStream = fs.createWriteStream(path.join(downloadsDir, `${info.videoDetails.title}.mp3`));
                https://www.youtube.com/watch?v=SSnYXgf2868&t=78s
                //Pipamos la stream de lectura a la de escritura
                readStream.pipe(writeStream);
            }

            //Manejamos eventos de finalizacion y error
            writeStream.on('finish', ()=>{
                console.log(`Descarga completada: ${info.videoDetails.title}`);
                res.json({estado: "Descarga completada"});
            });

            writeStream.on('error', (error)=>{
                console.error("Error al descargar", error);
                //res.json({estado: error});
            });

        }catch(error){
            console.error("Error:", error);
        }};

        downloadAudio(textInput, optionsAudio);
})

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO,()=>{
    console.log(`Escuchando puerto ${PUERTO}`);
});
