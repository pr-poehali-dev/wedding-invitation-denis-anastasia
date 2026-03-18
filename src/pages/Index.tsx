import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_DATE = new Date("2026-07-08T10:50:00");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const timeline = [
  {
    time: "10:50",
    icon: "Heart",
    title: "Церемония бракосочетания",
    desc: "Главный зал Городского (Кировского) отдела ЗАГС",
    address: "пер. Университетский, дом 48, Ростов-на-Дону",
  },
  {
    time: "12:00",
    icon: "Camera",
    title: "Прогулка и фотосессия",
    desc: "Прогулка по красивейшим местам Ростова-на-Дону",
    address: "Исторический центр города",
  },
  {
    time: "15:00",
    icon: "UtensilsCrossed",
    title: "Праздничный банкет",
    desc: "Palladio Hall — торжество, тосты и начало праздника",
    address: "ул. Малиновского, дом 50Б, Ростов-на-Дону",
  },
  {
    time: "18:00",
    icon: "Music",
    title: "Вечер и танцы",
    desc: "Продолжение праздника с живой музыкой и весельем",
    address: "Palladio Hall",
  },
  {
    time: "23:00",
    icon: "Star",
    title: "Финал торжества",
    desc: "Праздничный торт и прощальный вальс",
    address: "Palladio Hall",
  },
];

const dresscode: { color: string; name: string; border?: boolean }[] = [
  { color: "#FFFFFF", name: "Белый", border: true },
  { color: "#F0FAFA", name: "Айвори" },
  { color: "#C8EBEB", name: "Мята" },
  { color: "#7BC8C8", name: "Бирюза" },
  { color: "#3AACAC", name: "Тил" },
  { color: "#B0D8E8", name: "Небесный" },
  { color: "#4A90C4", name: "Синий" },
  { color: "#2E6FA8", name: "Королевский" },
  { color: "#1A5276", name: "Сапфир" },
  { color: "#5B9BAE", name: "Морская волна" },
  { color: "#A8D4E0", name: "Лазурный" },
  { color: "#7EB8C9", name: "Стальной" },
];

type FormData = {
  name: string;
  phone: string;
  attendance: string;
  guests: string;
  food: string;
  alcohol: string;
  transfer: string;
  song: string;
  wish: string;
};

