<script lang="ts">
	import { type ReviewSectionData } from "./ReviewSectionData"

	let { reviewSectionData }: { reviewSectionData: ReviewSectionData } = $props()

	function normalizeUrl(url: string) {
		if (url.startsWith("//")) return `https:${url}`

		return url
	}
</script>

{#each reviewSectionData.blocks as block (block.id)}
	{#if block.settings.image}
		<div>
			<h5>{block.settings.name}</h5>
			<p>{block.settings.rating}/5</p>
			{@html block.settings.description}
			<img src={normalizeUrl(block.settings.image)} alt="" />
		</div>
	{/if}
{/each}
