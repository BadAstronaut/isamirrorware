<script>
	import '@picocss/pico/css/pico.css';
</script>
<head>
    <link rel="stylesheet" href="/css/global.css">
</head>
<nav class="layout">
	<a prefetch href="/">Mod Habitar</a>
	<a prefetch href="/getData">Post Data</a>
</nav>

<main>
	<slot />
</main>
<footer class="layout">© CTEC 2023</footer>

<style>
	nav {
		background: hsla(0, 3%, 77%, 0.4);
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	nav,
	footer {
		text-transform: uppercase;
		font-size: 0.7rem;
		letter-spacing: 0.1px;
		font-weight: 500;
	}
	:global(html) {
		background: whitesmoke;
		/* scrollbar-gutter: stable; */
		overflow: hidden;
		overflow-y: scroll;
	}
	:global(.layout) {
		--width: 700px;
		padding-left: max(1rem, calc(calc(100vw - var(--width)) / 2));
		padding-right: max(1rem, calc(calc(100vw - var(--width)) / 2));
	}
	main {
		display: flex;
		flex-direction: col;
		min-height: calc(100vh - 4rem);
        justify-content: center;
        align-items: center;
	}
	footer {
		text-align: center;
		margin: 0.4rem 0;
		color: rgba(255, 255, 255, 0.4);
		padding: 0;
		max-height: 30px;
	}
</style>
