<script lang="ts">
	//import on mount
	import { onMount } from 'svelte';
    import ImageViewer from '$lib/components/ImageViewer.svelte';

	export let data: { slug: string };
	console.log(data);
	//declare a variable to hold the data
	let cosmosData: [string];

	async function getCosmosData() {
		let idVal = data.slug;
		const res = await fetch(`/api/getlinks?idVal=${idVal}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			// handle successful response
			const stream = await res.json();
            console.log('stream', stream.body)
            cosmosData=stream.body
			// handle error response
		}
	}

	//generate a mount function
	onMount(() => {
		// Initialize any necessary component state here
		getCosmosData();
	});
</script>

<div class="get-data">
	<h1>here is where we are going to show the data retrive from cosmosdb</h1>
	<ImageViewer links= {cosmosData}/>
</div>

<style>
	.get-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 50vw;
	}
</style>
