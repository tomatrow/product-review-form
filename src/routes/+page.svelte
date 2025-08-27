<script lang="ts">
	import * as v from "valibot"
	import { onMount } from "svelte"
	import ReviewForm, { type ReviewInputData } from "./ReviewForm.svelte"
	import ReviewGrid from "./ReviewGrid.svelte"
	import { ReviewSectionDataSchema, type ReviewSectionData } from "./ReviewSectionData"

	let showing = $state(false)
	let reviewSectionData = $state.raw<ReviewSectionData>()

	onMount(() => {
		try {
			const reviewSectionDataScript = document.querySelector<HTMLScriptElement>(
				"script.review-section-data"
			)
			if (!reviewSectionDataScript)
				throw new Error("element matching `script.review-section-data` not found")
			const reviewSectionDataText = reviewSectionDataScript.innerText
			console.log("[product-review-form]", { reviewSectionDataText })
			const reviewSectionDataJson = JSON.parse(reviewSectionDataText)
			console.log("[product-review-form]", { reviewSectionDataJson })
			reviewSectionData = v.parse(ReviewSectionDataSchema, reviewSectionDataJson)

			console.log("[product-review-form]", { reviewSectionData })
		} catch (error) {
			console.error("[product-review-form]", error)
		}
	})

	function sendReview(email: string, reviewData: ReviewInputData) {
		const emailSubject = `New Product Review from ${reviewData.name}`
		const emailBody = `
New Product Review Submission

Name: ${reviewData.name}
Rating: ${reviewData.rating}/5 stars
Review: ${reviewData.description}

Please attach an image for your review
	`.trim()

		window.location.href = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
	}
</script>

<section
	style="--paddingTop: {reviewSectionData?.settings?.paddingTop ??
		0}; --paddingBottom: {reviewSectionData?.settings?.paddingBottom ??
		0};--buttonForegroundColor: {reviewSectionData?.settings?.buttonForegroundColor ??
		'black'}; --buttonBackgroundColor: {reviewSectionData?.settings?.buttonBackgroundColor ??
		'white'}"
>
	<h3>{reviewSectionData?.settings?.gridTitle ?? "Review Grid"}</h3>

	{#if reviewSectionData}
		<ReviewGrid {reviewSectionData} />
	{/if}

	<button type="button" onclick={() => (showing = !showing)} class="review-button">
		<svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path
				d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
			/>
		</svg>
		{reviewSectionData?.settings?.formTitle ?? "Write Review"}
	</button>

	{#if showing}
		<ReviewForm
			onsubmit={(reviewData) => {
				showing = false
				const email = reviewSectionData?.settings?.email
				if (!email) return

				sendReview(email, reviewData)
			}}
			oncancel={() => (showing = false)}
		/>
	{/if}
</section>

<style>
	section {
		padding-top: var(--paddingTop);
		padding-bottom: var(--paddingBottom);
	}

	h3 {
		text-align: center;
	}

	.review-button {
		bottom: 2rem;
		right: 2rem;
		margin: auto;
		background: var(--buttonBackgroundColor);
		color: var(--buttonForegroundColor);
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
