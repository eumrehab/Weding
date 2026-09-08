# 상견례 가족 소개 웹페이지

양가 가족이 함께 볼 수 있도록 만든 반응형 한 페이지 웹사이트입니다.

## 실행

```bash
npm install
npm run dev
```

## 배포용 파일 만들기

```bash
npm run build
```

정적 배포 결과는 `dist/client` 폴더에 생성됩니다.

## GitHub Pages

`main` 브랜치에 변경사항을 올리면 GitHub Actions가 실제 웹페이지를 자동으로 생성합니다. 저장소의 **Settings → Pages → Source**를 **GitHub Actions**로 설정하세요.

## 주요 수정 파일

- `app/page.tsx`: 이름, 가족 소개, 일정과 본문 내용
- `app/globals.css`: 기본 디자인
- `app/v2.css`: 추가 영역과 모바일 디자인
- `public`: 실제 사진과 이미지

실제 사진을 추가할 때는 `public/images` 폴더를 만들고 저장한 뒤 `app/page.tsx`에서 연결하면 됩니다.
