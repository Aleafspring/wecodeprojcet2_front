import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GrMenu } from 'react-icons/gr';
import { GoSearch } from 'react-icons/go';
import GuestNav from '../Nav/GuestNav';
import MemberNav from '../Nav/MemberNav';

function Header() {
  const [showNav, setShowNav] = useState('');
  const [navScrollY, setNavScrollY] = useState(0);
  const [navStyle, setNavStyle] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? setShowNav('memberNone') : setShowNav('guestNone');

    fetch('http://localhost:8000/user/myProfile', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', token: token },
    })
      .then(res => res.json())
      .then(data => setUserInfo(data));
  }, []);

  const openGuestNav = () => {
    setShowNav('guestNav');
  };

  const openMemberNav = () => {
    setShowNav('memberNav');
  };
  const openNav = () => {
    if (showNav === 'guestNone') {
      openGuestNav();
    } else if (showNav === 'memberNone') {
      openMemberNav();
    }
  };

  const closeNav = () => {
    if (showNav === 'guestNav') {
      setShowNav('guestNone');
    } else if (showNav === 'memberNav') {
      setShowNav('memberNone');
    }
  };

  const refreshLogOut = () => {
    window.location.reload();
  };

  const changeNavStyle = () => {
    if (navScrollY > 530) {
      setNavScrollY(window.scrollY);
      setNavStyle(true);
    } else {
      setNavScrollY(window.scrollY);
      setNavStyle(false);
    }
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener('scroll', changeNavStyle);
    };
    scrollListener();
    return () => {
      window.removeEventListener('scroll', changeNavStyle);
    };
  });

  return (
    <>
      <Wrapper show={showNav} navStyle={navStyle}>
        <LeftWrapper>
          <SidebarBtn>
            <GrMenu size={30} onClick={openNav} />
          </SidebarBtn>
          <Logo
            onClick={() => {
              navigate('/');
            }}
          >
            ajeom
          </Logo>
        </LeftWrapper>
        <GuestNav className="guest" showNav={showNav} />
        <MemberNav
          className="member"
          showNav={showNav}
          userInfo={userInfo}
          refreshLogOut={refreshLogOut}
        />
        <SearchBtn>
          <GoSearch size={21} />
        </SearchBtn>
        {showNav !== ('guestNone' || 'memberNone') && (
          <OutsideNav onClick={closeNav} />
        )}
      </Wrapper>
      {/* <ProgressbarWrapper navStyle={navStyle}>
        <Progressbar navStyle={navStyle} />
      </ProgressbarWrapper> */}
    </>
  );
}

const OutsideNav = styled.div`
  position: fixed;
  top: 0;
  left: 260px;
  bottom: 0;
  right: 0;
  background-color: transparent;
  z-index: 1;
`;

const Wrapper = styled.section`
  position: ${props => (props.navStyle ? 'fixed' : 'absolute')};
  display: flex;
  padding: 7px 25px 14px 25px;
  justify-content: space-between;
  width: 100%;
  /* z-index: 10; */
  background-color: ${props => (props.navStyle ? 'white' : 'transparent')};
  border-bottom: ${props => (props.navStyle ? '1px solid #d1d1d1' : 'none')};
  opacity: ${props => (props.navStyle ? 0.9 : 1)};
  transition: all ease 0.5s;
  .guest,
  .member {
    /* z-index: 10; */
  }
`;

const LeftWrapper = styled.div`
  display: flex;
`;

const SidebarBtn = styled.div`
  margin: 10px 15px 0 0;
  cursor: pointer;
`;

const Logo = styled.div`
  font-family: 'Square Peg', cursive;
  font-size: 35px;
  cursor: pointer;
`;

const SearchBtn = styled.div`
  margin-top: 13px;
  cursor: pointer;
`;

// const ProgressbarWrapper = styled.section`
//   height: ${props => (props.navStyle ? '0.3rem' : '0')};
// `;

// const Progressbar = styled.div`
//   width: 0;
//   height: ${props => (props.navStyle ? '0.3rem' : '0')};
//   background-color: ${props => (props.navStyle ? 'black' : 'white')};
// `;

export default Header;