import express from "express";
import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";

export default function setupRoutes(app) {
    app.use(express.static('Public'));

    app.get('/download-data', (req, res) => {
        try {
            const zip = new AdmZip();
            const dataPath = path.resolve('Data');
            
            if (fs.existsSync(dataPath)) {
                zip.addLocalFolder(dataPath);
                const zipBuffer = zip.toBuffer();
                
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', 'attachment; filename=Data.zip');
                res.send(zipBuffer);
            } else {
                res.status(404).send('Data folder not found');
            }
        } catch (error) {
            console.error('Error creating zip:', error);
            res.status(500).send('Error creating zip file');
        }
    });
};