import type { Attachment } from "svelte/attachments"

export function portal(parent: Element): Attachment {
	return element => {
		parent.append(element)

		return () => element.remove()
	}
}
