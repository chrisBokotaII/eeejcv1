import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        about: 'À Propos',
        pastors: 'Pasteurs',
        gallery: 'Galerie',
        contact: 'Contact',
        planVisit: 'Planifier une Visite'
      },
      common: {
        churchName: 'ÉGLISE ÉVANGILE ÉTERNEL DE JESUS CHRIST',
        churchNameAbbr: 'EEEJC'
      },
      home: {
        welcome: 'Bienvenue à l\'EEEJC',
        heroTitle: 'Un lieu pour <1>Appartenir</1>, Grandir et Servir.',
        heroDesc: 'Rejoignez-nous ce dimanche alors que nous nous réunissons pour adorer, apprendre de la Parole de Dieu et construire une communauté significative ensemble.',
        ctaSunday: 'Rejoignez-nous ce dimanche',
        serviceTimes: 'Heures de Service',
        serviceTimesDesc: 'Mardi 08:30, Jeudi 14:45, Dimanche 08:30',
        location: 'Notre Emplacement',
        locationDesc: 'Avenue de la Conference n 217, Quartier Kyeshero, Goma',
        getInvolved: 'S\'impliquer',
        getInvolvedDesc: 'Trouvez votre place dans notre communauté',
        pastorWelcome: 'Un message de notre pasteur',
        pastorQuote: '"Nous sommes plus qu\'une église ; nous sommes une <1>famille</1>."',
        pastorDesc1: 'Bienvenue à l\'ÉGLISE ÉVANGILE ÉTERNEL DE JESUS CHRIST (EEEJC) ! Que vous suiviez Jésus depuis des années ou que vous commenciez tout juste à explorer la foi, il y a une place pour vous ici. Notre cœur est de voir les gens transformés par l\'amour de Dieu et habilités à vivre leur but dans le monde.',
        pastorDesc2: 'Nous vous invitons à nous rejoindre pour un service, à vous connecter avec un petit groupe et à découvrir la joie de faire partie de cette communauté. Nous avons hâte de vous rencontrer !',
        pastorName: 'Dr Benjamin Wem’s',
        pastorRole: 'ministre de Dieu chargé de la vie de l’Eglise',
        learnMore: 'En savoir plus sur notre histoire'
      },
      about: {
        title: 'Notre Histoire et Mission',
        desc: 'L\'ÉGLISE ÉVANGILE ÉTERNEL DE JESUS CHRIST (EEEJC) a été fondée en 1995 avec une vision simple : aimer Dieu et aimer les gens.',
        mission: 'Notre Mission',
        missionDesc: 'D’annoncer aux habitants de la terre, à toute nation, à toute tribu, à toute langue, et à tout peuple la bonne Évangile qui est l’Evangile éternel.',
        vision: 'Notre Vision',
        visionDesc: 'Transformation sociale : Voir des vies transformées, des familles restaurées et un impact positif dans la société. Expansion : Implanter de nouvelles églises et développer des groupes pour atteindre plus de gens et plus d’âmes pour le Seigneur Jésus-Christ.',
        teamTitle: 'Rencontrez notre équipe',
        teamSubtitle: 'Direction de l\'Église'
      },
      gallery: {
        title: 'Galerie de l\'Église',
        desc: 'Découvrez les moments forts de notre communauté, nos services et nos événements à travers ces images.'
      },
      pastors: {
        title: 'Notre Direction',
        desc: 'Rencontrez l\'équipe dédiée à servir Dieu et notre communauté à l\'EEEJC.',
        quote: '"Notre plus grande joie est de voir les gens découvrir leur <1>but donné par Dieu</1>."',
        quoteDesc: 'Nous croyons que chaque personne a un appel unique et un rôle à jouer dans l\'histoire de Dieu. Notre mission en tant que leaders est de vous équiper, de vous encourager et de vous donner les moyens de vivre cet appel dans votre vie quotidienne.',
        staff: {
          benjamin: {
            name: 'Dr Benjamin Wem’s',
            focus: 'Se concentre sur la vision, l\'enseignement biblique et la direction spirituelle pour toute la congrégation.',
            bio: 'Le Dr Benjamin Wem’s dirige l\'EEEJC avec un cœur pour la ville et une passion pour l\'enseignement de la Parole, guidant la communauté vers une vie spirituelle épanouie.'
          },
          nadege: {
            name: 'Nadège Assambwa Wem’s',
            focus: 'Membre de soutien',
            bio: 'Nadège apporte un soutien précieux à la communauté de l\'EEEJC, veillant au bien-être des membres et à l\'harmonie de la famille de l\'église.'
          },
          elie: {
            name: 'Évangéliste Elie',
            focus: 'Ministre et prédicateur de l’Evangile de Jesus Christ',
            bio: 'L\'Évangéliste Elie se consacre à la proclamation de la Parole de Dieu avec ferveur, touchant les cœurs par ses messages inspirés.'
          },
          heritier: {
            name: 'Évangéliste MUKUMBWA Héritier',
            focus: 'Ministre et prédicateur de l’Evangile, interprète, chargée de l’évangélisation',
            bio: 'Héritier joue un rôle clé dans l\'expansion de l\'évangile, utilisant ses talents d\'interprète et son zèle pour l\'évangélisation.'
          },
          dorcas: {
            name: 'MWALI KAPARALI Dorcas',
            focus: 'Caissière département de soutiens',
            bio: 'Dorcas gère avec intégrité les ressources du département de soutien, assurant la transparence et le bon fonctionnement des finances.'
          },
          lyza: {
            name: 'Lyza AKILIMALI',
            focus: 'Caissière',
            bio: 'Lyza veille à la gestion rigoureuse des finances de l\'église, mettant ses compétences au service de l\'œuvre de Dieu.'
          },
          anicet: {
            name: 'Anicet BUSHISHI',
            focus: 'Intercesseur et secrétaire de l’Eglise et disciple',
            bio: 'Anicet sert l\'église par la prière et l\'administration, tout en étant un disciple dévoué engagé dans la croissance spirituelle.'
          },
          joseph: {
            name: 'BASEME Joseph',
            focus: 'Secrétaire adjoint',
            bio: 'Joseph assiste le secrétariat de l\'église avec dévouement, assurant une communication fluide et une organisation efficace.'
          },
          harrisy: {
            name: 'Harrisy RAHA',
            focus: 'Président de protocole et chargé de l’infrastructure de l’Eglise',
            bio: 'Harrisy supervise le protocole et l\'entretien des infrastructures, veillant à ce que chaque service se déroule dans l\'ordre et l\'excellence.'
          }
        }
      },
      contact: {
        title: 'Entrer en contact',
        desc: 'Vous avez une question ? Vous voulez en savoir plus ? Nous aimerions avoir de vos nouvelles.',
        infoTitle: 'Informations de contact',
        location: 'Notre Emplacement',
        phone: 'Numéro de téléphone',
        email: 'Adresse e-mail',
        hours: 'Heures de bureau',
        hoursDesc: 'Lun - Jeu : 9h00 - 16h00',
        followUs: 'Suivez-nous',
        formTitle: 'Envoyer un message',
        firstName: 'Prénom',
        lastName: 'Nom',
        subject: 'Sujet',
        message: 'Message',
        send: 'Envoyer le message',
        subjects: {
          general: 'Demande générale',
          prayer: 'Demande de prière',
          volunteer: 'Intérêt pour le bénévolat',
          other: 'Autre'
        }
      },
      visit: {
        title: 'Planifiez votre visite',
        desc: 'Nous avons hâte de vous accueillir à l\'ÉGLISE ÉVANGILE ÉTERNEL DE JESUS CHRIST (EEEJC). Voici tout ce que vous devez savoir pour votre première visite.',
        expect: {
          times: 'Heures de Service',
          timesDesc: 'Mardi (08:30-10:00), Jeudi (14:45-17:00), Dimanche (08:30-10:30).',
          atmosphere: 'Atmosphère',
          atmosphereDesc: 'Venez comme vous êtes ! Vous trouverez de tout, des jeans aux costumes. Prenez un café dans le hall avant le service.',
        },
        findUs: 'Où nous trouver',
        address: 'Adresse',
        addressFull: 'Province du Nord-Kivu, Ville de Goma, Commune de Goma, Avenue de la Conference n 217, Quartier Kyeshero. (Proche du nouveau palais de justice)',
        schedule: 'Programme des Services',
        scheduleItems: {
          tuesday: 'Mardi : 08h30 - 10h00',
          thursday: 'Jeudi : 14h45 - 17h00',
          sunday: 'Dimanche : 08h30 - 10h30'
        },
        askQuestion: 'Poser une question',
        mapTitle: 'Trouvez-nous ici',
        directions: 'Obtenir des directions',
        letUsKnow: 'Faites-nous savoir que vous venez',
        letUsKnowDesc: 'Si vous prévoyez de nous rendre visite, faites-le nous savoir ! Nous serions ravis que quelqu\'un vous accueille à la porte d\'entrée, vous fasse visiter et vous aide à enregistrer vos enfants.',
        faq: {
          title: 'Questions Fréquentes',
          q1: 'Où dois-je me garer ?',
          a1: 'Nous avons un parking dédié juste devant l\'entrée principale. Notre équipe de parking sera là pour vous guider.',
          q2: 'Comment dois-je m\'habiller ?',
          a2: 'La plupart des gens s\'habillent de manière décontractée, mais vous verrez de tout, du jean au style décontracté chic. Portez ce dans quoi vous vous sentez à l\'aise !',
          q3: 'À quoi ressemble le service ?',
          a3: 'Nos services comprennent de la musique de louange contemporaine, quelques annonces et un message pratique tiré de la Bible.',
        },
        form: {
          name: 'Nom',
          email: 'E-mail',
          when: 'Quand visitez-vous ?',
          options: {
            tuesday: 'Mardi (08h30)',
            thursday: 'Jeudi (14h45)',
            sunday: 'Dimanche (08h30)',
            future: 'Dans le futur'
          },
          submit: 'Planifier ma visite'
        }
      },
      footer: {
        brandDesc: 'Un lieu pour appartenir, un lieu pour grandir et un lieu pour servir. Rejoignez-nous alors que nous suivons Jésus ensemble.',
        quickLinks: 'Liens Rapides',
        ourStory: 'Notre Histoire',
        ourPastors: 'Nos Pasteurs',
        contactUs: 'Contactez-nous',
        planVisit: 'Planifier votre visite',
        serviceTimes: 'Heures de Service',
        address: 'Avenue de la Conference n 217, Quartier Kyeshero, Goma',
        tuesday: 'Chaque Mardi',
        tuesdayTime: '08h30-10h00 (Prière d’intersession et délivrance)',
        thursday: 'Chaque Jeudi',
        thursdayTime: '14h45-17h00 (Culte et Enseignement Biblique)',
        sunday: 'Chaque Dimanche',
        sundayTime: '08h30-10h30 (Culte d’action de grâce)',
        rights: 'Tous droits réservés.',
        privacy: 'Politique de confidentialité',
        terms: 'Conditions d\'utilisation'
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        pastors: 'Pastors',
        gallery: 'Gallery',
        contact: 'Contact',
        planVisit: 'Plan a Visit'
      },
      common: {
        churchName: 'ÉGLISE ÉVANGILE ÉTERNEL DE JESUS CHRIST',
        churchNameAbbr: 'EEEJC'
      },
      home: {
        welcome: 'Welcome to EEEJC',
        heroTitle: 'A Place to <1>Belong</1>, Grow, and Serve.',
        heroDesc: 'Join us this Sunday as we gather to worship, learn from God\'s Word, and build meaningful community together.',
        ctaSunday: 'Join Us This Sunday',
        serviceTimes: 'Service Times',
        serviceTimesDesc: 'Tuesday 8:30 AM, Thursday 2:45 PM, Sunday 8:30 AM',
        location: 'Our Location',
        locationDesc: 'Avenue de la Conference n 217, Kyeshero District, Goma',
        getInvolved: 'Get Involved',
        getInvolvedDesc: 'Find your place in our community',
        pastorWelcome: 'A Message from our Pastor',
        pastorQuote: '"We are more than a church; we are a <1>family</1>."',
        pastorDesc1: 'Welcome to ÉGLISE ÉVANGILE ÉTERNEL DE JESUS CHRIST (EEEJC)! Whether you\'ve been following Jesus for years or you\'re just starting to explore faith, there\'s a place for you here. Our heart is to see people transformed by the love of God and empowered to live out their purpose in the world.',
        pastorDesc2: 'We invite you to join us for a service, connect with a small group, and discover the joy of being part of this community. We can\'t wait to meet you!',
        pastorName: 'Dr Benjamin Wem’s',
        pastorRole: 'Minister of God in charge of Church Life',
        learnMore: 'Learn More About Our Story'
      },
      about: {
        title: 'Our Story & Mission',
        desc: 'ÉGLISE ÉVANGILE ÉTERNEL DE JESUS CHRIST (EEEJC) was founded in 1995 with a simple vision: to love God and love people.',
        mission: 'Our Mission',
        missionDesc: 'To announce to the inhabitants of the earth, to every nation, tribe, language, and people the good Gospel which is the eternal Gospel.',
        vision: 'Our Vision',
        visionDesc: 'Social Transformation: To see lives transformed, families restored, and a positive impact in society. Expansion: To plant new churches and develop groups to reach more people and more souls for the Lord Jesus Christ.',
        teamTitle: 'Meet Our Team',
        teamSubtitle: 'Church Leadership'
      },
      gallery: {
        title: 'Church Gallery',
        desc: 'Discover the highlights of our community, our services, and our events through these images.'
      },
      pastors: {
        title: 'Our Leadership',
        desc: 'Meet the team dedicated to serving God and our community at EEEJC.',
        quote: '"Our greatest joy is seeing people discover their <1>God-given purpose</1>."',
        quoteDesc: 'We believe that every person has a unique calling and a part to play in God\'s story. Our mission as leaders is to equip, encourage, and empower you to live out that calling in your everyday life.',
        staff: {
          benjamin: {
            name: 'Dr Benjamin Wem’s',
            focus: 'Focuses on vision casting, biblical teaching, and spiritual direction for the entire congregation.',
            bio: 'Dr Benjamin Wem’s leads EEEJC with a heart for the city and a passion for teaching the Word, guiding the community towards a fulfilling spiritual life.'
          },
          nadege: {
            name: 'Nadège Assambwa Wem’s',
            focus: 'Support Member',
            bio: 'Nadège provides valuable support to the EEEJC community, ensuring the well-being of members and the harmony of the church family.'
          },
          elie: {
            name: 'Evangelist Elie',
            focus: 'Minister and Preacher of the Gospel of Jesus Christ',
            bio: 'Evangelist Elie is dedicated to proclaiming God\'s Word with fervor, touching hearts through his inspired messages.'
          },
          heritier: {
            name: 'Evangelist MUKUMBWA Héritier',
            focus: 'Minister and Preacher of the Gospel, Interpreter, in charge of Evangelism',
            bio: 'Héritier plays a key role in the expansion of the gospel, using his interpreting talents and zeal for evangelism.'
          },
          dorcas: {
            name: 'MWALI KAPARALI Dorcas',
            focus: 'Cashier, Support Department',
            bio: 'Dorcas manages the resources of the support department with integrity, ensuring transparency and smooth financial operations.'
          },
          lyza: {
            name: 'Lyza AKILIMALI',
            focus: 'Cashier',
            bio: 'Lyza ensures the rigorous management of the church\'s finances, putting her skills at the service of God\'s work.'
          },
          anicet: {
            name: 'Anicet BUSHISHI',
            focus: 'Intercessor and Church Secretary and Disciple',
            bio: 'Anicet serves the church through prayer and administration, while being a dedicated disciple committed to spiritual growth.'
          },
          joseph: {
            name: 'BASEME Joseph',
            focus: 'Assistant Secretary',
            bio: 'Joseph assists the church secretariat with dedication, ensuring smooth communication and efficient organization.'
          },
          harrisy: {
            name: 'Harrisy RAHA',
            focus: 'Protocol President and in charge of Church Infrastructure',
            bio: 'Harrisy oversees protocol and infrastructure maintenance, ensuring that every service takes place in order and excellence.'
          }
        }
      },
      contact: {
        title: 'Get in Touch',
        desc: 'Have a question? Want to learn more? We\'d love to hear from you.',
        infoTitle: 'Contact Information',
        location: 'Our Location',
        phone: 'Phone Number',
        email: 'Email Address',
        hours: 'Office Hours',
        hoursDesc: 'Mon - Thu: 9:00 AM - 4:00 PM',
        followUs: 'Follow Us',
        formTitle: 'Send a Message',
        firstName: 'First Name',
        lastName: 'Last Name',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        subjects: {
          general: 'General Inquiry',
          prayer: 'Prayer Request',
          volunteer: 'Volunteer Interest',
          other: 'Other'
        }
      },
      visit: {
        title: 'Plan Your Visit',
        desc: 'We can\'t wait to welcome you to ÉGLISE ÉVANGILE ÉTERNEL DE JESUS CHRIST (EEEJC). Here is everything you need to know for your first visit.',
        expect: {
          times: 'Service Times',
          timesDesc: 'Tuesday (8:30-10:00 AM), Thursday (2:45-5:00 PM), Sunday (8:30-10:30 AM).',
          atmosphere: 'Atmosphere',
          atmosphereDesc: 'Come as you are! You\'ll find everything from jeans to suits. Grab a coffee in the lobby before service.',
        },
        findUs: 'Where to Find Us',
        address: 'Address',
        addressFull: 'North Kivu Province, Goma City, Goma Commune, Avenue de la Conference n 217, Kyeshero District. (Near the new courthouse)',
        schedule: 'Service Schedule',
        scheduleItems: {
          tuesday: 'Tuesday: 8:30 AM - 10:00 AM',
          thursday: 'Thursday: 2:45 PM - 5:00 PM',
          sunday: 'Sunday: 8:30 AM - 10:30 AM'
        },
        askQuestion: 'Ask a Question',
        mapTitle: 'Find Us Here',
        directions: 'Get Directions',
        letUsKnow: 'Let Us Know You\'re Coming',
        letUsKnowDesc: 'If you\'re planning to visit, let us know! We\'d love to have someone meet you at the front door, show you around, and help you get your kids checked in.',
        faq: {
          title: 'Frequently Asked Questions',
          q1: 'Where should I park?',
          a1: 'We have a dedicated parking lot right in front of the main entrance. Our parking team will be there to guide you.',
          q2: 'What should I wear?',
          a2: 'Most people dress casually, but you\'ll see everything from jeans to business casual. Wear whatever makes you feel comfortable!',
          q3: 'What is the service like?',
          a3: 'Our services include contemporary worship music, a few announcements, and a practical message from the Bible.',
        },
        form: {
          name: 'Name',
          email: 'Email',
          when: 'When are you visiting?',
          options: {
            tuesday: 'Tuesday (8:30 AM)',
            thursday: 'Thursday (2:45 PM)',
            sunday: 'Sunday (8:30 AM)',
            future: 'In the future'
          },
          submit: 'Plan My Visit'
        }
      },
      footer: {
        brandDesc: 'A place to belong, a place to grow, and a place to serve. Join us as we follow Jesus together.',
        quickLinks: 'Quick Links',
        ourStory: 'Our Story',
        ourPastors: 'Our Pastors',
        contactUs: 'Contact Us',
        planVisit: 'Plan Your Visit',
        serviceTimes: 'Service Times',
        address: 'Avenue de la Conference n 217, Kyeshero District, Goma',
        tuesday: 'Every Tuesday',
        tuesdayTime: '8:30 AM - 10:00 AM (Intercession and Deliverance Prayer)',
        thursday: 'Every Thursday',
        thursdayTime: '2:45 PM - 5:00 PM (Service and Biblical Teaching)',
        sunday: 'Every Sunday',
        sundayTime: '8:30 AM - 10:30 AM (Thanksgiving Service)',
        rights: 'All rights reserved.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
