<script>
 export let dark = localStorage.getItem('dark') === "true" ? true : false;

 function flip() {
     dark = !dark;
     localStorage.setItem('dark', dark);
 }
</script>

<style>
 .container {
     height: 100%;
     width: 20%;
     max-width: 250px;
     background: #101010;

     display: flex;
     flex-direction: column;
     align-items: flex-start;
 }

 @media all and (max-width: 500px) {
     .container {
         flex-direction: row;
         height: 100px;
         width: 100%;
         max-width: 100%;
         align-items: center;
     }
 }

 .item {
     margin: 20px;
 }
 .title {
     font-size: 25px;
     color: #F2F2F2;
 }
 .bottom {
     color: white;
     cursor: pointer;
 }
 @media all and (min-width: 500px) {
     .bottom {
         margin-top: auto;
     }
 }

 a {
     text-decoration: none;
     color: #BFBFBF;
 }
</style>

<div class="container">
    <div class="item title">abrochard blog</div>
    <div class="item"><a href="https://abrochard.github.io" target="_blank">Homepage</a></div>
    <div class="item"><a href="https://github.com/abrochard" target="_blank">Github</a></div>

    <div class="item bottom" on:click="{flip}">{dark ? 'Light' : 'Dark'}</div>
</div>
