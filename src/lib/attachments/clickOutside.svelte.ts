import type { Attachment } from "svelte/attachments"
import { on } from "svelte/events"

export interface ClickOutsideParameter {
	enabled?(): boolean
	onclickoutside?: (event: MouseEvent) => void
}

export const clickOutside = (config: ClickOutsideParameter = {}): Attachment => {
	return element => {
		$effect(() => {
			if (!config.enabled?.()) return

			return on(document, "click", event => {
				const targetNode = event.target as Node

				const contains = element.contains(targetNode)
				if (contains) return

				// avoid closing when clicking on a transitioning element
				if (!targetNode.parentElement) return

				config.onclickoutside?.(event)
			})
		})
	}
}
