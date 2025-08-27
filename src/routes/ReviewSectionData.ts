import * as v from "valibot"

export const ReviewSectionDataSchema = v.object({
	settings: v.optional(
		v.partial(
			v.object({
				email: v.string(),
				gridTitle: v.string(),
				formTitle: v.string(),
				paddingTop: v.string(),
				paddingBottom: v.string(),
				buttonBackgroundColor: v.string(),
				buttonForegroundColor: v.string()
			})
		)
	),
	blocks: v.array(
		v.object({
			id: v.string(),
			type: v.string(),
			settings: v.partial(
				v.object({
					image: v.string(),
					rating: v.number(),
					name: v.string(),
					description: v.string()
				})
			)
		})
	)
})

export type ReviewSectionData = v.InferOutput<typeof ReviewSectionDataSchema>
