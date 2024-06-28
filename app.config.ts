export default defineAppConfig({
  name: 'Aiden Vigue',
  description:
    'I\'m a sophomore at Purdue studying Computer Science with a focus on embedded engineering.',
  email: 'aiden@vigue.me',
  accentColor: '#db2777',
  username: 'acvigue',
  baseUrl: 'https://vigue.me',
  defaultOGImage: 'https://vigue.me/og.jpg',
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
