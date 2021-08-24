import { useEffect, useState } from 'react';
import './public/Header.css';

function Header() {
  const [trigger, setTrigger] = useState(true);

  // const menuTrigger = document.querySelector('.header_menu_trigger');

  // menuTrigger.addEventListener('click', (e) => {
  //   e.currentTarget.classList.toggle('active-1');
  // });

  // useEffect(() => {
    
  // }, trigger);
  
  const triggerClick = () => {
    setTrigger(!trigger);
  }

  return (
      <>
        <header>
          {/* 헤더 선택적으로 나오게 수정 */}
          <a className="header_logo" href="/">TMI</a>
          <div className="header_item_wrap">
            <div className="header_item">
                Header
            </div>
            <div className="header_item">
                <a href="/mappage">MapPage</a>
            </div>
            <div className="header_item">
                menu2
            </div>
            {trigger ? 
              <div className="header_item">
                <a className="header_menu_trigger" href="#" onClick={() => triggerClick()}>
                  <span></span>
                  <span></span>
                  <span></span>
                </a>
              </div> :
                <div className="header_item">
                <a className="header_menu_trigger active-1" href="#" onClick={() => triggerClick()}>
                  <span></span>
                  <span></span>
                  <span></span>
                </a>
              </div>
            }
            
          </div>
          {/* <input class="burger-check" type="checkbox" id="burger-check" />
          <label class="burger-icon" for="burger-check"><span class="burger-sticks"></span></label>
          <div class="menu">
            <div style="width: 200px"></div>
          </div> */}
          
        </header>
      </>
  );
}

export default Header;
