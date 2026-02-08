import { useMemo, useState, useEffect } from "react";
import { Typography, List, Button, Divider, Collapse, Tag } from "antd";
import "./classes.css";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

// Данные (подставь свои видеоId и тексты)
const DATA = [
  {
    key: "waacking",
    title: "Waacking",
    videos: [
      {
        id: "w1",
        videoId: "i6W1-KUK8rU",
        title: "Doma vs Nicole Adriana TOP 12 Waacking Forever | Summer Dance Forever 2023",
        teacher: "DOMINIKA “DOMA” JAŁOSZYŃSKA",
        level: "beginers",
        description: `Razem z Nikolą Makowską założycielka studia tańca “Dance Point” w Luboniu.

Czołowa tancerka stylu Waacking w Polsce i na świecie, instruktorka tańca oraz choreografka, swoją przygodę z tańcem rozpoczęła w 2002r.

Pochodzi z Poznania i reprezentuje poznańskie studio tańca „Point Dance Studio”. Jest organizatorką projektu „The Way I Waack”, pierwszego na świecie obozu waackingowego. Członkini pierwszej w Polsce grupy waackingowej „Punie Crew” oraz współorganizatorka pierwszych w Polsce zawodów waackingowych „Waack on Point”. Prywatnie absolwentka Uniwersytetu im. Adama Mickiewicza na kierunku Prawo.

Ma na swoim koncie wiele zwycięstw w wydarzeniach na arenie europejskiej i światowej. Zajmowała czołowe miejsca na największych turniejach waackingowych w Azji (Japonia, Tajwan, Indonezja, Malezja, Chiny) i Europie. 

Jako nauczycielka zwiedziła już znaczną część świata, ucząc i zarażając miłością do tańca m.in. w takich krajach jak: Korea Południowa, Tajwan, Wietnam, Indie, Singapur, Francja, Grecja, Włochy, Niemcy, Litwa, Rumunia, Ukraina, Hiszpania. W 2020r. na specjalne zaproszenie wystawiła wraz z „Punie Crew” spektakl w Paryżu na „All Europe Waacking Festival”.

W 2025r. choreograf w polskiej edycji programu You Can Dance. 
W 2024r. wykładowca na Beijing Contemporary Music Academy w Chinach.`,
      },
    ],
  },
  {
    key: "choreo",
    title: "CHOREOGRAFIA",
    videos: [
      {
        id: "c1",
        videoId: "VsPyLYny654",
        title: "ZOSIA OSTOJA-ZAGÓRSKA",
        teacher: "ZOSIA OSTOJA-ZAGÓRSKA",
        isVertical: true,
        level: "beginers",
        description: `Zosia rozpoczęła swoją taneczną przygodę w wieku 10 lat. Przez kolejne lata intensywnie rozwijała swoje umiejętności, startując w zawodach zarówno solo, jak i w formacjach. W wieku 15 lat trafiła do Point Dance Studio, rozpoczynając od openów – i to właśnie tutaj zaczęła świadomie budować swoją taneczną tożsamość.

Z czasem dołączyła do licznych projektów tanecznych, zarówno w Polsce, jak i za granicą. Szkoliła się m.in. na programie Caps University z Ysabelle Capitule w Los Angeles, na Shay Program, a także w Bazie Tancerzy. Jej droga to nieustanny rozwój – obecnie regularnie podróżuje po Polsce i świecie, szkoląc się u najlepszych choreografów.

W 2024 roku Zosia spędziła miesiąc w Los Angeles, codziennie trenując z elitą światowej sceny tanecznej. To doświadczenie nie tylko rozwinęło jej technikę i świadomość ruchu, ale także zainspirowało ją do tworzenia własnych choreografii.
`,
      },
    ],
  },
  {
    key: "jazz",
    title: "JAZZ",
    videos: [
      {
        id: "j1",
        videoId: "ejusLcbAVnI",
        title: "Nikola JAZZ",
        teacher: "NIKOLA MAKOWSKA-KUCIAK",
        level: "beginers",
        description: `Razem z Dominiką Lubawy założycielka studia tańca „Dance Point” w Luboniu.

Tańczy od 8 roku życia. Trenowała wiele technik tańca: waacking, taniec współczesny, high heels oraz jazz. Dziś jej specjalizacją jest właśnie taniec jazzowy, w którym wciąż poszukuje nowych rozwiązań oraz połączeń z innymi technikami. Aktualnie mieszka w Poznaniu. Jest instruktorką w szkole Point Dance Studio i Dance Point.

Szkoliła się również w Nowym Jorku, w renomowanych szkołach Broadway Dance Center oraz Steps on Broadway, co znacząco wpłynęło na rozwój jej tanecznego języka i podejścia do techniki.

Cały czas prężnie pracuje nad swoimi wizjami, czego efektem jest jej autorski projekt „JazzJam”. Na swoich zajęciach najbardziej skupia się na feelingu, czuciu jazzu, zabawie rytmicznej, podstawach oraz eksploracji!`,
      },
    ],
  },
  {
    key: "hiphop",
    title: "HIP-HOP FREESTYLE",
    videos: [
      {
        id: "h1",
        videoId: "YvtNQb6TAKg",
        title: "WIRUJĄCA STREFA 2024 / ĆWIERĆFINAŁ HIP HOP 18+ / PIOTR PI VS OSHIT",
        teacher: "JAKUB KAMIŃSKI",
        level: "beginers",
        description: `Jakub "OShit" Kamiński tańczy od 2005 r. oraz dzieli się z innymi swoją wiedzą od 2014 r. Jego największą miłością jest Hip Hop Freestyle Dance, ale miał także do czynienia z takimi technikami jak popping, locking, house dance, bboying, które wzbogaciły i ukształtowały jego styl. Ma za sobą wiele pokazów, występów oraz z powodzeniem, udziałów w zawodach. 

Podróżuje po Polsce i świecie gdzie zdobywa doświadczenie, wiedzę i zajawkę. Między innymi w Nowym Jorku zgłębiał wiedzę o ideologii kultury hip hop, która sprawiła, że HIPHOP FREESTYLE DANCE jest tak wyjątkowy.
`,
      },
    ],
  },
  {
    key: "highheels",
    title: "HIGH HEELS",
    videos: [
      {
        id: "hh1",
        videoId: "Vy8moBcKVIM",
        title: "BRAK VIDEO",
        teacher: "ALEKSANDRA KASZUBOWSKA",
        level: "beginers",
        description: `Tancerka i absolwentka kierunku Taniec w Kulturze Fizycznej na Akademii Wychowania Fizycznego w Poznaniu. High Heels poznała i zaczęła tańczyć 5 lat temu, uczy tego stylu od 3 lat. Szpilki to dla Oli idealne połączenie techniki tańca z różnorodnymi gatunkami muzycznymi. Nie brakuje nauki kroków podstawowych i ich doskonalenia, choreografii, pracy z podłogą oraz budowania samoświadomości. A to wszystko przy akompaniamencie r&b, popu czy hip hopu. Dlatego na zajęciach każdy znajdzie coś dla siebie: zarówno osoby, które nigdy nie miały z tańcem do czynienia oraz te, które tańczą i chcą rozwijać się w stylu High Heels.`,
      },
    ],
  },
  {
    key: "kids",
    title: "KIDS",
    videos: [
      {
        id: "k1",
        videoId: "0CoK85rbbIk",
        title: "KIDS CHOREO ZUZA",
        teacher: "ZUZANNA KUŹMICKA",
        isVertical: true,
        level: "beginers",
        description: `Tancerka z 18 letnim doświadczeniem. Nauczycielka tańca od 6 lat w różnych miastach w Polsce. Już za moment pani psycholog w spec. wspierania rozwoju dzieci i młodzieży. Była członkini formacji street dance PoProstu Squad, aktualnie tańcząca w ekipie Waack on Point Zuzia to wulkan pozytywnej energii i wiedzy. Uwielbia łączyć technikę tańca z kreatywnym ruchem. Regularnie uczestniczy w zawodach i warsztatach tanecznych w stylu Waacking. Organizatorka eventu Waack for Connect i nasza wspaniała recepcjonistka.`,
      },
    ],
  },
  {
    key: "salsa",
    title: "LATINA/SALSA",
    videos: [
      {
        id: "s1",
        videoId: "Vy8moBcKVIM",
        title: "BRAK VIDEO",
        teacher: "ABAD BOLANOS",
        level: "beginers",
        description: `Pochodzi z Pinar del Rio, zachodniej Kuby. Tańczy od dziecka, już w szkole podstawowej brała udział w różnych konkursach i formacjach tanecznych, na studiach uczestniczył w programie międzynarodowej wymiany kulturalnej, ucząc tańca studentów z innych krajów. Późniejsze lata, spędzone obok Varadero, to czas stałego kontaktu z zagranicznymi turystami, których także niejednokrotnie uczył latynoskich rytmów.

W Polsce debiutował na dwóch edycjach festiwalu CaribeMix 2010, 2011 (Wrocław), brał udział w Rueda Rekord w Katowicach (Salsopolis, lipiec 2011), obecnie zaś współpracuje z poznańskimi szkołami tańca i studio fitness. Prowadził także warsztaty podczas Dancing Poznań (Polski Teatr Tańca) w latach 2012 i 2013 oraz prezentował rytmy latynoskie podczas KONCERTu NOWOROCZNego w auli UAM (2014) oraz KONCERTu MUSICA CUBANA grupy INSPIRO ENSEMBLE, z Aleksandrą Wojtaszek i Rei Ceballo (2014). Specjalizuje się w salsie kubańskiej (solo, w parach, rueda), reggeaton i rumbie kubanskiej. Uczy też innych rytmów latynoskich, takich jak merengue, bachata, mambo, conga, cza-cza. Lekcje ze Abadem to duży wysiłek fizyczny i solidna dawka ćwiczeń dla wszystkich partii mięśni, ale także olbrzymia radość życia i pozytywna energia, jakże charakterystyczna dla moich rodaków.
`,
      },
    ],
  },
  {
    key: "kpop",
    title: "K-POP",
    videos: [
      {
        id: "kp1",
        videoId: "4Wywqv5V2bg",
        title: "K-POP NIKOLA",
        teacher: "NIKOLA PERCZAK",
        isVertical: true,
        level: "beginers",
        description: `Jej taneczna przygoda rozpoczęła się w 2014 roku. Swoje pierwsze taneczne kroki stawiała w stylach takich jak New Age, Dancehall i Hip Hop.
Prawdziwym przełomem w jej rozwoju okazało się jednak poznanie Waackingu — stylu, który pokochała dzięki zajęciom u Dominiki Jałoszyńskiej i który do dziś jest najbliższy jej sercu.

K-Pop towarzyszy jej już od 14 lat — dziś z ogromną przyjemnością dzieli się tą pasją z innymi, starając się pokazać wyjątkową energię i różnorodność południowokoreańskiej kultury.

Jako tancerka i instruktorka stawia na ciągły rozwój. Regularnie szkoli się u polskich i zagranicznych choreografów, uczestnicząc w warsztatach, zawodach oraz obozach tanecznych w różnych częściach kraju. Ważna jest dla niej rzetelność przekazywanej wiedzy, dlatego nieustannie pogłębia swoje umiejętności, testuje nowe techniki i poszukuje świeżych inspiracji.

Na swoich zajęciach dba o dobrą atmosferę i energię. Łączy pasję z profesjonalizmem, wierząc, że taniec jest dla każdego i może stać się wyjątkową formą wyrażania siebie.
`,
      },
    ],
  },
];

