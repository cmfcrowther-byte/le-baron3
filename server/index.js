import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'inquiries.json');

const app = express();
app.use(cors());
app.use(express.json());

function ensureDataFile() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

function readInquiries() {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function writeInquiries(data) {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// POST /api/inquire — collect Inquire form submissions
app.post('/api/inquire', (req, res) => {
    try {
        const { name, email, company } = req.body || {};
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        const inquiries = readInquiries();
        inquiries.push({
            name: String(name).trim(),
            email: String(email).trim(),
            company: company != null ? String(company).trim() : '',
            submittedAt: new Date().toISOString(),
        });
        writeInquiries(inquiries);
        res.status(201).json({ ok: true });
    } catch (err) {
        console.error('POST /api/inquire', err);
        res.status(500).json({ error: 'Failed to save inquiry' });
    }
});

// Optional: GET /api/inquire — list submissions (for your use only; protect in production)
app.get('/api/inquire', (req, res) => {
    try {
        const inquiries = readInquiries();
        res.json(inquiries);
    } catch (err) {
        console.error('GET /api/inquire', err);
        res.status(500).json({ error: 'Failed to read inquiries' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    ensureDataFile();
    console.log(`Inquire API running at http://localhost:${PORT}`);
});
