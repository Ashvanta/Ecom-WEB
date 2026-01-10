<header className="header">
  <div className="header-inner">

    {/* LEFT NAV */}
    <nav className="header-left" role="navigation">
      <NavLink to="/collections" className="nav-item">
        Collections
      </NavLink>

      <NavLink to="Our Collections" className="nav-item has-dropdown">
        Our Collections
        {/* dropdown goes here */}
      </NavLink>

      <NavLink to="Featured" className="nav-item has-dropdown">
        Featured
      </NavLink>

      <NavLink to="sustainability" className="nav-item has-dropdown">
        Sustainability
      </NavLink>
    </nav>

    {/* CENTER LOGO */}
    <div className="header-center">
      <NavLink to="/" aria-label="Home">
        <Logo />
      </NavLink>
    </div>

    {/* RIGHT ACTIONS */}
    <nav className="header-right" role="navigation">
      <button className="icon-btn" aria-label="Search">
        <SearchIcon />
      </button>

      <button className="icon-btn" aria-label="Cart">
        <BagIcon />
      </button>

      <NavLink to="/account" className="icon-btn" aria-label="Profile">
        <ProfileIcon />
      </NavLink>
    </nav>

  </div>
</header>
