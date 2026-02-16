import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import logo from "../../assets/image/logo.png";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaAngleDown,
} from "react-icons/fa";
import "./header.css";
function Header() {
  const [active, setActive] = useState(null);
  return (
    <Navbar expand="md" className="custom-navbar py-3">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center gap-2">
          <img src={logo} width="120" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto gap-4">
            {/* home */}
            <NavDropdown
              title={
                <span>
                  Home <FaAngleDown size={12} />
                </span>
              }
              id="home"
              show={active === "home"}
              onMouseEnter={() => window.innerWidth > 768 && setActive("home")}
              onMouseLeave={() => window.innerWidth > 768 && setActive(null)}
              className="custom-dropdown"
            >
              <NavDropdown.Item>Home 1</NavDropdown.Item>
              <NavDropdown.Item>Home 2</NavDropdown.Item>
              <NavDropdown.Item>Home 3</NavDropdown.Item>
              <NavDropdown.Item>Home 4</NavDropdown.Item>
              <NavDropdown.Item>Home 5</NavDropdown.Item>
              <NavDropdown.Item>Home 6</NavDropdown.Item>
              <NavDropdown.Item>Home 7</NavDropdown.Item>
              <NavDropdown.Item>Home 8</NavDropdown.Item>
            </NavDropdown>
            {/* SHOP */}
            <NavDropdown
              title={
                <span>
                  Shop <FaAngleDown size={12} />
                </span>
              }
              id="shop"
              show={active === "shop"}
              onMouseEnter={() => {
                if (window.innerWidth > 768) setActive("shop");
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 768) {
                  setTimeout(() => setActive(null), 150);
                }
              }}
              className="mega-dropdown"
            >
              <Container className="mega-menu">
                <div className="row">
                  <div className="col-md-3">
                    <img
                      src="/src/assets/image/mega-shop.webp"
                      alt="promo"
                      className="mega-img"
                    />
                  </div>
                  <div className="col-md-3">
                    <img
                      src="/src/assets/image/mega-shop-2.webp"
                      alt="promo"
                      className="mega-img"
                    />
                  </div>
                  <div className="col-md-2">
                    <h6>LAYOUT</h6>
                    <NavDropdown.Item>Standard</NavDropdown.Item>
                    <NavDropdown.Item>Standard with Banner</NavDropdown.Item>
                    <NavDropdown.Item>Categoreis image1</NavDropdown.Item>
                    <NavDropdown.Item>Categoreis image2</NavDropdown.Item>
                    <NavDropdown.Item>Fullwidth</NavDropdown.Item>
                    <NavDropdown.Item>Listview</NavDropdown.Item>
                    <NavDropdown.Item>Simple</NavDropdown.Item>
                    <NavDropdown.Item>Masonry</NavDropdown.Item>
                    <NavDropdown.Item>Overrlay header</NavDropdown.Item>
                    <NavDropdown.Item>Collections list 1</NavDropdown.Item>
                    <NavDropdown.Item>Collections list 2</NavDropdown.Item>
                    <NavDropdown.Item>Collections silder</NavDropdown.Item>
                  </div>

                  <div className="col-md-2">
                    <h6>FILTER</h6>
                    <NavDropdown.Item>On Top</NavDropdown.Item>
                    <NavDropdown.Item>Dropdown</NavDropdown.Item>
                    <NavDropdown.Item>Side out</NavDropdown.Item>
                    <NavDropdown.Item>Drawer</NavDropdown.Item>
                    <NavDropdown.Item>Sidebar style 1</NavDropdown.Item>
                    <NavDropdown.Item>Sidebar style 2</NavDropdown.Item>
                    <NavDropdown.Item>Sidebar style 3</NavDropdown.Item>
                    <NavDropdown.Item>Sidebar style 4</NavDropdown.Item>
                    <NavDropdown.Item>Filter scroll</NavDropdown.Item>
                  </div>

                  <div className="col-md-2">
                    <h6>LOADER&CART</h6>
                    <NavDropdown.Item>shop Pagination</NavDropdown.Item>
                    <NavDropdown.Item>shop Load More button</NavDropdown.Item>
                    <NavDropdown.Item>shop Infinite Scrolling</NavDropdown.Item>
                    <NavDropdown.Item>cart Dropdown</NavDropdown.Item>
                    <NavDropdown.Item>Cart side out</NavDropdown.Item>
                    <NavDropdown.Item>cart page</NavDropdown.Item>
                  </div>
                </div>
              </Container>
            </NavDropdown>
            {/* product */}
            <NavDropdown
              title={
                <span>
                  Product <FaAngleDown size={12} />
                </span>
              }
              id="product"
              show={active === "product"}
              onMouseEnter={() => {
                if (window.innerWidth > 768) setActive("product");
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 768) {
                  setTimeout(() => setActive(null), 150);
                }
              }}
              className="mega-dropdown"
            >
              <Container className="mega-menu">
                <div className="row">
                  <div className="col-md-3">
                    <h6>PRODUCT LAYOUT</h6>
                    <NavDropdown.Item>Gird cloumn 1</NavDropdown.Item>
                    <NavDropdown.Item>Gird cloumn 2</NavDropdown.Item>
                    <NavDropdown.Item>Gird Modern</NavDropdown.Item>
                    <NavDropdown.Item>Grid Sticky</NavDropdown.Item>
                    <NavDropdown.Item>Silder full width</NavDropdown.Item>
                    <NavDropdown.Item>Bottom Thumbnails</NavDropdown.Item>
                    <NavDropdown.Item>Without Thumbnails</NavDropdown.Item>
                    <NavDropdown.Item>Left sidebar</NavDropdown.Item>
                    <NavDropdown.Item>Right sidebar</NavDropdown.Item>
                    <NavDropdown.Item>Group product</NavDropdown.Item>
                    <NavDropdown.Item>Tab Information</NavDropdown.Item>
                    <NavDropdown.Item>
                      Collabsible tabs Information
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      Full content Information
                    </NavDropdown.Item>
                    <NavDropdown.Item>Vertical Information</NavDropdown.Item>
                  </div>

                  <div className="col-md-3">
                    <h6>FRETURED</h6>
                    <NavDropdown.Item>Pre-order product</NavDropdown.Item>
                    <NavDropdown.Item>Sticky add to cart</NavDropdown.Item>
                    <NavDropdown.Item>Video</NavDropdown.Item>
                    <NavDropdown.Item>3D,AR Models</NavDropdown.Item>
                    <NavDropdown.Item>Product 360</NavDropdown.Item>
                    <NavDropdown.Item>Countdown Timer</NavDropdown.Item>
                    <NavDropdown.Item>
                      Frequntly Bought Together v1
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      Frequntly Bought Together v2
                    </NavDropdown.Item>
                    <NavDropdown.Item>Buy More save More</NavDropdown.Item>
                    <NavDropdown.Item>Real Time vistors</NavDropdown.Item>
                    <NavDropdown.Item>Stock Countdown</NavDropdown.Item>
                    <NavDropdown.Item>
                      Back in stock notification
                    </NavDropdown.Item>
                    <NavDropdown.Item>Dynmic Checkout button</NavDropdown.Item>
                    <NavDropdown.Item>Trust Badge</NavDropdown.Item>
                    <NavDropdown.Item>Deilvery Informayion</NavDropdown.Item>
                  </div>
                  <div className="col-md-3">
                    <h6>FRETURED</h6>
                    <NavDropdown.Item>Product upsell features</NavDropdown.Item>
                    <NavDropdown.Item>Product pickup</NavDropdown.Item>
                    <NavDropdown.Item>Size Guide HTML</NavDropdown.Item>
                    <NavDropdown.Item>Shipping info</NavDropdown.Item>
                    <NavDropdown.Item>Ask a Question</NavDropdown.Item>
                    <NavDropdown.Item>Product Variable image</NavDropdown.Item>
                    <NavDropdown.Item>Product Variable color</NavDropdown.Item>
                    <NavDropdown.Item>
                      Product Variable color and checkbox
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      Product Variable dropdown{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      Product Variable color and dropdown
                    </NavDropdown.Item>
                    <NavDropdown.Item>Product Variable Box</NavDropdown.Item>
                    <NavDropdown.Item>
                      Product Variable Checkbox
                    </NavDropdown.Item>
                  </div>
                  <div className="col-md-3">
                    <h6>PRODUCT CARD</h6>
                    <NavDropdown.Item>Scale hover</NavDropdown.Item>
                    <NavDropdown.Item>Slider hover</NavDropdown.Item>
                    <NavDropdown.Item>Fadien hover</NavDropdown.Item>
                    <NavDropdown.Item>Zoom hover</NavDropdown.Item>
                    <NavDropdown.Item>Icons on hover</NavDropdown.Item>
                    <NavDropdown.Item>Quick view button</NavDropdown.Item>
                    <NavDropdown.Item>Icon and add to cart</NavDropdown.Item>
                    <NavDropdown.Item>Add to cart button</NavDropdown.Item>
                    <NavDropdown.Item>Whishlist on the bottom</NavDropdown.Item>
                    <NavDropdown.Item>Daul button</NavDropdown.Item>
                    <NavDropdown.Item>Info in hover</NavDropdown.Item>
                    <NavDropdown.Item>Quick shop button</NavDropdown.Item>
                  </div>
                </div>
              </Container>
            </NavDropdown>
            {/* blog */}
            <NavDropdown
              title={
                <span>
                  Blog <FaAngleDown size={12} />
                </span>
              }
              id="blog"
              show={active === "blog"}
              onMouseEnter={() => window.innerWidth > 768 && setActive("blog")}
              onMouseLeave={() =>
                window.innerWidth > 768 &&
                setTimeout(() => setActive(null), 150)
              }
              className="mega-dropdown"
            >
              <Container className="mega-menu">
                <div className="row">
                  {/* LEFT LIST */}
                  <div className="col-md-5">
                    <h6>LAYOUT & POST</h6>

                    <NavDropdown.Item>Blog Standard</NavDropdown.Item>
                    <NavDropdown.Item>Blog Grid</NavDropdown.Item>
                    <NavDropdown.Item>Blog Grid Mix</NavDropdown.Item>
                    <NavDropdown.Item>List</NavDropdown.Item>
                    <NavDropdown.Item>Post Sidebar</NavDropdown.Item>
                    <NavDropdown.Item>Post One Column</NavDropdown.Item>
                    <NavDropdown.Item>Post Parallax Image</NavDropdown.Item>
                    <NavDropdown.Item>Post Sticky</NavDropdown.Item>
                    <NavDropdown.Item>Post Simple Title</NavDropdown.Item>
                  </div>

                  {/* RIGHT BLOG IMAGES (STACKED) */}
                  <div className="col-md-7">
                    <div className="blog-card mb-4">
                      <img src="/src/assets/image/blog-1.webp" alt="blog" />
                      <div className="blog-overlay">
                        <span>BUSINESS TIPS</span>
                        <h5>THE BEST ICE CREAM YOU’LL NEVER EAT</h5>
                      </div>
                    </div>

                    <div className="blog-card">
                      <img src="/src/assets/image/blog-2.webp" alt="blog" />
                      <div className="blog-overlay">
                        <span>BUSINESS TIPS</span>
                        <h5>FANCY FIGS? MAKE THIS ICE CREAM</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </NavDropdown>
            {/* featured */}
            <NavDropdown
              title={
                <span>
                  Featured <FaAngleDown size={12} />
                </span>
              }
              id="featured"
              show={active === "featured"}
              onMouseEnter={() =>
                window.innerWidth > 768 && setActive("featured")
              }
              onMouseLeave={() =>
                window.innerWidth > 768 &&
                setTimeout(() => setActive(null), 150)
              }
              className="mega-dropdown"
            >
              <Container className="mega-menu">
                <div className="row">
                  {/* PAGE */}
                  <div className="col-md-3">
                    <h6>PAGE</h6>
                    <NavDropdown.Item>About Us</NavDropdown.Item>
                    <NavDropdown.Item>Contact Us</NavDropdown.Item>
                    <NavDropdown.Item>Faqs</NavDropdown.Item>
                    <NavDropdown.Item>Faqs 2</NavDropdown.Item>
                    <NavDropdown.Item>Wishlist</NavDropdown.Item>
                    <NavDropdown.Item>404 Error</NavDropdown.Item>
                  </div>
                  {/* PORTFOLIO */}
                  <div className="col-md-3">
                    <h6>PORTFOLIO</h6>
                    <NavDropdown.Item>2 Columns</NavDropdown.Item>
                    <NavDropdown.Item>3 Columns</NavDropdown.Item>
                    <NavDropdown.Item>4 Columns</NavDropdown.Item>
                    <NavDropdown.Item>Masonry Layout</NavDropdown.Item>
                  </div>
                  {/* FEATURED */}
                  <div className="col-md-3">
                    <h6>FEATURED</h6>
                    <NavDropdown.Item>Popup Newsletter</NavDropdown.Item>
                    <NavDropdown.Item>Popup Compare</NavDropdown.Item>
                    <NavDropdown.Item>Cookies Law Info</NavDropdown.Item>
                    <NavDropdown.Item>RTL Layout</NavDropdown.Item>
                  </div>
                  {/* INSTAGRAM SHOP */}
                  <div className="col-md-3">
                    <h6>INSTAGRAM SHOP</h6>
                    <NavDropdown.Item>Instagram Shop Slider</NavDropdown.Item>
                    <NavDropdown.Item> Instagram Shop Grid Modern</NavDropdown.Item>
                    <NavDropdown.Item>Instagram Shop in Page</NavDropdown.Item>
                  </div>
                </div>
              </Container>
            </NavDropdown>
          </Nav>
          <div className="nav-icons d-none d-md-flex gap-3 mt-3 mt-md-0">
            <FaSearch />
            <FaUser />
            <FaHeart />
            <FaShoppingCart />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
