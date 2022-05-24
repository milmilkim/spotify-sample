import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyProfile() {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = window.localStorage.getItem('token');
  useEffect(() => {
    if (!!token) {
      (async () => {
        try {
          setIsLoading(true);
          const res = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(res.data);
          setData(res.data);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [token]);
  return (
    <>
      <h2>MyProfile</h2>
      <hr />
      {isLoading ? (
        <>loading...</>
      ) : data ? (
        <>
          <img alt={data.display_name} src={data.images[0].url} />
          <p>이름: {data.display_name}</p>
          <p>이메일: {data.email}</p>
          <p>국가: {data.country}</p>
        </>
      ) : (
        <p>데이터 없음</p>
      )}
    </>
  );
}

export default MyProfile;
