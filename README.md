# 🏠 My Minihompy (나만의 미니홈피)

> **"소중한 일상을 기록하고 친구들과 소통하는 나만의 공간"**
> Next.js 14 App Router와 Supabase를 활용해 구축한 레트로 감성의 미니홈피 서비스입니다.

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📅 프로젝트 개요

- **프로젝트 명**: My Minihompy
- **개발 기간**: 약 한달 (MVP)
- **개발 인원**: 1인 (Full-stack)
- **기획 의도**: 사용자가 프로필을 꾸미고, 다이어리와 방명록을 통해 친구들과 일상을 공유하며 관심을 표현하는 웹 서비스입니다.

---

## 🛠 기술 스택 (Tech Stack)

| 분류 | 기술 (Technology) | 설명 |
| :--- | :--- | :--- |
| **Frontend & Backend** | **Next.js 14 (App Router)** | 서버 사이드 렌더링(SSR) 및 최적화된 라우팅 구현 |
| **Database & Auth** | **Supabase** | 사용자 인증, 실시간 데이터 관리, 이미지 스토리지 |
| **ORM** | **Prisma** | 직관적인 데이터 모델링 및 체계적인 DB 관리 |
| **Deployment** | **Vercel** | CI/CD 파이프라인 구축 및 자동 배포 |

---

## ✨ 주요 기능 (Key Features)

### 1. 🔐 회원 및 인증 (Authentication)
- **회원가입**: 유저네임(Unique), 닉네임, 비밀번호(Hash 처리)를 통한 가입 (중복 이메일 방지).
- **로그인/로그아웃**: JWT 토큰 기반의 로그인 상태 유지 및 보안 관리.
- **계정 관리**: 아이디 찾기 및 비밀번호 변경 기능.

### 2. 🏠 미니홈피 프로필 (Profile)
- **정보 조회**: 프로필 이미지, 닉네임, 한 줄 소개(상태메시지), 친구 수 표시.
- **방문자 집계**: 일일 방문자 수(Today)와 누적 방문자 수(Total) 카운팅.
- **프로필 수정**: 이미지 업로드 및 개인정보 실시간 수정 반영.

### 3. 📝 다이어리 (Diary & Posts)
- **게시물 작성**: 제목, 본문, 날씨(해/구름/비/눈) 선택 기능.
- **비밀글 설정**: '나만 보기' 기능을 통한 프라이버시 보호.
- **조회 및 필터**: 최신순 정렬 및 월별(Month) 페이지네이션 지원.
- **상세 기능**: 작성자 정보, 날씨 아이콘, 댓글 목록 표시.
- **수정/삭제**: 본인이 작성한 게시물에 대한 관리 권한.

### 4. 🤝 소셜 네트워크 (Social)
- **친구 맺기**: 별도 수락 과정 없이 즉시 친구로 등록되는 간편한 친구 추가.
- **친구 목록**: 친구들의 닉네임과 한 줄 소개 조회 및 파도타기(홈피 이동).
- **뉴스 피드**: 친구들의 최신 게시물을 모아보는 메인 피드 기능.

### 5. ❤️ 인터랙션 (Interaction)
- **좋아요**: 게시물에 대한 관심 표현 (토글 방식, 실시간 카운트).
- **댓글**: 게시물에 텍스트 댓글 작성 및 본인 댓글 삭제 기능.
- **방명록**: 친구의 미니홈피에 방문 기록 남기기.

### 6. 🛡 접근 제어 (Access Control)
- **비로그인 유저**: 특정 URL(`/[username]`)을 통해 타인의 홈 화면(프로필) 구경 가능.
- **로그인 유저**: 모든 기능(글쓰기, 댓글, 좋아요 등) 이용 가능.
- **권한 관리**: 본인의 리소스(글, 댓글)만 수정/삭제 가능하도록 철저한 검증.

---

## 🗂 데이터 모델링 (ERD)

> Prisma Editor를 활용하여 체계적으로 설계된 데이터베이스 구조입니다.



- **User**: 사용자 핵심 정보
- **Minihompy**: 각 유저의 미니홈피 설정 정보
- **Post**: 다이어리 게시글
- **Comment**: 게시글 댓글
- **Guestbook**: 방명록
- **Like**: 게시글 좋아요

---

