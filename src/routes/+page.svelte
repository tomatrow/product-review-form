<script lang="ts">
	import * as v from "valibot"
	import ReviewForm from "./ReviewForm.svelte"
	import ReviewGrid from "./ReviewGrid.svelte"
	import { ReviewSectionDataSchema, type ReviewSectionData } from "./ReviewSectionData"

	let showing = $state(false)
	let reviewSectionData = $state.raw<ReviewSectionData>()

	$effect(() => {
		const reviewSectionDataScript = document.querySelector<HTMLScriptElement>(
			"script.review-section-data"
		)
		if (!reviewSectionDataScript) {
			console.warn("element matching `script.review-section-data` not found")
			return
		}

		try {
			reviewSectionData = v.parse(
				ReviewSectionDataSchema,
				JSON.parse(reviewSectionDataScript.innerText)
			)
		} catch (error) {
			console.error(error)
		}
	})

	$effect(() => {
		console.log({ reviewSectionData })
	})
</script>

{#if reviewSectionData}
	<ReviewGrid {reviewSectionData} />
{/if}

<button type="button" onclick={() => (showing = !showing)} class="review-button">
	<svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<path
			d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
		/>
	</svg>
	Write a Review
</button>

{#if showing}
	<ReviewForm
		onsubmit={(reviewData) => {
			showing = false

			const emailSubject = `New Product Review from ${reviewData.name}`
			const emailBody = `
New Product Review Submission

Name: ${reviewData.name}
Rating: ${reviewData.rating}/5 stars
Review: ${reviewData.description}

Please attach an image for your review
`.trim()

			const mailtoLink = `mailto:tomatrow@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
			window.location.href = mailtoLink
		}}
		oncancel={() => {
			showing = false
		}}
	/>
{/if}

<style>
	.review-button {
		bottom: 2rem;
		right: 2rem;
		margin: auto;
		background: linear-gradient(135deg, #10b981, #059669);
		color: white;
		border: none;
		padding: 1rem 1.5rem;
		border-radius: 50px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
		transition: all 0.3s ease;
		z-index: 1000;
	}

	.review-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
		background: linear-gradient(135deg, #059669, #047857);
	}

	.review-button:active {
		transform: translateY(0);
	}

	.button-icon {
		width: 20px;
		height: 20px;
	}

	@media (max-width: 640px) {
		.review-button {
			bottom: 1rem;
			right: 1rem;
			padding: 0.875rem 1.25rem;
			font-size: 0.9rem;
		}

		.button-icon {
			width: 18px;
			height: 18px;
		}
	}
</style>
