export default function ShopTheLook() {
  return (
    <section className="shop-look">
      {/* Left: Editorial Image */}
      <div className="shop-look__editorial">
        <img
          src="/images/shop-look-editorial.jpg"
          alt="Editorial look"
          className="shop-look__image"
        />
      </div>

      {/* Right: Products */}
      <div className="shop-look__products">
        <h2 className="shop-look__title">SHOP THE LOOK</h2>

        <div className="shop-look__grid">
          <div className="shop-look__item">
             <div className="shop-look__item-image-wrapper">
            <img src="/images/product-1.jpg" alt="Product 1" />
          </div>
          </div>

          <div className="shop-look__item">
                         <div className="shop-look__item-image-wrapper">

            <img src="/images/product-2.jpg" alt="Product 2" />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
