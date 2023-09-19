# philoberry-project

브랜드 PHILOBERRY 사이트 구축 코드입니다.

---

### 진행사항

#### 7월 구현 및 사용된 기능

1. Next12 + Next-auth4 + 구글 Oauth2 로 로그인 기능 구현

- 관리자 계정만 가능하게 함

2. 굿즈 페이지, 갤러리 페이지 ,메인 페이지 구현
3. 네비게이션 바 및 사이드바 구현
4. tailwind CSS 사용

- SSR은 미사용 중, 후에 변경 예정
- React-query 로 서버 상태관리 예정

```
프로젝트 방향성 변경 및 개인 사정으로 임시 중단
```

#### 8월

- 잠정 중단

#### 클라우드 아키텍처 엔지니어와 프로젝트 진행

##### 2023.09.06 (수)

- 갤러리 배경 변경 기능 → react query로 서버 상태관리 : Restful API 엔드포인트 설정 ,현재 서버와 연결 안되어있어서 color.txt에 보관
- 네비게이션바 모션 추가

##### 2023.09.07 (목)

- 이미지 AWS S3에 업로드 준비
- 이미지 파일 유효성 검사, 다중 업로드 상태관리

##### 2023.09.08 (금)

- 이미지 미리보기 설정 및 이미지 클릭 시 이미지 삭제
  - 현재 이미지 업로드와 이미지 삭제가 중복되어 작동 (미해결)

##### 2023.09.12 (화)

- 갤러리 페이지 모달창 추가 (모달창 열릴 시 스크롤 락)
- 카드 컴포넌트 개선
- 업로드 이미지의 bytes 미리보기

##### 2023.09.13 (수)

- 네비게이션 바 모션 변경
- 세일 페이지 props 개선
- AWS RDS mySQL 만들기 및 연결 (1차 연결 실패)

##### 2023.09.14 (목)

- AWS RDS MySQL 연결 성공 : 테스트를 위해 Public 설정
- Prisma (ORM 도구) 사용
- AWS Cloud Shell로 DB 생성 후 Prisma로 스키마 설정

##### 2023.09.15 (금)

- 버그 대응 및 현업자 조언으로 Next13 버전으로 업그레이드 결정
  - 메이저는 최신으로 유지하는 것이 좋다고 한다. app 디렉토리를 현업에서 사용중이라고 함.
  - pages -> app 디렉토리변경
  - \_app.tsx -> layout.tsx , index.txs -> page.tsx
  - “next/router” → “next/navigation”
  - 기본적으로 SSR을 제공해서 CSR은 "use client"로 함으로써 SSR부분과 CSR 부분을 구분 (진행중)
  - react-query 부분을 ProviderWrapper 부분으로 이동
  - AppProps를 사용 → children : React.ReactNode 타입을 가진 props로 변경

##### 2023.09.19(화)
