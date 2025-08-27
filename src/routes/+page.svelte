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

<button type="button" onclick={() => (showing = !showing)}>Review</button>

{#if showing}
	<ReviewForm />
{/if}
