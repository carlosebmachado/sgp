import React from 'react';
import Header from '../Header';
import '../../styles/Home.css';

function Home() {
  return (
    <div className="Home">
      <Header />
      <div className="Container">
        <div className="Box">
          <h2>Bem vindo ao SGP</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis nisi leo, et luctus tellus placerat ac. Sed sollicitudin tincidunt est eget cursus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam maximus massa odio, non luctus orci euismod id. Morbi iaculis justo eu ultricies ultrices. Pellentesque augue lectus, volutpat id risus et, accumsan tincidunt eros. Pellentesque in est sit amet turpis mollis consequat in pellentesque purus. Integer at lectus in ligula blandit consequat. Mauris viverra vitae arcu eu molestie. Donec suscipit ex ut dictum condimentum. Etiam lorem metus, semper in dolor vel, hendrerit finibus nulla. Proin tempor pharetra tincidunt.</p>
          <a href="/products">Acessar a ferramenta.</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
