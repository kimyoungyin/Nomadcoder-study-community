<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

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



<!-- USAGE EXAMPLES -->

## Usage

> 반응형 레이아웃을 기반으로 하였습니다.

### 1. Authentication
-   회원가입(일반/github)

<img width="1440" alt="스크린샷 2022-07-19 오전 1 55 26" src="https://user-images.githubusercontent.com/78777345/179563193-4bc8a46b-c32c-4247-bb0a-dc845d2b17e1.png">

-   로그인(일반/github)

<img width="1440" alt="스크린샷 2022-07-19 오전 1 55 10" src="https://user-images.githubusercontent.com/78777345/179563149-68bbe4dd-99f6-4167-aaca-b4905fbc9ac7.png">

-   다시 접근해도 자동 로그인
-   로그아웃

<img width="452" alt="스크린샷 2022-07-19 오전 1 56 24" src="https://user-images.githubusercontent.com/78777345/179563351-77d0c3d8-740a-4288-a6eb-e30fd300d578.png">


### 2. Home
<img width="1440" alt="스크린샷 2022-07-19 오전 1 53 58" src="https://user-images.githubusercontent.com/78777345/179562949-db4b8c50-ad3d-4fb9-b9a2-d970983fd628.png">


-   카테고리 정렬
-   인기순/최신순 정렬
-   pinned된 게시물은 최상단 정렬
-   10페이지로 pagination

<img width="1440" alt="스크린샷 2022-07-19 오전 1 58 30" src="https://user-images.githubusercontent.com/78777345/179563708-89a1428b-0ac8-405d-bd89-c1f31b154a4c.png">

-   게시글 좋아요(transaction)

### 3. Search

<img width="1440" alt="스크린샷 2022-07-19 오전 2 00 13" src="https://user-images.githubusercontent.com/78777345/179564001-9a6ebac1-94c5-4bf7-ae2d-0e8eac742ade.png">

-   검색 결과를 포함하는 제목을 가진 게시글 필터링
-   10페이지로 pagination

### 4. Upload

<img width="1440" alt="스크린샷 2022-07-19 오전 2 01 28" src="https://user-images.githubusercontent.com/78777345/179564187-04af10e0-d3a6-48f4-afd4-23deccf02868.png">

-   제목, 카테고리
-   에디터를 사용하여 게시글 작성
-   개발자는 pinned 여부를 선택

### 5. Thread

<img width="1440" alt="스크린샷 2022-07-19 오전 2 02 44" src="https://user-images.githubusercontent.com/78777345/179564367-7c748339-ed96-4c03-8a7b-851bc37ff707.png">

-   (본인이 작성한 글이라면) 삭제/수정

<img width="1440" alt="스크린샷 2022-07-19 오전 2 04 31" src="https://user-images.githubusercontent.com/78777345/179564640-f3eb4283-b1aa-4116-a7d9-8500969817a6.png">

-   댓글/대댓글

<img width="1440" alt="스크린샷 2022-07-19 오전 2 02 59" src="https://user-images.githubusercontent.com/78777345/179564416-67c35755-1395-4e53-9597-a70f750f5055.png">

-   게시글 좋아요(transaction)

### 6. profile 수정

<img width="1440" alt="스크린샷 2022-07-19 오전 2 04 56" src="https://user-images.githubusercontent.com/78777345/179564719-8e32c4fa-d2bd-4e1f-b543-a70fa884f7ed.png">

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
신지호 - ziho@kakao.com

Project Link: [https://github.com/kimyoungyin/Nomadcoder-study-community](https://github.com/kimyoungyin/Nomadcoder-study-community)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
