<script lang="ts">
	interface ReviewInputData {
		name: string
		rating: number
		description: string
	}

	let { onsubmit, oncancel }: { 
		onsubmit?(reviewInputData: ReviewInputData): void
		oncancel?(): void 
	} = $props()

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
	class="review-form"
>
	<div class="form-container">
		<h2 class="form-title">Write a Review</h2>

		<div class="form-group">
			<label for="name" class="form-label">Your Name</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				placeholder="Enter your name"
				class="form-input"
				required
			/>
		</div>

		<div class="form-group">
			<label for="rating" class="form-label">Rating</label>
			<div class="rating-input">
				<input
					id="rating"
					type="number"
					bind:value={rating}
					min="1"
					max="5"
					placeholder="5"
					class="form-input rating-number"
					required
				/>
				<span class="rating-suffix">/ 5 stars</span>
			</div>
		</div>

		<div class="form-group">
			<label for="description" class="form-label">Your Review</label>
			<textarea
				id="description"
				bind:value={description}
				placeholder="Tell us about your experience..."
				class="form-textarea"
				rows="4"
				required
			></textarea>
		</div>

		<div class="button-group">
			<button type="button" onclick={() => oncancel?.()} class="cancel-button">
				Cancel
			</button>
			<button type="submit" class="submit-button"> 
				Submit Review 
			</button>
		</div>
	</div>
</form>

<style>
	.review-form {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		backdrop-filter: blur(4px);
	}

	.form-container {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		width: 100%;
		max-width: 500px;
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
		max-height: 90vh;
		overflow-y: auto;
	}

	.form-title {
		margin: 0 0 1.5rem 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: #1f2937;
		text-align: center;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #374151;
		font-size: 0.9rem;
	}

	.form-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		font-size: 1rem;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
		box-sizing: border-box;
	}

	.form-input:focus {
		outline: none;
		border-color: #10b981;
		box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
	}

	.rating-input {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.rating-number {
		width: 80px;
		flex-shrink: 0;
	}

	.rating-suffix {
		color: #6b7280;
		font-size: 0.9rem;
	}

	.form-textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		font-size: 1rem;
		font-family: inherit;
		resize: vertical;
		min-height: 100px;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
		box-sizing: border-box;
	}

	.form-textarea:focus {
		outline: none;
		border-color: #10b981;
		box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
	}

	.button-group {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	.cancel-button {
		flex: 1;
		background: #f3f4f6;
		color: #374151;
		border: 1px solid #d1d5db;
		padding: 0.875rem 1.5rem;
		border-radius: 6px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.cancel-button:hover {
		background: #e5e7eb;
		border-color: #9ca3af;
	}

	.submit-button {
		flex: 1;
		background: #10b981;
		color: white;
		border: none;
		padding: 0.875rem 1.5rem;
		border-radius: 6px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			transform 0.1s ease;
	}

	.submit-button:hover {
		background: #059669;
		transform: translateY(-1px);
	}

	.submit-button:active {
		transform: translateY(0);
	}

	@media (max-width: 640px) {
		.form-container {
			padding: 1.5rem;
			margin: 1rem;
		}

		.form-title {
			font-size: 1.25rem;
		}
	}
</style>
