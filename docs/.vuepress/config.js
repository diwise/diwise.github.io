module.exports = {
  themeConfig: {
    
    navbar: [
      { text: 'Hem', link: '/' },
      { text: 'diwise.io', link: 'https://diwise.io' },
      { text: 'GitHub', link: 'https://github.com/diwise' }
    ],
    
    // public file path
    logo: 'images/diwise-logo-dark.png',
    logoDark: 'images/diwise-logo-light.png',


    '/guide/': [
      {
        text: 'Guide',
        children: ['/guide/README.md', '/guide/getting-started.md'],
      },
    ],

    sidebar: [
      // SidebarItem
      /*
      {
        text: 'Guide',
        link: '/guide/',
      },

      // string - page file path
      '/guide/getting-started.md',
      '/guide/test.md',
      */
    ],
  },

  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Sök',
          }
        },
      },
    ],
  ],






}
