<script lang="ts">
	import { MasonryLayout } from "$lib"
	import { type ReviewSectionData } from "./ReviewSectionData"

	let { reviewSectionData }: { reviewSectionData: ReviewSectionData } = $props()

	function getMonthlyItems<T>(fullList: T[], itemsPerMonth: number) {
		const currentMonth = new Date().getMonth() // 0-11
		const startIndex = (currentMonth * itemsPerMonth) % fullList.length
		const endIndex = startIndex + itemsPerMonth

		// Handle wrapping around the list
		if (endIndex <= fullList.length) {
			return fullList.slice(startIndex, endIndex)
		} else {
			return [...fullList.slice(startIndex), ...fullList.slice(0, endIndex - fullList.length)]
		}
	}

	let filteredBlocks = $derived(
		getMonthlyItems(
			reviewSectionData.blocks.filter((block) => block.settings.image || block.settings.video),
			reviewSectionData.settings?.monthlyRotationCount ?? 3
		)
	)

	function normalizeUrl(url: string) {
		if (url.startsWith("//")) return `https:${url}`
		return url
	}
</script>

<MasonryLayout
	--switcher-target-container-width={reviewSectionData.settings?.columnBreakPoint ?? "600px"}
	--smallCardFontSize={reviewSectionData.settings?.smallCardFontSize ?? "16px"}
	--largeCardFontSize={reviewSectionData.settings?.largeCardFontSize ?? "24px"}
	--cardFontFamily={reviewSectionData.settings?.cardFont.family}
	items={filteredBlocks}
	columnCount={reviewSectionData.settings?.columnCount}
>
	{#snippet cell(block)}
		<div class="review-item">
			{#if block.settings.video}
				<!-- svelte-ignore a11y_media_has_caption -->
				<video
					playsinline
					preload="metadata"
					aria-label={block.settings.video.alt ?? block.settings.name}
					poster={block.settings.video.preview_image?.src ?
						normalizeUrl(block.settings.video.preview_image.src)
					:	undefined}
					class="review-video"
					controls
					style:--aspect-ratio={block.settings.video.aspect_ratio}
				>
					{#if block.settings.video.preview_image?.src}
						<img
							src={normalizeUrl(block.settings.video.preview_image.src)}
							alt={block.settings.video.alt ?? block.settings.name}
						/>
					{/if}
					{#each block.settings.video.sources as source}
						<source src={normalizeUrl(source.url)} type={source.mime_type} />
					{/each}
				</video>
			{:else}
				{#if block.settings.image}
					<img
						src={normalizeUrl(block.settings.image)}
						alt={block.settings.name}
						class="review-image"
					/>
				{/if}
				<div class="review-overlay">
					<div class="review-content">
						<h5 class="review-name">{block.settings.name}</h5>
						<div class="rating">
							<span class="rating-score">{block.settings.rating}</span>
							<span class="rating-total">/5</span>
						</div>
						<div class="description">
							{@html block.settings.description}
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/snippet}
</MasonryLayout>

<style>
	.review-item {
		position: relative;
		border-radius: 8px;
		cursor: pointer;
		transition: transform 0.2s ease;
		container: review-item / inline-size;
		font-family: var(--cardFontFamily);

		&:hover {
			transform: translateY(-8px);

			.review-overlay {
				opacity: 1;
			}

			.review-image {
				filter: brightness(0.7);
			}
		}
	}

	.review-image {
		width: 100%;
		height: 100%;
		transition: filter 0.3s ease;

		&:hover {
			transform: scale(1.02);
		}
	}

	.review-video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: var(--aspect-ratio);
	}

	.review-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
		padding: 1.5rem;
	}

	.review-content {
		text-align: center;
		color: white;
		max-width: 100%;
		overflow-y: scroll;
		max-height: 100%;
	}

	.review-name {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: white;
	}

	.rating {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 0.25rem;
		margin-bottom: 1rem;
	}

	.rating-score {
		font-weight: bold;
		color: #10b981;
	}

	.rating-total {
		color: #d1d5db;
	}

	.description {
		color: #f3f4f6;
		line-height: 1.5;
	}

	.review-content {
		font-size: var(--smallCardFontSize);

		@container review-item (width > 300px) {
			font-size: var(--largeCardFontSize);
		}
	}
</style>
