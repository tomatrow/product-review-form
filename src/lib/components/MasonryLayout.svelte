<script lang="ts" generics="T">
	import type { Snippet } from "svelte"
	import type { HTMLAttributes } from "svelte/elements"

	let {
		items,
		cell,
		...rest
	}: {
		items: T[]
		cell: Snippet<[item: T, columnIndex: number, columnItems: T[], items: T[]]>
	} & HTMLAttributes<HTMLDivElement> = $props()

	let columns = $derived.by(() => {
		let columns: [column1: T[], column2: T[], column3: T[]] = [[], [], []]

		for (let i = 0; i < items.length; i++) columns[i % 3].push(items[i])

		return columns
	})
</script>

<div class="masonry wrapper switcher" {...rest}>
	{#each columns as columnItems}
		<div class="flow">
			{#each columnItems as item, columnIndex}
				{@render cell(item, columnIndex, columnItems, items)}
			{/each}
		</div>
	{/each}
</div>

<style>
	.masonry {
		--gutter: 0.25em;
		--flow-space: var(--gutter);
		--switcher-target-container-width: 28rem;

		:global {
			.flow > * + * {
				margin-block-start: var(--flow-space, 1em);
			}
		}
	}

	.wrapper {
		max-width: 80rem;
		margin-inline: auto;
		padding-inline: var(--gutter);
	}

	.switcher {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gutter, 1em);
		align-items: var(--switcher-vertical-alignment, flex-start);

		& > * {
			flex-grow: 1;
			flex-basis: calc((var(--switcher-target-container-width, 40rem) - 100%) * 999);
		}
	}
</style>