export default function Index() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    attendance: "",
    guests: "1",
    food: "",
    alcohol: "",
    transfer: "",
    song: "",
    wish: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const navLinks = [
    { id: "about", label: "О нас" },
    { id: "countdown", label: "До свадьбы" },
    { id: "timeline", label: "Программа" },
    { id: "venues", label: "Место" },
    { id: "dresscode", label: "Дресс-код" },
    { id: "rsvp", label: "Анкета" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="wedding-app">
      {/* NAV */}
      <nav className="nav-fixed">
        <div className="nav-inner">
          <button className="nav-monogram" onClick={() => scrollTo("hero")}>
            Д&nbsp;&amp;&nbsp;А
          </button>
          <div className="nav-links">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`nav-link ${activeSection === l.id ? "active" : ""}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="nav-mobile">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-mobile-link">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="hero-section">
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              "url('https://cdn.poehali.dev/projects/081466b6-3590-4a86-8811-24376c8eba01/files/a6943330-1062-4668-bfb2-80a231491de7.jpg')",
          }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-invite">приглашают вас на свою свадьбу</p>
          <h1 className="hero-names">
            Денис<span className="hero-amp"> & </span>Анастасия
          </h1>
          <div className="hero-date-line">
            <span className="hero-date-decor" />
            <span className="hero-date">08 · 07 · 2026</span>
            <span className="hero-date-decor" />
          </div>
          <p className="hero-city">Ростов-на-Дону</p>
          <button onClick={() => scrollTo("rsvp")} className="hero-btn">
            Подтвердить присутствие
          </button>
        </div>
        <button
          onClick={() => scrollTo("about")}
          className="hero-scroll"
          aria-label="Прокрутить вниз"
        >
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="section bg-ivory">
        <div className="section-inner two-col">
          <div className="about-text">
            <span className="section-tag">О паре</span>
            <h2 className="section-title">Наша история</h2>
            <p className="about-p">
              Судьба свела нас однажды, и с тех пор каждый день стал особенным.
              Мы прошли долгий путь — от первой улыбки до этого торжественного
              дня. Теперь мы готовы сказать друг другу «да» и начать новую главу
              нашей общей истории.
            </p>
            <p className="about-p">
              08 июля 2026 года мы хотим разделить этот счастливый день с самыми
              близкими нам людьми — с вами. Ваше присутствие — лучший подарок,
              который вы можете нам преподнести.
            </p>
            <div className="about-hearts">
              <span>♡</span>
              <span>♡</span>
              <span>♡</span>
            </div>
          </div>
          <div className="about-card">
            <div className="about-monogram">Д&А</div>
            <div className="about-info">
              <div className="about-person">
                <div className="about-name">Денис</div>
                <div className="about-role">Жених</div>
              </div>
              <div className="about-divider">♡</div>
              <div className="about-person">
                <div className="about-name">Анастасия</div>
                <div className="about-role">Невеста</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section id="countdown" className="section bg-blush">
        <div className="section-inner center">
          <span className="section-tag">До торжества</span>
          <h2 className="section-title">Осталось совсем немного</h2>
          <div className="countdown-grid">
            {[
              { val: days, label: "дней" },
              { val: hours, label: "часов" },
              { val: minutes, label: "минут" },
              { val: seconds, label: "секунд" },
            ].map(({ val, label }) => (
              <div key={label} className="countdown-card">
                <span className="countdown-val">
                  {String(val).padStart(2, "0")}
                </span>
                <span className="countdown-label">{label}</span>
              </div>
            ))}
          </div>
          <p className="countdown-sub">08 июля 2026 · Ростов-на-Дону</p>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="section bg-ivory">
        <div className="section-inner center">
          <span className="section-tag">День свадьбы</span>
          <h2 className="section-title">Программа торжества</h2>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={i} className={`tl-item ${i % 2 === 0 ? "tl-left" : "tl-right"}`}>
                <div className="tl-time">{item.time}</div>
                <div className="tl-dot">
                  <Icon name={item.icon} fallback="Star" size={14} />
                </div>
                <div className="tl-card">
                  <h3 className="tl-title">{item.title}</h3>
                  <p className="tl-desc">{item.desc}</p>
                  <p className="tl-addr">
                    <Icon name="MapPin" size={11} />
                    <span>{item.address}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUES */}
      <section id="venues" className="section bg-warm">
        <div className="section-inner center">
          <span className="section-tag">Места</span>
          <h2 className="section-title">Где всё пройдёт</h2>
          <div className="venues-grid">
            <div className="venue-card">
              <div className="venue-icon">💍</div>
              <h3 className="venue-name">ЗАГС</h3>
              <p className="venue-type">Церемония бракосочетания</p>
              <p className="venue-full">
                Городской (Кировский) отдел ЗАГС Администрации города Ростова-на-Дону
              </p>
              <a
                href="https://yandex.ru/maps/?text=Ростов-на-Дону,+пер+Университетский+48"
                target="_blank"
                rel="noopener noreferrer"
                className="venue-map"
              >
                <Icon name="MapPin" size={14} />
                <span>пер. Университетский, 48</span>
              </a>
              <div className="venue-time-badge">10:50</div>
            </div>
            <div className="venue-card venue-card--main">
              <div className="venue-icon">🥂</div>
              <h3 className="venue-name">Palladio Hall</h3>
              <p className="venue-type">Праздничный банкет</p>
              <p className="venue-full">
                Элегантный банкетный зал в сердце Ростова-на-Дону
              </p>
              <a
                href="https://yandex.ru/maps/?text=Ростов-на-Дону,+Малиновского+50Б"
                target="_blank"
                rel="noopener noreferrer"
                className="venue-map"
              >
                <Icon name="MapPin" size={14} />
                <span>ул. Малиновского, 50Б</span>
              </a>
              <div className="venue-time-badge">15:00</div>
            </div>
          </div>
        </div>
      </section>

      {/* DRESSCODE */}
      <section id="dresscode" className="section bg-blush">
        <div className="section-inner center">
          <span className="section-tag">Дресс-код</span>
          <h2 className="section-title">Предпочтения в одежде</h2>
          <p className="dresscode-hint">
            Наша свадьба — в бело-бирюзовой гамме. Белые, мятные и бирюзовые
            оттенки создадут единый образ торжества. Просим воздержаться от
            чисто белого (для невесты) и чёрного цвета.
          </p>
          <div className="dresscode-palette">
            {dresscode.map((c) => (
              <div key={c.name} className="dresscode-swatch">
                <div
                  className="swatch-circle"
                  style={{
                    background: c.color,
                    border: c.border ? "2px solid #c8ebeb" : undefined,
                  }}
                />
                <span className="swatch-name">{c.name}</span>
              </div>
            ))}
          </div>
          <div className="dresscode-rules">
            <div className="dresscode-rule rule-yes">
              <span className="rule-icon">✓</span>
              <span>Белый, айвори и кремовый</span>
            </div>
            <div className="dresscode-rule rule-yes">
              <span className="rule-icon">✓</span>
              <span>Мятный, бирюзовый, небесный</span>
            </div>
            <div className="dresscode-rule rule-no">
              <span className="rule-icon">✗</span>
              <span>Чисто белый — только для невесты</span>
            </div>
            <div className="dresscode-rule rule-no">
              <span className="rule-icon">✗</span>
              <span>Чёрный цвет</span>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="section bg-ivory">
        <div className="section-inner center">
          <span className="section-tag">Анкета гостя</span>
          <h2 className="section-title">Подтвердите присутствие</h2>
          <p className="rsvp-hint">Пожалуйста, заполните анкету до 01 июня 2026</p>

          {submitted ? (
            <div className="rsvp-success">
              <div className="success-icon">♡</div>
              <h3>Спасибо!</h3>
              <p>Мы получили вашу анкету и с нетерпением ждём встречи с вами!</p>
            </div>
          ) : (
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ваше имя и фамилия *</label>
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Номер телефона *</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Вы придёте? *</label>
                <div className="radio-group">
                  {["Да, обязательно буду!", "К сожалению, не смогу"].map((opt) => (
                    <label key={opt} className="radio-label">
                      <input
                        type="radio"
                        name="attendance"
                        value={opt}
                        checked={form.attendance === opt}
                        onChange={(e) => setForm({ ...form, attendance: e.target.value })}
                        required
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {form.attendance === "Да, обязательно буду!" && (
                <>
                  <div className="form-group">
                    <label>Количество гостей (включая вас)</label>
                    <select
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    >
                      {["1", "2", "3", "4"].map((n) => (
                        <option key={n} value={n}>{n} чел.</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Предпочтения в еде</label>
                    <div className="radio-group">
                      {["Мясное меню", "Рыбное меню", "Вегетарианское меню", "Без предпочтений"].map((opt) => (
                        <label key={opt} className="radio-label">
                          <input
                            type="radio"
                            name="food"
                            value={opt}
                            checked={form.food === opt}
                            onChange={(e) => setForm({ ...form, food: e.target.value })}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Алкогольные предпочтения</label>
                    <div className="radio-group">
                      {["Вино", "Шампанское", "Крепкие напитки", "Только безалкогольное"].map((opt) => (
                        <label key={opt} className="radio-label">
                          <input
                            type="radio"
                            name="alcohol"
                            value={opt}
                            checked={form.alcohol === opt}
                            onChange={(e) => setForm({ ...form, alcohol: e.target.value })}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Нужен ли вам трансфер от ЗАГС до банкета?</label>
                    <div className="radio-group">
                      {["Да, буду рад(а)", "Нет, доберусь сам(а)"].map((opt) => (
                        <label key={opt} className="radio-label">
                          <input
                            type="radio"
                            name="transfer"
                            value={opt}
                            checked={form.transfer === opt}
                            onChange={(e) => setForm({ ...form, transfer: e.target.value })}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Ваша любимая песня для танцпола</label>
                    <input
                      type="text"
                      placeholder="Название песни и исполнитель"
                      value={form.song}
                      onChange={(e) => setForm({ ...form, song: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Пожелания молодожёнам</label>
                <textarea
                  placeholder="Ваши тёплые слова..."
                  value={form.wish}
                  onChange={(e) => setForm({ ...form, wish: e.target.value })}
                  rows={4}
                />
              </div>

              <button type="submit" className="submit-btn">
                Отправить анкету
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="section bg-warm">
        <div className="section-inner center">
          <span className="section-tag">Контакты</span>
          <h2 className="section-title">Остались вопросы?</h2>
          <p className="contacts-hint">
            Свяжитесь с нашими организаторами по любым вопросам
          </p>
          <div className="contacts-grid">
            <div className="contact-card">
              <div className="contact-icon">👰</div>
              <div className="contact-name">Анастасия</div>
              <div className="contact-role">Невеста</div>
              <a href="tel:+79000000001" className="contact-phone">
                +7 (900) 000-00-01
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">🤵</div>
              <div className="contact-name">Денис</div>
              <div className="contact-role">Жених</div>
              <a href="tel:+79000000002" className="contact-phone">
                +7 (900) 000-00-02
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-hearts">♡</div>
        <p className="footer-names">Денис &amp; Анастасия</p>
        <p className="footer-date">08 · 07 · 2026</p>
        <p className="footer-city">Ростов-на-Дону</p>
      </footer>
    </div>
  );
}