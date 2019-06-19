<script>
 export let links = [];

 let open = false;

 function click() {
     open = !open;
     console.log(open);
 }
</script>

<style>
 .menu {
     position: absolute;
     top: 80px;
     background: #101010;
     display: flex;
     flex-direction: column;
 }

 a {
     margin: 10px;
     padding: 5px;
     color: inherit;
     text-decoration: none;
 }
</style>

<div on:click="{click}">Links</div>
{#if open}
<div class="menu">
    {#each links as link}
    <a href="{link.url}" target="_blank">{link.title}</a>
    {/each}
</div>
{/if}
