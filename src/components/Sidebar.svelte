<script>

 const links = [
     {title: 'Homepage', url: 'https://abrochard.com'},
     {title: 'GitHub', url: 'https://github.com/abrochard'},
     {title: 'Twitter', url: 'https://twitter.com/abrochard'},
     {title: 'RSS', url: 'https://blog.abrochard.com/rss.xml'}
 ];

 export let dark = localStorage.getItem('dark') === "true" ? true : false;

 import LinksMenu from './LinksMenu.svelte';

 function flip() {
     dark = !dark;
     localStorage.setItem('dark', dark);
 }
</script>

<style>
 .container {
   /* height: 100%; */
     width: 20%;
     max-width: 250px;
     background: #101010;

     display: flex;
     flex-direction: column;
     align-items: flex-start;
 }

 .container div {
     margin: 20px;
     color: #BFBFBF;
 }

 .item {
 }

 @media all and (max-width: 500px) {
     .container {
         flex-direction: row;
         height: 85px;
         width: 100%;
         max-width: 100%;
         align-items: center;
     }

     .item {
         display: none;
     }
 }

 .title {
     font-size: 25px;
     color: #F2F2F2 !important;
 }
 .links {
     margin-left: auto;
 }
 .bottom {
     color: white;
     cursor: pointer;
 }

 @media all and (min-width: 500px) {
     .bottom {
         margin-top: auto !important;
     }

     .links {
         display: none;
     }
 }

 a {
     cursor: pointer;
     text-decoration: none;
     color: inherit;
 }
</style>

<div class="container">
    <div class="title"><a href="/">abrochard blog</a></div>

    {#each links as link}
    <div class="item"><a href="{link.url}" target="_blank">{link.title}</a></div>
    {/each}

    <div class="links"><LinksMenu {links} /></div>

    <div class="bottom" on:click="{flip}">{dark ? 'Light' : 'Dark'}</div>
</div>
