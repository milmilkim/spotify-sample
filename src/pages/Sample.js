import { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
function Sample() {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const client_secret = process.env.REACT_APP_CLIENT_SECRET;
  const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  const [token, setToken] = useState('');

  /* 클릭하면 쿼리로 아티스트를 검색 */
  const getAlbum = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.get('https://api.spotify.com/v1/search', {
        params: {
          q: query,
          type: 'artist',
        },
        headers: {
          Authorization: `Bearer ${token}`,
          //액세스 토큰 전송 (요청마다)
        },
      });
      setData(res.data.artists.items);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
          Authorization: 'Basic ' + auth,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      window.localStorage.setItem('token', res.data.access_token);
      setToken(res.data.access_token);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setToken(window.localStorage.getItem('token') || '');
  }, [token]);
  return (
    <>
      <button onClick={handleClick}>새 토큰 발급</button>
      {token ? (
        <>
          <h2>로컬 스토리지에 저장된 액세스 토큰: {token} </h2>
          <h3>아티스트 검색</h3>
          <input type="text" onChange={handleChange} />
          <button onClick={getAlbum}>click</button>
          <hr />
          {isLoading ? (
            <>loading...</>
          ) : (
            <div>
              {data.map(({ id, name, images, genres, followers: { total } }, i) => (
                <div key={id}>
                  <h3>{name}</h3>
                  <p>{genres.join(', ')}</p>
                  <p>{total}</p>
                  {images[0] && (
                    <p>
                      <img width="160" alt={name} src={images[2].url} />
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <h2>액세스 토큰 없음</h2>
      )}
    </>
  );
}

export default Sample;
