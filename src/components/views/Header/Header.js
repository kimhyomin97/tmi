import './public/Header.css';

function Header() {
  return (
      <>
        <header>
          <div>
              Header
          </div>
          <input class="burger-check" type="checkbox" id="burger-check" />
          <label class="burger-icon" for="burger-check"><span class="burger-sticks"></span></label>
          {/* <div class="menu"> */}
            {/* <div style="width: 200px"></div> */}
          {/* </div> */}
        </header>
      </>
  );
}

export default Header;
