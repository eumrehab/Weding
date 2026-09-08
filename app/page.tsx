import { CalendarDays, Heart, MapPin, Sparkles } from 'lucide-react';

const story = [
  ['처음 만난 날', '서로의 이야기에 귀 기울이며 천천히 가까워졌습니다.'],
  ['함께한 시간', '평범한 하루도 다정한 추억이 된다는 것을 배웠습니다.'],
  ['결혼을 약속한 날', '서로의 가장 편안한 가족이 되어주기로 했습니다.'],
];
const schedule = [
  ['상견례', '날짜를 알려주세요', '예정'],
  ['웨딩 촬영', '일정을 정리하고 있어요', '준비 중'],
  ['결혼식', '날짜와 장소를 알려주세요', '예정'],
];

export default function Home() {
  return (
    <main>
      <nav className="topbar" aria-label="페이지 메뉴">
        <a className="wordmark" href="#top">우리의 첫 인사</a>
        <div className="navlinks"><a href="#couple">두 사람</a><a href="#story">이야기</a><a href="#wedding">결혼 준비</a></div>
      </nav>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">TOGETHER WITH OUR FAMILIES</p>
          <h1>두 가족이<br /><em>처음 만나는 날</em></h1>
          <p className="lead">소중한 인연이 되어주신 두 가족께<br />저희의 이야기를 전합니다.</p>
          <a className="primary-button" href="#couple">천천히 둘러보기 <span>↓</span></a>
        </div>
        <div className="hero-art" aria-label="신랑과 신부 사진을 넣을 자리">
          <div className="arch-frame"><div className="photo-placeholder"><Heart size={30} strokeWidth={1.2} /><span>두 사람의 사진</span></div></div>
          <div className="date-card"><span>SAVE THE DATE</span><strong>날짜를 알려주세요</strong></div>
        </div>
      </section>
      <section className="intro-section" id="couple">
        <header className="section-heading"><p className="eyebrow">MEET THE COUPLE</p><h2>저희를 소개합니다</h2><p>서로 다르기에 더 잘 어울리는 두 사람입니다.</p></header>
        <div className="couple-grid">
          <article className="profile groom"><span className="role">GROOM</span><h3>신랑 이름</h3><p className="family-line">○○○ · ○○○의 아들</p><p>차분하고 책임감이 있으며, 작은 약속도 소중히 여깁니다. 가족과 함께하는 시간을 좋아합니다.</p><div className="tags"><span>#다정함</span><span>#든든함</span><span>#산책</span></div></article>
          <div className="ampersand" aria-hidden="true">&amp;</div>
          <article className="profile bride"><span className="role">BRIDE</span><h3>신부 이름</h3><p className="family-line">○○○ · ○○○의 딸</p><p>밝고 세심하며, 사랑하는 사람들의 기쁨을 함께 나누는 것을 가장 소중하게 생각합니다.</p><div className="tags"><span>#따뜻함</span><span>#세심함</span><span>#여행</span></div></article>
        </div>
      </section>
      <section className="story-section" id="story">
        <div className="story-title"><p className="eyebrow">OUR STORY</p><h2>두 사람이<br />가족이 되기까지</h2><p>정확한 날짜와 두 분의 이야기를 알려주시면 실제 내용으로 바꿔드릴게요.</p></div>
        <div className="timeline">{story.map(([title, copy], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
      </section>
      <section className="promise-section"><Sparkles aria-hidden="true" /><blockquote>“서로를 존중하고 아끼며,<br />두 가족과 따뜻하게 어울리는 가정을 만들겠습니다.”</blockquote><p>신랑 이름 · 신부 이름</p></section>
      <section className="wedding-section" id="wedding">
        <header className="section-heading"><p className="eyebrow">WEDDING PLAN</p><h2>함께 준비하고 있습니다</h2><p>현재까지의 주요 일정을 한눈에 정리했습니다.</p></header>
        <div className="plan-grid">{schedule.map(([title, detail, status], i) => <article key={title} className="plan-card"><div className="plan-icon">{i === 1 ? <Heart /> : i === 2 ? <MapPin /> : <CalendarDays />}</div><span className="status">{status}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
        <div className="talk-card"><div><p className="eyebrow">FOR OUR FAMILY</p><h3>오늘 함께 나누고 싶은 이야기</h3></div><ul><li>예식 일정과 참석 범위</li><li>혼주 의상과 가족 일정</li><li>예물·예단 진행 방향</li><li>양가가 중요하게 생각하는 것</li></ul></div>
      </section>
      <footer><Heart size={18} fill="currentColor" /><p>함께 축복해 주셔서 감사합니다.</p><small>내용과 사진은 확인 후 실제 정보로 교체됩니다.</small></footer>
    </main>
  );
}
