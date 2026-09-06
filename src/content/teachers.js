export const TEACHING_DIRECTIONS = [
  { key: 'waacking', label: { pl: 'Waacking', en: 'Waacking' } },
  { key: 'choreography', label: { pl: 'Choreografia', en: 'Choreography' } },
  { key: 'jazz', label: { pl: 'Jazz', en: 'Jazz' } },
  { key: 'high-heels', label: { pl: 'High Heels', en: 'High Heels' } },
  { key: 'hip-hop', label: { pl: 'Hip-Hop', en: 'Hip-Hop' } },
  { key: 'kids', label: { pl: 'Zajęcia dla dzieci', en: 'Kids dance' } },
  { key: 'k-pop', label: { pl: 'K-Pop', en: 'K-Pop' } },
  { key: 'ballet', label: { pl: 'Balet', en: 'Ballet' } },
  { key: 'acrobatics', label: { pl: 'Akrobatyka', en: 'Acrobatics' } },
  { key: 'street-dance', label: { pl: 'Street Dance', en: 'Street Dance' } },
]

export const DANCE_CLASSES = {
  waacking: { pl: 'Waacking', en: 'Waacking' },
  'waack-on-point': { pl: 'Waack On Point', en: 'Waack On Point' },
  choreography: { pl: 'Choreografia', en: 'Choreography' },
  'supa-fly': { pl: 'Supa Fly', en: 'Supa Fly' },
  jazz: { pl: 'Jazz', en: 'Jazz' },
  jazzowki: { pl: 'Jazzówki', en: 'Jazzówki' },
  'jazz-minis': { pl: 'Jazz Minis', en: 'Jazz Minis' },
  'high-heels': { pl: 'High Heels', en: 'High Heels' },
  'hip-hop': { pl: 'Hip-Hop', en: 'Hip-Hop' },
  'mini-kids': { pl: 'Mini Kids', en: 'Mini Kids' },
  kidsy: { pl: 'Kidsy', en: 'Kidsy' },
  'k-pop': { pl: 'K-Pop', en: 'K-Pop' },
  'k-point': { pl: 'K-Point', en: 'K-Point' },
  ballet: { pl: 'Balet', en: 'Ballet' },
  acrobatics: { pl: 'Akrobatyka', en: 'Acrobatics' },
  'street-dance': { pl: 'Street Dance', en: 'Street Dance' },
}

