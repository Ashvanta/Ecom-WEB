import {Suspense, useEffect, useRef, useState} from 'react';
import {Await, NavLink, useNavigate} from 'react-router';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

/* =========================
   TYPES
========================= */

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

/* =========================
   HEADER
========================= */

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {menu} = header;

  const [isAtTop, setIsAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setIsAtTop(current < 50);

      if (current > lastScrollY && current > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(current);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const headerClassName = [
    'header',
    isAtTop && 'at-top',
    isHidden && 'header-hidden',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClassName}>
      <div className="header-inner">
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />

        <div className="header-center">
          <NavLink to="/" end prefetch="intent" className="logo-link">
            <h1 className="header-logo-text">Ashvanta</h1>
          </NavLink>
        </div>

        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </header>
  );
}

/* =========================
   HEADER MENU
========================= */

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: string;
  viewport: Viewport;
  publicStoreDomain: string;
}) {
  const className = `header-left header-menu-${viewport}`;
  const {close} = useAside();

  const items = menu?.items?.length ? menu.items : FALLBACK_HEADER_MENU.items;

  return (
    <nav className={className}>
      {viewport === 'mobile' && (
        <NavLink
          end
          to="/"
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
        >
          Home
        </NavLink>
      )}

      {items.map((item: any) => {
        if (!item?.title) return null;

        const rawUrl =
          item.url ?? item.resource?.url ?? item.resource?.handle ?? null;

        if (!rawUrl) return null;

        const url =
          rawUrl.includes('myshopify.com') ||
          rawUrl.includes(publicStoreDomain) ||
          rawUrl.includes(primaryDomainUrl)
            ? new URL(rawUrl).pathname
            : rawUrl;

        return (
          <NavLink
            key={item.id || item.title}
            to={url}
            end
            prefetch="intent"
            onClick={close}
            className="header-menu-item"
            style={activeLinkStyle}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/* =========================
   ICONS
========================= */

const IconUser = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconSearch = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const IconBag = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

/* =========================
   HEADER CTAs
========================= */

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-right header-ctas">
      <HeaderMenuMobileToggle />

      <NavLink to="/account" className="icon-btn">
        <Suspense fallback={<IconUser />}>
          <Await resolve={isLoggedIn}>{() => <IconUser />}</Await>
        </Suspense>
      </NavLink>

      <HeaderSearch />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();

  return (
    <button
      className="header-menu-mobile-toggle reset icon-btn"
      onClick={() => open('mobile')}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}

/* =========================
   SEARCH
========================= */

function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle('search-active', open);
    if (open) inputRef.current?.focus();

    return () => {
      document.body.classList.remove('search-active');
    };
  }, [open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = inputRef.current?.value?.trim();

    if (value) {
      navigate(`/products?q=${encodeURIComponent(value)}`);
      setOpen(false);
    }
  }

  return (
    <div
      className={`header-search ${open ? 'open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="icon-btn reset" aria-label="Search">
        <IconSearch />
      </button>

      <form onSubmit={submit} className="header-search-form">
        
        <input
          ref={inputRef}
          type="search"
          placeholder="ENTER KEYWORD" // Updated text
          autoComplete="off"
        />
      </form>
    </div>
  );
}

/* =========================
   CART
========================= */

function CartBadge() {
  const {open} = useAside();

  return (
    <a
      href="/cart"
      className="icon-btn"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
      }}
    >
      <IconBag />
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge />}>
      <Await resolve={cart}>
        <CartBadge />
      </Await>
    </Suspense>
  );
}

/* =========================
   FALLBACK MENU
========================= */

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/1',
  items: [
    {id: '1', title: 'Our Collection', url: '/collections/all'},
    {id: '2', title: 'Featured', url: '/collections/featured'},
    {id: '3', title: 'Sustainability', url: '/pages/sustainability'},
  ],
};

function activeLinkStyle({isActive}: {isActive: boolean}) {
  return {
    fontWeight: isActive ? '600' : '400',
    textDecoration: isActive ? 'underline' : 'none',
    textUnderlineOffset: '4px',
  };
}
