<section aria-label="projects">
	<h2 class="mb-5 font-display text-2xl font-semibold text-mist">projects</h2>

	<!-- css-only tabs via radio + flex order; inputs/labels/panels must stay as direct flex children -->
	<div class="flex flex-wrap" role="tablist" aria-label="project categories">
		<input type="radio" name="project-tab" id="tab-openrx" class="peer/openrx hidden" checked aria-hidden="true" />
		<input type="radio" name="project-tab" id="tab-dev" class="peer/dev hidden" aria-hidden="true" />
		<input type="radio" name="project-tab" id="tab-other" class="peer/other hidden" aria-hidden="true" />
		<label
			for="tab-openrx"
			role="tab"
			tabindex="0"
			aria-controls="panel-openrx"
			class="order-1 cursor-pointer select-none border-b-2 border-transparent px-4 py-2.5 font-display text-xs font-medium text-dusk transition-colors duration-150 hover:text-mist sm:text-sm peer-checked/openrx:border-lavender peer-checked/openrx:text-lavender"
		>
			openrx
		</label>
		<label
			for="tab-dev"
			role="tab"
			tabindex="0"
			aria-controls="panel-dev"
			class="order-2 cursor-pointer select-none border-b-2 border-transparent px-4 py-2.5 font-display text-xs font-medium text-dusk transition-colors duration-150 hover:text-mist sm:text-sm peer-checked/dev:border-lavender peer-checked/dev:text-lavender"
		>
			development
		</label>
		<label
			for="tab-other"
			role="tab"
			tabindex="0"
			aria-controls="panel-other"
			class="order-3 cursor-pointer select-none border-b-2 border-transparent px-4 py-2.5 font-display text-xs font-medium text-dusk transition-colors duration-150 hover:text-mist sm:text-sm peer-checked/other:border-lavender peer-checked/other:text-lavender"
		>
			other projects
		</label>

		<div class="order-4 mb-6 w-full border-b border-border" aria-hidden="true"></div>

		<div id="panel-openrx" role="tabpanel" aria-labelledby="tab-openrx" class="order-5 hidden w-full peer-checked/openrx:block">
			<div class="space-y-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
				<div class="flex flex-wrap items-start justify-between gap-3">
					<div>
						<h3 class="font-display text-xl font-semibold text-mist">openrx</h3>
						<p class="mt-0.5 text-xs text-dusk">harm reduction platform</p>
					</div>
					<span
						class="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-display text-xs font-medium text-emerald-400"
						aria-label="status: active"><span aria-hidden="true">● </span>active</span
					>
				</div>
				<p class="text-sm leading-relaxed text-dusk">
					a harm reduction, dosing, and sourcing resource for grey-market pharmaceuticals, focusing
					on DIY HRT for trans people and DIY GLP-1 medication for those who are unable to access it
					for any reason
				</p>
				<p class="text-sm leading-relaxed text-dusk">
					built with svelte, including a small custom localization framework. the .info domain seeks
					to be the first of multiple resources under that name, hopefully evolving into an
					international mutual aid network to connect people with life-saving medication regardless of
					who they are and what they need
				</p>

				<div class="flex flex-wrap gap-2.5 pt-1">
					<!-- <a
						href="https://openrx.info"
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-lg border border-lavender/25 bg-lavender/10 px-3 py-1.5 text-xs font-medium text-lavender transition-colors hover:bg-lavender/20"
					>
						openrx.info ↗
					</a> -->
					<span class="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs text-dusk"
						>openrx.info going live soon</span
					>
                   	<a
                        href="https://codeberg.org/OpenRx/openrx.info"
                        target="_blank"
                        rel="noopener noreferrer"
             			aria-label="codeberg repo for openrx.info"
                        class="rounded-lg border border-lavender/25 bg-lavender/10 px-3 py-1.5 text-xs font-medium text-lavender transition-colors hover:bg-lavender/20"
                   	>
                        codeberg
                   	</a>
                   	<a
                        href="https://github.com/Open-Rx/openrx.info"
                        target="_blank"
                       	rel="noopener noreferrer"
             			aria-label="github repo for openrx.info"
                       	class="rounded-lg border border-lavender/25 bg-lavender/10 px-3 py-1.5 text-xs font-medium text-lavender transition-colors hover:bg-lavender/20"
                   	>
                        github
                   	</a>
					<span class="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs text-dusk"
						>opencollective coming soon</span
					>
				</div>
				<p class="text-xs italic text-lavender">
					contributions always welcome - reach out via matrix or signal
				</p>
			</div>
		</div>

		<div id="panel-dev" role="tabpanel" aria-labelledby="tab-dev" class="order-6 hidden w-full peer-checked/dev:block">
			<div class="grid gap-5 sm:grid-cols-2">
				<!-- Genesis -->
				<div class="space-y-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
					<div class="flex flex-wrap items-start justify-between gap-3">
						<div>
							<h3 class="font-display text-xl font-semibold text-mist">genesis</h3>
							<p class="mt-0.5 text-xs text-dusk">multiplatform chat</p>
						</div>
						<span
							class="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-display text-xs font-medium text-amber-400"
							aria-label="status: paused"><span aria-hidden="true">○ </span>paused</span
						>
					</div>
					<p class="text-sm leading-relaxed text-dusk">
						a multiplatform multi-service chat app — v0.1 with IRC, v1.0 with Matrix and XMPP.
						advanced security architecture keeps data safe on device, with end-to-end encryption
						enabled by default wherever possible.
					</p>
					<p class="text-sm leading-relaxed text-dusk">
						eventually hopes to grow into a discord-like service based on signal's security
						architecture for truly secure chat
					</p>

					<p class="text-xs italic text-subtle">
						contributions, help, or feature bounties appreciated !
					</p>
				</div>

				<!-- Mewsic -->
				<div class="space-y-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
					<div class="flex flex-wrap items-start justify-between gap-3">
						<div>
							<h3 class="font-display text-xl font-semibold text-mist">mewsic</h3>
							<p class="mt-0.5 text-xs text-dusk">music player + library</p>
						</div>
						<span
							class="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-display text-xs font-medium text-amber-400"
							aria-label="status: paused"><span aria-hidden="true">○ </span>paused</span
						>
					</div>
					<p class="text-sm leading-relaxed text-dusk">
						a multiplatform multi-service music player and local library manager with first-party
						support for youtube music, spotify, and apple music
					</p>
					<p class="text-sm leading-relaxed text-dusk">
						seeks to make a device-native music experience and offer tools for those who prefer to
						own their music locally
					</p>

					<p class="text-xs italic text-subtle">
					    contributions, help, or feature bounties appreciated !
					</p>
				</div>
			</div>
		</div>

		<div id="panel-other" role="tabpanel" aria-labelledby="tab-other" class="order-7 hidden w-full peer-checked/other:block">
			<div class="space-y-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
				<div class="flex flex-wrap items-start justify-between gap-3">
					<div>
						<h3 class="font-display text-xl font-semibold text-mist">pawprint</h3>
						<p class="mt-0.5 text-xs text-dusk">harm reduction wearable</p>
					</div>
					<span
						class="rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 font-display text-xs font-medium text-sky-400"
						aria-label="status: concept"><span aria-hidden="true">◇ </span>concept</span
					>
				</div>
				<p class="text-sm leading-relaxed text-dusk">
					a screenless "smartwatch" worn as a wristband, packed with health-related sensors. pairs
					with harm-reduction mobile apps to intake biological data, drug intake data, and physical
					activity data
				</p>
				<p class="text-sm leading-relaxed text-dusk">
					trains a neural network on-device to help assess danger levels, detect specific side
					effects of drug use, and advise on when danger levels are too high, indicating emergency
					action is needed. also hopes to (consensually, opt-in) build a community database of anonymized health data to
					improve existing harm reduction resources
				</p>
				<p class="text-sm leading-relaxed text-dusk">
					i'm missing the hardware knowledge i need for this project! if anyone has experience
					with that stuff and wants to help out, shoot me a message!
				</p>

			</div>
		</div>
	</div>
</section>
