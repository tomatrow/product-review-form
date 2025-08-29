<script lang="ts">
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
			reviewSectionData.blocks.filter((block) => block.settings.image),
			reviewSectionData.settings?.monthlyRotationCount ?? 3
		)
	)

	function normalizeUrl(url: string) {
		if (url.startsWith("//")) return `https:${url}`
		return url
	}
</script>

<div class="review-grid">
	{#each filteredBlocks as block (block.id)}
		<div class="review-item">
			<img
				src={normalizeUrl(block.settings.image!)}
				alt={block.settings.name}
				class="review-image"
			/>
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
		</div>
	{/each}
</div>

<style>
	.review-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
		padding: 1rem;
		max-width: 1000px;
		margin: auto;
	}

	.review-item {
		position: relative;
		aspect-ratio: 1;
		overflow: hidden;
		border-radius: 8px;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.review-item:hover {
		transform: scale(1.02);
	}

	.review-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: filter 0.3s ease;
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

	.review-item:hover .review-overlay {
		opacity: 1;
	}

	.review-item:hover .review-image {
		filter: brightness(0.7);
	}

	.review-content {
		text-align: center;
		color: white;
		max-width: 100%;
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
		font-size: 1.5rem;
		font-weight: bold;
		color: #10b981;
	}

	.rating-total {
		color: #d1d5db;
		font-size: 1rem;
	}

	.description {
		color: #f3f4f6;
		line-height: 1.5;
		font-size: 1.1rem;
		max-height: 6rem;
		overflow-y: scroll;
	}

	@media (max-width: 768px) {
		.review-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			gap: 0.5rem;
			padding: 0.5rem;
		}

		.review-overlay {
			padding: 1rem;
		}

		.review-name {
			font-size: 1.1rem;
		}

		.rating-score {
			font-size: 1.3rem;
		}

		.description {
			font-size: 0.8rem;
		}
	}
</style>
