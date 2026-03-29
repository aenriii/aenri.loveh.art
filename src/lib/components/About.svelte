<style>

	.card-concept,
	.card-lovehart {
		transition:
			opacity 0.25s ease,
			visibility 0.25s ease;
	}
	.card-concept {
		opacity: 1;
		visibility: visible;
	}
	.card-lovehart {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
	}
	:global(:has(#def-toggle:checked)) .card-concept {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
	}
	:global(:has(#def-toggle:checked)) .card-lovehart {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
	}
</style>

<div class="space-y-5">
	<div class="grid">
		<div class="card-concept space-y-3 rounded-2xl border border-border bg-surface p-5" style="grid-area: 1 / 1" aria-label="definition of aenri (concept)">
			<div class="flex items-baseline gap-2">
				<span class="font-display text-lg font-semibold text-mist">aenri</span>
				<span class="text-xs italic text-dusk">/ noun</span>
			</div>
			<p class="text-sm leading-relaxed text-dusk">
				aenri is strongly derived from the concept of love and its extension towards any and all,
				rooted in truly radical acceptance, anti-anthropocentrism, youth liberation, and universal
				equality.
			</p>
			<p class="text-sm leading-relaxed text-dusk">
				
			</p>
		</div>

		<div class="card-lovehart space-y-3 rounded-2xl border border-border bg-surface p-5" style="grid-area: 1 / 1" aria-label="introduction from aenri lovehart">
			<div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
				<span class="font-display text-lg font-semibold text-mist">aenri lovehart</span>
				<span class="font-display text-xs text-lavender">pup / it</span>
			</div>
			<p class="text-sm leading-relaxed text-dusk">
				a physical, living representation of the concept of "aenri;" a being who holds the single
				moral of "do no harm unless in defense," and the single purpose of allowing the love that
				flows through the world to reach as many people as deeply as possible.
			</p>
			<p class="text-sm leading-relaxed text-dusk">
				it exists as a motherly figure for many, as well as a developer specializing in rust,
				kotlin, and typescript. it is pursuing a bachelors in cybersecurity, a minor in spanish,
				and a pharmacy technician certification, and is looking to get into machine learning and
				internet-of-things development.
			</p>
		</div>
	</div>
</div>
