# 폴더 구조

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
