<style>
	.lovehart {
		color: var(--color-lavender);
		cursor: pointer;
		text-decoration: underline;
		text-decoration-style: dotted;
		text-underline-offset: 5px;
		transition: color 0.2s ease;
	}
	.lovehart:hover {
		color: var(--color-petal);
	}
	:global(:has(#def-toggle:checked)) .lovehart {
		color: var(--color-petal);
		text-decoration-style: solid;
	}
</style>

<input id="def-toggle" type="checkbox" class="sr-only" aria-hidden="true" />

<header class="mx-auto max-w-5xl px-5 pb-12 pt-16 md:pb-16 md:pt-24">
	<div class="space-y-4">
		<h1 class="font-display text-5xl font-bold tracking-tight text-mist sm:text-6xl md:text-7xl select-none">
			hi, im aenri
			<label for="def-toggle" class="lovehart">lovehart</label>
		</h1>
		<p class="max-w-xl text-base leading-relaxed text-dusk md:text-lg">
		    radical left developer & activist. focused on building a better tomorrow for me
			and you.
		</p>
	</div>
</header>
