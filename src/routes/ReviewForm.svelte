<script lang="ts">
	interface ReviewInputData {
		name: string
		rating: number
		description: string
	}

	let { onsubmit }: { onsubmit?(reviewInputData: ReviewInputData): void } = $props()

	let name = $state<string>()
	let description = $state<string>()
	let rating = $state<number>()
</script>

<form
	onsubmit={(event) => {
		event.preventDefault()

		if (!(name && description && rating !== undefined)) {
			return
		}

		onsubmit?.({ name, description, rating })
	}}
>
	<input type="text" bind:value={name} />
	<input type="number" bind:value={rating} min="1" max="5" />
	<textarea bind:value={description}></textarea>
	<button>Submit</button>
</form>

<style>
	form {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		background: red;
	}
</style>
