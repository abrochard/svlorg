<script>

 export let title = '';
 export let noscriptContent = false;
 let promise = getContent();

 async function getContent() {
   const noscript = document.getElementsByTagName("noscript");
   if (noscript.length > 0 && noscriptContent) {
     return noscript[0].innerText;
   }
   const res = await fetch(`content/${title}.html`);
   const text = await res.text();

	 if (res.ok) {
		 return text;
	 } else {
		 throw new Error(text);
	 }
 }

</script>

<style>
 .blog {
     margin-top: 0;
 }
</style>

{#await promise}
<div style="min-height: 500px">
    Loading
</div>
{:then content}
<p id="{title}" class="blog">
    {@html content}
</p>
{:catch error}
<p style="color: red">{error.message}</p>
{/await}
