import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header style={{ padding: '10px'}}>
      <nav>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link> |{' '}
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;
