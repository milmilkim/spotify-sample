import { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
function Sample() {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const client_secret = process.env.REACT_APP_CLIENT_SECRET;
  const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /* 스포티파이 서버에서 액세스 토큰 발급받기 */
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
          headers: {
            Authorization: 'Basic ' + auth,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log(res.data.access_token);
        setToken(res.data.access_token);
        /* 발급받은 토큰을 저장함 */
      } catch (e) {
        console.error(e);
      }
    })();
  }, [auth]);

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

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
      console.log(res.data.artists.items[0].images[0]['url']);
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

  return (
    <>
      {token ? (
        <>
          <h2>액세스 토큰: {token} </h2>
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
