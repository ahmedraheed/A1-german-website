export const pronunciationGuideData = {
  title: "Complete German Sound & Pronunciation Rules Guide",
  subtitle: "Beginner-friendly A1–A2 pronunciation reference with Roman approximations for English/Urdu speakers",
  intro: "German pronunciation becomes much easier once you learn its sound patterns. German spelling is much more consistent than English, so when you know the rules, you can often pronounce a new word correctly just by reading it. One of the most important things for German learners is vowel length, along with sounds such as ch, r, z, w, v, sch, sp, st, ei, ie, eu, and äu.",

  alphabet: [
    { letter: "A", name: "A — ah", example: "Apfel" },
    { letter: "B", name: "Be — bay", example: "Brot" },
    { letter: "C", name: "Ce — tsay", example: "Café" },
    { letter: "D", name: "De — day", example: "Danke" },
    { letter: "E", name: "E — ay", example: "Essen" },
    { letter: "F", name: "Eff — eff", example: "Freund" },
    { letter: "G", name: "Ge — gay", example: "Gut" },
    { letter: "H", name: "Ha — hah", example: "Haus" },
    { letter: "I", name: "I — ee", example: "Ich" },
    { letter: "J", name: "Jot — yot", example: "Ja" },
    { letter: "K", name: "Ka — kah", example: "Kind" },
    { letter: "L", name: "Ell — ell", example: "Liebe" },
    { letter: "M", name: "Em — em", example: "Mann" },
    { letter: "N", name: "En — en", example: "Nein" },
    { letter: "O", name: "O — oh", example: "Offen" },
    { letter: "P", name: "Pe — pay", example: "Pferd" },
    { letter: "Q", name: "Ku — koo", example: "Quelle" },
    { letter: "R", name: "Er — air", example: "Rot" },
    { letter: "S", name: "Es — es", example: "Sonne" },
    { letter: "T", name: "Te — tay", example: "Tag" },
    { letter: "U", name: "U — oo", example: "Uhr" },
    { letter: "V", name: "Vau — fow", example: "Vater" },
    { letter: "W", name: "We — vay", example: "Wasser" },
    { letter: "X", name: "Ix — iks", example: "Xylophon" },
    { letter: "Y", name: "Ypsilon — uep-see-lon", example: "Yacht" },
    { letter: "Z", name: "Zett — tset", example: "Zeit" }
  ],
  extraLetters: "German also uses special characters: ä, ö, ü, ß.",

  topRulesSummary: [
    { key: "w", sound: "v" },
    { key: "v", sound: "often f" },
    { key: "j", sound: "y" },
    { key: "z", sound: "ts" },
    { key: "sch", sound: "sh" },
    { key: "sp (at start)", sound: "shp" },
    { key: "st (at start)", sound: "sht" },
    { key: "ei", sound: "eye" },
    { key: "ie", sound: "ee" },
    { key: "eu", sound: "oy" },
    { key: "äu", sound: "oy" },
    { key: "au", sound: "ow" },
    { key: "tsch", sound: "ch" },
    { key: "ch (after a/o/u/au)", sound: "throat kh (hard ach sound)" },
    { key: "ch (after i/e/ä/ö/ü)", sound: "soft ch (ich sound)" },
    { key: "ß", sound: "ss" }
  ],

  commonMistakes: [
    { word: "wie", wrong: "why", correct: "vee", translate: "how" },
    { word: "zwei", wrong: "zw-eye", correct: "tsvy", translate: "two" },
    { word: "Wasser", wrong: "wah-ser", correct: "vas-ser", translate: "water" },
    { word: "ja", wrong: "English-jah", correct: "yah", translate: "yes" },
    { word: "Schule", wrong: "skoo-leh", correct: "shoo-leh", translate: "school" },
    { word: "sprechen", wrong: "spreh-chen", correct: "shpreh-khen", translate: "to speak" },
    { word: "Straße", wrong: "strah-seh", correct: "shtrah-seh", translate: "street" },
    { word: "Deutsch", wrong: "doo-ch", correct: "doych", translate: "German" }
  ],

  memorySheet: [
    { symbol: "W", sound: "V" },
    { symbol: "V", sound: "usually F" },
    { symbol: "J", sound: "Y" },
    { symbol: "Z", sound: "TS" },
    { symbol: "SCH", sound: "SH" },
    { symbol: "SP", sound: "SHP" },
    { symbol: "ST", sound: "SHT" },
    { symbol: "EI", sound: "EYE" },
    { symbol: "IE", sound: "EE" },
    { symbol: "EU", sound: "OY" },
    { symbol: "ÄU", sound: "OY" },
    { symbol: "AU", sound: "OW" },
    { symbol: "TSCH", sound: "CH" },
    { symbol: "ß", sound: "SS" },
    { symbol: "CH", sound: "soft & hard versions" }
  ],

  sections: [
    {
      num: 1,
      category: "Alphabet & Vowels",
      title: "German Alphabet — Letter Names",
      desc: "German letter names and easy Roman approximations.",
      type: "alphabet_table"
    },
    {
      num: 2,
      category: "Alphabet & Vowels",
      title: "Basic Vowel Sounds",
      desc: "German has five normal written vowels: a, e, i, o, u. Each vowel can be short or long. This distinction matters because vowel length can change how natural or understandable a word sounds."
    },
    {
      num: 3,
      category: "Alphabet & Vowels",
      title: "German A",
      items: [
        { subtitle: "Short a", text: "Usually similar to the a in 'father', but shorter.", examples: [{ german: "Mann", roman: "man", english: "man" }, { german: "Hand", roman: "hant", english: "hand" }, { german: "kalt", roman: "kalt", english: "cold" }] },
        { subtitle: "Long a", text: "Hold the vowel slightly longer.", examples: [{ german: "Name", roman: "Nah-meh", english: "name" }, { german: "fahren", roman: "fah-ren", english: "to drive/travel" }, { german: "Tag", roman: "tahk", english: "day" }] }
      ]
    },
    {
      num: 4,
      category: "Alphabet & Vowels",
      title: "German E",
      items: [
        { subtitle: "Short e", text: "Similar to English 'bed'.", examples: [{ german: "Bett", roman: "bet", english: "bed" }, { german: "essen", roman: "es-sen", english: "to eat" }] },
        { subtitle: "Long e", text: "Sounds closer to 'ay', but without a strong English glide.", examples: [{ german: "leben", roman: "lay-ben", english: "to live" }, { german: "lesen", roman: "lay-zen", english: "to read" }, { german: "Weg", roman: "vayk", english: "way/path" }] },
        { subtitle: "Weak final -e", text: "At the end of many words, e becomes very soft. Do not make the final e too strong.", examples: [{ german: "bitte", roman: "bit-teh", english: "please" }, { german: "heute", roman: "hoy-teh", english: "today" }, { german: "Name", roman: "nah-meh", english: "name" }] }
      ]
    },
    {
      num: 5,
      category: "Alphabet & Vowels",
      title: "German I",
      items: [
        { subtitle: "Short i", text: "Similar to English 'sit'.", examples: [{ german: "mit", roman: "mit", english: "with" }, { german: "bitte", roman: "bit-teh", english: "please" }, { german: "Kind", roman: "kint", english: "child" }] },
        { subtitle: "Long i", text: "Often written ie and pronounced ee. Memory trick: IE → EE.", examples: [{ german: "Liebe", roman: "lee-beh", english: "love" }, { german: "vier", roman: "feer", english: "four" }, { german: "sieben", roman: "zee-ben", english: "seven" }, { german: "wie", roman: "vee", english: "how" }] }
      ]
    },
    {
      num: 6,
      category: "Alphabet & Vowels",
      title: "German O",
      items: [
        { subtitle: "Short o", text: "Short rounded o sound.", examples: [{ german: "kommen", roman: "kom-men", english: "to come" }, { german: "offen", roman: "of-fen", english: "open" }] },
        { subtitle: "Long o", text: "Deeper, longer o sound.", examples: [{ german: "Brot", roman: "broht", english: "bread" }, { german: "wohnen", roman: "voh-nen", english: "to live/reside" }, { german: "rot", roman: "roht", english: "red" }] }
      ]
    },
    {
      num: 7,
      category: "Alphabet & Vowels",
      title: "German U",
      items: [
        { subtitle: "Short u", text: "Similar to a short 'oo'.", examples: [{ german: "Mutter", roman: "moot-ter", english: "mother" }, { german: "Hund", roman: "hoont", english: "dog" }] },
        { subtitle: "Long u", text: "Longer 'oo' sound.", examples: [{ german: "Schule", roman: "shoo-leh", english: "school" }, { german: "gut", roman: "goot", english: "good" }, { german: "Uhr", roman: "oor", english: "clock/timepiece" }] }
      ]
    },
    {
      num: 8,
      category: "Umlauts & Diphthongs",
      title: "Umlaut Ä",
      desc: "ä generally sounds close to an English e sound, depending on vowel length.",
      examples: [
        { german: "Mädchen", roman: "Meyd-khen", english: "girl" },
        { german: "spät", roman: "shpayt", english: "late" },
        { german: "Käse", roman: "Kay-zeh", english: "cheese" },
        { german: "Äpfel", roman: "Ep-fel", english: "apples" }
      ]
    },
    {
      num: 9,
      category: "Umlauts & Diphthongs",
      title: "Umlaut Ö",
      desc: "English and Urdu do not have an exact equivalent. To make ö: say 'eh', keep your tongue there, then round your lips as if saying 'o'. Roman spellings are only approximations; listening practice is especially useful.",
      examples: [
        { german: "schön", roman: "shern", english: "beautiful/nice" },
        { german: "möchte", roman: "merkh-teh", english: "would like" },
        { german: "zwölf", roman: "tsvelf", english: "twelve" },
        { german: "Köln", roman: "approximately kern", english: "Cologne" }
      ]
    },
    {
      num: 10,
      category: "Umlauts & Diphthongs",
      title: "Umlaut Ü",
      desc: "To make ü: say 'ee', keep your tongue in the same position, and round your lips. Do not pronounce ü exactly like English oo.",
      examples: [
        { german: "für", roman: "fuer", english: "for" },
        { german: "fünf", roman: "fuunf", english: "five" },
        { german: "Tür", roman: "tuer", english: "door" },
        { german: "über", roman: "ue-ber", english: "over/about" }
      ]
    },
    {
      num: 11,
      category: "Umlauts & Diphthongs",
      title: "EI",
      desc: "This is one of the most important rules: ei = eye. Memory trick: EI → EYE.",
      examples: [
        { german: "mein", roman: "mine", english: "my" },
        { german: "dein", roman: "dine", english: "your" },
        { german: "eins", roman: "ayns", english: "one" },
        { german: "Zeit", roman: "tsait", english: "time" },
        { german: "heißen", roman: "hai-sen", english: "to be called" }
      ]
    },
    {
      num: 12,
      category: "Umlauts & Diphthongs",
      title: "AI",
      desc: "German ai normally has the same sound as ei.",
      examples: [
        { german: "Mai", roman: "my", english: "May" },
        { german: "Kaiser", roman: "kai-zer", english: "emperor" }
      ]
    },
    {
      num: 13,
      category: "Umlauts & Diphthongs",
      title: "IE",
      desc: "ie = ee. Memory trick: EI = eye; IE = ee.",
      examples: [
        { german: "Liebe", roman: "lee-beh", english: "love" },
        { german: "sieben", roman: "zee-ben", english: "seven" },
        { german: "Dienstag", roman: "deens-tahk", english: "Tuesday" },
        { german: "viel", roman: "feel", english: "much/a lot" }
      ]
    },
    {
      num: 14,
      category: "Umlauts & Diphthongs",
      title: "EU",
      desc: "eu = oy.",
      examples: [
        { german: "Deutsch", roman: "doych", english: "German" },
        { german: "heute", roman: "hoy-teh", english: "today" },
        { german: "Freund", roman: "froynt", english: "friend" },
        { german: "neu", roman: "noy", english: "new" }
      ]
    },
    {
      num: 15,
      category: "Umlauts & Diphthongs",
      title: "ÄU",
      desc: "äu has the same sound as eu: oy. So: eu = oy; äu = oy.",
      examples: [
        { german: "Häuser", roman: "hoy-zer", english: "houses" },
        { german: "träumen", roman: "troy-men", english: "to dream" }
      ]
    },
    {
      num: 16,
      category: "Umlauts & Diphthongs",
      title: "AU",
      desc: "au = ow.",
      examples: [
        { german: "Haus", roman: "hows", english: "house" },
        { german: "Auto", roman: "ow-toh", english: "car" },
        { german: "auch", roman: "owkh", english: "also" },
        { german: "Frau", roman: "frow", english: "woman/wife" }
      ]
    },
    {
      num: 17,
      category: "Consonants & Combinations",
      title: "German CH — Two Major Sounds",
      desc: "German ch is one of the most important pronunciation areas. There are two main patterns: a soft ich sound and a harder ach sound."
    },
    {
      num: 18,
      category: "Consonants & Combinations",
      title: "Soft CH — Ich Sound",
      desc: "After sounds such as i, e, ä, ö, ü, and often after consonants, ch is usually soft. For beginners, 'ish' is an acceptable approximation, but the real German sound is softer and more forward than English sh.",
      examples: [
        { german: "ich", roman: "approximately ish", english: "I" },
        { german: "nicht", roman: "approximately nisht", english: "not" },
        { german: "Milch", roman: "approximately milkh / milsh", english: "milk" },
        { german: "möchte", roman: "merkh-teh", english: "would like" },
        { german: "welche", roman: "vel-kheh", english: "which" }
      ]
    },
    {
      num: 19,
      category: "Consonants & Combinations",
      title: "Hard CH — Ach Sound",
      desc: "After a, o, u, au, the ch is made farther back in the throat. Think of a gentle throat sound. Do not pronounce it like English ch in 'chair'.",
      examples: [
        { german: "Bach", roman: "bahkh", english: "stream/Bach" },
        { german: "Nacht", roman: "nahkht", english: "night" },
        { german: "Buch", roman: "bookh", english: "book" },
        { german: "auch", roman: "owkh", english: "also" },
        { german: "machen", roman: "mah-khen", english: "to do/make" }
      ]
    },
    {
      num: 20,
      category: "Consonants & Combinations",
      title: "SCH",
      desc: "sch = sh.",
      examples: [
        { german: "Schule", roman: "shoo-leh", english: "school" },
        { german: "schön", roman: "shern", english: "beautiful/nice" },
        { german: "Schuh", roman: "shoo", english: "shoe" },
        { german: "schreiben", roman: "shry-ben", english: "to write" }
      ]
    },
    {
      num: 21,
      category: "Consonants & Combinations",
      title: "TSCH",
      desc: "tsch = English ch.",
      examples: [
        { german: "Deutsch", roman: "doych", english: "German" },
        { german: "Tschüss", roman: "chuus", english: "bye" }
      ]
    },
    {
      num: 22,
      category: "Consonants & Combinations",
      title: "German S",
      items: [
        { subtitle: "S at the beginning before a vowel", text: "Often sounds like English z.", examples: [{ german: "Sonne", roman: "zon-neh", english: "sun" }, { german: "sagen", roman: "zah-gen", english: "to say" }, { german: "sehen", roman: "zay-en", english: "to see" }, { german: "sieben", roman: "zee-ben", english: "seven" }] },
        { subtitle: "Final S", text: "Usually sounds like normal s.", examples: [{ german: "Haus", roman: "hows", english: "house" }, { german: "Bus", roman: "boos", english: "bus" }] }
      ]
    },
    {
      num: 23,
      category: "Consonants & Combinations",
      title: "ß",
      desc: "The letter ß is called Eszett or scharfes S. It sounds like ss. Never pronounce ß like English B.",
      examples: [
        { german: "Straße", roman: "shtrah-seh", english: "street" },
        { german: "heißen", roman: "hai-sen", english: "to be called" },
        { german: "groß", roman: "grohs", english: "big/tall" }
      ]
    },
    {
      num: 24,
      category: "Consonants & Combinations",
      title: "SS",
      desc: "ss is pronounced like s.",
      examples: [
        { german: "Wasser", roman: "vas-ser", english: "water" },
        { german: "essen", roman: "es-sen", english: "to eat" },
        { german: "müssen", roman: "mues-sen", english: "must/have to" }
      ]
    },
    {
      num: 25,
      category: "Consonants & Combinations",
      title: "SP at the Beginning",
      desc: "At the beginning of German words or syllables: sp → shp.",
      examples: [
        { german: "sprechen", roman: "shpreh-khen", english: "to speak" },
        { german: "Sport", roman: "shport", english: "sport" },
        { german: "spielen", roman: "shpee-len", english: "to play" },
        { german: "spät", roman: "shpayt", english: "late" }
      ]
    },
    {
      num: 26,
      category: "Consonants & Combinations",
      title: "ST at the Beginning",
      desc: "At the beginning: st → sht.",
      examples: [
        { german: "Straße", roman: "shtrah-seh", english: "street" },
        { german: "Student", roman: "shtoo-dent", english: "student" },
        { german: "stehen", roman: "shtay-en", english: "to stand" },
        { german: "Stadt", roman: "shtat", english: "city" }
      ]
    },
    {
      num: 27,
      category: "Consonants & Combinations",
      title: "Z",
      desc: "German z does NOT sound like English z. It sounds like ts. Essential rule: Z = TS.",
      examples: [
        { german: "Zeit", roman: "tsait", english: "time" },
        { german: "zehn", roman: "tsayn", english: "ten" },
        { german: "zwei", roman: "tsvy", english: "two" },
        { german: "Zimmer", roman: "tsim-mer", english: "room" }
      ]
    },
    {
      num: 28,
      category: "Consonants & Combinations",
      title: "W",
      desc: "German w sounds like English v. Essential rule: W = V.",
      examples: [
        { german: "Wasser", roman: "vas-ser", english: "water" },
        { german: "wie", roman: "vee", english: "how" },
        { german: "wo", roman: "voh", english: "where" },
        { german: "wohnen", roman: "voh-nen", english: "to live/reside" }
      ]
    },
    {
      num: 29,
      category: "Consonants & Combinations",
      title: "V",
      desc: "German v is often pronounced f in native German words. In some foreign or borrowed words, v can sound like English v.",
      examples: [
        { german: "Vater", roman: "fah-ter", english: "father" },
        { german: "vier", roman: "feer", english: "four" },
        { german: "Vogel", roman: "foh-gel", english: "bird" },
        { german: "Video", roman: "approximately vee-deh-oh", english: "video" }
      ]
    },
    {
      num: 30,
      category: "Consonants & Combinations",
      title: "J",
      desc: "German j sounds like English y. Essential rule: J = Y.",
      examples: [
        { german: "ja", roman: "yah", english: "yes" },
        { german: "Jahr", roman: "yahr", english: "year" },
        { german: "Junge", roman: "yoong-eh", english: "boy" },
        { german: "jetzt", roman: "yetst", english: "now" }
      ]
    },
    {
      num: 31,
      category: "Consonants & Combinations",
      title: "R",
      desc: "German r varies by speaker and region. You may hear a throat r, a rolled r, or a softer vowel-like sound at the end of words. At the end of words such as Bruder, the -er often sounds approximately like 'uh/ah' (Bruder ≈ broo-duh).",
      examples: [
        { german: "rot", roman: "varies by region", english: "red" },
        { german: "reisen", roman: "varies by region", english: "to travel" },
        { german: "Restaurant", roman: "varies by region", english: "restaurant" },
        { german: "Bruder", roman: "broo-duh", english: "brother" }
      ]
    },
    {
      num: 32,
      category: "Consonants & Combinations",
      title: "H",
      desc: "At the beginning of a word, h is normally pronounced.",
      examples: [
        { german: "Haus", roman: "hows", english: "house" },
        { german: "haben", roman: "hah-ben", english: "to have" },
        { german: "heute", roman: "hoy-teh", english: "today" }
      ]
    },
    {
      num: 33,
      category: "Consonants & Combinations",
      title: "H After a Vowel",
      desc: "Sometimes h is not pronounced separately. Instead, it indicates a longer vowel.",
      examples: [
        { german: "fahren", roman: "fah-ren", english: "to drive/travel" },
        { german: "sehen", roman: "zay-en", english: "to see" },
        { german: "Uhr", roman: "oor", english: "clock" },
        { german: "Zahl", roman: "tsahl", english: "number" }
      ]
    },
    {
      num: 34,
      category: "Consonants & Combinations",
      title: "German G",
      desc: "Usually similar to English hard g. For beginners, focus on the standard hard g in normal positions.",
      examples: [
        { german: "gut", roman: "goot", english: "good" },
        { german: "geben", roman: "gay-ben", english: "to give" },
        { german: "gehen", roman: "gay-en", english: "to go" }
      ]
    },
    {
      num: 35,
      category: "Consonants & Combinations",
      title: "German K",
      desc: "German k is pronounced clearly.",
      examples: [
        { german: "Kind", roman: "kint", english: "child" },
        { german: "Kaffee", roman: "kah-feh", english: "coffee" },
        { german: "kommen", roman: "kom-men", english: "to come" }
      ]
    },
    {
      num: 36,
      category: "Consonants & Combinations",
      title: "German C",
      desc: "German c rarely appears alone in native words. It is usually part of combinations such as ch or ck, or appears in foreign words.",
      examples: [
        { german: "Computer", roman: "depends on word origin", english: "computer" },
        { german: "Café", roman: "depends on borrowed word", english: "café" }
      ]
    },
    {
      num: 37,
      category: "Consonants & Combinations",
      title: "CK",
      desc: "ck = k.",
      examples: [
        { german: "backen", roman: "bak-ken", english: "to bake" },
        { german: "Jacke", roman: "yak-keh", english: "jacket" },
        { german: "Brücke", roman: "brue-keh", english: "bridge" }
      ]
    },
    {
      num: 38,
      category: "Consonants & Combinations",
      title: "QU",
      desc: "German qu = kv. Not English 'kw'; use a clearer kv sound.",
      examples: [
        { german: "Quelle", roman: "kvel-leh", english: "source" },
        { german: "Qualität", roman: "kvah-lee-tayt", english: "quality" }
      ]
    },
    {
      num: 39,
      category: "Consonants & Combinations",
      title: "PF",
      desc: "German often combines p + f. Try to pronounce both sounds.",
      examples: [
        { german: "Pferd", roman: "pfairt", english: "horse" },
        { german: "Apfel", roman: "ap-fel", english: "apple" },
        { german: "Kopf", roman: "kopf", english: "head" }
      ]
    },
    {
      num: 40,
      category: "Consonants & Combinations",
      title: "KN",
      desc: "Unlike English, German normally pronounces both letters. Do not drop the k.",
      examples: [
        { german: "Knie", roman: "knee", english: "knee" },
        { german: "Knopf", roman: "knopf", english: "button" }
      ]
    },
    {
      num: 41,
      category: "Consonants & Combinations",
      title: "GN",
      desc: "Both sounds can usually be heard.",
      examples: [
        { german: "Gnade", roman: "gnah-deh", english: "mercy/grace" }
      ]
    },
    {
      num: 42,
      category: "Consonants & Combinations",
      title: "NG",
      desc: "Similar to English 'sing'. Do not add a strong separate g after every ng.",
      examples: [
        { german: "singen", roman: "zing-en", english: "to sing" },
        { german: "lang", roman: "lahng", english: "long" }
      ]
    },
    {
      num: 43,
      category: "Consonants & Combinations",
      title: "NK",
      desc: "Usually pronounced like ngk.",
      examples: [
        { german: "danke", roman: "dang-keh", english: "thank you" },
        { german: "trinken", roman: "tring-ken", english: "to drink" },
        { german: "Bank", roman: "bangk", english: "bank" }
      ]
    },
    {
      num: 44,
      category: "Endings & Word Stress",
      title: "Final B, D and G Become Harder",
      desc: "An important German pronunciation phenomenon is final devoicing (Auslautverhärtung). At the end of a word: b sounds closer to p, d sounds closer to t, and g sounds closer to k.",
      examples: [
        { german: "Tag", roman: "tahk", english: "day" },
        { german: "Hund", roman: "hoont", english: "dog" },
        { german: "Dieb", roman: "approximately deep", english: "thief" }
      ]
    },
    {
      num: 45,
      category: "Endings & Word Stress",
      title: "Double Consonants",
      desc: "Double consonants usually tell you that the vowel before them is short. The consonant itself is generally not dramatically doubled. Focus mainly on keeping the previous vowel short.",
      examples: [
        { german: "kommen", roman: "short vowel before doubled consonant", english: "to come" },
        { german: "Mutter", roman: "short vowel before doubled consonant", english: "mother" },
        { german: "essen", roman: "short vowel before doubled consonant", english: "to eat" },
        { german: "Bett", roman: "short vowel before doubled consonant", english: "bed" }
      ]
    },
    {
      num: 46,
      category: "Endings & Word Stress",
      title: "Long Vowels Before One Consonant",
      desc: "A single consonant after a vowel can often indicate a longer vowel, though this is not an absolute rule.",
      examples: [
        { german: "Tag", roman: "often contains a longer vowel", english: "day" },
        { german: "Weg", roman: "often contains a longer vowel", english: "way/path" },
        { german: "gut", roman: "often contains a longer vowel", english: "good" }
      ]
    },
    {
      num: 47,
      category: "Endings & Word Stress",
      title: "Vowel Before H",
      desc: "A vowel before silent h is usually long.",
      examples: [
        { german: "fahren", roman: "long vowel", english: "to drive" },
        { german: "wohnen", roman: "long vowel", english: "to reside" },
        { german: "sehen", roman: "long vowel", english: "to see" },
        { german: "Uhr", roman: "long vowel", english: "clock" }
      ]
    },
    {
      num: 48,
      category: "Endings & Word Stress",
      title: "Double Vowels",
      desc: "Some words write the same vowel twice to show length.",
      examples: [
        { german: "Meer", roman: "mair", english: "sea" },
        { german: "Boot", roman: "boht", english: "boat" },
        { german: "Saal", roman: "zahl", english: "hall" }
      ]
    },
    {
      num: 49,
      category: "Endings & Word Stress",
      title: "Word Ending -ER",
      desc: "In standard everyday German, final -er is often weak. Do not force a strong American-English r.",
      examples: [
        { german: "Bruder", roman: "broo-duh", english: "brother" },
        { german: "Vater", roman: "fah-tuh", english: "father" },
        { german: "Mutter", roman: "moot-tuh", english: "mother" }
      ]
    },
    {
      num: 50,
      category: "Endings & Word Stress",
      title: "Ending -EN",
      desc: "The ending -en is very common in verbs. In natural speech the ending can become weak. Do not overemphasize the final syllable.",
      examples: [
        { german: "machen", roman: "weak final -en in natural speech", english: "to do/make" },
        { german: "kommen", roman: "weak final -en in natural speech", english: "to come" },
        { german: "lernen", roman: "weak final -en in natural speech", english: "to learn" },
        { german: "arbeiten", roman: "weak final -en in natural speech", english: "to work" }
      ]
    },
    {
      num: 51,
      category: "Endings & Word Stress",
      title: "Ending -E",
      desc: "Usually weak (final e ≈ soft eh). The final e sounds roughly like a soft 'eh'.",
      examples: [
        { german: "bitte", roman: "final e ≈ soft eh", english: "please" },
        { german: "Name", roman: "final e ≈ soft eh", english: "name" },
        { german: "Schule", roman: "final e ≈ soft eh", english: "school" },
        { german: "Straße", roman: "final e ≈ soft eh", english: "street" }
      ]
    },
    {
      num: 52,
      category: "Endings & Word Stress",
      title: "Ending -IG",
      desc: "This is one area where regional pronunciation varies. In standard northern-oriented pronunciation, the ending may sound closer to a soft 'ikh'.",
      examples: [
        { german: "zwanzig", roman: "tsvan-tsikh", english: "twenty" },
        { german: "richtig", roman: "rikh-tikh", english: "correct" }
      ]
    },
    {
      num: 53,
      category: "Endings & Word Stress",
      title: "Ending -ICH",
      desc: "In words ending with -ich, approximate the final sound softly rather than as English ch.",
      examples: [
        { german: "richtig", roman: "soft ch-like ending in standard pronunciation", english: "correct" },
        { german: "wichtig", roman: "soft ch-like ending in standard pronunciation", english: "important" },
        { german: "fertig", roman: "soft ch-like ending in standard pronunciation", english: "ready/done" }
      ]
    },
    {
      num: 54,
      category: "Endings & Word Stress",
      title: "Word Stress",
      desc: "German words usually have one clearly stressed syllable. Capital letters show the stressed part. Stress is important because incorrect stress can make otherwise correct words harder to understand.",
      examples: [
        { german: "ARbeiten", roman: "capital letters show stressed part", english: "to work" },
        { german: "WOHnen", roman: "capital letters show stressed part", english: "to live" },
        { german: "LERnen", roman: "capital letters show stressed part", english: "to learn" },
        { german: "KAffee", roman: "capital letters show stressed part", english: "coffee" },
        { german: "MORgen", roman: "capital letters show stressed part", english: "tomorrow/morning" }
      ]
    },
    {
      num: 55,
      category: "Endings & Word Stress",
      title: "Prefixes and Stress",
      desc: "Some prefixes are normally stressed. Common separable prefixes include: an-, auf-, aus-, ein-, mit-, vor-, zu-. This stress pattern helps you recognize separable verbs.",
      examples: [
        { german: "AUFstehen", roman: "stress the separable prefix", english: "to get up" },
        { german: "ANrufen", roman: "stress the separable prefix", english: "to call" },
        { german: "EINkaufen", roman: "stress the separable prefix", english: "to shop" },
        { german: "MITkommen", roman: "stress the separable prefix", english: "to come along" },
        { german: "AUSgehen", roman: "stress the separable prefix", english: "to go out" }
      ]
    },
    {
      num: 56,
      category: "Endings & Word Stress",
      title: "Unstressed Prefixes",
      desc: "Common inseparable prefixes are usually unstressed: be-, ge-, ver-, er-, ent-, zer-.",
      examples: [
        { german: "beSUchen", roman: "main stress comes later in word", english: "to visit" },
        { german: "verSTEHen", roman: "main stress comes later in word", english: "to understand" },
        { german: "erZÄHlen", roman: "main stress comes later in word", english: "to tell" },
        { german: "entSCHULdigen", roman: "main stress comes later in word", english: "to apologize/excuse" }
      ]
    },
    {
      num: 57,
      category: "Endings & Word Stress",
      title: "German Rhythm",
      desc: "Do not pronounce every word with equal emphasis. Important words usually receive more stress. The important information carries the main stress.",
      examples: [
        { german: "Ich FAHRE morgen nach BERLIN.", roman: "FAHRE & BERLIN carry main stress", english: "I am driving to Berlin tomorrow." }
      ]
    },
    {
      num: 58,
      category: "Endings & Word Stress",
      title: "Questions With Question Words",
      desc: "The voice does not always need to rise dramatically at the end like some English questions.",
      examples: [
        { german: "Wo wohnst du?", roman: "natural falling or neutral question intonation", english: "Where do you live?" },
        { german: "Wie heißt du?", roman: "natural falling or neutral question intonation", english: "What is your name?" },
        { german: "Wann kommst du?", roman: "natural falling or neutral question intonation", english: "When are you coming?" }
      ]
    },
    {
      num: 59,
      category: "Endings & Word Stress",
      title: "Yes/No Questions",
      desc: "For yes/no questions, rising intonation is more common.",
      examples: [
        { german: "Kommst du morgen?", roman: "often rising intonation at the end", english: "Are you coming tomorrow?" },
        { german: "Hast du Zeit?", roman: "often rising intonation at the end", english: "Do you have time?" },
        { german: "Sprechen Sie Englisch?", roman: "often rising intonation at the end", english: "Do you speak English?" }
      ]
    },
    {
      num: 60,
      category: "Endings & Word Stress",
      title: "Compound Words",
      desc: "German combines words together. Break long words into smaller pieces. Learn long words as smaller chunks.",
      examples: [
        { german: "Hauptbahnhof", roman: "houpt-bahn-hof (Haupt + Bahnhof)", english: "main train station" },
        { german: "Krankenversicherung", roman: "Kranken + Versicherung", english: "health insurance" }
      ]
    },
    {
      num: 61,
      category: "Endings & Word Stress",
      title: "Capital Letters Do Not Change Pronunciation",
      desc: "German nouns begin with capital letters. Capitalization is grammatical, not phonetic; it does not create a special sound.",
      examples: [
        { german: "Haus", roman: "capitalization is grammatical, not phonetic", english: "house" },
        { german: "Mann", roman: "capitalization is grammatical, not phonetic", english: "man" },
        { german: "Auto", roman: "capitalization is grammatical, not phonetic", english: "car" },
        { german: "Schule", roman: "capitalization is grammatical, not phonetic", english: "school" }
      ]
    },
    {
      num: 62,
      category: "Summary & Drills",
      title: "The Most Important Rules to Memorize First",
      desc: "These rules alone will dramatically improve your reading skills.",
      type: "rules_table"
    },
    {
      num: 63,
      category: "Summary & Drills",
      title: "Very Important Word Examples",
      desc: "Core words that demonstrate key pronunciation principles.",
      examples: [
        { german: "ich", roman: "approximately ish", english: "I" },
        { german: "nicht", roman: "approximately nisht", english: "not" },
        { german: "wie", roman: "vee", english: "how" },
        { german: "Sie", roman: "zee", english: "you (formal)" },
        { german: "Zeit", roman: "tsait", english: "time" },
        { german: "Deutsch", roman: "doych", english: "German" },
        { german: "möchte", roman: "merkh-teh", english: "would like" },
        { german: "schön", roman: "approximately shern", english: "beautiful/nice" },
        { german: "sprechen", roman: "shpreh-khen", english: "to speak" },
        { german: "Straße", roman: "shtrah-seh", english: "street" },
        { german: "zwei", roman: "tsvy", english: "two" },
        { german: "Freund", roman: "froynt", english: "friend" },
        { german: "heute", roman: "hoy-teh", english: "today" },
        { german: "Schule", roman: "shoo-leh", english: "school" },
        { german: "wohnen", roman: "voh-nen", english: "to live/reside" }
      ]
    },
    {
      num: 64,
      category: "Summary & Drills",
      title: "Common Mistakes English/Urdu Speakers Should Avoid",
      desc: "Comparison table of common wrong pronunciations vs better German approximations.",
      type: "mistakes_table"
    },
    {
      num: 65,
      category: "Learning Method & Routines",
      title: "Do Not Depend Forever on Roman Pronunciation",
      desc: "Roman pronunciation like ish, doych, and tsvy is useful at the beginning, but it cannot perfectly represent German sounds such as ö, ü, soft ch, and German r. Use Roman pronunciation as a bridge, then gradually listen to native audio."
    },
    {
      num: 66,
      category: "Learning Method & Routines",
      title: "Best Learning Method",
      desc: "Step-by-step method for mastering German sentence pronunciation.",
      steps: [
        "1. Read: Ich möchte einen Kaffee.",
        "2. Break it down: Ich | möchte | einen | Kaffee.",
        "3. Apply sound rules: Ich → ish; möchte → merkh-teh; einen → eye-nen; Kaffee → kah-feh.",
        "4. Say the full sentence: Ish merkh-teh eye-nen kah-feh.",
        "5. Listen to a native speaker and compare your pronunciation.",
        "6. Repeat 3–5 times slowly and correctly. (Do not repeat a sentence 50 times badly!)"
      ]
    },
    {
      num: 67,
      category: "Learning Method & Routines",
      title: "Best 10-Minute Daily Pronunciation Routine",
      desc: "Structured daily 10-minute workout for consistent progress.",
      routine: [
        "Minutes 1–2: Practice ä – ö – ü.",
        "Minutes 3–4: Practice ei – ie – eu – au.",
        "Minutes 5–6: Practice ch – sch – sp – st.",
        "Minutes 7–8: Practice w – v – j – z.",
        "Minutes 9–10: Read five complete German sentences aloud."
      ]
    },
    {
      num: 68,
      category: "Learning Method & Routines",
      title: "Daily Sound Drill",
      desc: "Click any set below to hear the German pronunciation sound drill!",
      drills: [
        { label: "Vowel & W Drill", words: ["wie", "wir", "wohnen", "Wasser"] },
        { label: "Z Sound Drill", words: ["Zeit", "zehn", "zwei", "Zimmer"] },
        { label: "Sch & Sp Drill", words: ["Schule", "schön", "schreiben", "Schuh"] },
        { label: "Sp & St Drill", words: ["spielen", "sprechen", "Sport", "spät"] },
        { label: "St Cluster Drill", words: ["Straße", "Stadt", "Student", "stehen"] },
        { label: "Ei Diphthong Drill", words: ["mein", "dein", "Zeit", "eins"] },
        { label: "Ie Diphthong Drill", words: ["Liebe", "vier", "sieben", "wie"] },
        { label: "Eu Diphthong Drill", words: ["Deutsch", "Freund", "heute", "neu"] }
      ]
    },
    {
      num: 69,
      category: "Summary & Drills",
      title: "A Powerful Memory Sheet",
      desc: "Quick mapping cheatsheet for essential letter combinations.",
      type: "memory_sheet"
    },
    {
      num: 70,
      category: "Learning Method & Routines",
      title: "Most Important Final Advice",
      desc: "Key priorities to remember as you practice German pronunciation.",
      advice: [
        "Pronounce vowels clearly.",
        "Distinguish long and short vowels.",
        "Learn ei / ie / eu / au.",
        "Learn w / v / j / z.",
        "Learn sch / sp / st.",
        "Learn both ch sounds (soft ich sound & hard ach sound).",
        "Learn natural word stress.",
        "Do not overpronounce endings like -e, -en, -er.",
        "Listen before repeating.",
        "Speak German aloud every day."
      ],
      quickRef: [
        { german: "ich", roman: "approximately ish" },
        { german: "nicht", roman: "approximately nisht" },
        { german: "wie", roman: "vee" },
        { german: "Sie", roman: "zee" },
        { german: "Zeit", roman: "tsait" },
        { german: "Deutsch", roman: "doych" },
        { german: "möchte", roman: "merkh-teh" },
        { german: "für", roman: "fuer" },
        { german: "schön", roman: "shern" },
        { german: "sprechen", roman: "shpreh-khen" }
      ],
      recommendedPractice: "Use a listen → recognize → repeat → compare method. A free pronunciation trainer from Goethe-Institut can be useful for hearing standard German sounds and practicing them with feedback."
    }
  ]
};
