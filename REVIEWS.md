# Review Summary P2: IT2810-H25-T32

*Generated on 2025-11-12*

**Takk for at du leser tilbakemeldingene fra medstudentvurderingene!**
Vi vil gjerne høre din mening om de oppsummerte tilbakemeldingene. Bruk dette [spørreskjemaet](https://nettskjema.no/a/565641). Etter å ha svart på skjemaet har du mulighet til å være med i trekking av 3 gavekort á 200 kroner.

---

## Tilgjengelighet

**Søkefelt og sorteringskontroll trenger bedre tilgjengelighet**  
Dette problemet gjelder søkefeltet og sorteringskontrollen. Søkefeltet har ingen synlig label og bruker kun placeholder, noe som gjør det vanskelig for skjermlesere og tastaturnavigasjon å forstå formålet. Dette skjer på forsiden og i sider hvor man søker bøker. Uten riktig etikett eller aria-label reduseres tilgjengeligheten og brukeropplevelsen for personer som trenger assistanse. For å løse dette bør dere legge til en label="Search books" (eller minst aria-label) for søkefeltet, og erstatte Checkbox-baserte sorteringskontroller med en IconButton/ToggleButton som har aria-pressed og et klart aria-label (f.eks. “Sort ascending/descending”). Fjern også den såkalte "Checkbox demo".  
Reviewer(s): [Quincy](#tilgjengelighet-quincy)

--------------------

**Tastaturnavigasjon og aria-labels trenger forbedring**  
Dette gjelder tastaturnavigasjon og manglende aria-labels. Det finnes flere tilgjengelighetsproblemer knyttet til tastaturnavigasjon: hovedsiden lar brukere ikke velge bøker ved hjelp av tab/Enter, og enkelte elementer mangler aria-labels. Dette gjelder også navigering mellom ressurser og bokkortene. Flere brukere peker på at tastaturnavigasjon på siden er mangelfull: det fungerer på mange knapper, men ikke på enkeltbøkene på forsiden. Forbedringer anbefales: sikre at alle interaktive elementer er tastaturnavigerbare og har tydelige aria-labels, spesielt for bokkortene og andre ressurser; legg til dokumentasjon over hvilke tilgjengelighetsvalg dere har gjort.  
Reviewer(s): [Finley](#tilgjengelighet-finley), [Xander48](#tilgjengelighet-xander48), [River](#tilgjengelighet-river), [Thea](#tilgjengelighet-thea)

--------------------

**Kontrast og lesbarhet i tekst og kontroller**  
Dette problemet omhandler kontrast og lesbarhet. Finley påpeker at teksten når man legger inn anmeldelser burde ha høyere kontrast mot bakgrunnen for bedre lesbarhet. Også Penny19 peker på behovet for bedre kontrast på Back-knappen på aboutBook-siden. Dette påvirker spesielt brukere med nedsatt syn og i situasjoner med varierende lysforhold. For å løse dette bør dere justere fargene/kontrastnivået i CSS og sikre at tekst i skjemaer og kontroller oppfyller WCAG-nivå AA.  
Reviewer(s): [Finley](#tilgjengelighet-finley), [Penny19](#tilgjengelighet-penny19)

--------------------

**Dokumentasjon av tilgjengelighetsvalg**  
River etterspør dokumentasjon over hvilke tilgjengelighetsvalg dere har gjort i prosjektet. Uten slik dokumentasjon blir det vanskelig å forstå beslutningene og å vedlikeholde koden på sikt. En kort, lett tilgjengelig dokumentasjon i repoet som beskriver ARIA-bruk, semantisk HTML og fokusstyring vil være til stor hjelp.  
Reviewer(s): [River](#tilgjengelighet-river)

---------------------

---

## Funksjonalitet

Mangel på registrering/innlogging for nye brukere
Dette problemet handler om manglende støtte for registrering og innlogging av nye brukere. Flere kommentarer peker på at det kun finnes en forhåndsdefinert/demo-bruker, og at det mangler en registreringsside og støtte for opprettelse av nye kontoer. Dette gjør det vanskelig for nye brukere å komme i gang og å skrive egne anmeldelser, noe som begrenser skalerbarheten og brukervennligheten. Forslagene i tilbakemeldingen er å legge til en registreringsside og et riktig login-flow slik at nye brukere kan opprette konto og logge inn utover demo-brukeren.

Reviewer(s): [Xander48](#funksjonalitet-xander48), [River](#funksjonalitet-river), [Mason](#funksjonalitet-mason), [Penny19](#funksjonalitet-penny19)

----------------------------------------

Mangler paginering i stedet for uendelig innlasting
Brukeropplevelsen skalerer seg ikke godt med uendelig scrolling; dette ble trukket fram som en hindring for å håndtere større datamengder. Finley peker på behovet for paginering (for eksempel sidetall) for bedre ytelse og mer forutsigbar lasting, mens Quincy også kommenterer at bruk av “view more”/neste batch ville være en tydeligere løsning. Uten paginering kan innhold bli tungt å laste inn og mindre brukervennlig over tid. En løsning vil være å implementere sidebasert paginering med tydelig navigasjon og lastindikatorer.

Reviewer(s): [Finley](#funksjonalitet-finley), [Quincy](#funksjonalitet-quincy)

----------------------------------------

Multifilter som støtter flere kriterier
Filtrering bør kunne kombineres på flere måter. Finley foreslår å kunne filtrere på flere ting samtidig, for eksempel forfatter, mens Penny19 spesifiserer behovet for å støtte filtrering på flere kategorier samtidig samt årstall. Dette vil gjøre det lettere å finne relevante bøker når datamengden vokser og forbedrer brukeropplevelsen. Implementering av multi-select filtre og mulighet for årstall/intervall, samt mulig synkronisering av filtrering til URL, blir anbefalt.

Reviewer(s): [Finley](#funksjonalitet-finley), [Penny19](#funksjonalitet-penny19)

----------------------------------------

Visning av riktig forfatternavn og tidsstempel på anmeldelser
Anmeldelser vises i dag med en generisk “User #1” som forfatter. Xander48 peker på at forfatteren bør være brukernavnet eller e-posten, og Thea støtter også ideen om å vise brukernavn og tidsstempel på anmeldelser. Dette påvirker tydelighet og troverdighet i brukerinnholdet. Tiltak: sikre at anmeldelser lagres med riktig brukernavn og vis dette på anmeldelsene, samt vurdere å vise tidsstempel og tilby enkelte brukerbaserte visninger (f.eks. profil eller favoritter) i tillegg.

Reviewer(s): [Xander48](#funksjonalitet-xander48), [Thea](#funksjonalitet-thea)

----------------------------------------

Mulighet til å slette egne anmeldelser mangler
Det mangler funksjonalitet til å slette egne anmeldelser, noe som er nevnt som ønskelig i tilbakemeldingen. Uten slik funksjonalitet blir det vanskelig å administrere eget innhold. Forslag: implementere funksjon for å slette (og eventuelt redigere) egne anmeldelser for bedre innholdskontroll og brukerfrihet.

Reviewer(s): [Xander48](#funksjonalitet-xander48)

----------------------------------------

Refetch av data etter å legge inn en anmeldelse bør bruke Apollo-cache
Et annet forbedringsområde er hvordan data oppfriskes etter at en bruker legger inn en anmeldelse. Penny19 påpeker at refetching gjøres ved en full reload av siden, og anbefaler å bruke Apollo-cache for å oppdatere dataene uten full sideoppdatering. Dette vil gi en smidigere brukeropplevelse og redusere unødvendig nettverkstrafikk.

Reviewer(s): [Penny19](#funksjonalitet-penny19)

----------------------------------------

Dark mode huskes ikke ved innlogging
Dark mode huskes i lokal lagring, men huskes ikke når man er logget inn. Dette ble påpekt som et problem fordi preferansen ikke følger brukeren mellom økter og innlogging. En løsning kan være å persistere brukerpreferansen i brukerprofilen eller lagre den sammen med innloggingsinformasjonen slik at den følger brukeren ved innlogging.

Reviewer(s): [Xander48](#funksjonalitet-xander48)

----------------------------------------

Sorteringskontroll mangler semantikk
Sorteringsretningen i grensesnittet bruker en Checkbox, men det blir sett på som litt misvisende. Det anbefales å bruke en ToggleButton/IconButton med tydelig aria-label for å gjøre kontrollen mer semantisk riktig og tilgjengelig.

Reviewer(s): [Quincy](#funksjonalitet-quincy)

----------------------------------------

Stjerne-rating må være tastaturnavigerbar og ARIA-oppdatert
Stjerne-ratingen bør være klikkbar via tastatur og må annonsere valgt verdi for skjermlesere. Dette er viktig for tilgjengelighet og likeverdig bruk av appen for alle brukere. Forbedringen bør implementeres slik at tastaturnavigasjon fungerer sømløst og AT-brukere får riktig tilbakemelding om valgte rating.

Reviewer(s): [Quincy](#funksjonalitet-quincy)

---

## Design og utforming

**Dårlig kontrast og synlighet i Dark mode**  
Det er utfordringer med kontrast i dark mode, spesielt for sekundærtekst og placeholder i søkefeltet. Dette påvirker lesbarheten, særlig for brukere som bruker mørk bakgrunn. Thea peker også på at kontrasten mellom kortene og bakgrunnen i dark mode kunne være tydeligere, og foreslår en mørkere bakgrunn eller tydeligere kanter. Finley anbefaler å øke kontrasten når man legger til en review i dark mode for bedre leseevne. For å løse dette bør dere gjennomgå fargevalgene i dark mode og justere CSS-variabler slik at tekst og placeholders har tilstrekkelig kontrast.

Reviewer(s): [Quincy](#design-og-utforming-quincy), [Finley](#design-og-utforming-finley), [Thea](#design-og-utforming-thea)

--------------------------------------------------

**Responsivt oppsett og sentrering av kort på små skjermer**  
Både Quincy og Thea peker på at layouten ikke oppfører seg optimalt på veldig små bredder. Kortene blir ganske smale eller limes mot venstre side på små skjermstørrelser, og breakpointene bør vurderes litt tidligere. Dette gir en mindre balansert og intuitiv brukeropplevelse. En løsning kan være å justere breakpoint-verdier og sentrere bookcardene på små skjermer slik at presentasjonen blir mer symmetrisk og konsistent.

Reviewer(s): [Quincy](#design-og-utforming-quincy), [Thea](#design-og-utforming-thea)

--------------------------------------------------

**Fokusramme for interaktive elementer kunne være tydeligere**  
Quincy nevner at fokusstil for interaktive elementer kunne vært mer synlig. Dette påvirker tilgjengeligheten, spesielt for brukere som navigerer med tastatur. En tydeligere fokusramme (for eksempel sterkere outline eller kontrast) vil gjøre det enklere å se hvilket element som er i fokus. Forslag er å forbedre fokus-stilen og teste den i forskjellige modus og skjemamørk.

Reviewer(s): [Quincy](#design-og-utforming-quincy)

--------------------------------------------------

**Scroll og plassering av reviews-container**  
Penny19 peker på at det i liten container kan være lite intuitivt at anmeldelser inneholder en scroll, og situasjonen kan oppleves som trang. Det kan også være ønskelig å flytte reviews-ut av selve card-elementet for bedre lesbarhet. Dette påvirker brukervennligheten når innholdet blir presset sammen i en liten plass og gjør det vanskelig å lese.

Reviewer(s): [Penny19](#design-og-utforming-penny19)

--------------------------------------------------

**Footer synlighet på bokdetaljsiden på små skjermer**  
Mason peker på at footeren vises på bokdetaljsiden før man scroller, noe som kan være distraherende på mindre skjermer. En løsning kan være å gjemme footeren til brukeren har scrollet ned, eller å justere layouten slik at footeren ikke er synlig i første visning. Dette påvirker fokus og estetikk på skjermenivå.

Reviewer(s): [Mason](#design-og-utforming-mason)

--------------------------------------------------

---

## Bærekraft

**Mangel på dokumentasjon av bærekraftvalg**
Det er uttrykt mangel på dokumentasjon av bærekraftige valg i innleveringen; River påpeker at det ikke finnes dokumentasjon av bærekraftige valg, og at dette vil være et forbedringspunkt. Dette gjør det vanskelig å vurdere om designvalg er i tråd med bærekraftige prinsipper og redusere usikkerhet rundt beslutninger. Mason påpeker også at gruppen ikke har skrevet om bærekraft i innleveringen, men peker ut hva som skal fokuseres på i neste iterasjon: redusere unødvendige gjengivelser, verifisere lazy loading og evaluere hvordan designvalgene stemmer overens med grønne prinsipper. Forslagene som gis tyder på at en tydelig dokumentasjon i README om bærekraftsmål og de aktuelle tiltakene vil gjøre prosjektet mer transparent. Denne dokumentasjonen vil sannsynligvis styrke tilliten til bærekraftarbeidet og gjøre det enklere å følge opp i neste runde.

Reviewer(s): [River](#b-rekraft-river), [Mason](#b-rekraft-mason)


------------------------------

**Dark mode og bærekraft – default og dokumentasjon**
Flere kommentarer peker på dark mode som et vesentlig bærekraftstiltak, siden mørke temaer kan redusere energiforbruk på OLED-skjermer; Finley og Thea understreker at dark mode er en del av et konsistent design multidimensjonalt med støtte for både mørkt og lyst tema. Xander48 foreslår at dark mode bør være standard når man først besøker nettsiden, noe som vil gjøre energibesparelsen mer konsekvent fra førsteinntrykket. Penny19 påpeker at light/dark mode, samt lazy loading og paginering, er positive og relevante valg for bærekraft, mens Quincy legger vekt på at effektive GraphQL-forespørsler og enkel fargepalett også støtter lavere vekt på data og styling. For å gjøre disse beslutningene tydeligere anbefales det å dokumentere dem enda bedre i README-en og vurdere å gjøre dark mode til standard. Dette vil ikke bare styrke bærekraftinntrykket, men også brukervennligheten for nye besøkende.

Reviewer(s): [Xander48](#b-rekraft-xander48), [Finley](#b-rekraft-finley), [Thea](#b-rekraft-thea), [Penny19](#b-rekraft-penny19), [Quincy](#b-rekraft-quincy)


------------------------------

**Debounced søk og lazy loading mangler i koden**
Det kommer tydelig fram at det mangler debounced søk, lazy loading eller lignende i koden, noe som ifølge River kan bidra til unødvendige kall og høyere belastning. Mason støtter denne viken og legger vekt på at lazy loading bør verifiseres i neste iterasjon. Dette påvirker både ytelse og brukeropplevelse, spesielt ved større datamengder. Forslagene som nevnes er å implementere debounced søk og å sikre at lazy loading faktisk er til stede og riktig konfigurert. Å prioritere disse forbedringene vil bidra til mer effektiv ressursbruk og bedre skalerbarhet i applikasjonen.

Reviewer(s): [River](#b-rekraft-river), [Mason](#b-rekraft-mason)

---

## Bruk av kunstig intelligens

**KI-bruk: omfang og balanse i koden**  
Det er tydelig delte meninger om KI-bruken i prosjektet og hvilken rolle den bør spille i koding og refaktorering. Mason foreslår at KI kunne brukes til å generere større deler av koden for å få på plass mer funksjonalitet og effektivitet i selve kodebasen. Finley og Thea peker på viktigheten av en avmålt bruk, der KI primært fungerer som sparringspartner og bidrar med små kodesnutter og debugging uten å gå på bekostning av kodekvaliteten. Thea påpeker også at det er fint at AI brukes til små bidrag og advarer mot redundant kode. Dette påvirker planlegging og ressursbruk, siden man må avveie tidsbesparelser mot læring og kvalitetssikring. For å håndtere disse synspunktene kan man vurdere en balansert strategi der KI brukes der det gir tydelig merverdi, samtidig som man dokumenterer bruken og opprettholder manuell innsats der det gir best læringsutbytte.  

Reviewer(s): [Mason](#bruk-av-kunstig-intelligens-mason), [Finley](#bruk-av-kunstig-intelligens-finley), [Thea](#bruk-av-kunstig-intelligens-thea)



----------------------------------------

**Demo-data: KI-generert innhold i db.json bør vurderes mot ekstern API**  
Dette gjelder bruken av KI for å generere demo-data i db.json-filen som viser bøker. Thea foreslår at det ville vært mer realistisk og engasjerende å hente et større datasett fra en ekstern API i stedet for AI-generert innhold. Med bedre data ville også søkefunksjonaliteten kunne være mer meningsfull, siden man vet hva som skal søkes etter uten å se på dataene direkte. En mulig løsning er å bruke et script som henter bøker fra en ekstern API og lar KI generere visningsdetaljer for demoen. Dette vil kunne gi en mer realistisk brukeropplevelse og bedre relevans i demo-scenarier.  

Reviewer(s): [Thea](#bruk-av-kunstig-intelligens-thea)





---

## Kodekvalitet

**README og dokumentasjonens plassering**
Det blir nevnt at README-filene mest sannsynlig ligger i frontend-mappen, noe som gjør det litt mindre intuitivt å finne kjøringsinstruksjonene. Flere foreslår at READMEen bør flyttes til rotnivå slik at den vises lett ved første åpning av prosjektet. Dette påvirker onboarding og den generelle forståelsen av hvordan applikasjonen settes opp og kjøres. Tiltaket som foreslås er å flytte README til roten av repoet og sikre at den første siden i repoet gir rask, relevant informasjon om prosjektet.  
Reviewer(s): [Finley](#kodekvalitet-finley), [Mason](#kodekvalitet-mason), [Xander48](#kodekvalitet-xander48)

---

**Konsolider Apollo-klient og fjern duplisering**
Det nevnes at det finnes to Apollo-klientinstanser i prosjektet: en i apollo.ts og en i dataFetcher.ts. Dette gir risiko for inkonsistente caches og uforutsigbar atferd. For å få en rask kvalitetsløft bør man bruke én felles Apollo-klient overalt (for eksempel via apollo.ts) og vurdere å fjerne den andre varianten eller omgjøre den til små util-funksjoner når dere flytter til hooks. Når flytting til hooks skjer, bør den eksisterende duplisiteten vurderes fjernet helt eller omgjøres til en mindre del av en sentral modul.  
Reviewer(s): [Quincy](#kodekvalitet-quincy), [Mason](#kodekvalitet-mason)

---

**UI-komponenter: forbedre SearchBar og SortingDirectionButton**
Quincy peker på at SearchBar kan løsrives mer ved å håndtere debounce internt og eksponere onSearch, i tillegg til at SortingDirectionButton bør byttes til en semantisk knapp/Toggle og fjerne demo-labelen for Checkbox. Dette påvirker hvordan søk og sortering oppfører seg i grensesnittet, spesielt i komponentenes interaksjon. Gjennomførbare tiltak er å implementere intern debounce-logikk i SearchBar og innføre en riktig toggle-knapp for sortering.  
Reviewer(s): [Quincy](#kodekvalitet-quincy)

---

**N+1-forespørsler og datainnhenting**
Mason peker på at BookCard-koden kaller fetchBookWithReviews for hver bok i grid (useEffect i frontend/src/components/BookCard.tsx), noe som kan resultere i mange forespørsler. Dette kan føre til dårlig ytelse og høyere belastning på backend. For å forbedre ytelsen bør forespørslene konsolideres eller lastes inn i batch, eller flyttes logikk til backend (for eksempel ved å beregne eller cache gjennomsnittlig rating ved mutasjon).  
Reviewer(s): [Mason](#kodekvalitet-mason)

---

**Styling og CSS-organisering**
Finley foreslår å flytte styling ut av TSX-filene og inn i egne CSS-filer for hver komponent eller side, eller bruke CSS-modules for å unngå overskriving mellom filer. Dette gjør hver fil kortere og ryddigere og gir en mer konsistent stil. Implementering med CSS-modules eller tilsvarende vil bidra til å unngå uforutsett stilkræsj mellom komponenter.  
Reviewer(s): [Finley](#kodekvalitet-finley)

---

**Navnkonvensjoner og inline kommentarer**
Thea påpeker at mappeorganiseringen er god, men at noen filnavn ikke følger den forventede PascalCase-konvensjonen (dataFetcher og useTheme bør hete DataFetcher og UseTheme). Hun foreslår å fortsette å holde filnavn i PascalCase og gjøre endringer der nevnte avvik finnes. I tillegg anbefales det å øke antallet inline-kommentarer i koden for bedre forståelse og vedlikehold.  
Reviewer(s): [Thea](#kodekvalitet-thea)

---

**Testing og kvalitetskontroll**
River påpeker at koden generelt er av høy kvalitet og lett å lese, men mangler tester. For å opprettholde høy standard bør det legges til minst et par tester for å sikre at endringer ikke bryter eksisterende funksjonalitet og for å fange regresjoner.  
Reviewer(s): [River](#kodekvalitet-river)

---

**Bruk av hooks for å flytte logikk ut av komponenter**
Penny19 foreslår å bruke custom hooks i stedet for å ha mye logikk i AuthButton.tsx. Dette inkluderer å flytte logikk til en egen useAuth-hook, og å vurdere andre hooks som useFilters og usePagination for å gjøre komponentene mer gjenbrukbare og enklere å vedlikeholde.  
Reviewer(s): [Penny19](#kodekvalitet-penny19)

---

## Tekniske valg

**Dobbel Apollo-klient og inkonsekvent caching**  
Det er brukt to Apollo-klienter: main.tsx bruker ApolloProvider fra ./apollo.ts, mens services/dataFetcher.ts spinner opp sin egen klient og kaller client.query manuelt. Dette fører til to uavhengige cacher, dårlig normalisering og større sjanse for utdaterte data som ikke refetches riktig. Dette skaper unødvendig kompleksitet og kan føre til inkonsekvente data i grensesnittet. For å løse det bør dere fjerne klienten i dataFetcher og bruke Apollo-hooks (useQuery, useLazyQuery, useMutation) direkte i komponentene, noe som gir mindre kode, riktig cache og bedre refetch-oppførsel.

Reviewer(s): [Quincy](#tekniske-valg-quincy), [Mason](#tekniske-valg-mason)

----------

**Stil-konsistens mellom Tailwind og MUI samt lange Tailwind-klasser**  
Flere kommentarer peker på utfordringer med å blande Tailwind og MUI. Thea nevner at Tailwind sine lange classnames kan oppleves rotete og gjøre koden vanskelig å lese, mens Mason påpeker risiko for inkonsekvent styling mellom Tailwind og MUI og at dette bør adresseres. Dette kan gjøre UI-en mindre konsistent og vedlikeholdbar over tid. Forslagene er å vurdere en felles strategi for styling, enten å forenkle bruken av Tailwind eller å standardisere på én stilramme, kanskje ved å lage gjenbrukbare komponenter som kapsler stiler og gir et konsekvent utseende.

Reviewer(s): [Thea](#tekniske-valg-thea), [Mason](#tekniske-valg-mason)

----------

**Backend kjøring og miljøoppsett hindrer utvikling**  
Finley beskriver at frontend kjører, men backend vil ikke kjøre, og prosjektet må vurderes ut fra frontend med backupdata. Dette gjør det vanskelig å verifisere hele dataflyten og integrasjonen i applikasjonen. Det er derfor en risiko for at noen feil ikke blir oppdaget før backend er tilgjengelig. En mulig vei videre kan være å sikre at backend kan kjøre lokalt eller i en enkel utviklingsmiljø-snitt, og å dokumentere tydelig hvordan man får hele stacken til å kjøre for test og demo.

Reviewer(s): [Finley](#tekniske-valg-finley)

----------

**Sikkerhet og kodekvalitet: avvik i avhengigheter og lint-feil**  
Xander48 peker på at npm install i backend gir moderat alvorlige sårbarheter og bør undersøkes/oppdateres. I frontend meldes det om fem lint-problemer, hvor to er errors, som også bør adresseres. Dette påvirker potensiell driftssikkerhet og vedlikeholdbarhet av koden. En naturlig neste skritt er å kjøre npm audit og oppdatere avhengigheter, samt å rette lint-feil og sikre en mer konsekvent kodekvalitet i hele prosjektet.

Reviewer(s): [Xander48](#tekniske-valg-xander48)

----------

**Dark mode persistens når bruker er logget inn**  
Xander48 nevner at dark-mode-valget lagres i localStorage for ikke-innloggede brukere, men at det burde lagres i backend når brukeren er logget inn. Dette vil gjøre preferansene konsistente på tross av enheter og innlogging. Implementering av backend-lagring av brukerpreferanser vil dermed forbedre brukeropplevelsen. Forslaget er å lagre preferansen i backend og hente den ved innlogging.

Reviewer(s): [Xander48](#tekniske-valg-xander48)

----------

---


# Original Feedback

## Tilgjengelighet

<a id="tilgjengelighet-quincy"></a>
**Reviewer Quincy:**

> Det er bra start med semantiske wrappers \(main, section osv.\) og MUI hjelper en del. Men dere har noen forbedringsområder. Søkefeltet har ikke label. Dere bruker kun placeholder. Legg til label="Search books" eller minst aria-label. Sorteringskontroll: Ikke bruk Checkbox til å togg­le retning. Bruk IconButton/ToggleButton med aria-pressed og en ordentlig aria-label \(f.eks. “Sort ascending/descending”\). Fjern "Checkbox demo".

<a id="tilgjengelighet-finley"></a>
**Reviewer Finley:**

> Generelt farger med bra kontrast, men som beskrevet i tidligere spørsmål bør fargen på skrifta når man legger inn review ha litt høyere kontrast til bakgrunnsfargen for å gjøre det enklere for folk med redusert syn. I tillegg prøvde jeg å navigere med taster, og det fungerer på mange knapper, men ikke på enkeltbøkene på forsiden. Et tips er å gjøre det mulig å navigere med taster gjennom hver ressurs der også. 
> 
> Ellers er det god bruk av semantisk html, der dere unngår for mye bruk av <div>, som er bra!

<a id="tilgjengelighet-xander48"></a>
**Reviewer Xander48:**

> Nettsiden er litt vanskelig å navigere med tastaturen. Det er ikke mulig å velge bøker fra hovedsiden ved bruk av tab, pilknappene og enter. Ellers er resten av nettsiden brukbar med tastaturen.
> 
> Alle bildene har alt tekst, som er veldig bra for tilgjengelighet.
> 
> Nettsiden bruker semantisk html som article, section. Dette er supert med tanke på tilgjengelighet.

<a id="tilgjengelighet-river"></a>
**Reviewer River:**

> Jeg kan ikke tabbe, eller navigerere siden med piltastene. Det er ikke skrevet aria labels heller. Dette gjør at tilgjengeligheten på siden er svak. 
> Burde også vært skrevet noe dokumentasjon over hvilke tilgjengelighetsvalg dere har gjort, når dere får gjort det

<a id="tilgjengelighet-mason"></a>
**Reviewer Mason:**

> Prosjektet har semantisk html, og fornuftig oppdeling i koden. Det er god mulig å manøvrere seg med tastaturet. 
> 
> Med bruk av lighthouse får applikasjonen score 100 av 100 på accessibility, bra!!

<a id="tilgjengelighet-penny19"></a>
**Reviewer Penny19:**

> Tilgjengeligheten for applikasjonen er løst bra:
> - Aria-labels på knapper.
> - God bruk av semantiske html-tagger
> - Alt-tekst på bilder
> - Appen er responsiv på mobil enheter
> 
> Ting som kan forbedres:
> - Høyere kontrast på "Back-knappen" fra "aboutBook"-siden

<a id="tilgjengelighet-thea"></a>
**Reviewer Thea:**

> Jeg kjørte google lighthouse på applikasjonen som endte med en score på 88. Det lighthouse hovedsakelig klager på ser ut til å være mengden HTTP requests i koden, som heller skulle være HTTPS for å øke sikkerheten. Det er sikkert noe som kan fikses for å øke robustheten i koden her, men jeg ser ikke på dette som noe tydelig problem for et skoleprosjekt som dette. Ellers git lighthouse en score på 100 på accessability som er et svært godt tegn når det kommer til utforming og fargevalg dere har tatt. 
> 
> Jeg prøvde å navigere nettsiden med kun tastatur og klarte å komme meg rundt til alle knappene, men ikke til selve bokkortene, så man kommer seg ikke inn på spesifikke bøker. 

---

## Funksjonalitet

<a id="funksjonalitet-quincy"></a>
**Reviewer Quincy:**

> Dette er et solid prosjekt. Clean, ryddig, og det meste oppfører seg slik jeg forventer i en app. Dark/light-toggle med system følger OS, proft løst via CSS-variabler og useTheme.
> 
> Landing: Navbar + søk er tydelig. Søkefeltet føles raskt nok, men dere kjører søk på hvert tastetrykk uten debounce og uten limitering i UI. Resultatet blir unødvendig trafikk og janky opplevelse når nett er tregt. Kunne gjort godt av å legge inn 250–400 ms debounce + loading indikator. Bra dere har offset/limit i GraphQL.
> Kort/grid: Bok-kortene er lettleste. God prioritering av tittel/forfatter/år. Savner “view more”/piler på rader eller en tydelig “Show more” for å hente neste batch, nå stopper man litt opp.
> 
> Detaljside: Ser smooth ut og er responsiv. “Back”-knapp funker. Review-panelet gir forventet info. Interaktivt forbedringspunkt: stjerneratinger \(hvis/der de finnes\) burde være klikkbare med tastatur og annonsere valgt verdi for skjermleser.
> 
> Sortering/filtrering: Sorteringsretning med en Checkbox er litt off. En ToggleButton/IconButton med tydelig aria-label er mer semantisk riktig.

<a id="funksjonalitet-finley"></a>
**Reviewer Finley:**

> Nettsiden har god funksjonalitet med fungerende sortering, filtrering, søkefunksjon og innlogging med reviews man kan legge inn. Dette er funksjonaliteter som er forventet i en slik applikasjon, så det ser veldig fint ut! Et tips videre hvis dere vil ha med enda mer funksjonalitet er å kunne filtrere på flere ting, som for eksempel forfatter. 
> 
> Videre er det en ting jeg ser mangler, og det er paginering. Nå scroller man nedover i en evighet, som er upraktisk og lite bærekraftig hvis man skal ta inn større datamengder senere. Det bør derfor legges inn paginering i form av for eksempel sidetall man blar seg gjennom så det ikke må lastes inn så mange ressurser av gangen. Ellers bra jobbet!

<a id="funksjonalitet-xander48"></a>
**Reviewer Xander48:**

> Gruppen har laget en plattform for boksøk og anmeldelser der brukere kan utforske, sortere og lære om bøker som er lagret i en database.
> 
> Hovedsiden tilbyr infinite scrolling, noe som er standard på profesjonelle applikasjoner. Dette er veldig bra med tanke på funksjonalitet.
> 
> Sorterings-, søking- og filtreringsfunksjonalitet fungerer fint, og er intuitivt å bruke.
> 
> Nettsiden har ingen funksjonalitet for å registrere nye brukere, selv om nettsiden har innloggingsfunksjonalitet.
> 
> Fra README på Github kan vi bruke en testbruker for å logge inn.
> 
> Når man er logget inn kan man legge til anmeldelser.
> Funksjonalitet for å legge til anmeldelser fungerer fint og er intuitivt.
> Funksjonalitet som viser "Overall rating" fungerer bra.
> Det er derimot ikke mulig å fjerne sine egne anmeldelser.
> Scrollboksen som viser alle anmeldelser ikke er brukervennlig, gjerne gjør den større eller bruk en page/carousel løsning.
> Til slutt, anmeldelser er lagret med "User #1" som forfatter, forfatteren bør være brukernavnet eller eposten.
> 
> Darkmode ser veldig bra ut. Det virker som valg av darkmode huskes lokalt, men huskes ikke når man er logget inn. Altså bør valg av light/darkmode huskes når man er logget inn.
> 
> Konklusjon:
> Appen deres er skalerbar med infinitescroll, men mangler registreringsfunksjonalitet. Anmeldelser \(review\) funksjonalitet bør utvides med mulighet til å slette egne anmeldelser. Ellers bra jobbet med sorterings-, søking- og filtreringsfunksjonalitet.

<a id="funksjonalitet-river"></a>
**Reviewer River:**

> På siden er det mulig å gjøre mange interaktive valg som viser god funksjonalitet. Det er ryddig satt opp og ved å trykke på kortene så får du mer informasjon. Å bytte modus fra lys til mørk er en fin touch som bidrar til å fremheve siden. Filtreringen virker noe enkel, men det som er gjort er gjort bra. Jeg får logget inn, litt knot at det kun er en hardkodet bruker som kan gjøre dette. Det burde vært satt opp funksjonalitet for registrering og innlogging av nye brukere

<a id="funksjonalitet-mason"></a>
**Reviewer Mason:**

> Gruppen har laget en applikasjon der man kan se en oversikt over bøker, og legge inn reviews på de. De har implementert filtrering og søk, som er bra. Man kan søke på flere ting enn bare tittel, som også er fint. Man kan også sortere, det er bra at man har flere muligheter for hvordan dataen skal fremstilles. 
> 
> Applikasjonen er brukervennlig i den forstand at det er lett å forstå hva de ulike knappene gjør, og det er lett å manøvrere seg rundt. Synes også det er bra man har en til toppen-knapp når man scroller nedover!
> 
> Forbedringsområder: 
> 
> - Innlogging: det hadde vært fint med en egen side for å lage en bruker, nå må man ha bruker fra før for å logge inn. Jeg måte lete frem til eksempelbrukeren i readme, og det hadde vært lettere om det hadde vært en knapp i innloggingssiden for å bruke demobruker, så man slapp å finne frem til eksempelbrukeren i readme. 
> 
> - Favorisering: det er ikke mulig å favorisere bøker man liker, det hadde vært en fin ting å legge til, fordi man da får litt mer å gjøre på appen. 
> 
> - Funksjonalitet: Hvis man sammenlikner siden med for eksempel GoodReads, så er det mye funksjonalitet man kunne implementert for å få en mer gjennomført applikasjon. Der har man for eksempel "currently reading",  "want to read" og "has read" lister med bøker, som kunne vært forslag til noe dere kan legge til, ganske enkel funksjonalitet og da har mulighet til å ha en egen side for bøker man vil lese, bøker man leser for øyeblikket og bøker man har lest. Om det blir mye å legge til går det an å for eksempel bare ha en "want to read":\)
> 

<a id="funksjonalitet-penny19"></a>
**Reviewer Penny19:**

> Funksjonalitet som er implementert:
> - Filtrere bøker basert på kategori, der filtrene kan velges i en sidebar som kan toggles. 
> - Sortering av bøkene i stigende/synkende rekkefølge basert på tittel, utgivelsesdato, og gjennomsnittsrating
> - Søkefunksjonalitet i fritekst. Fint at dere har live-search med debouncing
> - Innlogging med forhåndsdefinert bruker
> - Applikasjonen har både dark/light mode med en knapp for å bytte mellom dem
> - Brukeren kan trykke seg inn på bøkene for å se flere detaljer om valgt bok
> - Brukeren kan skrive review og legge igjen en stjernerating.
> - Tilbakeknapp fra aboutBook-siden som leder tilbake til hovedsiden
> - "Back-to-top"-knapp på hovedsiden som gjør at man blir dratt helt til toppen av siden
> 
> Funksjonalitet som kan forbedres:
> - Filtrering på kategorier kunne gjerne støttet flere kategorier samtidig. F.eks hvis man  vil filtrere på både Science-Fiction og Horror. I tillegg kunne det vært støtte for å filtrere på årstall, f.eks hvis brukeren vil filtrere på bøker publisert mellom 1990-2000.
> - Når brukeren legger fra seg en review, så blir refetchinga håndtert med window.location.reload, anbefaler å bruke apollo cache
> 
> Forslag til funksjonalitet som kan implementeres:
> - En registreringsside
> - Funksjonalitet for å redigere/slette reviews
> - Sorterings- og filterargumenter lagt til i URL-en 

<a id="funksjonalitet-thea"></a>
**Reviewer Thea:**

> Funksjonalitetmessig synes jeg at det som er implementert er godt gjennomtenkt og utført. Finner ingen funksjonalitet som ikke fungerer som det skal. Søk fungerer fint i kombinasjon med filtrering, og bruker input debouncing som gir en god brukeropplevelse og unngår unødvendig mye kall til databasen ved søking. Sortingering fungerer som det skal og reviews fungerer også fint med testbrukeren. Filtreringen spesielt synes jeg er godt løst, med en intuitiv og godt utformet sidebar. 
> 
> Forbedringspotensiale her kan være å ekspandere på brukerfunksjonaliteten, som akkurat nå kun fungerer med reviewing gjennom en testbruker. Med display av brukernavn og timestamp/dato på reviews, i tillegg til kanskje en side med brukerspesifikke favoritter/wishlist aktig funksjon tror jeg det vil føles ut som en mer komplett nettside. 

---

## Design og utforming

<a id="design-og-utforming-quincy"></a>
**Reviewer Quincy:**

> Den dempede grønn/grå paletten gir ro, og spacing/margins er generøse, hvert kort får pusterom. Typografi \(Roboto\) er konsekvent. Box-shadow på kort/nav er fint.
> 
> Dark mode er ikke bare en filter, dere bytter variabler. Kontraster er stort sett ok, men sjekk grå tekst på mørk bakgrunn i dark mode \(sekundærtekst i søkefelt, placeholder\).
> 
> Layouten holder fint på store skjermer og ned til mobil. På veldig små bredder blir “Reviews, kortet ganske smalt \(dere gjør det med lg: allerede, men vurder breakpoint litt før\). Små ting kan være at fokusstil for interaktive elementer kunne vært mer synlig.

<a id="design-og-utforming-finley"></a>
**Reviewer Finley:**

> Applikasjonen har et brukervennlig design som er enkelt å navigere seg rundt i og har farger som passer bra sammen. White space på sidene av innholdet er også fint, og løsningen tilpasser seg fint mindre skjermer. En liten kommentar her er å endre litt på tekstfargen når man skal legge til review i darkmode, da fargen blender litt inn i bakgrunnen og kan være vanskelig å lese hvis man har redusert syn. Med større kontrast her blir det bra!

<a id="design-og-utforming-xander48"></a>
**Reviewer Xander48:**

> Veldig bra jobbet med designet! Appen har en modern og "clean" utseende.
> Liker de fargene dere har valgt.
> Det er en styrke at dere dokumenterer hvorfor dere valgte disse fargene, og at dere har en fargeprofil for nettsiden styrker designet positivt.
> Bra jobbet også med responsivt design også, alt ser veldig bra ut.

<a id="design-og-utforming-river"></a>
**Reviewer River:**

> Siden ser ryddig og fin ut. Den responderer med fleksibelt layout og fargene, samt bilder blir levert bra. 
> Helheltlig er design og utforming bra.

<a id="design-og-utforming-mason"></a>
**Reviewer Mason:**

> Siden ser veldig fin ut, og jeg ser gruppen har skrevet i readme om designvalg de har tatt, som viser at det har vært en tanke bak valg som er tatt. Det er fin plassering av elementer på siden, og siden har god responsivitet som tilpasser seg endring av størrelsen på skjermen. 
> 
> Fargene fungerer bra sammen, og det er fint med mulighet til å toggle mellom dark mode og light mode!
> 
> Et lite pirk er at det hadde vært fint om footeren ikke synes på bokdetalj-siden med mindre man scroller ned til den, nå syns litt på min skjerm som er litt distraherende på siden. 

<a id="design-og-utforming-penny19"></a>
**Reviewer Penny19:**

> Applikasjonen har for det meste et godt og ryddig design. Har ikke noe å kommentere på fargepaletten, syns den fungerer godt. 
> 
> Ting som kan forbedres:
> - Akkurat nå er det ikke så veldig intuitivt for brukeren at reviews-containeren kan scrolles. Dessuten syns jeg det blir trangt å vise reviews i den lille containeren, kan kanskje være mulighet for å flytte den ut av card-elementet den tilhører?

<a id="design-og-utforming-thea"></a>
**Reviewer Thea:**

> Filter, sortering og søk er visuelt godt plassert, og utformingen av både bookcard elementene og knappene har en avrundet og ryddig stil som oppleves som moderne. Fargene er veldig simple som er helt greit siden det oppleves som mer oversiktlig og ikke overveldende. Kontrasten mellom kortene og bakgrunnen i darkmode kunne vært noe mer tydelig, med en litt mørkere bakgrunn/tydeligere kanter på kortene. 
> 
> Jeg testa litt på ulike skjermstørrelser, og det ser ut som om bookcardene havner inntil venstre side av skjermen på mindre skjermstørrelser. Dette gjelder spesifikt når det er plass til ett eller to kort, men det også er litt ekstra rom. Å få sentrert kortene i disse størrelsene også er et forbedringspunkt dere kan se på til siste innleveringen. Når man har klikket på en bok for å se detaljene skalerer nettsiden godt til alle størrelser.

---

## Bærekraft

<a id="b-rekraft-quincy"></a>
**Reviewer Quincy:**

> Dere gjør mye riktig: GraphQL-spørringer med eksplisitte felt og offset/limit er effektivt. CSS-variabler og enkel fargepalett er lett vekt.

<a id="b-rekraft-finley"></a>
**Reviewer Finley:**

> Gruppa har gjort flere gode og bevisste valg som bidrar til bærekraft og effektiv ressursbruk. Ved å bruke GraphQL med Apollo sørger de for at applikasjonen kun henter den dataen som faktisk trengs, i stedet for å overføre unødvendig informasjon. Dette reduserer både datatrafikk og belastning på server og klient. Apollo sin caching-funksjon bidrar også til mindre nettverksbruk ved at data gjenbrukes lokalt når det er mulig. Når det gjelder visuell utforming, bidrar Tailwind CSS og Material UI til et konsistent design med god kontrast og støtte for både mørkt og lyst tema. Dette kan være energisparende for brukere med skjermer med OLED-teknologi. En ting videre er at det kan være lurt å legge inn paginering, slik at applikasjonen kun laster inn et begrenset antall ressurser av gangen. Det ville gjort løsningen enda mer effektiv og bærekraftig.

<a id="b-rekraft-xander48"></a>
**Reviewer Xander48:**

> Gruppen har redusert unødvendige gjengivelser, implementert lazy loading og har darkmodefunksjonalitet.
> Gruppen har altså løst kravene med tanke på bærekraftig utvikling.
> 
> Noe som kan forbedres er at darkmode bør være den default theme når man først besøker nettsiden.

<a id="b-rekraft-river"></a>
**Reviewer River:**

> Det er ikke noe dokumentert noe om bærekraftig valg. Jeg ser heller ikke noe debounced search, lazy loading eller lignende når jeg ser igjennom koden. Dette vil da være et forbederingspunkt

<a id="b-rekraft-mason"></a>
**Reviewer Mason:**

> Gruppen har ikke skrevet noe om valg i forhold til bærekraft i denne innleveringen, men heller skrevet i readme at det er noe de skal fokusere på i neste innlevering: reduce unnecessary re-renders, verify lazy loading behavior, and evaluate how our current design choices align with green web principles.
> 
> Positive valg som er gjort: 
> 
> Pagination / lazy loading:
> Bruk av IntersectionObserver for å laste flere bøker ved scrolling er et godt, moderne mønster. Det sparer båndbredde for brukere som ikke blar langt ned.
> loading="lazy" på bilder reduserer initial nedlasting av bilder og er en enkel men effektiv optimalisering.
> 
> Tips til bærekraftige valg: 
> - vurdere hvor god oppløsning bilder skal ha - lavere oppløsning vil gi mindre energiforbruk ved lasting på hovedsiden. Det er derfor en mulighet å ha lav oppløsning på bildene på hovedsiden, og heller ha bedre når man trykker seg inn på et bilde. 
> 
> - passe på at man bruker systemfonter, og helst ikke fler enn to forskjellige fonter i prosjektet, slik at man slipper å laste inn fler. 
> 

<a id="b-rekraft-penny19"></a>
**Reviewer Penny19:**

> Gruppa har dokumentert konkrete valg som skal tas i neste iterasjon for å optimalisere bærekraft. 
> 
> Foreløpig er disse aspektene bra med tanke på bærekraft:
> - Light/Dark mode
> - Pagination
> - Bilder lastes inn med lazy loading
> 

<a id="b-rekraft-thea"></a>
**Reviewer Thea:**

> Gruppa har implementert dark mode som er et bærekraftig tiltak når det kommer til OLED/AMOLED-skjermer hvor mørkere farger bruker mindre strøm. Gruppa har også implementert lazy load som gjør at ikke alle bøkene lastes inn med en gang nettsiden åpnes, men kun en viss mengde, som er viktig i forhold til å begrense mengden kall til databasen. Å utføre filtrering/sortering/søking direkte i gql spørringene til backenden er også en god løsning, siden det minsker hvor mye arbeid som må utføres direkte i nettleser. 
> 
> Generelt sett er det gode valg og løsninger. Dere kan med fordel dokumentere enda tydeligere i README-en deres rundt de valgene dere har tatt når det kommer til bærekraft. 

---

## Bruk av kunstig intelligens

<a id="bruk-av-kunstig-intelligens-quincy"></a>
**Reviewer Quincy:**

> Ikke nevnt. Dere kunne brukt KI til fordeler med rask refaktor til semantisk HTML.

<a id="bruk-av-kunstig-intelligens-finley"></a>
**Reviewer Finley:**

> Gruppen har dokumentert godt at det er brukt KI til mindre kodesnutter og til å få tips. Jeg mener dette er god praksis, da man heller bruker det som "sparrepartner" enn til å gjøre oppgaven for seg. Bruk av KI på denne måten gjør at man både lærer og har muligheten til å utvikle mer effektivt og dermed få mer tid til kvalitetssikring eller mer funksjonalitet.

<a id="bruk-av-kunstig-intelligens-xander48"></a>
**Reviewer Xander48:**

> Gruppen har brukt KI i prosjektet og dette er godt dokumentert i README deres.
> 
> Gruppen har brukt KI på en balansert måte: hverken for lite eller for mye. Der de har brukt det, har dette blitt dokumentert og lest over.
> 
> KI ble primært brukt for styling med MUI.

<a id="bruk-av-kunstig-intelligens-river"></a>
**Reviewer River:**

> De har dokumentert deres bruk av kunstig intelligens. Det fremstår som de har brukt KI på en god måte som fremhever læring.

<a id="bruk-av-kunstig-intelligens-mason"></a>
**Reviewer Mason:**

> Gruppen har skrevet om bruk av AI at de kun har brukt AI til å lage små kodelinjer og til å få tips til debugging, naming osv. Det er altså godt dokumentert hva de har brukt kunstig intelligens til. 
> 
> På grunn av omfanget av funksjonaliteten i appen, tenker jeg gruppen med fordel kunne brukt kunstig intelligens til å lage større deler av koden, med fordelen at de da hadde fått på plass enda mer funksjonalitet. Det kan også virke som det ville ført til at gruppen hadde jobbet mer effektivt. Men, det er bra de har gjort mye selv for læringen sin del:\)

<a id="bruk-av-kunstig-intelligens-penny19"></a>
**Reviewer Penny19:**

> God dokumentasjon av AI.

<a id="bruk-av-kunstig-intelligens-thea"></a>
**Reviewer Thea:**

> Gruppa har skrevet om AI bruk i dokumentasjonen, og forklarer at de har brukt AI til mindre kodegenerasjon og debugging. Dette synes jeg er helt fint, og jeg synes at dere har fått brukt AI på en måte som ikke har gått utover kodekvaliteten gjennom for eksempel redundant kode. 
> 
> Dere har også brukt AI til å generere eksempelbøker i en db.json fil, som de bruker for demofremvisning av hvordan bøkene vil se ut når de etterhvert får inn ekte bøker på siden. Jeg synes at det hadde vært mer hensiktsmessig å hente en mengde med bøker fra en ekstern API med et script ovenfor å AI generere bøker. Da kunne det blitt en mer realistisk og engasjerende brukeropplevelse, i tillegg til at søking kunne vært mer meningsfullt siden man vet hva man skal søke etter uten å se på dataen direkte.
> 
> 

---

## Kodekvalitet

<a id="kodekvalitet-quincy"></a>
**Reviewer Quincy:**

> Mappestruktur er ryddig: components/, pages/, services/, graphql/, utils/. TypeScript overalt. Komponenter er små og lesbare.
> 
> Gjenbruk: AboutBook er ren. SearchBar er fin, men kan løsrives enda litt mer ved å håndtere debounce internt og eksponere onSearch. SortingDirectionButton bør byttes til en semantisk knapp/Toggle \(og rydde vekk Checkbox demo-label\).
> 
> Duplisering: Ikke ha både apollo.ts og en ny Apollo-instans i dataFetcher. Det er det største kvalitetsløftet dere kan gjøre raskt. Når dere flytter til hooks, kan services/dataFetcher droppes helt eller omgjøres til små util-funksjoner \(f.eks. mapping/transform\).

<a id="kodekvalitet-finley"></a>
**Reviewer Finley:**

> Fin og lesbar kode med oversiktlig kodebase. En ting jeg merket meg var at readme ligger inni frontend-mappa nå, men burde kanskje blitt flyttet til root slik at det er så enkelt som mulig å finne denne slik at man finner instruksjoner for å kjøre applikasjonen. Videre ville jeg også vurdert å flytte styling til egne css-filer for hver komponent/side i stedet for å ha det i selve tsx-fila. Dette gjør hver fil så kort og ryddig som mulig, noe som kan se litt mer ryddig ut. Hvis dere vil unngå overskriving mellom ulike css-filer går det for eksempel her an å bruke css-modules. 
> 
> Ellers bra bruk av gjenbrukbare komponenter, hooks og pages!

<a id="kodekvalitet-xander48"></a>
**Reviewer Xander48:**

> Dere skiller klart mellom backend- og frontendfunksjonalitet ved bruk av backend og frontend mapper. Dette er bra.
> 
> Koden er ryddig og lesebar. Navn til filene gir mening, og det er lett å finne det man letter etter \(komponenter er i en egen mappe, samme for hooks osv.\).
> 
> README deres kunne flyttes en rotmappen. Ellers har dere skrevet en veldig bra og fullstending README.

<a id="kodekvalitet-river"></a>
**Reviewer River:**

> Kodekvaliteten er ganske bra av det som er skrevet, det er god mappestruktur og enkelt, forståelig å lese igjennom. 
> Helhetlig fremstår det bra, men en mangel på tester gjør at kvalitetsikringen er borte. For å sikre at standarden holdes høy burde det vært minst et par tester.

<a id="kodekvalitet-mason"></a>
**Reviewer Mason:**

> Skriver dette øverst her siden det ikke er noen krav som treffer nøyaktig på dette: jeg ville plassert readme på rotnivå, utenfor frontend mappen. Nå må man lete for å finne readme med informasjon om prosjektet. Hadde den vært på rotnivå \(der den skal være\), kommer den opp i førstesiden i repoet deres, og det er da lettere å begynne å lese readme med en gang:\)
> 
> God modulær struktur: frontend har tydelige foldere for components, pages, hooks, services og utils; backend har database/, schema og resolvers. Navngivning er konsistent og selvforklarende \(f.eks. BookCard, BookCardOverview, fetchBooks\). Gjenbruk er god for UI: MUI-komponenter + egen StyledButton gir konsistent look. 
> 
> Koden er dokumentert med kommentarer som også er veldig bra, for å fortså hva koden gjør. 
> 
> Forbedringspotensiale:
> Apollo-klient: Det finnes to klient-instansier: apollo.ts og en egen i dataFetcher.ts. Dette fører til inkonsistente caches og uventet atferd. Bruk én klient \(eks. apollo.ts\) overalt. 
> 
> Unngå N+1/unødvendige fetches: BookCard kaller fetchBookWithReviews for hver bok i grid \(useEffect i frontend/src/components/BookCard.tsx\). Dette kan føre til mange forespørsler \(N+1\) 
> 
> Så for å oppsummere: Arkitekturen og organiseringen er god og oversiktlig,  komponentene er gjenbrukbare og navngivingen er konsistent.
> Prioriter å konsolidere Apollo‑client, fiks caching/mutasjonsflyt \(slik at reload fjernes\), og flytt/beregn averageRating i backend eller oppdater DB ved mutasjon for konsistente sorteringsresultater.
> 

<a id="kodekvalitet-penny19"></a>
**Reviewer Penny19:**

> Kodekvaliteten er for det meste god, koden er minimal og dekker nødvendig funksjonalitet. Ikke så mye overkomplisert logikk i koden generelt. 
> 
> Ting som kan forbedres:
> - Bruk gjerne hooks-folderen mer. F.eks er det mye logikk i AuthButton.tsx. Dette kan refaktoreres til en egen custom hook useAuth. Andre refaktorte hooks kunne vært useFilters, usePagination.
> - Unngå window.location.reload

<a id="kodekvalitet-thea"></a>
**Reviewer Thea:**

> Mappeorganiseringen synes jeg er god. Det er enkelt å navigere seg rundt i både frontend og backend folderene, og man kan finne filer i mapper der man forventer at de burde ligge. 
> 
> Filnavn er som regel intuitive. Jeg ser at dere som regel bruker PascalCase for navngivning av filer, og dere burde fortsette å strebe etter å holde det slik. Finner et par unntak hvor dere bruker camelCase for dataFetcher og useTheme \(gjør om til DataFetcher og UseTheme\). 
> 
> Komponentene dere har, som Footer, Navbar, StyledButton osv er gjenbrukbare. Dere bruker blant annet MUI Button elementet og bygger videre på det i de ulike buttonfilene dere har under komponenter, som er god praksis. 
> 
> Det er ikke konsekvent, men dere har også fått inn noe kommentarer i selve koden som hjelper med å forstå hva ulike funksjoner gjør. For å høyne kodekvaliteten enda et hakk kan dere prøve å få inn enda mer inline kommentarer i selve koden. 

---

## Tekniske valg

<a id="tekniske-valg-quincy"></a>
**Reviewer Quincy:**

> Dere kjører to forskjellige Apollo-klienter.
> main.tsx bruker ApolloProvider fra ./apollo.ts, mens services/dataFetcher.ts spinner opp sin egen klient og kaller client.query manuelt. Da ender dere med to uavhengige cacher, dårlig normalisering og større sjanse for utdaterte data. Kutt klienten i dataFetcher og bruk Apollo-hooks \(useQuery, useLazyQuery, useMutation\) direkte i komponentene. Mindre kode, riktig cache, og bedre refetch-oppførsel.

<a id="tekniske-valg-finley"></a>
**Reviewer Finley:**

> Jeg fulgte fremgangsmåten i readme for å kjøre prosjektet, men får kun kjørt frontend. Backend vil ikke kjøre, så jeg må vurdere denne delen ut ifra koden ellers og frontend med backupdataen. Det er mulig det er hos meg feilen ligger, men hvis det er flere som har fått samme problem er et tips videre å sjekke ut dette!
> 
> Ellers viser prosjektet gode og bevisste tekniske valg som passer godt til applikasjonen. Bruken av Vite som bundler gjør det effektivt å jobbe, og kombinasjonen av React og TypeScript gir god struktur og typesikkerhet, og gjør koden enklere å vedlikeholde enn med f.eks JavaScript.
> 
> Valget av GraphQL sammen med Apollo viser at gruppen har tenkt gjennom hvordan de vil håndtere dataflyt. Apollo gir en ryddig måte å jobbe med queries og mutations på, og den innebygde caching-funksjonaliteten gjør applikasjonen mer effektiv ved å unngå unødvendige kall til backend. For meg ser det ut som gruppa har brukt dette riktig.
> 
> At de bruker SQLite som database er fornuftig for et prosjekt i denne størrelsen, da det er lett å sette opp, raskt og passer godt til lokal utvikling. Tailwind CSS er et godt valg for fleksibel og konsistent styling, spesielt når flere på gruppen har erfaring med det. Samtidig er det positivt at de har brukt Material UI \(MUI\) som komponentbibliotek, siden det gir ferdige, tilgjengelige og brukervennlige komponenter. Dette gjør utviklingen raskere, noe som gjør det mulig å få til flere funksjonaliteter på kort tid. Bruken av hooks, som for eksempel useTheme for mørk/lys-modus, viser også god bruk av React og gjenbrukbare komponenter. .
> 
> Alt i alt viser gruppen god teknisk forståelse. De har valgt gode og gjennomtenkte teknologier, implementert dem på en ryddig måte og brukt tredjepartsverktøy på en effektiv måte.

<a id="tekniske-valg-xander48"></a>
**Reviewer Xander48:**

> Appen sender kun requests når den trenger det, altså når man scroller ned hovedsiden, så fetcher appen nye bøker. Dette er veldig bra.
> 
> Dere bruker useTheme som er en custom hook. localStorage brukes for å huske valg av darkmode. Dette er en bra løsning for brukere som ikke er logget inn, men dere bør lagre dette valget på backend når man er logget inn. Det er bra at dere bruker ThemeToggle for darkmode.
> 
> Bra bruk av useMemo for å unngå at window.matchMedia evalueres på hver render.
> 
> ApolloClient:
> BookCardOverview brukes IntersectionObserver for infinite scroll. loadPage henter neste side via fetchBooks, offset spores i en useRef, hasMore og loading forhindrer dobbeltkall. useCallback og useEffect håndterer asynkrone oppdateringer korrekt.
> Dette viser avansert og solid forståelse av React’s render- og hook-livssyklus.
> Lazy loading med GraphQL og offsethåndtering er gjort på en riktig måte.
> 
> MUI og react-icons passer veldig fint for deres prosjekt.
> 
> react-router-dom en god standard å bruke, og er Kompatibel med MUI.
> 
> Dere har valgt SQLite som databaseløsning. SQLite er enkelt å sette opp og lett å konfigere \(hvis det er noe å konfigere\), så dette er et bra valg.
> 
> GraphQL queries og Apollo er satt opp på en standard måte.
> 
> Når man kjører npm install på backend deres, får man en del warnings med 3 moderate severity vulnerabilities. Det anbefales at dere ser på det.
> 
> Når man kjører npm run lint i frontend får man 5 problemer, der 2 er errors. Dette bør dere ser på.
> 
> Alt i alt har dere veldig gode tekniske løsninger, og dere har valgt bra tredjeparts biblioteker. React-programmeringen ser bra ut. Husk å se på de warningmeldingene fra npm når deres installerer pakkene.

<a id="tekniske-valg-river"></a>
**Reviewer River:**

> Mange av de tekniske løsningene som er gjort er gode. De har brukt tailwind som eksternt bibliotek for styling og det fremstår enkelt, men godt gjennomført. 
> De kunne gjerne brukt flere tredjeparts løsninger for å heve prosjektet enda mer. Det virker som prosjektet er litt minimalt. Det er gjort gode valg, men skulle gjerne sett litt mer. 

<a id="tekniske-valg-mason"></a>
**Reviewer Mason:**

> Gruppen har laget prosjektet med React, Apollo, GraphQL og SQLite. Det er en god struktur med et fint oppsett for prosjektet. 
> 
> Bruken av MUI og Tailwind er fint, men kan støte på problemer som dere har nevnt i readme, der MUI komponentene og Tailwind har ulik styling. Fint dere er klar over det og finner løsninger på dette:\)
> 
> Caching og spørringsstrategi: Standard InMemoryCache benyttes \(bra\), men inkonsekvent bruk av fetchPolicy \(f.eks. fetchPolicy: "no-cache" i fetchBookWithReviews\). Konsistent fetchPolicy og en enkelt ApolloClient ville gi bedre cachekontroll. 
> 
> Prosjektet viser solid forståelse av moderne React-arkitektur \(hooks, løftet state, debounce, IntersectionObserver\), god bruk av GraphQL og MUI/Tailwind for UI, og en pragmatisk backend med SQLite + Apollo Server.
> 
> For demo/utvikling er valgene gode. For produksjon bør man konsolidere Apollo-klientbruk, håndtere server-side beregning/oppdatering av averageRating samt forbedre autentisering og caching-strategi.
> 
> 

<a id="tekniske-valg-penny19"></a>
**Reviewer Penny19:**

> De tekniske valgene er godt dokumentert og begrunnet i README-filen.
> Gruppen har gjort gode tekniske valg og viser god forståelse for moderne utvikling: 
> - React 19 + Typescript + Vite
> - GraphQL, Apollo Client og SQLite
> - MUI + TailwindCSS
> 
> Tech-stacken fungerer godt og er skalerbar. 

<a id="tekniske-valg-thea"></a>
**Reviewer Thea:**

> Gruppa skriver om de tekniske valgene de har tatt i README filen under dokumentasjon. For backend/database bruker de GraphQL, ApolloDB og SQlite/SQlite3, som er gode valg og holder ting enkelt. For styling har gruppa valgt å bruke Tailwind CSS ovenfor å lage filspesifikke CSS filer. Dette gjør utvikling raskt og enkelt, men samtidig kan de lange classnamesene som inngår i tailwind oppleves som noe lange og rotete. I har gruppa brukt MUI library som har støtte for ferdiglagde komponenter som gruppa kan bruke direkte uten å måtte designe de selv. Jeg synes  også dette har både fordeler og ulemper, men at det kan være et fint valg i et prosjekt av denne størrelsen. Med ferdiglagde komponenter kan nettsiden bli litt ensartet og lite justerbar som kan svekke skalerbarheten, men selve utviklingen og kodebasen blir mer enkel og oversiktlig. Selv om noen av valgene de har tatt kan ha sine ulemper, synes jeg gruppa allikevel viser forståelse rundt de valgene de har tatt. 

---


---

**Takk for at du leste tilbakemeldingene!**
Husk å fylle ut [https://nettskjema.no/a/565641]!
