import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import Container from './Container';
import LogoutBtn from './LogoutBtn';

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);
  let username = userData?.user?.name || '';
  

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "My Posts",
      slug: `/my-posts/${username}`,
      active: authStatus,
    }
  ]


  return (
    <header className='py-3 shadow bg-gradient-to-r from-gray-800 to-gray-500'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to="/">
              <Logo width='80px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item) =>
                item.active ?
                  (<li
                    key={item.name}
                  >
                    <button
                      onClick={() => navigate(item.slug)}
                      className='inline-bock font-bold text-xl px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                      {item.name}
                    </button>
                  </li>)
                  : null
              )
            }

            {
              authStatus &&
              (<li>
                <LogoutBtn />
              </li>)
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
