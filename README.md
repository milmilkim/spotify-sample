# 스포티파이 api 샘플

## 1. 시작하기

루트 폴더에 .env파일을 생성합시다.

```
REACT_APP_CLIENT_ID = '스포티파이에서 발급받은 client id'
REACT_APP_CLIENT_SECRET = '스포티파이에서 발급받은 client secret'
```

이 값은 외부에 노출되지 않도록 합니다.

그리고 터미널에

```
$ yarn add
```

또는

```
$ npm i
```

## 2. 설명

`Sample.js` 파일을 보세요. 지금은 간단하게 아티스트 검색을 구현해 보았습니다. (리덕스 안 썼음) 새 토큰 발급 버튼을 누르면 아래의 과정대로 토큰을 저장합니다.

![img](https://developer.spotify.com/assets/AuthG_ClientCredentials.png)
(Client Credentials Flow)

`Login.js`파일에서는 스포티파이로 로그인을 합니다.
![img](https://developer.spotify.com/assets/AuthG_ImplicitGrant.png)
이 방식으로 토큰을 저장합니다. (Implicit Grant Flow)

토큰은 로컬스토리지에 저장됩니다.

`MyProfile.js` 파일에서는 로그인을 한 경우 내 프로필을 보여줍니다.

더 자세한 내용은 [공식 문서](https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/)를 보세요.

api 문서는 [여기](https://developer.spotify.com/documentation/web-api/reference/#/)를 보세요.

### 예를 들면...

```javascript
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
```

이런 식으로 사용합니다.

~~스포티파이에 로그인이 필요한 기능은 사용할 수 없습니다.~~ 로그인 할 수 있습니다.

토큰의 유효 시간은 1시간으로 설정되어있습니다. (3600초) 유효기한이 지났을 땐 토큰을 재발급 해야 합니다.
