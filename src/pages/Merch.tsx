import { useState } from 'react';
import products from '../data/products';
import type { CartItem, Product } from '../types';
import styles from './Merch.module.css';

const categoryEmoji: Record<string, string> = {
  Ropa: '👕',
  Gaming: '🖱️',
  Accesorios: '🎩',
};

const Merch = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <main className={styles.page}>
      <div className={styles.banner}>
        <span>🚚 Próximamente envíos a todo el país — Seguinos para novedades</span>
      </div>

      <div className={styles.header}>
        <div className="container">
          <p className={styles.eyebrow}>◈ Shop Oficial</p>
          <h1 className="section-title">La Bristol <span>Store</span></h1>
          <p className="section-subtitle">Equipate con la identidad del equipo</p>
        </div>
      </div>

      {/* Cart Button */}
      <button className={styles.cartBtn} onClick={() => setDrawerOpen(true)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        {totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems}</span>
        )}
      </button>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.imgWrap}>
                  <span className={styles.emoji}>{categoryEmoji[product.category] ?? '📦'}</span>
                  <span className={styles.categoryTag}>{product.category}</span>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.desc}>{product.description}</p>
                  <div className={styles.bottom}>
                    <span className={styles.price}>${product.price.toLocaleString('es-AR')}</span>
                    <button
                      className={styles.addBtn}
                      onClick={() => addToCart(product)}
                    >
                      + Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      {drawerOpen && (
        <div className={styles.overlay} onClick={() => setDrawerOpen(false)} />
      )}
      <aside className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <h2>Tu carrito</h2>
          <button className={styles.closeBtn} onClick={() => setDrawerOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <span className={styles.emptyIcon}>🛒</span>
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <div key={item.product.id} className={styles.cartItem}>
                  <div className={styles.cartItemEmoji}>
                    {categoryEmoji[item.product.category] ?? '📦'}
                  </div>
                  <div className={styles.cartItemInfo}>
                    <p className={styles.cartItemName}>{item.product.name}</p>
                    <p className={styles.cartItemPrice}>
                      ${item.product.price.toLocaleString('es-AR')} × {item.quantity}
                    </p>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.cartFooter}>
              <div className={styles.total}>
                <span>Total</span>
                <span className={styles.totalPrice}>${totalPrice.toLocaleString('es-AR')}</span>
              </div>
              <button className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Finalizar compra
              </button>
              <p className={styles.comingSoon}>Pasarela de pago próximamente</p>
            </div>
          </>
        )}
      </aside>
    </main>
  );
};

export default Merch;
