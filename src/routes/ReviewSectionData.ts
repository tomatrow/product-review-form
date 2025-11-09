import * as v from "valibot"

const VideoSourceSchema = v.object({
	format: v.picklist(["mov", "mp4", "m3u8"]),
	height: v.number(),
	mime_type: v.string(),
	url: v.string(),
	width: v.number()
})

const PreviewImageSchema = v.object({
	aspect_ratio: v.number(),
	height: v.number(),
	width: v.number(),
	src: v.string()
})

const VideoSchema = v.object({
	id: v.number(),
	alt: v.nullish(v.string()),
	aspect_ratio: v.number(),
	duration: v.number(),
	media_type: v.literal("video"),
	position: v.nullish(v.number()),
	preview_image: v.nullish(PreviewImageSchema),
	sources: v.array(VideoSourceSchema)
})

export const ReviewSectionDataSchema = v.object({
	settings: v.nullish(
		v.object({
			monthlyRotationCount: v.nullish(v.number(), 6),
			smallCardFontSize: v.nullish(v.string(), "16px"),
			largeCardFontSize: v.nullish(v.string(), "24px"),
			columnCount: v.nullish(v.number(), 3),
			columnBreakPoint: v.nullish(v.string(), "600px"),
			email: v.nullish(v.string()),
			gridTitle: v.nullish(v.string(), "Reviews"),
			formTitle: v.nullish(v.string(), "Write Review"),
			paddingTop: v.nullish(v.string(), "0"),
			paddingBottom: v.nullish(v.string(), "0"),
			buttonBackgroundColor: v.nullish(v.string(), "#000000"),
			buttonForegroundColor: v.nullish(v.string(), "#FFF"),
			cardFont: v.object({
				baseline_ratio: v.number(),
				fallback_families: v.string(),
				family: v.string(),
				style: v.string(),
				system: v.nullish(v.boolean()),
				weight: v.string(),
				variants: v.array(
					v.object({
						baseline_ratio: v.number(),
						fallback_families: v.string(),
						family: v.string(),
						style: v.string(),
						system: v.nullish(v.boolean()),
						weight: v.string()
					})
				)
			})
		})
	),
	blocks: v.array(
		v.object({
			id: v.string(),
			type: v.string(),
			settings: v.object({
				image: v.nullish(v.string()),
				video: v.nullish(VideoSchema),
				rating: v.nullish(v.number()),
				name: v.nullish(v.string()),
				description: v.nullish(v.string())
			})
		})
	)
})

export type ReviewSectionData = v.InferOutput<typeof ReviewSectionDataSchema>
