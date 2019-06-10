<script>

 export let posts = [];

 let dark;

 import Blog from './Blog.svelte';
 import Sidebar from './Sidebar.svelte';

 import LazyLoadContainer from './LazyLoadContainer.svelte';
 import LazyLoad from './LazyLoad.svelte';

</script>

<style>
 .container {
     display: flex;
     height: 100%;
     width: 100%;
 }

 @media all and (max-width: 500px) {
     .container {
         flex-direction: column;
     }
 }

 .posts {
     padding: 25px;
     overflow-y: scroll;
 }

 .dark {
     background: #171616;
     color: #f1f1f1;
 }

 @media all and (min-width: 500px) {
     .posts {
         width: 100%;
     }
 }

 .separator {
     width: 100%;
     border: 1px solid black;
 }

 .dark .separator {
     border: 1px solid white;
 }

</style>

<div class="container">
    <Sidebar bind:dark/>
    <div class="posts {dark ? 'dark' : ''}">
        <LazyLoadContainer>
            {#each posts as post, i}
            <LazyLoad id="{i}">
                <Blog title="{post}" />
                <div class="separator"></div>
            </LazyLoad>
            {/each}
        </LazyLoadContainer>
    </div>
</div>
