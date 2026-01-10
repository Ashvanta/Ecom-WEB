import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

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
  const {shop, menu} = header;

  return (
    <header className="header">
      <div className="header-inner">

        {/* LEFT NAV */}
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />

        {/* CENTER LOGO */}
       <div className="header-center">
  <NavLink
    to="/"
    end
    prefetch="intent"
    aria-label="Home"
    className="logo-link"
  >
    <h1 className="header-logo-text">Ashvanta</h1>
  </NavLink>
</div>


        {/* RIGHT ACTIONS */}
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />

      </div>
    </header>
  );
}

/* =========================
   HEADER MENU (LEFT)
========================= */


export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-left header-menu-${viewport}`;
  const {close} = useAside();

  // ✅ ALWAYS USE SHOPIFY MENU AS SOURCE OF TRUTH
  const items = menu?.items?.length
    ? menu.items
    : FALLBACK_HEADER_MENU.items;

  return (
    <nav className={className} role="navigation">
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
        // Shopify sometimes nests links — we only want clickable ones
        if (!item?.title) return null;

        // Resolve URL safely
        const rawUrl =
          item.url ??
          item.resource?.url ??
          item.resource?.handle ??
          null;

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
   MINIMALIST SVGS
========================= */

const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const IconBag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);

/* =========================
   HEADER RIGHT CTAs
========================= */

function HeaderCtas({isLoggedIn, cart}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-right header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" className="icon-btn">
        <Suspense fallback={<IconUser />}>
          <Await resolve={isLoggedIn}>
            {() => <IconUser />}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button className="header-menu-mobile-toggle reset icon-btn" onClick={() => open('mobile')}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return <button className="icon-btn reset" onClick={() => open('search')}><IconSearch /></button>;
}

function CartBadge() {
  const {open} = useAside() as any;

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
    { id: '1', title: 'Our Collection', url: '/collections/all' },
    { id: '2', title: 'Featured', url: '/collections/featured' },
    { id: '3', title: 'Sustainability', url: '/pages/sustainability' },
  ],
};

function activeLinkStyle({isActive}: {isActive: boolean}) {
  return {
    fontWeight: isActive ? '600' : '400',
    textDecoration: isActive ? 'underline' : 'none',
    textUnderlineOffset: '4px'
  };
}