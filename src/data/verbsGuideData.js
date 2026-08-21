export const verbsGuideData = {
  title: "Complete Guide to German Regular & Irregular Verbs",
  subtitle: "A1–A2 beginner reference: present tense, modal verbs, separable verbs, Perfekt, Präteritum, reflexive verbs, cases, commands, word order, and learning strategy",
  intro: "A verb is an action or state word. Mastering German verbs is the key to holding fluent conversations. This comprehensive guide breaks down all 88 essential rules, formulas, conjugation tables, past tenses, and learning strategies for A1-A2 learners.",

  categories: [
    "All",
    "Basics & Present Tense",
    "Irregular & Vowel Changes",
    "Modals & Separable Verbs",
    "Past Tenses (Perfekt & Präteritum)",
    "Reflexive, Prepositions & Cases",
    "Imperatives & Sentence Structure",
    "Mastery & Practice Strategies"
  ],

  sections: [
    {
      num: 1,
      category: "Basics & Present Tense",
      title: "What is a verb?",
      desc: "A verb is an action or state word. In German, the basic dictionary form (infinitive) usually ends in -en.",
      examples: [
        { german: "gehen", english: "to go" },
        { german: "essen", english: "to eat" },
        { german: "arbeiten", english: "to work" },
        { german: "lernen", english: "to learn" },
        { german: "sein", english: "to be" },
        { german: "haben", english: "to have" }
      ],
      note: "Standard endings are -en (e.g. machen, wohnen, lernen, arbeiten, spielen). A few verbs end in -n (e.g., wandern, sammeln)."
    },
    {
      num: 2,
      category: "Basics & Present Tense",
      title: "Regular verbs in German",
      desc: "Regular verbs follow a predictable pattern. Remove -en to get the verb stem (e.g., machen -> stem mach-), then add personal endings.",
      tableHeader: ["Person", "German Form", "Meaning"],
      table: [
        { pronoun: "ich", form: "mache", ending: "-e", meaning: "I do / make" },
        { pronoun: "du", form: "machst", ending: "-st", meaning: "you do / make (informal)" },
        { pronoun: "er / sie / es", form: "macht", ending: "-t", meaning: "he / she / it does" },
        { pronoun: "wir", form: "machen", ending: "-en", meaning: "we do" },
        { pronoun: "ihr", form: "macht", ending: "-t", meaning: "you all do" },
        { pronoun: "Sie / sie", form: "machen", ending: "-en", meaning: "you formal / they do" }
      ],
      patternRule: "Golden Present Tense Pattern to memorize: e – st – t – en – t – en."
    },
    {
      num: 3,
      category: "Basics & Present Tense",
      title: "Example: lernen",
      desc: "lernen = to learn. Stem: lern-.",
      table: [
        { pronoun: "ich", form: "lerne" },
        { pronoun: "du", form: "lernst" },
        { pronoun: "er", form: "lernt" },
        { pronoun: "wir", form: "lernen" },
        { pronoun: "ihr", form: "lernt" },
        { pronoun: "Sie / sie", form: "lernen" }
      ],
      sentences: [
        { german: "Ich lerne Deutsch.", english: "I learn German." },
        { german: "Du lernst schnell.", english: "You learn quickly." },
        { german: "Wir lernen zusammen.", english: "We learn together." }
      ]
    },
    {
      num: 4,
      category: "Basics & Present Tense",
      title: "Example: wohnen",
      desc: "wohnen = to live/reside. Stem: wohn-.",
      table: [
        { pronoun: "ich", form: "wohne" },
        { pronoun: "du", form: "wohnst" },
        { pronoun: "er / sie / es", form: "wohnt" },
        { pronoun: "wir", form: "wohnen" },
        { pronoun: "ihr", form: "wohnt" },
        { pronoun: "Sie / sie", form: "wohnen" }
      ],
      sentences: [
        { german: "Ich wohne in Berlin.", english: "I live in Berlin." },
        { german: "Wo wohnst du?", english: "Where do you live?" },
        { german: "Sie wohnen in Deutschland.", english: "They live in Germany." }
      ]
    },
    {
      num: 5,
      category: "Basics & Present Tense",
      title: "Regular verbs ending in -t or -d",
      desc: "Some verbs need an extra 'e' before certain endings (-st, -t) because pronunciation would otherwise be difficult.",
      examples: [
        { german: "arbeiten", english: "to work" },
        { german: "reden", english: "to talk" },
        { german: "warten", english: "to wait" },
        { german: "antworten", english: "to answer" }
      ],
      tables: [
        {
          title: "arbeiten (to work)",
          rows: [
            { pronoun: "ich", form: "arbeite" },
            { pronoun: "du", form: "arbeitest" },
            { pronoun: "er/sie/es", form: "arbeitet" },
            { pronoun: "wir", form: "arbeiten" },
            { pronoun: "ihr", form: "arbeitet" },
            { pronoun: "Sie/sie", form: "arbeiten" }
          ]
        },
        {
          title: "reden (to talk)",
          rows: [
            { pronoun: "ich", form: "rede" },
            { pronoun: "du", form: "redest" },
            { pronoun: "er", form: "redet" },
            { pronoun: "wir", form: "reden" },
            { pronoun: "ihr", form: "redet" },
            { pronoun: "sie", form: "reden" }
          ]
        }
      ]
    },
    {
      num: 6,
      category: "Basics & Present Tense",
      title: "Verbs whose stems end in -s, -ß, -z, or -x",
      desc: "Normally 'du' takes -st. But when the stem already ends in an s-like sound, German drops the extra 's'.",
      examples: [
        { german: "heißen", english: "to be called -> du heißt (Not: du heißst)" },
        { german: "tanzen", english: "to dance -> du tanzt (Not: du tanzst)" }
      ],
      table: [
        { pronoun: "ich", form: "heiße" },
        { pronoun: "du", form: "heißt" },
        { pronoun: "er", form: "heißt" },
        { pronoun: "wir", form: "heißen" },
        { pronoun: "ihr", form: "heißt" },
        { pronoun: "sie", form: "heißen" }
      ]
    },
    {
      num: 7,
      category: "Irregular & Vowel Changes",
      title: "Irregular verbs overview",
      desc: "Irregular verbs do not always follow the normal stem pattern. Endings look regular, but the stem vowel changes in 'du' and 'er/sie/es'.",
      titleDetail: "fahren = to drive / go by vehicle",
      table: [
        { pronoun: "ich", form: "fahre" },
        { pronoun: "du", form: "fährst" },
        { pronoun: "er / sie / es", form: "fährt" },
        { pronoun: "wir", form: "fahren" },
        { pronoun: "ihr", form: "fahrt" },
        { pronoun: "sie / Sie", form: "fahren" }
      ],
      note: "Notice vowel change: a -> ä in du & er/sie/es.",
      sentences: [
        { german: "Ich fahre mit dem Bus.", english: "I go by bus." },
        { german: "Du fährst nach Berlin.", english: "You travel to Berlin." },
        { german: "Er fährt heute nach Hause.", english: "He is going home today." }
      ]
    },
    {
      num: 8,
      category: "Irregular & Vowel Changes",
      title: "Common vowel-changing pattern: a -> ä",
      desc: "Vowel change a -> ä occurs in du & er/sie/es.",
      changeList: [
        "fahren -> du fährst",
        "schlafen -> du schläfst",
        "tragen -> du trägst",
        "laufen -> du läufst (a -> äu)"
      ],
      titleDetail: "schlafen = to sleep",
      table: [
        { pronoun: "ich", form: "schlafe" },
        { pronoun: "du", form: "schläfst" },
        { pronoun: "er", form: "schläft" },
        { pronoun: "wir", form: "schlafen" },
        { pronoun: "ihr", form: "schlaft" },
        { pronoun: "sie", form: "schlafen" }
      ]
    },
    {
      num: 9,
      category: "Irregular & Vowel Changes",
      title: "Common vowel-changing pattern: e -> i",
      desc: "Some verbs change stem vowel e -> i in du and er/sie/es.",
      changeList: [
        "geben -> du gibst",
        "nehmen -> du nimmst",
        "helfen -> du hilfst",
        "sprechen -> du sprichst"
      ],
      titleDetail: "geben = to give",
      table: [
        { pronoun: "ich", form: "gebe" },
        { pronoun: "du", form: "gibst" },
        { pronoun: "er", form: "gibt" },
        { pronoun: "wir", form: "geben" },
        { pronoun: "ihr", form: "gebt" },
        { pronoun: "sie", form: "geben" }
      ],
      sentences: [
        { german: "Ich gebe dir das Buch.", english: "I give you the book." },
        { german: "Gibst du mir das Geld?", english: "Are you giving me the money?" }
      ]
    },
    {
      num: 10,
      category: "Irregular & Vowel Changes",
      title: "Common vowel-changing pattern: e -> ie",
      desc: "Some verbs change stem vowel e -> ie in du and er/sie/es.",
      changeList: [
        "sehen -> du siehst",
        "lesen -> du liest"
      ],
      titleDetail: "sehen = to see",
      table: [
        { pronoun: "ich", form: "sehe" },
        { pronoun: "du", form: "siehst" },
        { pronoun: "er", form: "sieht" },
        { pronoun: "wir", form: "sehen" },
        { pronoun: "ihr", form: "seht" },
        { pronoun: "sie", form: "sehen" }
      ],
      sentences: [
        { german: "Ich sehe den Mann.", english: "I see the man." },
        { german: "Siehst du das Auto?", english: "Do you see the car?" }
      ]
    },
    {
      num: 11,
      category: "Irregular & Vowel Changes",
      title: "Important irregular verb: sein",
      desc: "sein = to be. Highly irregular, absolute must-know!",
      table: [
        { pronoun: "ich", form: "bin", meaning: "I am" },
        { pronoun: "du", form: "bist", meaning: "you are" },
        { pronoun: "er / sie / es", form: "ist", meaning: "he/she/it is" },
        { pronoun: "wir", form: "sind", meaning: "we are" },
        { pronoun: "ihr", form: "seid", meaning: "you all are" },
        { pronoun: "Sie / sie", form: "sind", meaning: "you formal / they are" }
      ],
      sentences: [
        { german: "Ich bin müde.", english: "I am tired." },
        { german: "Du bist nett.", english: "You are nice." },
        { german: "Er ist Student.", english: "He is a student." },
        { german: "Wir sind zu Hause.", english: "We are at home." }
      ]
    },
    {
      num: 12,
      category: "Irregular & Vowel Changes",
      title: "Important irregular verb: haben",
      desc: "haben = to have.",
      table: [
        { pronoun: "ich", form: "habe" },
        { pronoun: "du", form: "hast" },
        { pronoun: "er / sie / es", form: "hat" },
        { pronoun: "wir", form: "haben" },
        { pronoun: "ihr", form: "habt" },
        { pronoun: "sie / Sie", form: "haben" }
      ],
      sentences: [
        { german: "Ich habe Hunger.", english: "I am hungry." },
        { german: "Hast du Zeit?", english: "Do you have time?" },
        { german: "Sie hat ein Auto.", english: "She has a car." }
      ]
    },
    {
      num: 13,
      category: "Irregular & Vowel Changes",
      title: "Important irregular verb: werden",
      desc: "werden = to become. Used also for future tense and passive voice at higher levels.",
      table: [
        { pronoun: "ich", form: "werde" },
        { pronoun: "du", form: "wirst" },
        { pronoun: "er / sie / es", form: "wird" },
        { pronoun: "wir", form: "werden" },
        { pronoun: "ihr", form: "werdet" },
        { pronoun: "sie / Sie", form: "werden" }
      ],
      sentences: [
        { german: "Ich werde müde.", english: "I am becoming tired." },
        { german: "Es wird kalt.", english: "It is getting cold." }
      ]
    },
    {
      num: 14,
      category: "Irregular & Vowel Changes",
      title: "Important irregular verb: wissen",
      desc: "wissen = to know a fact.",
      table: [
        { pronoun: "ich", form: "weiß" },
        { pronoun: "du", form: "weißt" },
        { pronoun: "er / sie / es", form: "weiß" },
        { pronoun: "wir", form: "wissen" },
        { pronoun: "ihr", form: "wisst" },
        { pronoun: "sie / Sie", form: "wissen" }
      ],
      sentences: [
        { german: "Ich weiß das.", english: "I know that." },
        { german: "Weißt du die Antwort?", english: "Do you know the answer?" }
      ]
    },
    {
      num: 15,
      category: "Irregular & Vowel Changes",
      title: "kennen vs. wissen",
      desc: "Crucial difference between knowing facts vs being familiar with people/places.",
      contrast: [
        { word: "wissen", rule: "Use for facts or information.", example: "Ich weiß die Antwort. (I know the answer.)" },
        { word: "kennen", rule: "Use for people, places, or things you are familiar with.", example: "Ich kenne Berlin. / Kennst du Anna? (I know Berlin. / Do you know Anna?)" }
      ]
    },
    {
      num: 16,
      category: "Modals & Separable Verbs",
      title: "Modal verbs overview",
      desc: "Modal verbs express possibility, necessity, permission, or desire. They are irregular in singular forms.",
      examples: [
        { german: "können", english: "can / to be able to" },
        { german: "müssen", english: "must / have to" },
        { german: "dürfen", english: "may / to be allowed to" },
        { german: "wollen", english: "to want" },
        { german: "sollen", english: "should / supposed to" },
        { german: "mögen", english: "to like" }
      ]
    },
    {
      num: 17,
      category: "Modals & Separable Verbs",
      title: "können = can / to be able to",
      table: [
        { pronoun: "ich", form: "kann" },
        { pronoun: "du", form: "kannst" },
        { pronoun: "er / sie / es", form: "kann" },
        { pronoun: "wir", form: "können" },
        { pronoun: "ihr", form: "könnt" },
        { pronoun: "sie / Sie", form: "können" }
      ],
      sentences: [
        { german: "Ich kann Deutsch sprechen.", english: "I can speak German." },
        { german: "Kannst du mir helfen?", english: "Can you help me?" }
      ]
    },
    {
      num: 18,
      category: "Modals & Separable Verbs",
      title: "müssen = must / have to",
      table: [
        { pronoun: "ich", form: "muss" },
        { pronoun: "du", form: "musst" },
        { pronoun: "er / sie / es", form: "muss" },
        { pronoun: "wir", form: "müssen" },
        { pronoun: "ihr", form: "müsst" },
        { pronoun: "sie / Sie", form: "müssen" }
      ],
      sentences: [
        { german: "Ich muss arbeiten.", english: "I have to work." },
        { german: "Wir müssen jetzt gehen.", english: "We have to go now." }
      ]
    },
    {
      num: 19,
      category: "Modals & Separable Verbs",
      title: "dürfen = may / to be allowed to",
      table: [
        { pronoun: "ich", form: "darf" },
        { pronoun: "du", form: "darfst" },
        { pronoun: "er / sie / es", form: "darf" },
        { pronoun: "wir", form: "dürfen" },
        { pronoun: "ihr", form: "dürft" },
        { pronoun: "sie / Sie", form: "dürfen" }
      ],
      sentences: [
        { german: "Darf ich hier sitzen?", english: "May I sit here?" },
        { german: "Du darfst hier nicht rauchen.", english: "You may not smoke here." }
      ]
    },
    {
      num: 20,
      category: "Modals & Separable Verbs",
      title: "wollen = to want",
      table: [
        { pronoun: "ich", form: "will" },
        { pronoun: "du", form: "willst" },
        { pronoun: "er / sie / es", form: "will" },
        { pronoun: "wir", form: "wollen" },
        { pronoun: "ihr", form: "wollt" },
        { pronoun: "sie / Sie", form: "wollen" }
      ],
      sentences: [
        { german: "Ich will nach Hause gehen.", english: "I want to go home." },
        { german: "Willst du mitkommen?", english: "Do you want to come along?" }
      ]
    },
    {
      num: 21,
      category: "Modals & Separable Verbs",
      title: "sollen = should / supposed to",
      table: [
        { pronoun: "ich", form: "soll" },
        { pronoun: "du", form: "sollst" },
        { pronoun: "er / sie / es", form: "soll" },
        { pronoun: "wir", form: "sollen" },
        { pronoun: "ihr", form: "sollt" },
        { pronoun: "sie / Sie", form: "sollen" }
      ],
      sentences: [
        { german: "Ich soll morgen kommen.", english: "I am supposed to come tomorrow." },
        { german: "Was soll ich machen?", english: "What should I do?" }
      ]
    },
    {
      num: 22,
      category: "Modals & Separable Verbs",
      title: "mögen = to like",
      table: [
        { pronoun: "ich", form: "mag" },
        { pronoun: "du", form: "magst" },
        { pronoun: "er / sie / es", form: "mag" },
        { pronoun: "wir", form: "mögen" },
        { pronoun: "ihr", form: "mögt" },
        { pronoun: "sie / Sie", form: "mögen" }
      ],
      sentences: [
        { german: "Ich mag Kaffee.", english: "I like coffee." },
        { german: "Magst du Musik?", english: "Do you like music?" }
      ]
    },
    {
      num: 23,
      category: "Modals & Separable Verbs",
      title: "möchte = would like",
      desc: "möchte means 'would like'. Polite form derived historically from mögen.",
      table: [
        { pronoun: "ich", form: "möchte" },
        { pronoun: "du", form: "möchtest" },
        { pronoun: "er / sie / es", form: "möchte" },
        { pronoun: "wir", form: "möchten" },
        { pronoun: "ihr", form: "möchtet" },
        { pronoun: "sie / Sie", form: "möchten" }
      ],
      sentences: [
        { german: "Ich möchte einen Kaffee.", english: "I would like a coffee. (Much more polite than 'Ich will einen Kaffee')" }
      ]
    },
    {
      num: 24,
      category: "Modals & Separable Verbs",
      title: "Modal verb sentence structure",
      desc: "When a modal verb is used, the second verb moves to the end of the sentence in its infinitive form.",
      formula: "Subject + Modal Verb + Other Information + Infinitive at End",
      sentences: [
        { german: "Ich lerne Deutsch.", english: "Normal present tense" },
        { german: "Ich möchte Deutsch lernen.", english: "With modal verb" },
        { german: "Ich kann heute nicht kommen.", english: "Subject (Ich) + Modal (kann) + Info (heute nicht) + Infinitive (kommen)" }
      ]
    },
    {
      num: 25,
      category: "Modals & Separable Verbs",
      title: "Separable verbs",
      desc: "German has many verbs with prefixes that separate in normal present-tense sentences and move to the very end.",
      titleDetail: "aufstehen = to get up (Prefix: auf, Verb: stehen)",
      sentences: [
        { german: "Ich stehe um sieben Uhr auf.", english: "I get up at seven o'clock." }
      ]
    },
    {
      num: 26,
      category: "Modals & Separable Verbs",
      title: "Common separable verbs list",
      examples: [
        { german: "aufstehen", english: "get up" },
        { german: "anrufen", english: "call on phone" },
        { german: "einkaufen", english: "shop" },
        { german: "mitkommen", english: "come along" },
        { german: "ausgehen", english: "go out" },
        { german: "anfangen", english: "begin" },
        { german: "fernsehen", english: "watch TV" },
        { german: "zurückkommen", english: "come back" },
        { german: "abholen", english: "pick up" },
        { german: "aufmachen", english: "open" }
      ]
    },
    {
      num: 27,
      category: "Modals & Separable Verbs",
      title: "Example: anrufen",
      desc: "anrufen = to call",
      table: [
        { pronoun: "ich", form: "rufe ... an" },
        { pronoun: "du", form: "rufst ... an" },
        { pronoun: "er", form: "ruft ... an" },
        { pronoun: "wir", form: "rufen ... an" },
        { pronoun: "ihr", form: "ruft ... an" },
        { pronoun: "sie", form: "rufen ... an" }
      ],
      sentences: [
        { german: "Ich rufe dich morgen an.", english: "I will call you tomorrow." }
      ]
    },
    {
      num: 28,
      category: "Modals & Separable Verbs",
      title: "Example: einkaufen",
      desc: "einkaufen = to shop",
      sentences: [
        { german: "Ich kaufe heute ein.", english: "I am shopping today." },
        { german: "Wir kaufen im Supermarkt ein.", english: "We shop at the supermarket." }
      ]
    },
    {
      num: 29,
      category: "Modals & Separable Verbs",
      title: "Separable verbs with modal verbs",
      desc: "With modal verbs, the separable verb stays together at the end because it remains in the infinitive.",
      sentences: [
        { german: "Ich stehe früh auf.", english: "Without modal" },
        { german: "Ich muss früh aufstehen.", english: "With modal (Do not say: 'Ich muss früh stehen auf.')" }
      ]
    },
    {
      num: 30,
      category: "Modals & Separable Verbs",
      title: "Inseparable verbs",
      desc: "Inseparable prefixes NEVER separate: be-, emp-, ent-, er-, ge-, miss-, ver-, zer-.",
      examples: [
        { german: "besuchen", english: "to visit" },
        { german: "verstehen", english: "to understand" },
        { german: "erklären", english: "to explain" },
        { german: "bezahlen", english: "to pay" },
        { german: "bekommen", english: "to get / receive" }
      ],
      sentences: [
        { german: "Ich besuche meinen Freund.", english: "I visit my friend. (Not: 'Ich suche meinen Freund be.')" }
      ]
    },
    {
      num: 31,
      category: "Imperatives & Sentence Structure",
      title: "Present tense word order",
      desc: "Golden Rule: The conjugated verb ALWAYS stays in Position 2 in normal statements.",
      sentences: [
        { german: "Ich lerne Deutsch.", english: "Subject (Position 1) + Verb (Position 2)" },
        { german: "Heute lerne ich Deutsch.", english: "Time (Position 1) + Verb (Position 2) + Subject (Position 3)" }
      ],
      note: "Never put subject between time and verb: 'Heute ich lerne' is INCORRECT!"
    },
    {
      num: 32,
      category: "Imperatives & Sentence Structure",
      title: "Questions: Yes / No questions",
      desc: "In Yes/No questions, the verb comes first in Position 1.",
      formula: "Verb + Subject + Rest of Sentence?",
      sentences: [
        { german: "Kommst du heute?", english: "Are you coming today?" },
        { german: "Hast du Zeit?", english: "Do you have time?" },
        { german: "Arbeiten Sie hier?", english: "Do you work here?" }
      ]
    },
    {
      num: 33,
      category: "Imperatives & Sentence Structure",
      title: "Questions: W-questions",
      desc: "In W-questions, the question word comes first, followed immediately by the verb.",
      formula: "Question Word + Verb + Subject + Rest?",
      sentences: [
        { german: "Wo wohnst du?", english: "Where do you live?" },
        { german: "Wann kommst du?", english: "When are you coming?" },
        { german: "Warum lernst du Deutsch?", english: "Why are you learning German?" }
      ]
    },
    {
      num: 34,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Perfekt past tense overview",
      desc: "At A1–A2, the most useful conversational past tense is Perfekt.",
      formula: "haben / sein (conjugated in Position 2) + Past Participle (at end)",
      sentences: [
        { german: "Ich habe gearbeitet.", english: "I worked / I have worked." }
      ]
    },
    {
      num: 35,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Regular verbs in Perfekt",
      desc: "Most regular verbs build participle with: ge- + stem + -t.",
      examples: [
        { german: "machen -> gemacht", english: "done / made" },
        { german: "lernen -> gelernt", english: "learned" },
        { german: "kaufen -> gekauft", english: "bought" },
        { german: "spielen -> gespielt", english: "played" },
        { german: "fragen -> gefragt", english: "asked" },
        { german: "wohnen -> gewohnt", english: "lived" }
      ]
    },
    {
      num: 36,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Regular Perfekt examples",
      sentences: [
        { german: "Ich habe Deutsch gelernt.", english: "I learned German." },
        { german: "Wir haben Fußball gespielt.", english: "We played football." },
        { german: "Sie hat Brot gekauft.", english: "She bought bread." },
        { german: "Er hat in Berlin gewohnt.", english: "He lived in Berlin." }
      ]
    },
    {
      num: 37,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Irregular verbs in Perfekt",
      desc: "Irregular verbs often have ge- + changed stem + -en. These forms should be memorized.",
      examples: [
        { german: "gehen -> gegangen", english: "gone" },
        { german: "sehen -> gesehen", english: "seen" },
        { german: "essen -> gegessen", english: "eaten" },
        { german: "trinken -> getrunken", english: "drunk" },
        { german: "schreiben -> geschrieben", english: "written" },
        { german: "sprechen -> gesprochen", english: "spoken" },
        { german: "nehmen -> genommen", english: "taken" },
        { german: "finden -> gefunden", english: "found" },
        { german: "fahren -> gefahren", english: "driven / traveled" }
      ]
    },
    {
      num: 38,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Examples of irregular Perfekt",
      sentences: [
        { german: "Ich habe Pizza gegessen.", english: "I ate pizza." },
        { german: "Wir haben einen Film gesehen.", english: "We watched a movie." },
        { german: "Sie hat ein Buch gelesen.", english: "She read a book." },
        { german: "Er hat Kaffee getrunken.", english: "He drank coffee." }
      ]
    },
    {
      num: 39,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Haben or sein in Perfekt?",
      desc: "Most verbs use 'haben'. Verbs indicating movement or change of state use 'sein'.",
      examples: [
        { german: "Ich habe gearbeitet / gegessen.", english: "Uses haben (standard action)" },
        { german: "Ich bin gegangen / gefahren / gekommen / aufgestanden.", english: "Uses sein (movement/state change)" }
      ]
    },
    {
      num: 40,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Common verbs using sein in Perfekt",
      examples: [
        { german: "gehen -> ist gegangen", english: "has gone" },
        { german: "kommen -> ist gekommen", english: "has come" },
        { german: "fahren -> ist gefahren", english: "has driven" },
        { german: "fliegen -> ist geflogen", english: "has flown" },
        { german: "laufen -> ist gelaufen", english: "has run" },
        { german: "aufstehen -> ist aufgestanden", english: "has gotten up" },
        { german: "bleiben -> ist geblieben", english: "has stayed (Important exception: no movement, but uses sein!)" },
        { german: "werden -> ist geworden", english: "has become" }
      ]
    },
    {
      num: 41,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Separable verbs in Perfekt",
      desc: "For many separable verbs, 'ge-' goes between prefix and stem: prefix + ge + verb stem + ending.",
      examples: [
        { german: "aufmachen -> aufgemacht", english: "opened" },
        { german: "anrufen -> angerufen", english: "called" },
        { german: "einkaufen -> eingekauft", english: "shopped" },
        { german: "aufstehen -> aufgestanden", english: "gotten up" }
      ],
      sentences: [
        { german: "Ich habe dich angerufen.", english: "I called you." },
        { german: "Wir haben eingekauft.", english: "We went shopping." },
        { german: "Ich bin früh aufgestanden.", english: "I got up early." }
      ]
    },
    {
      num: 42,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Inseparable verbs in Perfekt",
      desc: "Inseparable verbs normally DO NOT use 'ge-'. Just prefix + stem + -t / -en.",
      examples: [
        { german: "besuchen -> besucht", english: "visited (Not: gebesucht)" },
        { german: "verstehen -> verstanden", english: "understood" },
        { german: "bezahlen -> bezahlt", english: "paid" },
        { german: "erklären -> erklärt", english: "explained" }
      ],
      sentences: [
        { german: "Ich habe meinen Freund besucht.", english: "I visited my friend." }
      ]
    },
    {
      num: 43,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Verbs ending in -ieren in Perfekt",
      desc: "Verbs ending in -ieren also DO NOT take 'ge-'. Participle ending is -t.",
      examples: [
        { german: "studieren -> studiert", english: "studied (Not: gestudiert)" },
        { german: "telefonieren -> telefoniert", english: "phoned" },
        { german: "reparieren -> repariert", english: "repaired" },
        { german: "fotografieren -> fotografiert", english: "photographed" }
      ],
      sentences: [
        { german: "Ich habe in Berlin studiert.", english: "I studied in Berlin." }
      ]
    },
    {
      num: 44,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Präteritum (Simple Written Past)",
      desc: "Präteritum is common in writing/books. At A1-A2, it is essential for 'sein', 'haben', and modal verbs.",
      examples: [
        { german: "sein -> war", english: "was" },
        { german: "haben -> hatte", english: "had" },
        { german: "können -> konnte", english: "could" }
      ]
    },
    {
      num: 45,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "sein in Präteritum",
      table: [
        { pronoun: "ich", form: "war" },
        { pronoun: "du", form: "warst" },
        { pronoun: "er / sie / es", form: "war" },
        { pronoun: "wir", form: "waren" },
        { pronoun: "ihr", form: "wart" },
        { pronoun: "sie / Sie", form: "waren" }
      ],
      sentences: [
        { german: "Ich war müde.", english: "I was tired." },
        { german: "Wir waren in Berlin.", english: "We were in Berlin." }
      ]
    },
    {
      num: 46,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "haben in Präteritum",
      table: [
        { pronoun: "ich", form: "hatte" },
        { pronoun: "du", form: "hattest" },
        { pronoun: "er", form: "hatte" },
        { pronoun: "wir", form: "hatten" },
        { pronoun: "ihr", form: "hattet" },
        { pronoun: "sie", form: "hatten" }
      ],
      sentences: [
        { german: "Ich hatte keine Zeit.", english: "I had no time." }
      ]
    },
    {
      num: 47,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Modal verbs in past (Präteritum)",
      desc: "Modals drop umlauts and add -te endings.",
      tableHeader: ["Present Form", "Past (Präteritum) Form"],
      table: [
        { pronoun: "kann", form: "konnte", meaning: "could" },
        { pronoun: "muss", form: "musste", meaning: "had to" },
        { pronoun: "darf", form: "durfte", meaning: "was allowed to" },
        { pronoun: "will", form: "wollte", meaning: "wanted" },
        { pronoun: "soll", form: "sollte", meaning: "was supposed to" },
        { pronoun: "mag", form: "mochte", meaning: "liked" }
      ],
      sentences: [
        { german: "Ich konnte nicht kommen.", english: "I could not come." },
        { german: "Ich musste arbeiten.", english: "I had to work." },
        { german: "Wir wollten essen gehen.", english: "We wanted to go out to eat." }
      ]
    },
    {
      num: 48,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Regular Präteritum",
      desc: "Regular verbs form Präteritum with stem + -te.",
      examples: [
        { german: "machen -> machte", english: "made / did" },
        { german: "lernen -> lernte", english: "learned" },
        { german: "arbeiten -> arbeitete", english: "worked" }
      ],
      note: "In everyday spoken German, Perfekt is much more natural for action verbs."
    },
    {
      num: 49,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Strong verbs (Strong vs Weak)",
      desc: "Irregular verbs are called strong verbs because they change their stem vowel across tenses.",
      examples: [
        { german: "fahren", english: "Present: fährt | Past: fuhr | Participle: gefahren" },
        { german: "finden", english: "Present: findet | Past: fand | Participle: gefunden" }
      ]
    },
    {
      num: 50,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Weak verbs",
      desc: "Regular verbs are called weak verbs because they keep their stem fixed.",
      examples: [
        { german: "machen", english: "Present: macht | Past: machte | Participle: gemacht" }
      ]
    },
    {
      num: 51,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Mixed verbs",
      desc: "Mixed verbs combine regular endings (-te, -t) with an irregular vowel change.",
      examples: [
        { german: "bringen", english: "to bring" },
        { german: "denken", english: "to think" },
        { german: "kennen", english: "to know" },
        { german: "nennen", english: "to name" },
        { german: "wissen", english: "to know fact" }
      ]
    },
    {
      num: 52,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Mixed verb: bringen",
      desc: "Present: ich bringe | Past: ich brachte | Participle: gebracht",
      sentences: [
        { german: "Ich habe das Buch gebracht.", english: "I brought the book." }
      ]
    },
    {
      num: 53,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Mixed verb: denken",
      desc: "Present: ich denke | Past: ich dachte | Participle: gedacht",
      sentences: [
        { german: "Ich habe daran gedacht.", english: "I thought of that." }
      ]
    },
    {
      num: 54,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Mixed verb: kennen",
      desc: "Present: ich kenne | Past: ich kannte | Participle: gekannt"
    },
    {
      num: 55,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Mixed verb: nennen",
      desc: "Present: ich nenne | Past: ich nannte | Participle: genannt"
    },
    {
      num: 56,
      category: "Past Tenses (Perfekt & Präteritum)",
      title: "Mixed verb: wissen",
      desc: "Present: ich weiß | Past: ich wusste | Participle: gewusst"
    },
    {
      num: 57,
      category: "Basics & Present Tense",
      title: "Infinitive basic verb form",
      desc: "The infinitive is the base form found in dictionaries.",
      examples: [
        { german: "machen", english: "to do / make" },
        { german: "gehen", english: "to go" },
        { german: "schlafen", english: "to sleep" },
        { german: "arbeiten", english: "to work" }
      ]
    },
    {
      num: 58,
      category: "Basics & Present Tense",
      title: "Verb after modal",
      desc: "After modal verbs, the action verb goes to the end in the infinitive.",
      sentences: [
        { german: "Ich kann schwimmen.", english: "I can swim." },
        { german: "Ich muss arbeiten.", english: "I have to work." },
        { german: "Ich will schlafen.", english: "I want to sleep." }
      ]
    },
    {
      num: 59,
      category: "Basics & Present Tense",
      title: "Verb after zu (Infinitive with zu)",
      desc: "At A2, German uses zu + infinitive for connected actions.",
      sentences: [
        { german: "Ich versuche, Deutsch zu lernen.", english: "I am trying to learn German." },
        { german: "Es ist wichtig, genug zu schlafen.", english: "It is important to sleep enough." }
      ]
    },
    {
      num: 60,
      category: "Basics & Present Tense",
      title: "zu with separable verbs",
      desc: "With separable verbs, 'zu' goes right between prefix and stem.",
      examples: [
        { german: "aufstehen -> aufzustehen", english: "Ich versuche, früh aufzustehen." },
        { german: "einkaufen -> einzukaufen", english: "Es ist Zeit, einzukaufen." }
      ]
    },
    {
      num: 61,
      category: "Reflexive, Prepositions & Cases",
      title: "Reflexive verbs overview",
      desc: "Reflexive verbs express actions done to oneself. They require reflexive pronouns.",
      examples: [
        { german: "sich freuen", english: "to be happy" },
        { german: "sich waschen", english: "to wash oneself" },
        { german: "sich treffen", english: "to meet up" },
        { german: "sich erinnern", english: "to remember" },
        { german: "sich interessieren", english: "to be interested" }
      ],
      sentences: [
        { german: "Ich wasche mich.", english: "I wash myself." }
      ]
    },
    {
      num: 62,
      category: "Reflexive, Prepositions & Cases",
      title: "Reflexive pronouns (Accusative)",
      table: [
        { pronoun: "ich", form: "mich" },
        { pronoun: "du", form: "dich" },
        { pronoun: "er / sie / es", form: "sich" },
        { pronoun: "wir", form: "uns" },
        { pronoun: "ihr", form: "euch" },
        { pronoun: "sie / Sie", form: "sich" }
      ],
      sentences: [
        { german: "Ich freue mich.", english: "I am happy / excited." },
        { german: "Du erinnerst dich.", english: "You remember." },
        { german: "Wir treffen uns.", english: "We meet up." }
      ]
    },
    {
      num: 63,
      category: "Reflexive, Prepositions & Cases",
      title: "Verb + preposition combinations",
      desc: "Certain verbs naturally take specific prepositions. Learn them as paired chunks!",
      examples: [
        { german: "warten auf (+ Akk)", english: "to wait for -> Ich warte auf den Bus." },
        { german: "sprechen mit (+ Dat)", english: "to speak with -> Ich spreche mit meiner Lehrerin." },
        { german: "denken an (+ Akk)", english: "to think about -> Ich denke an meine Familie." }
      ]
    },
    {
      num: 64,
      category: "Reflexive, Prepositions & Cases",
      title: "Dative verbs",
      desc: "Some German verbs take a direct object in the DATIVE case instead of Accusative.",
      examples: [
        { german: "helfen", english: "to help" },
        { german: "danken", english: "to thank" },
        { german: "gefallen", english: "to please / like" },
        { german: "gehören", english: "to belong to" },
        { german: "antworten", english: "to answer" }
      ],
      sentences: [
        { german: "Ich helfe dir.", english: "I help you. (Not: 'Ich helfe dich.')" }
      ]
    },
    {
      num: 65,
      category: "Reflexive, Prepositions & Cases",
      title: "Example: helfen (to help)",
      desc: "helfen is irregular (e -> i) and takes dative object.",
      table: [
        { pronoun: "ich", form: "helfe" },
        { pronoun: "du", form: "hilfst" },
        { pronoun: "er / sie / es", form: "hilft" },
        { pronoun: "wir", form: "helfen" },
        { pronoun: "ihr", form: "helft" },
        { pronoun: "sie / Sie", form: "helfen" }
      ],
      sentences: [
        { german: "Kannst du mir helfen?", english: "Can you help me?" }
      ]
    },
    {
      num: 66,
      category: "Reflexive, Prepositions & Cases",
      title: "Example: gefallen (to please / like)",
      desc: "gefallen = to please. The subject is the thing, and the person is in the dative case.",
      sentences: [
        { german: "Das gefällt mir.", english: "Literally: That pleases me. (Natural: I like that.)" }
      ]
    },
    {
      num: 67,
      category: "Reflexive, Prepositions & Cases",
      title: "Accusative verbs",
      desc: "Many common verbs take a direct object in the accusative case.",
      examples: [
        { german: "haben", english: "to have" },
        { german: "kaufen", english: "to buy" },
        { german: "sehen", english: "to see" },
        { german: "brauchen", english: "to need" },
        { german: "nehmen", english: "to take" },
        { german: "essen", english: "to eat" }
      ],
      sentences: [
        { german: "Ich kaufe einen Kaffee.", english: "I buy a coffee." },
        { german: "Ich sehe den Mann.", english: "I see the man." }
      ]
    },
    {
      num: 68,
      category: "Imperatives & Sentence Structure",
      title: "Imperative commands: du (informal singular)",
      desc: "To give a command to 'du': remove 'du' and drop the '-st' ending.",
      examples: [
        { german: "Komm!", english: "Come!" },
        { german: "Mach das!", english: "Do that!" },
        { german: "Lies das!", english: "Read that!" }
      ]
    },
    {
      num: 69,
      category: "Imperatives & Sentence Structure",
      title: "Imperative commands: ihr (informal plural)",
      desc: "To give a command to 'ihr': use the normal 'ihr' verb form without the word 'ihr'.",
      examples: [
        { german: "Kommt!", english: "Come! (to a group)" },
        { german: "Macht das!", english: "Do that! (to a group)" },
        { german: "Lest das!", english: "Read that! (to a group)" }
      ]
    },
    {
      num: 70,
      category: "Imperatives & Sentence Structure",
      title: "Imperative commands: formal Sie",
      desc: "To give a formal command: verb + Sie + bitte.",
      examples: [
        { german: "Kommen Sie bitte!", english: "Please come!" },
        { german: "Warten Sie bitte!", english: "Please wait!" },
        { german: "Sprechen Sie langsam!", english: "Please speak slowly!" }
      ]
    },
    {
      num: 71,
      category: "Imperatives & Sentence Structure",
      title: "Negative verbs with nicht",
      desc: "Use 'nicht' to negate actions, verbs, adjectives, or entire clauses.",
      sentences: [
        { german: "Ich arbeite heute nicht.", english: "I am not working today." },
        { german: "Ich verstehe das nicht.", english: "I do not understand that." },
        { german: "Er kommt nicht.", english: "He is not coming." }
      ]
    },
    {
      num: 72,
      category: "Imperatives & Sentence Structure",
      title: "kein vs. nicht",
      contrast: [
        { word: "kein", rule: "Use to negate nouns with indefinite article ('ein') or no article.", example: "Ich habe kein Auto." },
        { word: "nicht", rule: "Use for verbs, adjectives, proper nouns, or whole sentences.", example: "Ich fahre heute nicht." }
      ]
    },
    {
      num: 73,
      category: "Mastery & Practice Strategies",
      title: "15 Common regular verbs list",
      type: "verb_list_table",
      verbs: [
        { german: "machen", english: "do / make" },
        { german: "lernen", english: "learn" },
        { german: "spielen", english: "play" },
        { german: "wohnen", english: "live / reside" },
        { german: "kaufen", english: "buy" },
        { german: "fragen", english: "ask" },
        { german: "sagen", english: "say" },
        { german: "hören", english: "hear / listen" },
        { german: "kochen", english: "cook" },
        { german: "arbeiten", english: "work" },
        { german: "brauchen", english: "need" },
        { german: "suchen", english: "search / look for" },
        { german: "bezahlen", english: "pay" },
        { german: "zeigen", english: "show" },
        { german: "reisen", english: "travel" }
      ]
    },
    {
      num: 74,
      category: "Mastery & Practice Strategies",
      title: "22 Common irregular verbs list",
      type: "verb_list_table",
      verbs: [
        { german: "sein", english: "be" },
        { german: "haben", english: "have" },
        { german: "werden", english: "become" },
        { german: "gehen", english: "go" },
        { german: "kommen", english: "come" },
        { german: "fahren", english: "drive / travel" },
        { german: "sehen", english: "see" },
        { german: "lesen", english: "read" },
        { german: "essen", english: "eat" },
        { german: "trinken", english: "drink" },
        { german: "sprechen", english: "speak" },
        { german: "nehmen", english: "take" },
        { german: "geben", english: "give" },
        { german: "helfen", english: "help" },
        { german: "schlafen", english: "sleep" },
        { german: "laufen", english: "run / walk" },
        { german: "tragen", english: "carry / wear" },
        { german: "treffen", english: "meet" },
        { german: "finden", english: "find" },
        { german: "wissen", english: "know (fact)" },
        { german: "denken", english: "think" },
        { german: "bringen", english: "bring" }
      ]
    },
    {
      num: 75,
      category: "Mastery & Practice Strategies",
      title: "High-priority verb forms formula",
      desc: "For every irregular verb, memorize these 4 principal parts together:",
      formula: "Infinitive – 3rd Present – Präteritum – Perfekt",
      examples: [
        { german: "fahren – fährt – fuhr – ist gefahren", english: "to drive" },
        { german: "sehen – sieht – sah – hat gesehen", english: "to see" },
        { german: "essen – isst – aß – hat gegessen", english: "to eat" },
        { german: "nehmen – nimmt – nahm – hat genommen", english: "to take" },
        { german: "geben – gibt – gab – hat gegeben", english: "to give" }
      ]
    },
    {
      num: 76,
      category: "Mastery & Practice Strategies",
      title: "Important irregular verb principal parts table",
      type: "principal_parts_table",
      rows: [
        { inf: "gehen", present: "geht", past: "ging", perfekt: "ist gegangen" },
        { inf: "kommen", present: "kommt", past: "kam", perfekt: "ist gekommen" },
        { inf: "fahren", present: "fährt", past: "fuhr", perfekt: "ist gefahren" },
        { inf: "sehen", present: "sieht", past: "sah", perfekt: "hat gesehen" },
        { inf: "lesen", present: "liest", past: "las", perfekt: "hat gelesen" },
        { inf: "essen", present: "isst", past: "aß", perfekt: "hat gegessen" },
        { inf: "trinken", present: "trinkt", past: "trank", perfekt: "hat getrunken" },
        { inf: "sprechen", present: "spricht", past: "sprach", perfekt: "hat gesprochen" },
        { inf: "nehmen", present: "nimmt", past: "nahm", perfekt: "hat genommen" },
        { inf: "geben", present: "gibt", past: "gab", perfekt: "hat gegeben" },
        { inf: "helfen", present: "hilft", past: "half", perfekt: "hat geholfen" },
        { inf: "schlafen", present: "schläft", past: "schlief", perfekt: "hat geschlafen" },
        { inf: "laufen", present: "läuft", past: "lief", perfekt: "ist gelaufen" },
        { inf: "finden", present: "findet", past: "fand", perfekt: "hat gefunden" },
        { inf: "schreiben", present: "schreibt", past: "schrieb", perfekt: "hat geschrieben" },
        { inf: "bleiben", present: "bleibt", past: "blieb", perfekt: "ist geblieben" }
      ]
    },
    {
      num: 77,
      category: "Mastery & Practice Strategies",
      title: "Regular verb learning formula",
      desc: "Step-by-step formula for regular verbs:",
      steps: [
        "1. Find infinitive: lernen",
        "2. Remove -en. Stem: lern-",
        "3. Add endings: e, st, t, en, t, en",
        "Result: lerne, lernst, lernt, lernen, lernt, lernen"
      ]
    },
    {
      num: 78,
      category: "Mastery & Practice Strategies",
      title: "Irregular verb learning formula",
      desc: "Do not memorize only the infinitive. Learn fahren as a 4-part package:",
      examples: [
        { german: "fahren, fährt, fuhr, gefahren", english: "Infinitive, 3rd present, past, Perfekt" }
      ],
      sentences: [
        { german: "Ich fahre nach Berlin.", english: "Present ich" },
        { german: "Er fährt nach Berlin.", english: "Present er" },
        { german: "Gestern fuhr er nach Berlin.", english: "Präteritum" },
        { german: "Er ist nach Berlin gefahren.", english: "Perfekt" }
      ]
    },
    {
      num: 79,
      category: "Mastery & Practice Strategies",
      title: "Best way to learn verbs",
      desc: "Do not learn 'gehen = to go' alone. Learn it as a package with forms & 1 sentence!",
      package: ["gehen", "ich gehe", "du gehst", "er geht", "ist gegangen"],
      sentences: [
        { german: "Ich gehe jeden Tag zur Arbeit.", english: "I go to work every day." }
      ]
    },
    {
      num: 80,
      category: "Mastery & Practice Strategies",
      title: "Learn verbs with objects (Chunk learning)",
      desc: "Instead of single words like 'kaufen = buy', learn useful chunks!",
      examples: [
        { german: "Brot kaufen", english: "buy bread" },
        { german: "ein Ticket kaufen", english: "buy a ticket" },
        { german: "Kleidung kaufen", english: "buy clothes" }
      ],
      sentences: [
        { german: "Ich kaufe ein Ticket.", english: "I am buying a ticket." }
      ]
    },
    {
      num: 81,
      category: "Mastery & Practice Strategies",
      title: "Learn verbs with prepositions",
      desc: "Instead of only 'warten', learn 'warten auf + Akkusativ'.",
      sentences: [
        { german: "Ich warte auf den Bus.", english: "I am waiting for the bus." },
        { german: "Ich spreche mit meinem Chef.", english: "I am speaking with my boss." }
      ]
    },
    {
      num: 82,
      category: "Mastery & Practice Strategies",
      title: "Learn verbs in opposites",
      desc: "Pairing verbs with their opposites doubles memory retention!",
      pairs: [
        { g1: "kommen", g2: "gehen", e1: "come", e2: "go" },
        { g1: "geben", g2: "nehmen", e1: "give", e2: "take" },
        { g1: "kaufen", g2: "verkaufen", e1: "buy", e2: "sell" },
        { g1: "anfangen", g2: "aufhören", e1: "begin", e2: "stop" },
        { g1: "öffnen", g2: "schließen", e1: "open", e2: "close" },
        { g1: "fragen", g2: "antworten", e1: "ask", e2: "answer" },
        { g1: "bringen", g2: "holen", e1: "bring", e2: "fetch" }
      ]
    },
    {
      num: 83,
      category: "Mastery & Practice Strategies",
      title: "Common beginner mistakes comparison",
      type: "mistakes_table",
      rows: [
        { wrong: "Ich gehen nach Hause.", correct: "Ich gehe nach Hause.", note: "Use conjugated form for ich (-e)" },
        { wrong: "Du geht nach Hause.", correct: "Du gehst nach Hause.", note: "Du takes -st ending" },
        { wrong: "Ich kann gehe.", correct: "Ich kann gehen.", note: "After modal, second verb must be infinitive" },
        { wrong: "Ich habe gegangen.", correct: "Ich bin gegangen.", note: "Movement verbs use sein in Perfekt" },
        { wrong: "Ich habe gestudiert.", correct: "Ich habe studiert.", note: "Verbs ending in -ieren do not take ge-" },
        { wrong: "Ich anrufe dich.", correct: "Ich rufe dich an.", note: "Prefix separates to the end in present tense" }
      ]
    },
    {
      num: 84,
      category: "Mastery & Practice Strategies",
      title: "Main rule summary",
      desc: "For regular verbs: stem + normal ending (mache, machst, macht). For irregular verbs: watch for stem-vowel changes, special past forms, and unusual participles (nehmen -> nimmt -> nahm -> genommen)."
    },
    {
      num: 85,
      category: "Mastery & Practice Strategies",
      title: "Beginner memory chart",
      type: "memory_chart_table",
      rows: [
        { cat: "Regular", example: "machen – machte – gemacht" },
        { cat: "Irregular / Strong", example: "gehen – ging – gegangen" },
        { cat: "Mixed", example: "bringen – brachte – gebracht" },
        { cat: "Modal", example: "können – kann – konnte" },
        { cat: "Separable", example: "anrufen – ruft an – angerufen" },
        { cat: "Inseparable", example: "besuchen – besucht – besucht" },
        { cat: "-ieren", example: "studieren – studierte – studiert" }
      ]
    },
    {
      num: 86,
      category: "Mastery & Practice Strategies",
      title: "What to master at A1",
      checklist: [
        "1. Regular present tense conjugation",
        "2. Essential verb: sein",
        "3. Essential verb: haben",
        "4. Common vowel-changing verbs (fahren, geben, sehen)",
        "5. Modal verbs in present tense",
        "6. Separable verbs in present tense",
        "7. Basic imperative commands (du, ihr, Sie)",
        "8. Simple Perfekt conversational past tense",
        "9. Knowing when to use haben vs. sein",
        "10. Common past participles (gemacht, gegangen, gekauft)"
      ]
    },
    {
      num: 87,
      category: "Mastery & Practice Strategies",
      title: "What to master at A2",
      checklist: [
        "1. Expanded list of irregular verbs",
        "2. Präteritum past tense of sein / haben / modals",
        "3. Reflexive verbs (sich freuen, sich waschen)",
        "4. Verbs with prepositions (warten auf, sprechen mit)",
        "5. Dative verbs (helfen, danken, gefallen)",
        "6. zu + infinitive construction",
        "7. Separable verbs in subordinate clauses",
        "8. Perfekt with complex sentence structures",
        "9. Past modal constructions (konnte, musste)",
        "10. Word order with conjunctions (weil, dass, wenn, obwohl)"
      ]
    },
    {
      num: 88,
      category: "Mastery & Practice Strategies",
      title: "Best 10-minute daily verb practice routine",
      routine: [
        "Minutes 1–2: Conjugate one regular verb (e.g. machen)",
        "Minutes 3–4: Conjugate one irregular verb (e.g. fahren)",
        "Minutes 5–6: Practice one modal verb (e.g. können)",
        "Minutes 7–8: Practice Perfekt (Ich habe gearbeitet / Ich bin gegangen)",
        "Minutes 9–10: Create 5 real life sentences (e.g. Ich arbeite heute. / Ich lerne Deutsch. / Ich muss einkaufen. / Ich bin früh aufgestanden. / Ich habe Kaffee getrunken.)"
      ],
      goldenRule: "Golden Rule: Never learn German verbs as isolated English words! Learn each verb with its present form, irregular stem change, past participle, helper verb (haben/sein), preposition, and at least 1 real sentence."
    }
  ]
};
