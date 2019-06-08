<script>

 export let title = '';
 let promise = getContent();

 async function getContent() {
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
<p>...waiting</p>
{:then content}
<p id="{title}" class="blog">
    {@html content}
</p>
{:catch error}
<p style="color: red">{error.message}</p>
{/await}
