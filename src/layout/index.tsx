import { useLocation, Outlet } from 'react-router-dom';

const Layout = () => {
  const { pathname } = useLocation();
  console.log('pathName:', pathname)

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
