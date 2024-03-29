<img src="https://user-images.githubusercontent.com/98396758/230546007-3392ee44-77b0-4fb4-be63-488c5aa2c2b1.png"/>

# 씨네네 Cinene

영화 정보 공유 사이트 (개인 프로젝트)

## 배포 주소

https://cinene.netlify.app/

## 프로젝트 소개

씨네네는 `cine` + `접미사 -네`의 합성어로 영화 정보를 나누는 공간의 느낌을 주고자 이름을 지었습니다.<br/> 영화 정보를 사용자들이 서로 공유하며 영화 정보를 제공하는 반응형 웹 사이트입니다.

## 폴더 구조

### Frontend

```
└─src
    ├─assets
    ├─atom
    ├─components
    │  ├─common
    │  ├─details
    │  │  └─content
    │  │      ├─comments
    │  │      ├─credits
    │  │      ├─genre
    │  │      ├─like
    │  │      ├─reviews
    │  │      │  └─reviewModal
    │  │      ├─seasons
    │  │      └─similarMedia
    │  ├─favorites
    │  ├─header
    │  │  └─searchbar
    │  ├─main
    │  │  └─topRated
    │  └─user
    │      ├─auth
    │      └─profile
    ├─hooks
    │  └─cinene
    ├─pages
    ├─services
    ├─styles
    ├─types
    └─utils
```

### Backend

```
└─src
    ├─models
    ├─routes
    ├─types
    └─utils
```

## 시작 가이드

### Installation

```
$ git clone https://github.com/bisari31/Cinene.git
$ cd Cinene
```

### Frontend

```
$ git clone https://github.com/bisari31/Cinene.git
$ cd client
$ npm install
$ npm start
```

### Backend

```
$ git clone https://github.com/bisari31/Cinene.git
$ cd server
$ npm install
$ npm run dev (concurrently)
```

## 기술 스택

### Environment

<div>
<img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/git hub-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
</div>

### Config

<div>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
</div>

### Development

#### Frontend

<div>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/recoil-764ABC?style=for-the-badge&logo=recoil&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
</div>

#### Backend

<div>
<img src="https://img.shields.io/badge/nodedotjs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
</div>

## 화면 구성

### 메인 페이지

<div>
<img src="https://github.com/bisari31/wanted_pre_onboarding_refactoring/assets/98396758/822764e8-c2a9-455e-b58d-90a29e4759ec" width="300" height="650">
<img src="https://github.com/bisari31/wanted_pre_onboarding_refactoring/assets/98396758/1d4675d4-2d67-4c78-99a5-61e40f91e332" width="300" height="650">
</div>

### 디테일 페이지

<div>
<img src="https://github.com/bisari31/wanted_pre_onboarding_refactoring/assets/98396758/bdc5ad15-d9af-4d1a-bd16-30ad203a2742" width="300" height="650">
<img src="https://github.com/bisari31/wanted_pre_onboarding_refactoring/assets/98396758/be0ad36f-34f6-4a50-bb34-b6f94a05584b" width="300" height="650">
<img src="https://github.com/bisari31/wanted_pre_onboarding_refactoring/assets/98396758/8cd4eacd-e77a-42fb-9e8b-92cee5391eae" width="300" height="650">
</div>

### 즐겨찾기 페이지

<div>
<img src="https://user-images.githubusercontent.com/98396758/230584258-b2e117b9-35e1-4106-aad5-40bd0b64c25c.png" width="300" height="650">
</div>

### 유저 페이지

<div>
<img src="https://user-images.githubusercontent.com/98396758/230584496-91880a4a-905e-4cc3-aed2-e5bd7a0b25a1.png" width="300" height="650" >
</div>

## 주요 기능

#### 로그인 회원가입 (with 카카오)

로그인, 회원가입과 카카오 oauth 기능을 추가하여 구현하였습니다.
<br/>중복되는 코드들을 최대한 피하여 커스텀 hook을 통하여 재사용하였으며 실시간 유효성 검사 기능을 추가하였습니다.<br/>
인증 미들웨어를 통해 api 요청 시 유효한 회원임을 검증하며 jwt token으로 유효성을 검증합니다. <br/> access token과 refresh token을 사용하여 만료 기간을 조정할 수 있습니다.

#### 좋아요, 댓글, 평점 리뷰 등록 수정 삭제

댓글을 작성하며 댓글 좋아요 기능을 구현하였으며 대댓글 기능도 추가하였습니다.<br/>
평점 등록 버튼을 통하여 모달창이 뜨며 평점과 한 줄 평을 등록할 수 있습니다.<br/>
콘텐츠 좋아요 버튼을 통해 즐겨찾기에 추가할 수 있습니다. <br/>
react-query optimistic update 기능을 사용하여 빠른 좋아요가 가능하게 설계하였습니다.
<img src="https://user-images.githubusercontent.com/98396758/230589134-80bd5c91-c1ba-4e29-aa30-bd3f92fb2517.gif" width="400" height="400"><br/>

#### 콘텐츠 검색

검색 버튼을 누를 필요 없이 키워드 검색 시 api를 호출하며 반복적인 호출을 피하기 위해 debounce를 사용하였습니다. <br/>또한 검색 결과를 키보드로 선택할 수 있게 키 이벤트를 추가하였습니다.<br/>
<img src="https://user-images.githubusercontent.com/98396758/230589937-8420ce5c-63cd-451d-ae7f-a3da4c42cb4b.gif" width="400" height="400"><br/>

#### 유저 정보 변경(닉네임, 비밀번호, 프로필) 및 탈퇴

유저 패스워드와 닉네임이 변경 가능하며 multer를 통하여 프로필 변경이 가능하게 설계하였습니다.<br/>이미지 저장 서버는 s3를 사용하였으며 추가로 회원 탈퇴 기능도 구현하였습니다.</br>
<img src="https://user-images.githubusercontent.com/98396758/230589641-d5e40037-e9d5-42d1-823c-762f4045c571.gif" width="400" height="400"><br/>

#### 기타 구현

모달창을 이용하여 포스터를 확대할 수 있습니다.<br/>
<img src="https://user-images.githubusercontent.com/98396758/230588756-c8fc030c-cb1f-4743-89b5-bd8e751acd4a.gif" width="400" height="400"><br/>
