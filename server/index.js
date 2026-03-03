import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'inquiries.json');

// Simple admin auth (for the moment: username Fred, password Fredster)
const ADMIN_USERNAME = 'Fred';
const ADMIN_PASSWORD = 'Fredster';
const ADMIN_TOKEN = 'admin-session-token-le-baron'; // fixed token returned on login

const app = express();
app.use(cors());
app.use(express.json());

// Log all /api requests so we can see if login is reaching the server
app.use('/api', (req, res, next) => {
    console.log('[api]', req.method, req.url);
    next();
});

// Health check (no auth) — lets admin page verify it can reach the backend
app.get('/api/health', (req, res) => {
    res.json({ ok: true, message: 'Inquire API' });
});

function ensureDataFile() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

function readInquiries() {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    try {
        const data = JSON.parse(raw);
        const list = Array.isArray(data) ? data : [];
        return list.map((row) => ({
            ...row,
            contacted: row.contacted ?? false,
            dateResponded: row.dateResponded ?? null,
        }));
    } catch {
        return [];
    }
}

function writeInquiries(data) {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function normalizeInquiry(row) {
    return {
        name: row.name != null ? String(row.name).trim() : '',
        email: row.email != null ? String(row.email).trim() : '',
        company: row.company != null ? String(row.company).trim() : '',
        submittedAt: row.submittedAt || null,
        contacted: Boolean(row.contacted),
        dateResponded: row.dateResponded != null && row.dateResponded !== '' ? row.dateResponded : null,
    };
}

function ensureInquiryFields(inquiries) {
    return inquiries.map((row, index) => {
        const n = normalizeInquiry(row);
        return { id: index, ...n };
    });
}

function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (token !== ADMIN_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

// POST /api/inquire — collect Inquire form submissions (public)
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
            contacted: false,
            dateResponded: null,
        });
        writeInquiries(inquiries);
        res.status(201).json({ ok: true });
    } catch (err) {
        console.error('POST /api/inquire', err);
        res.status(500).json({ error: 'Failed to save inquiry' });
    }
});

// POST /api/admin/login — simple username/password auth
app.post('/api/admin/login', (req, res) => {
    const body = req.body || {};
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password.trim() : '';
    console.log('[admin/login] attempt, username:', username ? `${username.length} chars` : 'missing');
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        console.log('[admin/login] success');
        return res.json({ token: ADMIN_TOKEN });
    }
    console.log('[admin/login] rejected (wrong credentials)');
    res.status(401).json({ error: 'Invalid credentials' });
});

// GET /api/admin/inquiries — list all (protected)
app.get('/api/admin/inquiries', authMiddleware, (req, res) => {
    try {
        const inquiries = readInquiries();
        const withIds = ensureInquiryFields(inquiries);
        res.json(withIds);
    } catch (err) {
        console.error('GET /api/admin/inquiries', err);
        res.status(500).json({ error: 'Failed to read inquiries' });
    }
});

// PATCH /api/admin/inquiries/:id — update contacted / dateResponded (protected)
app.patch('/api/admin/inquiries/:id', authMiddleware, (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const inquiries = readInquiries();
        if (Number.isNaN(id) || id < 0 || id >= inquiries.length) {
            return res.status(404).json({ error: 'Inquiry not found' });
        }
        const { contacted } = req.body || {};
        if (typeof contacted === 'boolean') {
            inquiries[id].contacted = contacted;
            inquiries[id].dateResponded = contacted ? new Date().toISOString() : null;
        }
        writeInquiries(inquiries);
        const withIds = ensureInquiryFields(inquiries);
        res.json(withIds[id]);
    } catch (err) {
        console.error('PATCH /api/admin/inquiries/:id', err);
        res.status(500).json({ error: 'Failed to update inquiry' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    ensureDataFile();
    console.log(`Inquire API running at http://localhost:${PORT}`);
    console.log('  Routes: GET /api/health, POST /api/admin/login, GET/PATCH /api/admin/inquiries');
});
