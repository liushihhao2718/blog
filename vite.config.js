/** @type {import('vite').UserConfig} */
export default {
  base:"/",
  root:'./clean-blog',
  assetsInclude: ['**/*.md'],
  build:{
    emptyOutDir: true,
    oututDir:'../docs',
    rollupOptions: {
      input: {
        main: './clean-blog/index.html',
        about: './clean-blog/about.html',
        'Why-I-can-t-get-a-girl-friend':'./clean-blog/Why-I-can-t-get-a-girl-friend/Why-I-can-t-get-a-girl-friend.html'
      }
    }
  }
}