import App from './components/App.svelte';

import posts from './posts.js';

const app = new App({
  target: document.body,
  props: {posts}
});