// утилита: первый ролик как дефолт
const getDefault = () => {
  const firstCat = DATA[0];
  return {
    ...firstCat.videos[0],
    catKey: firstCat.key,
    catTitle: firstCat.title,
  };
};

export default function Classes() {
  const [selected, setSelected] = useState(getDefault());
  const [isMobile, setIsMobile] = useState(false);
    const { t } = useTranslation(); 

  useEffect(() => {
    const mq = matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onPick = (cat, video) => {
    setSelected({ ...video, catKey: cat.key, catTitle: cat.title });
    // скролл к плееру на мобиле
    if (isMobile) {
      document
        .getElementById("playerTop")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const playerSrc = useMemo(() => {
    if (!selected?.videoId) return "";
    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      modestbranding: "1",
    });
    return `https://www.youtube.com/embed/${selected.videoId}?${params.toString()}`;
  }, [selected]);

  return (
    <div className="directions-wrap">
      <div className="container classes">
        <Title level={2} className="directions-title">
          {t('classes.title')}
        </Title>

        <div className="directions-grid">
          {/* Плеер */}
          <section id="playerTop" className="player-card card">
            <div className={`video-aspect ytWrap ${selected?.isVertical ? "vertical" : "horizontal"}`}>
              {playerSrc && (
                <iframe
                  title={selected?.title || "Video"}
                  src={playerSrc}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </section>
          {isMobile && <Title
            level={3}
            className="mobile-title"
          >
            {selected?.catTitle} <span className="dot">•</span>{" "}
            {selected?.title} <span className="dot">•</span>{" "}
            {selected?.teacher}
          </Title>}

          {/* Плейлист: справа на десктопе, ниже — на мобиле */}
          <aside className="playlist card">
            {/* <Title level={4} style={{ margin: 12 }}>All styles</Title> */}

            {isMobile ? (
              <Collapse accordion ghost>
                {DATA.map((cat) => (
                  <Panel header={cat.title} key={cat.key}>
                    <List
                      itemLayout="horizontal"
                      dataSource={cat.videos}
                      renderItem={(v) => (
                        <List.Item
                          className={`playlist-item ${selected?.id === v.id ? "is-active" : ""}`}
                          onClick={() => onPick(cat, v)}
                        >
                          <List.Item.Meta
                            title={
                              <span className="playlist-title">{v.title}</span>
                            }
                            description={
                              <span className="playlist-meta">{v.teacher}</span>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                ))}
              </Collapse>
            ) : (
              <>
                {DATA.map((cat) => (
                  <div key={cat.key} className="playlist-section">
                    <div className="playlist-head">{cat.title}</div>
                    <List
                      itemLayout="horizontal"
                      dataSource={cat.videos}
                      renderItem={(v) => (
                        <List.Item
                          className={`playlist-item ${selected?.id === v.id ? "is-active" : ""}`}
                          onClick={() => onPick(cat, v)}
                        >
                          <List.Item.Meta
                            title={
                              <span className="playlist-title">{v.title}</span>
                            }
                            description={
                              <span className="playlist-meta">{v.teacher}</span>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                ))}
              </>
            )}
          </aside>
        </div>

        {/* Описание выбранного видео */}
        <section className="desc card">
          {!isMobile && <Title
            level={3}
            style={{
              margin: 0,
              marginBottom: 8,
              background: "rgba(150,75,75)",
              color: "#fff",
              padding: 12,
            }}
          >
            {selected?.catTitle} <span className="dot">•</span>{" "}
            {selected?.title} <span className="dot">•</span>{" "}
            {selected?.teacher}
          </Title>}
          <div className="desc-meta">
            <Tag>{selected?.teacher}</Tag>
            <Tag>level: {selected?.level}</Tag>
          </div>
          <Paragraph
            style={{
              whiteSpace: "pre-wrap",
              textindent: 0,
              padding: '0 12px 20px',
            }}
          >
            {selected?.description}
          </Paragraph>
        </section>

        {/* Большая CTA внизу */}
        <div className="cta-wrap">
          <Button
            type="primary"
            size="large"
            className="cta-big"
            href={`/contacts?class=${encodeURIComponent(selected?.catKey || "")}&video=${encodeURIComponent(selected?.id || "")}`}
          >
            {t('signup')}
          </Button>
        </div>
      </div>
    </div>
  );
}
