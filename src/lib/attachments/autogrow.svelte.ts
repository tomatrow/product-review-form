import { on } from "svelte/events"

export function autogrow(node: HTMLTextAreaElement) {
	function fitHeightToLineCount() {
		node.style.height = "auto"
		node.style.height = `${node.scrollHeight}px`
	}

	$effect(() => {
		fitHeightToLineCount()

		const offInput = on(node, "input", fitHeightToLineCount)
		const offBlur = on(node, "blur", fitHeightToLineCount)

		return () => {
			offInput()
			offBlur()
		}
	})
}
