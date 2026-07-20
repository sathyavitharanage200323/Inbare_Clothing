import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, "../../uploads");

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function uploadFile(file) {
    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, file.buffer, (err) => {
            if (err) return reject(err);
            resolve(filename); // Return filename as ID
        });
    });
}

export async function downloadFile(fileId) {
    const filepath = path.join(UPLOAD_DIR, fileId);

    if (!fs.existsSync(filepath)) {
        return null;
    }

    const stats = fs.statSync(filepath);
    const stream = fs.createReadStream(filepath);

    // Try to determine content type from extension
    const ext = path.extname(fileId).toLowerCase();
    const contentTypeMap = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml'
    };

    return {
        stream: stream,
        contentType: contentTypeMap[ext] || 'application/octet-stream',
        filename: fileId,
        size: stats.size
    };
}

export async function deleteFile(fileId) {
    const filepath = path.join(UPLOAD_DIR, fileId);

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filepath)) {
            return resolve(); // File doesn't exist, consider it deleted
        }

        fs.unlink(filepath, (err) => {
            if (err && err.code !== 'ENOENT') {
                return reject(err);
            }
            resolve();
        });
    });
}
