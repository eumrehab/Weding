'use client';

import './v2.css';
import './v3.css';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const AUTH_URL = 'https://script.google.com/macros/s/AKfycbzE7sqsd0RzI5ho7XGlkLCGi2bDWd0i7JRSCAJMmSJQuJ7D5CotrIyLCZp3k8EzFGPeJA/exec';
type FamilySide = 'groom' | 'bride';
type AuthResponse = { ok?: boolean; success?: boolean; authenticated?: boolean; authorized?: boolean; message?: string };

function formatBirthDate(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

function isValidBirthDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function LoginScreen({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [side, setSide] = useState<FamilySide>('groom');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedName = name.trim();
    if (!normalizedName) {
      setMessage('이름을 입력해 주세요.');
      return;
    }
    if (!isValidBirthDate(birthDate)) {
      setMessage('생년월일을 0000-00-00 형식으로 입력해 주세요.');
      return;
    }
    setIsSubmitting(true);
    setMessage('');
    try {
      const familySide = side === 'groom' ? '신랑 측' : '신부 측';
      const body = new URLSearchParams({ side: familySide, role: side, name: normalizedName, birthDate, birth: birthDate });
      const response = await fetch(AUTH_URL, { method: 'POST', body });
      const data = await response.json().catch(() => null) as AuthResponse | null;
      const authenticated = response.ok && data && (data.ok === true || data.success === true || data.authenticated === true || data.authorized === true);
      if (!authenticated) {
        setMessage(data?.message || '입력하신 정보를 확인해 주세요.');
        return;
      }
      onAuthenticated();
    } catch {
      setMessage('잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return <main className="login-page">
    <section className="login-panel" aria-labelledby="login-title">
      <div className="login-intro">
        <p className="eyebrow">OUR FIRST GREETING</p>
        <h1 id="login-title">두 가족의<br/><em>첫 만남</em></h1>
        <p>소중한 가족분들을 위해 준비한 공간입니다.</p>
        <div className="login-couple"><span>배병주</span><i>♥</i><span>권채연</span></div>
      </div>
      <div className="login-form-wrap">
        <div className="login-form-heading"><span>WELCOME</span><h2>반갑습니다</h2><p>가족 확인을 위해 정보를 입력해 주세요.</p></div>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>어느 가족이신가요?</legend>
            <RadioGroup className="side-options" value={side} onValueChange={(value) => setSide(value as FamilySide)} aria-label="가족 측 선택">
              <label className={side === 'groom' ? 'selected' : ''}><RadioGroupItem value="groom"/><span><small>GROOM</small>신랑 측</span></label>
              <label className={side === 'bride' ? 'selected' : ''}><RadioGroupItem value="bride"/><span><small>BRIDE</small>신부 측</span></label>
            </RadioGroup>
          </fieldset>
          <label className="login-field"><span>이름</span><Input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="이름을 입력해 주세요" aria-invalid={message.includes('이름') || undefined}/></label>
          <label className="login-field"><span>생년월일</span><Input value={birthDate} onChange={(event) => setBirthDate(formatBirthDate(event.target.value))} inputMode="numeric" autoComplete="bday" placeholder="0000-00-00" maxLength={10} aria-invalid={(message.includes('생년월일') || message.includes('정보')) || undefined}/></label>
          <p className="login-message" role="alert" aria-live="polite">{message}</p>
          <Button className="login-button" type="submit" disabled={isSubmitting}>{isSubmitting ? '확인하고 있습니다' : '초대장 열기'}<span aria-hidden="true">→</span></Button>
        </form>
      </div>
    </section>
  </main>;
}
const couple = [
  { role:'GROOM', name:'배병주', family:'○○○ · ○○○의 아들', birth:'생년월일을 알려주세요', region:'출신 지역', work:'현재 하는 일', copy:'차분하고 책임감이 있으며, 작은 약속도 소중히 여깁니다.', tags:['#다정함','#든든함','#산책'] },
  { role:'BRIDE', name:'권채연', family:'○○○ · ○○○의 딸', birth:'생년월일을 알려주세요', region:'출신 지역', work:'현재 하는 일', copy:'밝고 세심하며, 사랑하는 사람들의 기쁨을 함께 나누는 것을 좋아합니다.', tags:['#따뜻함','#세심함','#여행'] },
];
const story = [
  ['처음 만난 날','날짜를 알려주세요','서로의 이야기에 귀 기울이며 천천히 가까워졌습니다.'],
  ['함께한 시간','우리만의 기념일','평범한 하루도 다정한 추억이 된다는 것을 배웠습니다.'],
  ['결혼을 약속한 날','날짜를 알려주세요','서로의 가장 편안한 가족이 되어주기로 했습니다.'],
];
const plans = [
  ['신혼집','지역과 입주 시기를 알려주세요','준비 중','⌂'],
  ['결혼식','날짜와 장소를 알려주세요','예정','⌖'],
  ['웨딩 촬영','촬영 일정을 알려주세요','준비 중','◇'],
];
const checklist = ['예식장','웨딩 촬영','드레스·메이크업','신혼집','혼주 한복','혼주 양복','청첩장','신혼여행'];

function WeddingPage(){
  return <main>
    <nav className="topbar" aria-label="페이지 메뉴"><a className="wordmark" href="#top">우리의 첫 인사</a><div className="navlinks"><a href="#couple">두 사람</a><a href="#families">가족</a><a href="#plans">준비 이야기</a></div></nav>
    <section className="hero" id="top">
      <div className="hero-copy"><p className="eyebrow">TOGETHER WITH OUR FAMILIES</p><h1>두 가족이<br/><em>처음 만나는 날</em></h1><p className="lead">소중한 인연이 되어주신 두 가족께<br/>저희의 이야기를 전합니다.</p><a className="primary-button" href="#couple">천천히 둘러보기 <span>↓</span></a></div>
      <div className="hero-art"><div className="arch-frame"><img className="hero-photo" src="images/baebyeongju-kwonchaeyeon.webp" alt="신랑 배병주와 신부 권채연" /></div><div className="date-card"><span>OUR FIRST GREETING</span><strong>배병주 · 권채연</strong></div></div>
    </section>

    <section id="couple">
      <header className="section-heading"><p className="eyebrow">MEET THE COUPLE</p><h2>저희를 소개합니다</h2><p>서로 다르기에 더 잘 어울리는 두 사람입니다.</p></header>
      <div className="couple-grid">{couple.map((p,i)=><div className="profile-wrap" key={p.role}><div className="mini-photo"><i>♡</i><span>{i?'신부':'신랑'} 사진</span></div><article className="profile"><span className="role">{p.role}</span><h3>{p.name}</h3><p className="family-line">{p.family}</p><dl><div><dt>생년월일</dt><dd>{p.birth}</dd></div><div><dt>출신</dt><dd>{p.region}</dd></div><div><dt>하는 일</dt><dd>{p.work}</dd></div></dl><p>{p.copy}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></article></div>)}</div>
      <div className="each-other"><i>♡</i><div><span>서로를 소개하는 한마디</span><p>“상대방이 어떤 사람인지 두 분의 말로 들려주세요.”</p></div></div>
    </section>

    <section className="family-section" id="families">
      <header className="section-heading"><p className="eyebrow">OUR FAMILIES</p><h2>저희 가족을 소개합니다</h2><p>오늘부터 한 가족이 될 소중한 분들입니다.</p></header>
      <div className="family-grid"><article><span className="family-number">01</span><i>♧</i><h3>신랑 가족</h3><p>아버지 · 어머니 · 형제자매</p><small>가족 구성과 따뜻한 소개를 알려주세요.</small></article><article><span className="family-number">02</span><i>♧</i><h3>신부 가족</h3><p>아버지 · 어머니 · 형제자매</p><small>가족 구성과 따뜻한 소개를 알려주세요.</small></article></div>
    </section>

    <section className="story-section" id="story"><div className="story-title"><p className="eyebrow">OUR STORY</p><h2>두 사람이<br/>가족이 되기까지</h2><p>중요한 장면과 실제 사진을 더해 자연스러운 대화의 시작으로 만들어요.</p></div><div className="timeline">{story.map(([t,d,c],i)=><article key={t}><span>0{i+1}</span><div><small>{d}</small><h3>{t}</h3><p>{c}</p></div></article>)}</div></section>

    <section className="life-section" id="plans">
      <header className="section-heading"><p className="eyebrow">OUR NEXT CHAPTER</p><h2>앞으로의 생활 계획</h2><p>두 사람이 함께 그리는 새로운 일상입니다.</p></header>
      <div className="life-grid"><article><i>⌂</i><h3>우리의 신혼집</h3><p>생활할 지역과 입주 예정 시기를 정리합니다.</p><strong>내용을 알려주세요</strong></article><article><i>♡</i><h3>만들고 싶은 가정</h3><p>서로 존중하고, 양가와 따뜻하게 어울리는 가정을 꿈꿉니다.</p><strong>두 분의 생각을 들려주세요</strong></article><article><i>♧</i><h3>가족과 함께하는 시간</h3><p>명절과 가족 행사, 평소 교류에 대한 생각을 담습니다.</p><strong>함께 정리해 보아요</strong></article></div>
    </section>

    <section className="wedding-section">
      <header className="section-heading"><p className="eyebrow">WEDDING PLAN</p><h2>함께 준비하고 있습니다</h2><p>현재까지의 주요 일정과 준비 상황입니다.</p></header>
      <div className="plan-grid">{plans.map(([t,d,s,icon])=><article className="plan-card" key={String(t)}><div className="plan-icon"><i>{String(icon)}</i></div><span className="status">{String(s)}</span><h3>{String(t)}</h3><p>{String(d)}</p></article>)}</div>
      <div className="progress-board">{checklist.map((item,i)=><div key={item}><span>{item}</span><b className={i<2?'active':''}>{i<2?'진행 중':'확인 필요'}</b></div>)}</div>
      <div className="talk-card"><div><p className="eyebrow">FOR OUR FAMILY</p><h3>오늘 함께 나누고 싶은 이야기</h3></div><ul><li>예식 일정과 참석 범위</li><li>혼주 의상과 가족 일정</li><li>예물·예단 진행 방향</li><li>양가가 중요하게 생각하는 것</li></ul></div>
    </section>

    <section className="childhood-section"><header className="section-heading"><p className="eyebrow">LITTLE US</p><h2>어릴 적 우리의 모습</h2><p>닮은 표정과 추억을 찾아보며 편안하게 이야기를 시작해 보세요.</p></header><div className="childhood-grid"><div><i>♡</i><span>신랑 어린 시절 사진</span></div><div className="childhood-heart">&amp;</div><div><i>♡</i><span>신부 어린 시절 사진</span></div></div></section>
    <section className="future-baby-section"><div className="future-baby-art"><i>✦</i><span>두 분의 사진을 기다리고 있어요</span></div><div><p className="eyebrow">A LITTLE SURPRISE</p><h2>우리의 모습을 닮은 아이</h2><p>나중에 두 분의 정면 증명사진을 보내주시면, 얼굴의 특징을 자연스럽게 참고한 AI 2세 이미지를 준비합니다.</p><small>재미를 위한 예상 이미지이며 실제 자녀의 모습과는 관련이 없습니다.</small></div></section>
    <section className="promise-section"><i>✦</i><blockquote>“서로를 존중하고 아끼며,<br/>두 가족과 따뜻하게 어울리는 가정을 만들겠습니다.”</blockquote><p>배병주 · 권채연</p></section>
    <footer><i>♥</i><p>함께 축복해 주셔서 감사합니다.</p><small>내용과 사진은 확인 후 실제 정보로 교체됩니다.</small></footer>
  </main>
}

export default function Home(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return isAuthenticated ? <WeddingPage/> : <LoginScreen onAuthenticated={() => setIsAuthenticated(true)}/>;
}
