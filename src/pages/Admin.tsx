import { useState, useEffect } from 'react';
import styles from './Admin.module.css';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

interface ApiPlayer {
  id: string;
  nickname: string;
  realName: string;
  role: string;
  game: string;
  bio: string;
  traits: string[];
  stats: { kd: number; winrate: number; hoursPlayed: number; tournamentsPlayed: number };
  image: string;
  photo: string;
  photoPosition: string;
}

// ─── helpers ────────────────────────────────────────────────────────────────

const authHeaders = (token: string) => ({ Authorization: `Bearer ${token}` });

const jsonHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

// ─── Login ──────────────────────────────────────────────────────────────────

const AdminLogin = ({ onLogin }: { onLogin: (t: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const r = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await r.json();
      if (!r.ok) { setError(data.error ?? 'Error al iniciar sesión'); return; }
      sessionStorage.setItem('admin_token', data.token);
      onLogin(data.token);
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginCard} onSubmit={submit}>
        <h1 className={styles.loginTitle}>La Bristol <span>Admin</span></h1>
        <p className={styles.loginSub}>Panel de gestión</p>
        {error && <p className={styles.formError}>{error}</p>}
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Contraseña</label>
          <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className={styles.btnPrimary} type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

// ─── Products Tab ────────────────────────────────────────────────────────────

const emptyProductForm = { name: '', description: '', price: '', category: '' };

const ProductsTab = ({ token }: { token: string }) => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ApiProduct | null>(null);
  const [form, setForm] = useState(emptyProductForm);
  const [formError, setFormError] = useState('');
  const [uploading, setUploading] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch(`${API}/api/products`)
      .then(r => r.json()).then(setProducts).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyProductForm); setFormError(''); setShowForm(true); };
  const openEdit = (p: ApiProduct) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description, price: String(p.price), category: p.category });
    setFormError('');
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const body = { name: form.name, description: form.description, price: Number(form.price), category: form.category };
    try {
      const url = editing ? `${API}/api/products/${editing.id}` : `${API}/api/products`;
      const method = editing ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: jsonHeaders(token), body: JSON.stringify(body) });
      const data = await r.json();
      if (!r.ok) { setFormError(data.error ?? 'Error al guardar'); return; }
      closeForm();
      load();
    } catch {
      setFormError('Error de conexión');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return;
    await fetch(`${API}/api/products/${id}`, { method: 'DELETE', headers: authHeaders(token) });
    load();
  };

  const uploadImages = async (id: string, files: FileList) => {
    if (!files.length) return;
    setUploading(id);
    const fd = new FormData();
    Array.from(files).forEach(f => fd.append('images', f));
    await fetch(`${API}/api/products/${id}/images`, { method: 'POST', headers: authHeaders(token), body: fd });
    setUploading(null);
    load();
  };

  const deleteImage = async (id: string, url: string) => {
    if (!confirm('¿Eliminar esta imagen?')) return;
    await fetch(`${API}/api/products/${id}/images`, {
      method: 'DELETE', headers: jsonHeaders(token), body: JSON.stringify({ url }),
    });
    load();
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h2 className={styles.tabTitle}>Productos</h2>
        <button className={styles.btnPrimary} onClick={openCreate}>+ Agregar producto</button>
      </div>

      {showForm && (
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>{editing ? 'Editar producto' : 'Nuevo producto'}</h3>
          <form onSubmit={saveProduct} className={styles.formGrid}>
            {formError && <p className={`${styles.formError} ${styles.formErrorFull}`}>{formError}</p>}
            <div className={styles.field}>
              <label className={styles.label}>Nombre</label>
              <input className={styles.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Categoría</label>
              <input className={styles.input} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Precio (ARS)</label>
              <input className={styles.input} type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
            </div>
            <div className={`${styles.field} ${styles.fieldFull}`}>
              <label className={styles.label}>Descripción</label>
              <textarea className={styles.textarea} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} />
            </div>
            <div className={styles.formActions}>
              <button className={styles.btnPrimary} type="submit">Guardar</button>
              <button className={styles.btnSecondary} type="button" onClick={closeForm}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p className={styles.status}>Cargando...</p> : (
        <div className={styles.list}>
          {products.map(p => (
            <div key={p.id} className={styles.listItem}>
              <div className={styles.listItemHeader}>
                <div>
                  <p className={styles.itemName}>{p.name}</p>
                  <p className={styles.itemMeta}>{p.category} · ${p.price.toLocaleString('es-AR')}</p>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.btnEdit} onClick={() => openEdit(p)}>Editar</button>
                  <button className={styles.btnDelete} onClick={() => deleteProduct(p.id)}>Eliminar</button>
                </div>
              </div>

              <div className={styles.imagesSection}>
                <p className={styles.imagesLabel}>Imágenes ({p.images.length})</p>
                <div className={styles.imagesGrid}>
                  {p.images.map(url => (
                    <div key={url} className={styles.imgThumbWrap}>
                      <img src={url} alt="" className={styles.imgThumb} />
                      <button className={styles.imgDelete} onClick={() => deleteImage(p.id, url)}>✕</button>
                    </div>
                  ))}
                  <label className={styles.imgUploadBtn}>
                    {uploading === p.id ? '⏳' : '+ Imágenes'}
                    <input type="file" accept="image/*" multiple hidden
                      onChange={e => e.target.files && uploadImages(p.id, e.target.files)} />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Players Tab ─────────────────────────────────────────────────────────────

const emptyPlayerForm = {
  nickname: '', realName: '', role: '', game: '', bio: '',
  traits: '', kd: '', winrate: '', hoursPlayed: '', tournamentsPlayed: '', photoPosition: '',
};

const PlayersTab = ({ token }: { token: string }) => {
  const [players, setPlayers] = useState<ApiPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ApiPlayer | null>(null);
  const [form, setForm] = useState(emptyPlayerForm);
  const [formError, setFormError] = useState('');
  const [uploading, setUploading] = useState<{ id: string; field: 'image' | 'photo' } | null>(null);

  const load = () => {
    setLoading(true);
    fetch(`${API}/api/players`)
      .then(r => r.json()).then(setPlayers).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyPlayerForm); setFormError(''); setShowForm(true); };
  const openEdit = (p: ApiPlayer) => {
    setEditing(p);
    setForm({
      nickname: p.nickname, realName: p.realName, role: p.role, game: p.game, bio: p.bio,
      traits: p.traits.join(', '),
      kd: String(p.stats.kd), winrate: String(p.stats.winrate),
      hoursPlayed: String(p.stats.hoursPlayed), tournamentsPlayed: String(p.stats.tournamentsPlayed),
      photoPosition: p.photoPosition,
    });
    setFormError('');
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const f = (key: keyof typeof emptyPlayerForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const savePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const body = {
      nickname: form.nickname, realName: form.realName, role: form.role, game: form.game,
      bio: form.bio, traits: form.traits, photoPosition: form.photoPosition,
      stats: { kd: Number(form.kd), winrate: Number(form.winrate), hoursPlayed: Number(form.hoursPlayed), tournamentsPlayed: Number(form.tournamentsPlayed) },
    };
    try {
      const url = editing ? `${API}/api/players/${editing.id}` : `${API}/api/players`;
      const method = editing ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: jsonHeaders(token), body: JSON.stringify(body) });
      const data = await r.json();
      if (!r.ok) { setFormError(data.error ?? 'Error al guardar'); return; }
      closeForm();
      load();
    } catch {
      setFormError('Error de conexión');
    }
  };

  const deletePlayer = async (id: string) => {
    if (!confirm('¿Eliminar este jugador?')) return;
    await fetch(`${API}/api/players/${id}`, { method: 'DELETE', headers: authHeaders(token) });
    load();
  };

  const uploadPlayerFile = async (id: string, field: 'image' | 'photo', file: File) => {
    setUploading({ id, field });
    const fd = new FormData();
    fd.append(field, file);
    await fetch(`${API}/api/players/${id}/${field}`, { method: 'POST', headers: authHeaders(token), body: fd });
    setUploading(null);
    load();
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h2 className={styles.tabTitle}>Jugadores</h2>
        <button className={styles.btnPrimary} onClick={openCreate}>+ Agregar jugador</button>
      </div>

      {showForm && (
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>{editing ? 'Editar jugador' : 'Nuevo jugador'}</h3>
          <form onSubmit={savePlayer} className={styles.formGrid}>
            {formError && <p className={`${styles.formError} ${styles.formErrorFull}`}>{formError}</p>}
            <div className={styles.field}>
              <label className={styles.label}>Nickname</label>
              <input className={styles.input} value={form.nickname} onChange={f('nickname')} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Nombre real</label>
              <input className={styles.input} value={form.realName} onChange={f('realName')} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Rol</label>
              <input className={styles.input} value={form.role} onChange={f('role')} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Juego/s</label>
              <input className={styles.input} value={form.game} onChange={f('game')} required />
            </div>
            <div className={`${styles.field} ${styles.fieldFull}`}>
              <label className={styles.label}>Biografía</label>
              <textarea className={styles.textarea} value={form.bio} onChange={f('bio')} rows={2} />
            </div>
            <div className={`${styles.field} ${styles.fieldFull}`}>
              <label className={styles.label}>Características (separadas por coma)</label>
              <input className={styles.input} value={form.traits} onChange={f('traits')} placeholder="Trait 1, Trait 2, ..." />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>K/D</label>
              <input className={styles.input} type="number" step="0.01" value={form.kd} onChange={f('kd')} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Win Rate (%)</label>
              <input className={styles.input} type="number" value={form.winrate} onChange={f('winrate')} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Horas jugadas</label>
              <input className={styles.input} type="number" value={form.hoursPlayed} onChange={f('hoursPlayed')} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Torneos</label>
              <input className={styles.input} type="number" value={form.tournamentsPlayed} onChange={f('tournamentsPlayed')} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Photo position (ej: center 30%)</label>
              <input className={styles.input} value={form.photoPosition} onChange={f('photoPosition')} placeholder="center center" />
            </div>
            <div className={styles.formActions}>
              <button className={styles.btnPrimary} type="submit">Guardar</button>
              <button className={styles.btnSecondary} type="button" onClick={closeForm}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p className={styles.status}>Cargando...</p> : (
        <div className={styles.list}>
          {players.map(p => (
            <div key={p.id} className={styles.listItem}>
              <div className={styles.listItemHeader}>
                <div className={styles.playerMeta}>
                  {p.image
                    ? <img src={p.image} alt={p.nickname} className={styles.playerAvatar} />
                    : <div className={styles.playerAvatarPlaceholder}>{p.nickname.slice(0, 2).toUpperCase()}</div>
                  }
                  <div>
                    <p className={styles.itemName}>{p.nickname}</p>
                    <p className={styles.itemMeta}>{p.realName} · {p.role}</p>
                  </div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.btnEdit} onClick={() => openEdit(p)}>Editar</button>
                  <button className={styles.btnDelete} onClick={() => deletePlayer(p.id)}>Eliminar</button>
                </div>
              </div>

              <div className={styles.playerImages}>
                <div className={styles.playerImageField}>
                  <p className={styles.imagesLabel}>Avatar</p>
                  {p.image && <img src={p.image} alt="avatar" className={styles.playerImgPreview} />}
                  <label className={styles.imgUploadBtn}>
                    {uploading?.id === p.id && uploading.field === 'image' ? '⏳' : p.image ? 'Reemplazar' : '+ Subir avatar'}
                    <input type="file" accept="image/*" hidden
                      onChange={e => e.target.files?.[0] && uploadPlayerFile(p.id, 'image', e.target.files[0])} />
                  </label>
                </div>
                <div className={styles.playerImageField}>
                  <p className={styles.imagesLabel}>Foto de fondo</p>
                  {p.photo && <img src={p.photo} alt="fondo" className={styles.playerImgPreview} />}
                  <label className={styles.imgUploadBtn}>
                    {uploading?.id === p.id && uploading.field === 'photo' ? '⏳' : p.photo ? 'Reemplazar' : '+ Subir foto'}
                    <input type="file" accept="image/*" hidden
                      onChange={e => e.target.files?.[0] && uploadPlayerFile(p.id, 'photo', e.target.files[0])} />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Panel ───────────────────────────────────────────────────────────────────

const AdminPanel = ({ token, onLogout }: { token: string; onLogout: () => void }) => {
  const [tab, setTab] = useState<'products' | 'players'>('products');

  return (
    <div className={styles.panel}>
      <header className={styles.panelHeader}>
        <span className={styles.panelLogo}>La Bristol <span>Admin</span></span>
        <button className={styles.logoutBtn} onClick={onLogout}>Cerrar sesión</button>
      </header>
      <nav className={styles.tabs}>
        <button className={`${styles.tab}${tab === 'products' ? ` ${styles.tabActive}` : ''}`} onClick={() => setTab('products')}>Productos</button>
        <button className={`${styles.tab}${tab === 'players' ? ` ${styles.tabActive}` : ''}`} onClick={() => setTab('players')}>Jugadores</button>
      </nav>
      <div className={styles.panelBody}>
        {tab === 'products' ? <ProductsTab token={token} /> : <PlayersTab token={token} />}
      </div>
    </div>
  );
};

// ─── Root ────────────────────────────────────────────────────────────────────

const Admin = () => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('admin_token'));

  const handleLogin = (t: string) => setToken(t);
  const handleLogout = () => { sessionStorage.removeItem('admin_token'); setToken(null); };

  if (!token) return <AdminLogin onLogin={handleLogin} />;
  return <AdminPanel token={token} onLogout={handleLogout} />;
};

export default Admin;
