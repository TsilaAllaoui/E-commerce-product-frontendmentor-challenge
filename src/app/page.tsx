import "./styles/page.scss";

const Home = () => {
  return (
    <div id="home">
      <div id="left">
        <div
          id="preview"
          style={{ backgroundImage: `url(images/image-product-1.jpg)` }}
        ></div>
        <div id="mini-preview">
          {[0, 1, 2, 3].map((i) => (
            <div
              className="thumbnail"
              style={{
                backgroundImage: `url(images/image-product-${i + 1}.jpg)`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div id="right"></div>
    </div>
  );
};

export default Home;
