### Router
전통적인 웹사이트는 페이지를 이동할 때마다 새로운 HTML 문서를 받아왔지만, React와 같은 프레임워크로 만드는 SPA에서는 다른 방식으로 페이지 전환을 처리한다

SPA는 처음에 하나의 HTML 페이지만 로드하고, 이후 페이지 이동 요청이 있을 때는 서버에 전체 페이지를 다시 요청하는 대신, javaScript를 사용하여 동적으로 화면의 내용을 바꿔준다 

```jsx
<Routes>
    {/* path="/"는 홈페이지 경로 */}
    <Route path="/" element={<HomePage />} />
    {/* path="/about"은 소개 페이지 경로 */}
    <Route path="/about" element={<AboutPage />} />
    {/* 정의되지 않은 다른 모든 경로 처리 (예: 404 페이지) */}
    <Route path="*" element={<h2>페이지를 찾을 수 없습니다 (404)</h2>} />
</Routes>
```

우리가 설정한 대로 ReactRouter가 URL 변경에 따라 적절한 컴포넌트를 보여주는 기능은 