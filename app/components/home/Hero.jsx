import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="hero-editorial">
      <img
        src="/images/hero-editorial.jpg"
        alt="Ashvanta editorial campaign"
        className="hero-editorial__image"
        loading="eager"
      />

      <div className="hero-editorial__overlay">
        <span className="hero-editorial__eyebrow">
          WINTER 2025
        </span>

        <h1 className="hero-editorial__title">
          MODERN ESSENTIALS
        </h1>

        <div className="hero-editorial__actions">
          <Link
            to="/pages/lookbook"
            className="hero-editorial__btn outline"
          >
            Discover the Lookbook
          </Link>

          <Link
            to="/collections/new"
            className="hero-editorial__btn"
          >
            Shop
          </Link>
        </div>
      </div>
    </section>
  );
}
