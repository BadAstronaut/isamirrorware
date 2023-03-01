<script lang="ts">
	import { onMount } from 'svelte';

	let files: FileList | null = null;
	let id: number | null = null;

	const handleSubmit = async () => {
		const formData = new FormData();
		if (files !== null) {
			for (let i = 0; i < files.length; i++) {
				formData.append('files', files[i]);
			}
		}
		for (const value of formData.values()) {
			console.log(value);
			
		}
		let tfiles = ['https://imgur.com/gallery/dvCxX', 'https://imgur.com/gallery/49cER4j'];
		// You can now submit the formData to a server using an HTTP request, for example:
		//conver id to string
		let idVal = id?.toString();
		console.log('id', id);
		const res = await fetch('/api/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ idVal, tfiles })
			});

			if (res.ok) {
				// handle successful response
				console.log('res', res)
			} else {
				// handle error response
			}
		// await fetch('/upload', { method: 'POST', body: formData });
	};

	const handleFileInputChange = (event: { target: HTMLInputElement }) => {
		files = event.target.files;
	};
	const handleIdChange = (event: { target: HTMLInputElement }) => {
		//convert string to intager
		let idVal = parseInt(event.target.value);

		id = idVal;
	};

	onMount(() => {
		// Initialize any necessary component state here
	});
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		Enter ID:
		<input type="text" name="id" placeholder="ID" on:change={handleIdChange} />
	</label>
	<label>
		Upload files:
		<input type="file" multiple on:change={handleFileInputChange} />
	</label>
	<button type="submit">Submit</button>
</form>

export defult Uploadfiles;
