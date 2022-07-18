<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/kimyoungyin/Nomadcoder-study-community">
    <img src="https://nomadcoders.co/m.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">NomadCoders Community Clone</h3>
  <p align="center">
    노마드 코더 커뮤니티를 기반으로 유저 인증, 게시물 등을 클론한 웹사이트 입니다.
    <br />
    <br/>
    <strong>웹사이트 구경하기 -> </strong>
    <a href="https://nomad-coders-community-clone.netlify.app"><strong>https://nomad-coders-community-clone.netlify.app</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
    <!-- · -->
    <a href="https://github.com/kimyoungyin/Nomadcoder-study-community/issues">Report Bug</a>
    ·
    <a href="https://github.com/kimyoungyin/Nomadcoder-study-community/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#프로젝트-미리보기">프로젝트 미리보기</a>
      <ul>
        <li><a href="#기술-스택">기술 스택</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#convention">Convention</a></li>
        <li><a href="#commit-convention">Commit Convention</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
<br />

## 프로젝트 미리보기

[![Home][product-screenshot]](https://example.com)

<p align="right">(<a href="#top">back to top</a>)</p>

### 기술 스택

Frontend

-   [React.js](https://reactjs.org/)
-   [Recoil.js](https://recoiljs.org/ko/)
-   [Firebase](https://firebase.google.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### convention

-   Conding Convention

1. Event Handler 네이밍: ~handler
    ```ts
    const exampleHandler = (): void => {};
    ```
2. Handler Function Prop 네이밍: on~
    ```ts
    return <ExampleComponent onSubmit={exampleHandler} />;
    ```
3. Interface 네이밍: Pascal Case + ~Props

    ```ts
    interface ExampleProps {
        name: string;
    }
    ```

4. styled-components 구조: 최상위 태그에만 한 번

    ```ts
    const StyledTag = styled.div``;

    return (
        <StyledTag>
            <div>Not</div>
            <div>There</div>
        </StyledTag>
    );
    ```

5. 타입 관리

-   전역적으로 재사용될 타입: `src/@types/index.d.ts`에서 `declare`하여 정리(import, export 필요 없음)
-   단 하나의 컴포넌트에만 쓰이는 타입은 해당 파일 내부에 선언해도 무관
-   타입 선언 방식: interface(대부분의 타입) + type alias(원시 타입)

6.  파일(폴더) 네이밍 : Pascal Case(components, pages 제외)

    ```ts
    ExampleFileName;
    ```

7.  컴포넌트 폴더 구조 관리

    ```txt
    /SomeComponent
    │ index.js
    │ SomeComponent.tsx
    ├── /SomeChildrenComponent
    │ ├── index.js
    │ └── SomeChildrenComponent.tsx
    /SomeComponent2
    │ index.js
    │ SomeComponent2.tsx
    ```

    `index.tsx`를 자주 사용하게 되면 파일 이름으로 검색해 작업에 용이하지 못하므로
    `컴포넌트이름.tsx` 사용을 지향하고 `index.js` 로 `import`를 쉽게 할 수 있게한다.

### Commit Convention

feat: 새로운 기능에 대한 커밋  
fix: 버그 수정에 대한 커밋  
build: 빌드 관련 파일 수정에 대한 커밋  
etc: 그 외 자잘한 수정에 대한 커밋  
docs: README.md 수정에 대한 커밋  
style: 코드 스타일 혹은 포맷 등에 관한 커밋(prettier 등)  
refactor: 코드 리팩토링에 대한 커밋

### Directory Structure

```bash
src
│   App.js
│   Index.js
│   Router.js
├── components
│   ├── UI
│   │       Card.js                         - props(radius(rem)), box-shadow
│   │       Button.js                       - props(text, onClick, backgroundColor)
│   │       Input.js                        - props(label, useInput)
│   │       SocialLoginButton.js            - props(type, login or join), wrapper(Button)
│   └── layout
│           Header.js                       - h1/Button(login)/Button(join, blue)
│           Footer.js                       - loggedInUser 만 볼 수 있음
│
│
└── routes                                  - Routes components
    ├── Home
    │   │   Home.js                         - h1/h2/Card(0.375)/Category(폴더)/FIlter(search 버튼 포함)/SectionsList(폴더)/Search(폴더)/uploadButton
    │   │   Filter.js
    │   │   UploadButton.js
    │   ├── Category
    │   │       CategoryList.js
    │   │       Category.js
    │   ├── Section
    │   │       SectionList.js
    │   │       Section.js
    │   └──Search
    │           SearchInput.js
    │           Section.js
    │
    ├── Login
    │       Login.js                        - h1/Input*2/Button/SocialLogin*2
    ├── Join
    │       Join.js                         - h1/Input*2/Button/SocialLogin*2
    ├── Upload
    │       Upload.js                       - h1/input(text, border)/select(range, border)/MarkDown/Button
    │       Select.js
    │       MarkDown.js
    ├── Detail
    │   │   Detail.js
    │   │   Content.js                      - Card
    │   │   addCommentButton.js             - Button
    │   └── Comment
    │           commentList.js
    │           comment.js                  - Card
    └── Profile
            Profile.js                      - 추후 작성 예정
```

<!-- USAGE EXAMPLES -->

## Usage

> 반응형 레이아웃을 기반으로 하였습니다.

### 1. Authentication

-   일반 로그인/회원가입
-   깃허브 로그인/회원가입
-   다시 접근해도 자동 로그인
-   로그아웃

### 2. Home

-   카테고리 정렬
-   인기순/최신순 정렬
-   pinned된 게시물은 최상단 정렬
-   10페이지로 pagination
-   게시글 좋아요(transaction)

### 3. Search

-   검색 결과를 포함하는 제목을 가진 게시글 필터링
-   10페이지로 pagination

### 4. Upload

-   제목, 카테고리
-   에디터를 사용하여 게시글 작성
-   개발자는 pinned 여부를 선택

### 5. Thread

-   (본인이 작성한 글이라면) 삭제/수정
-   댓글/대댓글
-   게시글 좋아요(transaction)

### 6. profile 수정

-   닉네임 수정
-   avatar 수정
-   계정 삭제

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

김영인 - yin199859@gmail.com

Project Link: [https://github.com/kimyoungyin/Nomadcoder-study-community](https://github.com/kimyoungyin/Nomadcoder-study-community)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
