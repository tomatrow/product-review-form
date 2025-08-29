import * as v from "valibot"

export const ReviewSectionDataSchema = v.object({
	settings: v.nullish(
		v.object({
			email: v.nullish(v.string()),
			gridTitle: v.nullish(v.string(), "Reviews"),
			formTitle: v.nullish(v.string(), "Write Review"),
			paddingTop: v.nullish(v.string(), "0"),
			paddingBottom: v.nullish(v.string(), "0"),
			buttonBackgroundColor: v.nullish(v.string(), "#000000"),
			buttonForegroundColor: v.nullish(v.string(), "#FFF")
		})
	),
	blocks: v.array(
		v.object({
			id: v.string(),
			type: v.string(),
			settings: v.object({
				image: v.nullish(v.string()),
				rating: v.nullish(v.number()),
				name: v.nullish(v.string()),
				description: v.nullish(v.string())
			})
		})
	)
})

export type ReviewSectionData = v.InferOutput<typeof ReviewSectionDataSchema>