export const TEACHERS = [
  {
    id: 'zosia-ostoja-zagorska',
    name: 'Zosia Ostoja-Zagórska',
    image: '/assets/zosia.jpg',
    videoUrl: 'https://youtube.com/shorts/VsPyLYny654?si=Yy-e7kJoq3tqQZbF',
    socialUrl: 'https://www.instagram.com/zosia_oz/',
    teaching: { directionKey: 'choreography', classKeys: ['supa-fly', 'choreography'] },
    bio: {
      pl: `Zosia rozpoczęła swoją taneczną przygodę w wieku 10 lat. Przez kolejne lata intensywnie rozwijała swoje umiejętności, startując w zawodach zarówno solo, jak i w formacjach. W wieku 15 lat trafiła do Point Dance Studio, rozpoczynając od openów – i to właśnie tutaj zaczęła świadomie budować swoją taneczną tożsamość.

Z czasem dołączyła do licznych projektów tanecznych, zarówno w Polsce, jak i za granicą. Szkoliła się m.in. na programie Caps University z Ysabelle Capitule w Los Angeles, na Shay Program, a także w Bazie Tancerzy. Jej droga to nieustanny rozwój – obecnie regularnie podróżuje po Polsce i świecie, szkoląc się u najlepszych choreografów.

W 2024 roku Zosia spędziła miesiąc w Los Angeles, codziennie trenując z elitą światowej sceny tanecznej. To doświadczenie nie tylko rozwinęło jej technikę i świadomość ruchu, ale także zainspirowało ją do tworzenia własnych choreografii.`,
      en: `Zosia began her dance journey at the age of 10. Over the following years, she developed her skills intensively, competing both as a soloist and in formations. At 15, she joined Point Dance Studio, starting with open classes – and it was there that she began consciously shaping her identity as a dancer.

Over time, she joined numerous dance projects in Poland and abroad. Her training included the Caps University programme with Ysabelle Capitule in Los Angeles, the Shay Program and Baza Tancerzy. Her journey is one of continuous growth – she now travels regularly across Poland and around the world to train with leading choreographers.

In 2024, Zosia spent a month in Los Angeles, training every day with leading figures from the international dance scene. The experience developed not only her technique and movement awareness, but also inspired her to create her own choreography.`,
    },
  },
  {
    id: 'nikola-makowska-kuciak',
    name: 'Nikola Makowska-Kuciak',
    image: '/assets/nikola.jpg',
    videoUrl: 'https://youtu.be/ejusLcbAVnI',
    socialUrl: 'https://www.instagram.com/_n.makowska_kuciak/',
    teaching: { directionKey: 'jazz', classKeys: ['jazz', 'jazzowki', 'jazz-minis'] },
    bio: {
      pl: `Razem z Dominiką Lubawy założycielka studia tańca „Dance Point” w Luboniu.

Tańczy od 8 roku życia. Trenowała wiele technik tańca: waacking, taniec współczesny, high heels oraz jazz. Dziś jej specjalizacją jest właśnie taniec jazzowy, w którym wciąż poszukuje nowych rozwiązań oraz połączeń z innymi technikami. Aktualnie mieszka w Poznaniu. Jest instruktorką w szkole Point Dance Studio i Dance Point.

Szkoliła się również w Nowym Jorku, w renomowanych szkołach Broadway Dance Center oraz Steps on Broadway, co znacząco wpłynęło na rozwój jej tanecznego języka i podejścia do techniki.

Cały czas prężnie pracuje nad swoimi wizjami, czego efektem jest jej autorski projekt „JazzJam”. Na swoich zajęciach najbardziej skupia się na feelingu, czuciu jazzu, zabawie rytmicznej, podstawach oraz eksploracji!`,
      en: `Together with Dominika Lubawy, she founded the Dance Point dance studio in Luboń.

She has been dancing since the age of eight. She has trained in many dance techniques, including waacking, contemporary dance, high heels and jazz. Today, jazz is her main specialisation, and she continues to look for new ideas and connections with other techniques. She currently lives in Poznań and teaches at Point Dance Studio and Dance Point.

She also trained in New York at the renowned Broadway Dance Center and Steps on Broadway, which had a significant influence on the development of her dance language and approach to technique.

She continually works on bringing her artistic ideas to life, including her original project, “JazzJam”. In her classes, she focuses especially on feeling, experiencing jazz, rhythmic play, foundations and exploration.`,
    },
  },
  {
    id: 'aleksandra-kaszubowska',
    name: 'Aleksandra Kaszubowska',
    image: '/assets/ola.jpg',
    videoUrl: 'https://youtube.com/shorts/CG0aJup7Ubk?si=sLbiXZKi5MT_dIAT',
    socialUrl: 'https://www.instagram.com/kaszub_owska/',
    teaching: { directionKey: 'high-heels', classKeys: ['high-heels'] },
    bio: {
      pl: `Tancerka i absolwentka kierunku Taniec w Kulturze Fizycznej na Akademii Wychowania Fizycznego w Poznaniu. High Heels poznała i zaczęła tańczyć 5 lat temu, uczy tego stylu od 3 lat. Szpilki to dla Oli idealne połączenie techniki tańca z różnorodnymi gatunkami muzycznymi. Nie brakuje nauki kroków podstawowych i ich doskonalenia, choreografii, pracy z podłogą oraz budowania samoświadomości. A to wszystko przy akompaniamencie r&b, popu czy hip hopu. Dlatego na zajęciach każdy znajdzie coś dla siebie: zarówno osoby, które nigdy nie miały z tańcem do czynienia oraz te, które tańczą i chcą rozwijać się w stylu High Heels.`,
      en: `A dancer and graduate of the Dance in Physical Culture programme at the University School of Physical Education in Poznań. Ola discovered High Heels and began dancing the style five years ago, and she has been teaching it for three years. For her, dancing in heels is the ideal combination of dance technique and a wide range of musical genres. Her classes include learning and refining fundamental steps, choreography, floorwork and building self-awareness, all accompanied by r&b, pop or hip-hop. This gives everyone something to enjoy, both people who have never danced before and experienced dancers who want to develop their High Heels skills.`,
    },
  },
  {
    id: 'zuzanna-kuzmicka',
    name: 'Zuzanna Kuźmicka',
    image: '/assets/zuza.jpg',
    videoUrl: 'https://youtube.com/shorts/0CoK85rbbIk?feature=share',
    socialUrl: 'https://www.instagram.com/poprostu.waack.zuza/',
    teaching: { directionKey: 'kids', classKeys: ['mini-kids', 'kidsy'] },
    bio: {
      pl: `Tancerka z 18 letnim doświadczeniem. Nauczycielka tańca od 6 lat w różnych miastach w Polsce. Już za moment pani psycholog w spec. wspierania rozwoju dzieci i młodzieży. Była członkini formacji street dance PoProstu Squad, aktualnie tańcząca w ekipie Waack on Point Zuzia to wulkan pozytywnej energii i wiedzy. Uwielbia łączyć technikę tańca z kreatywnym ruchem. Regularnie uczestniczy w zawodach i warsztatach tanecznych w stylu Waacking. Organizatorka eventu Waack for Connect i nasza wspaniała recepcjonistka.`,
      en: `A dancer with 18 years of experience and a dance teacher for six years in cities across Poland. She will soon qualify as a psychologist specialising in supporting the development of children and young people. A former member of the PoProstu Squad street dance formation and currently a member of Waack on Point, Zuzia brings an abundance of positive energy and knowledge. She loves combining dance technique with creative movement and regularly takes part in waacking competitions and workshops. She organises the Waack for Connect event and is also our wonderful receptionist.`,
    },
  },
  {
    id: 'nikola-perczak',
    name: 'Nikola Perczak',
    image: '/assets/nikola_p.jpg',
    videoUrl: 'https://youtube.com/shorts/4Wywqv5V2bg?feature=share',
    socialUrl: 'https://www.instagram.com/perczak_/',
    teaching: { directionKey: 'k-pop', classKeys: ['k-pop', 'k-point'] },
    bio: {
      pl: `Jej taneczna przygoda rozpoczęła się w 2014 roku. Swoje pierwsze taneczne kroki stawiała w stylach takich jak New Age, Dancehall i Hip Hop.

Prawdziwym przełomem w jej rozwoju okazało się jednak poznanie Waackingu — stylu, który pokochała dzięki zajęciom u Dominiki Jałoszyńskiej i który do dziś jest najbliższy jej sercu.

K-Pop towarzyszy jej już od 14 lat — dziś z ogromną przyjemnością dzieli się tą pasją z innymi, starając się pokazać wyjątkową energię i różnorodność południowokoreańskiej kultury.

Jako tancerka i instruktorka stawia na ciągły rozwój. Regularnie szkoli się u polskich i zagranicznych choreografów, uczestnicząc w warsztatach, zawodach oraz obozach tanecznych w różnych częściach kraju. Ważna jest dla niej rzetelność przekazywanej wiedzy, dlatego nieustannie pogłębia swoje umiejętności, testuje nowe techniki i poszukuje świeżych inspiracji.

Na swoich zajęciach dba o dobrą atmosferę i energię. Łączy pasję z profesjonalizmem, wierząc, że taniec jest dla każdego i może stać się wyjątkową formą wyrażania siebie.`,
      en: `Her dance journey began in 2014. She took her first steps in styles such as New Age, dancehall and hip-hop.

The real turning point in her development was discovering waacking – a style she fell in love with through classes with Dominika Jałoszyńska and which remains closest to her heart today.

K-pop has been part of her life for 14 years. She now takes great pleasure in sharing this passion with others and showing them the unique energy and diversity of South Korean culture.

As a dancer and instructor, she is committed to continuous development. She regularly trains with Polish and international choreographers and attends workshops, competitions and dance camps across the country. The reliability of the knowledge she shares is important to her, so she continually deepens her skills, tests new techniques and looks for fresh inspiration.

In her classes, she takes care to create a positive atmosphere and energy. She combines passion with professionalism, believing that dance is for everyone and can become a unique form of self-expression.`,
    },
  },
  {
    id: 'dominika-doma-lubawy',
    name: 'Dominika “Doma” Lubawy',
    image: '/assets/Doma.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=i6W1-KUK8rU',
    socialUrl: 'https://www.instagram.com/waack.doma/',
    teaching: { directionKey: 'waacking', classKeys: ['waacking', 'waack-on-point'] },
    bio: {
      pl: `Razem z Nikolą Makowską założycielka studia tańca “Dance Point” w Luboniu.

Czołowa tancerka stylu Waacking w Polsce i na świecie, instruktorka tańca oraz choreografka, swoją przygodę z tańcem rozpoczęła w 2002r.

Pochodzi z Poznania i reprezentuje poznańskie studio tańca „Point Dance Studio”. Jest organizatorką projektu „The Way I Waack”, pierwszego na świecie obozu waackingowego. Członkini pierwszej w Polsce grupy waackingowej „Punie Crew” oraz współorganizatorka pierwszych w Polsce zawodów waackingowych „Waack on Point”. Prywatnie absolwentka Uniwersytetu im. Adama Mickiewicza na kierunku Prawo.

Ma na swoim koncie wiele zwycięstw w wydarzeniach na arenie europejskiej i światowej. Zajmowała czołowe miejsca na największych turniejach waackingowych w Azji (Japonia, Tajwan, Indonezja, Malezja, Chiny) i Europie.

Jako nauczycielka zwiedziła już znaczną część świata, ucząc i zarażając miłością do tańca m.in. w takich krajach jak: Korea Południowa, Tajwan, Wietnam, Indie, Singapur, Francja, Grecja, Włochy, Niemcy, Litwa, Rumunia, Ukraina, Hiszpania. W 2020r. na specjalne zaproszenie wystawiła wraz z „Punie Crew” spektakl w Paryżu na „All Europe Waacking Festival”.

W 2025r. choreograf w polskiej edycji programu You Can Dance.

W 2024r. wykładowca na Beijing Contemporary Music Academy w Chinach.`,
      en: `Together with Nikola Makowska, she founded the Dance Point dance studio in Luboń.

A leading waacking dancer in Poland and internationally, as well as a dance instructor and choreographer, she began her dance journey in 2002.

Originally from Poznań, she represents the Poznań-based Point Dance Studio. She organises The Way I Waack, the world’s first waacking camp. She is a member of Punie Crew, Poland’s first waacking group, and a co-organiser of Waack on Point, the first waacking competition in Poland. Outside dance, she is a law graduate of Adam Mickiewicz University.

She has achieved numerous victories at events on the European and international stages, placing highly at major waacking competitions in Asia – including Japan, Taiwan, Indonesia, Malaysia and China – and in Europe.

As a teacher, she has travelled across much of the world, sharing her knowledge and love of dance in countries including South Korea, Taiwan, Vietnam, India, Singapore, France, Greece, Italy, Germany, Lithuania, Romania, Ukraine and Spain. In 2020, by special invitation, she performed with Punie Crew in Paris at the All Europe Waacking Festival.

In 2025, she was a choreographer on the Polish edition of You Can Dance.

In 2024, she was a lecturer at the Beijing Contemporary Music Academy in China.`,
    },
  },
  {
    id: 'jedrek',
    name: 'Jędrek',
    image: '/assets/jedrek.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=ng2t8IE4nrE',
    socialUrl: 'https://www.instagram.com/jedras_in/',
    teaching: { directionKey: 'hip-hop', classKeys: ['supa-fly', 'hip-hop'] },
    bio: {
      pl: `Jestem tancerzem od 5 roku życia. Style, na których bazuję to Hip Hop i Bboying. Zaczerpnąłem także sporo wiedzy z Poppingu, co daje mi naprawdę dużo nowych możliwości w tańcu, który teraz rozwijam. Pomimo młodego wieku, byłem na wielu zawodach, zajęciach, obozach czy panelach dyskusyjnych. Przez to, że wcześnie zaczynałem mogłem dostrzec, jak kultura hip hopowa w Polsce się zmienia, ilu nowych tancerzy przybywa i sam sprawdzać się, konkurując z nimi na zawodach. Na początku nie było kategorii wiekowych, więc szedłem na głębokie wody, startując z dorosłymi. Myślę, że dało mi to naprawdę dużo siły, odwagi i przede wszystkim chęci i motywacji. Jeżeli miałbym opisać swój styl w trzech słowach byłyby to: kreatywny, spontaniczny i bez barier.`,
      en: `I have been a dancer since the age of five. The styles I build on are hip-hop and b-boying. I have also gained a great deal of knowledge from popping, which gives me many new possibilities in the dance I am now developing. Despite my young age, I have taken part in many competitions, classes, camps and panel discussions. Because I started early, I was able to observe how hip-hop culture in Poland was changing, see how many new dancers were emerging and test myself by competing against them. At first there were no age categories, so I was thrown in at the deep end and competed with adults. I believe this gave me a great deal of strength, courage and, above all, drive and motivation. If I had to describe my style in three words, they would be creative, spontaneous and without barriers.`,
    },
  },
  {
    id: 'wiktoria',
    name: 'Wiktoria',
    image: '/assets/wiktoria.jpg',
    videoUrl: 'https://youtube.com/shorts/ih2gfDNrpxU?feature=share',
    socialUrl: 'https://www.instagram.com/w_tomaszewskaa/',
    teaching: { directionKey: 'acrobatics', classKeys: ['acrobatics'] },
    bio: {
      pl: `Wiktoria rozpoczęła swoją przygodę z akrobatyką i tańcem ponad 10 lat temu. Przez lata intensywnie doskonaliła się i próbowała wielu stylów tanecznych równocześnie rozwijając się akrobatycznie i ucząc się kolejnych tricków i kombinacji.

Dziś nieustannie rozwija swoje umiejętności w tańcu współczesnym, w którym wciąż poszukuje połączeń z innymi technikami. Kocha trenować akrobatykę, dzięki której może stale urozmaicać swoje choreografie.

Na zajęciach nauczy Was mnóstwa elementów akrobatycznych, które wykorzystacie w tańcu i pomoże je dopracować, abyście mogli z dumą pokazywać je na scenie.`,
      en: `Wiktoria began her journey with acrobatics and dance more than ten years ago. Over the years, she trained intensively and explored many dance styles while developing her acrobatic skills and learning new tricks and combinations.

Today, she continues to develop her contemporary dance skills, always looking for ways to connect them with other techniques. She loves training in acrobatics, which enables her to keep adding variety to her choreography.

In her classes, she will teach you many acrobatic elements that can be used in dance and help you refine them so that you can perform them proudly on stage.`,
    },
  },
  {
    id: 'victoria',
    name: 'Victoria',
    image: '/assets/victoria.jpeg',
    socialUrl: 'https://www.instagram.com/vickysilvero1/',
    teaching: { directionKey: 'ballet', classKeys: ['ballet'] },
    bio: {
      pl: `Victoria Silvero to argentyńska nauczycielka i tancerka tańca klasycznego oraz współczesnego, mieszkająca i pracująca w Poznaniu. Ukończyła Wyższy Instytut Sztuki María Angélica Pellegrino (ISPEA) w Argentynie. W czasie studiów była członkinią zespołu baletowego instytutu, występując w klasycznym repertuarze, m.in. w Giselle, Jeziorze łabędzim, Śpiącej królewnie i Symfonii C-dur, a także w autorskich choreografiach.

Po ukończeniu studiów otrzymała stypendium na dalsze kształcenie w Fundacji Julio Bocca w Buenos Aires. Po przeprowadzce do Polski kontynuowała naukę tańca współczesnego i improwizacji pod okiem Patricka Gorzkiewicza i Michała Strugarka. Brała również udział w spektaklu Connected/Disconnected autorstwa Gorzkiewicza, prezentowanym na scenach w całej Polsce.

W nauczaniu baletu czerpie inspirację z klasycznego repertuaru, wykorzystując go do rozwijania techniki, muzykalności, koordynacji ruchowej i ekspresji artystycznej swoich uczniów. Jednocześnie zachęca ich do czerpania radości z tańca oraz do odkrywania własnych możliwości poprzez ruch.`,
      en: `Victoria Silvero is an Argentinian teacher and dancer specialising in classical and contemporary dance who lives and works in Poznań. She graduated from the María Angélica Pellegrino Higher Institute of Art (ISPEA) in Argentina. During her studies, she was a member of the institute’s ballet company, performing classical repertoire including Giselle, Swan Lake, The Sleeping Beauty and Symphony in C, as well as original choreography.

After graduating, she received a scholarship to continue her education at the Julio Bocca Foundation in Buenos Aires. After moving to Poland, she continued studying contemporary dance and improvisation under Patrick Gorzkiewicz and Michał Strugarek. She also took part in Gorzkiewicz’s production Connected/Disconnected, which was presented on stages across Poland.

In her ballet teaching, she draws inspiration from the classical repertoire and uses it to develop her students’ technique, musicality, movement coordination and artistic expression. At the same time, she encourages them to enjoy dance and discover their own possibilities through movement.`,
    },
  },
  {
    id: 'maja-ozminska',
    name: 'Maja Oźmińska',
    image: '/assets/maja.jpeg',
    videoUrl: 'https://youtube.com/shorts/8FxBsPFGLf4?feature=share',
    teaching: { directionKey: 'street-dance', classKeys: ['street-dance'] },
    bio: {
      pl: `Głównym stylem którym zajmuje się Maja jest waacking ale wyraża siebie również poprzez house, hip hop, soul dance i elementy tańca współczesnego.
Z tańcem związana od 2009 roku. Zaczynała tańcząc w formacjach hip hop'owych oraz w teatrze tańca. Członkini Waack on Point crew.

Maja ma na swoim koncie mnóstwo sukcesów turniejowych, niżej lista wybranych tytułów:
2 miejsce RedBull Dance Your Style Tancbuda Challenge 2026
1 miejsce Waacking Open Infinite Force Camp 2026 Gdańsk
1 miejsce Waacking Open Dobry Contest 2021 Szczecin
1 miejsce Waacking Open Do That Waack 2021 Poznań
3 miejsce Waacking Open Rytm Ulicy 2021 Piła
Top 4 Waacking Open One Style One Love Osaka 2024
Top 8 Waacking Under 18 Eleganza Waacking Festiwal 2022&2023
Top 30 Waacking Open Cest la Waack 2025 Tajwan

Osiągnięcia jako trener:
Rytm Ulicy formacje 10-12 lat debiut 3 miejsce
Show Your Flow formacje 11-14 lat 1 miejsce`,
      en: `Maja’s main style is waacking, but she also expresses herself through house, hip-hop, soul dance and elements of contemporary dance.
She has been involved in dance since 2009. She began by dancing in hip-hop formations and dance theatre and is a member of the Waack on Point crew.

Maja has achieved many competition successes. Selected results include:
2nd place – Red Bull Dance Your Style Tancbuda Challenge 2026
1st place, Waacking Open – Infinite Force Camp 2026, Gdańsk
1st place, Waacking Open – Dobry Contest 2021, Szczecin
1st place, Waacking Open – Do That Waack 2021, Poznań
3rd place, Waacking Open – Rytm Ulicy 2021, Piła
Top 4, Waacking Open – One Style One Love Osaka 2024
Top 8, Waacking Under 18 – Eleganza Waacking Festival 2022 and 2023
Top 30, Waacking Open – C’est la Waack 2025, Taiwan

Achievements as a coach:
3rd place debut – Rytm Ulicy, formations aged 10–12
1st place – Show Your Flow, formations aged 11–14`,
    },
  },
]
