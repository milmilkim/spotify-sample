import Router from './Router';
import { Link } from 'react-router-dom';
function App() {
  return (
    <>
      <header>
        <h1>스포티파이</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">메인</Link>
          </li>
          <li>
            <Link to="/login">로그인 샘플</Link>
          </li>
          <li>
            <Link to="/myProfile">내 프로필</Link>
          </li>
        </ul>
      </nav>
      <hr />

      <Router />
      <footer>^m^</footer>
    </>
  );
}

export default App;
