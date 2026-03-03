import React, { useState, useEffect, useCallback } from 'react';

const TOKEN_KEY = 'admin_inquire_token';
// When on localhost, always call the API server directly (port 3001)
const API_BASE =
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? 'http://localhost:3001'
        : '';

function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
}

function api(url, options = {}) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(API_BASE + url, { ...options, headers });
}

// Small copy icon (SVG) — Lisbon minimal style
function CopyIcon({ className = '' }) {
    return (
        <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    );
}

function formatDate(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function CopyButton({ text, label }) {
    const [copied, setCopied] = useState(false);
    const copy = useCallback(() => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }, [text]);
    return (
        <button
            type="button"
            onClick={copy}
            className="p-1.5 rounded border border-stone-light/60 bg-paper text-stone hover:text-charcoal hover:border-stone transition-colors"
            title={`Copy ${label}`}
            aria-label={`Copy ${label}`}
        >
            {copied ? <span className="text-[10px] text-primary">OK</span> : <CopyIcon />}
        </button>
    );
}

function LoginForm({ onSuccess, error, setError }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiStatus, setApiStatus] = useState(null); // null | 'ok' | 'fail'

    // On mount, verify we can reach the API (when on localhost)
    useEffect(() => {
        if (API_BASE !== 'http://localhost:3001') return;
        fetch(API_BASE + '/api/health')
            .then((r) => (r.ok ? setApiStatus('ok') : setApiStatus('fail')))
            .catch(() => setApiStatus('fail'));
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await api('/api/admin/login', {
                method: 'POST',
                body: JSON.stringify({ username: username.trim(), password: password.trim() }),
            });
            const text = await res.text();
            const data = text ? (() => { try { return JSON.parse(text); } catch { return {}; } })() : {};
            if (!res.ok) {
                setError(data.error || `Login failed (${res.status})`);
                return;
            }
            if (data.token) {
                setToken(data.token);
                onSuccess();
            } else {
                setError('Invalid response');
            }
        } catch (err) {
            setError('Network error. Is the server running on port 3001?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-6">
            <div className="w-full max-w-sm">
                <h1 className="font-serif text-2xl text-charcoal uppercase tracking-[0.18em] mb-2 text-center">
                    Project Inquiries
                </h1>
                <p className="text-[11px] uppercase tracking-widest text-stone/80 text-center mb-8">Admin</p>
                {API_BASE && (
                    <p className="text-[10px] text-stone/70 text-center mb-2">
                        API: {API_BASE} — {apiStatus === 'ok' ? 'reachable' : apiStatus === 'fail' ? 'not reachable (start server: npm run server)' : 'checking…'}
                    </p>
                )}
                <form onSubmit={submit} className="space-y-4 border border-stone-light/60 rounded-sm p-6 bg-paper">
                    {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                    )}
                    <div>
                        <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Email / Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2.5 bg-transparent border border-stone-light text-charcoal text-sm focus:border-primary focus:outline-none"
                            required
                            autoComplete="username"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2.5 bg-transparent border border-stone-light text-charcoal text-sm focus:border-primary focus:outline-none"
                            required
                            autoComplete="current-password"
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2.5 bg-charcoal text-paper text-xs uppercase tracking-widest hover:bg-primary transition-colors disabled:opacity-60"
                    >
                        {loading ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
}

function Dashboard() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInquiries = useCallback(async () => {
        setError(null);
        try {
            const res = await api('/api/admin/inquiries');
            if (res.status === 401) {
                clearToken();
                window.location.reload();
                return;
            }
            const data = await res.json().catch(() => []);
            if (!res.ok) {
                setError(Array.isArray(data) ? 'Failed to load' : (data.error || 'Failed to load'));
                return;
            }
            setInquiries(Array.isArray(data) ? data : []);
        } catch {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]);

    const setContacted = async (id, contacted) => {
        try {
            const res = await api(`/api/admin/inquiries/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ contacted }),
            });
            if (res.status === 401) {
                clearToken();
                window.location.reload();
                return;
            }
            const updated = await res.json().catch(() => null);
            if (updated) {
                setInquiries((prev) => prev.map((row) => (row.id === id ? { ...row, contacted: updated.contacted, dateResponded: updated.dateResponded } : row)));
            } else {
                fetchInquiries();
            }
        } catch {
            fetchInquiries();
        }
    };

    const exportCsv = () => {
        const headers = ['Name', 'Email', 'Company Name', 'Date Received', 'Contacted', 'Date Responded'];
        const rows = inquiries.map((r) => [
            r.name ?? '',
            r.email ?? '',
            r.company ?? '',
            r.submittedAt ?? '',
            r.contacted ? 'Yes' : 'No',
            r.dateResponded ?? '',
        ]);
        const escape = (v) => {
            const s = String(v);
            if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
            return s;
        };
        const csv = [headers.map(escape).join(','), ...rows.map((r) => r.map(escape).join(','))].join('\r\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const logout = () => {
        clearToken();
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <p className="text-stone text-sm uppercase tracking-widest">Loading…</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper text-charcoal">
            <header className="border-b border-stone-light/60 bg-paper/95 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                    <h1 className="font-serif text-xl sm:text-2xl text-charcoal uppercase tracking-[0.18em]">
                        Project Inquiries
                    </h1>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={exportCsv}
                            className="px-3 py-2 text-[11px] uppercase tracking-widest border border-stone-light text-stone hover:text-charcoal hover:border-stone transition-colors"
                        >
                            Export CSV
                        </button>
                        <button
                            type="button"
                            onClick={logout}
                            className="px-3 py-2 text-[11px] uppercase tracking-widest text-stone hover:text-charcoal transition-colors"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
                {error && (
                    <p className="text-red-600 text-sm mb-4">{error}</p>
                )}

                {inquiries.length === 0 && !error ? (
                    <p className="text-stone text-sm py-12 text-center">No inquiries yet.</p>
                ) : (
                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <table className="w-full border-collapse text-left min-w-[640px]">
                            <thead>
                                <tr className="border-b border-stone-light">
                                    <th className="text-[11px] uppercase tracking-widest text-stone font-normal py-3 pr-2">Name</th>
                                    <th className="text-[11px] uppercase tracking-widest text-stone font-normal py-3 pr-2">Email</th>
                                    <th className="text-[11px] uppercase tracking-widest text-stone font-normal py-3 pr-2">Company</th>
                                    <th className="text-[11px] uppercase tracking-widest text-stone font-normal py-3 pr-2">Date Received</th>
                                    <th className="text-[11px] uppercase tracking-widest text-stone font-normal py-3 pr-2 w-24">Contacted</th>
                                    <th className="text-[11px] uppercase tracking-widest text-stone font-normal py-3 pr-2">Date Responded</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.map((row) => (
                                    <tr key={row.id} className="border-b border-stone-light/60 hover:bg-stone-light/10 transition-colors">
                                        <td className="py-3 pr-2 align-middle">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-charcoal truncate max-w-[120px] sm:max-w-[180px]">{row.name || '—'}</span>
                                                <CopyButton text={row.name} label="name" />
                                            </div>
                                        </td>
                                        <td className="py-3 pr-2 align-middle">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-charcoal truncate max-w-[140px] sm:max-w-[200px]">{row.email || '—'}</span>
                                                <CopyButton text={row.email} label="email" />
                                            </div>
                                        </td>
                                        <td className="py-3 pr-2 align-middle">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-stone truncate max-w-[100px] sm:max-w-[160px]">{row.company || '—'}</span>
                                                <CopyButton text={row.company} label="company" />
                                            </div>
                                        </td>
                                        <td className="py-3 pr-2 text-sm text-stone whitespace-nowrap">{formatDate(row.submittedAt)}</td>
                                        <td className="py-3 pr-2">
                                            <input
                                                type="checkbox"
                                                checked={Boolean(row.contacted)}
                                                onChange={(e) => setContacted(row.id, e.target.checked)}
                                                className="w-4 h-4 rounded border-stone-light text-primary focus:ring-primary/30"
                                                aria-label="Contacted"
                                            />
                                        </td>
                                        <td className="py-3 pr-2 text-sm text-stone whitespace-nowrap">{formatDate(row.dateResponded)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(!!getToken());
    const [loginError, setLoginError] = useState(null);

    if (!authenticated) {
        return (
            <LoginForm
                onSuccess={() => setAuthenticated(true)}
                error={loginError}
                setError={setLoginError}
            />
        );
    }

    return <Dashboard />;
}
