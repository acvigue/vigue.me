export default defineAppConfig({
  name: 'Aiden Vigue',
  description:
    'I\'m a freshman at Purdue studying Computer Science with a focus on embedded engineering.',
  email: 'aiden@vigue.me',
  accentColor: '#db2777',
  username: 'acvigue',
  baseUrl: 'https://vigue.me',
  defaultOGImage: 'https://vigue.me/og.jpg',
  repo: {
    name: 'acvigue/vigue.me',
    branch: 'main',
  },
  aboutItems: [
    {
      icon: '🧑🏼‍🎓',
      heading: 'Student',
      body: `I'm a freshman at Purdue currently studying computer science and my dream job is embedded engineering`,
    },
    {
      icon: '💻',
      heading: 'Developer',
      body: `I've worked with a variety of technologies ranging from frameworks like React and Vue, all the way to hosting and configuring production-ready containerized workloads on AWS. I also have extensive experience in languages such as C/C++, Python, and Swift.`,
    },
    {
      icon: '🧱',
      heading: 'Maker',
      body: `I showcase my love for design through my projects. I mainly work in Altium Designer and Fusion 360 and specialize in high-speed circuit design (my favorite IC is the ESP32)`,
    },
  ],
  footer: {
    links: [],
    social: [
      {
        name: 'Source Code',
        icon: 'FiGithub',
        href: 'https://github.com/acvigue/vigue.me',
      },
      {
        name: 'LinkedIn',
        icon: 'FiLinkedin',
        href: '/linkedin',
      },
      {
        name: 'Spotify',
        icon: 'FiMusic',
        href: 'https://open.spotify.com/user/w3g33ot2c4zxlxtzy15i7ldxi?si=f676f03ce5c745c2',
      },
      {
        name: 'Instagram',
        icon: 'FiInstagram',
        href: 'https://instagram.com/aiden.vigue',
      },
    ],
  },
  matomoURL: 'https://dataingestion.vigue.me',
  matomoSiteID: '1',
  newsletterSignupHeading: 'Don\'t miss out!',
  newsletterSignupBody:
    'Stay in the loop by signing up for my (infrequent) newsletter. No spam, unsubscribe anytime.',
  newsletterSignupComplete: 'Thanks, you\'re subscribed!',
})
