import { parse } from 'yaml'

export interface ParsedHeadData {
    featured_video_manifest?: string
    keywords?: string
    featured_title?: string
    featured_subtitle?: string
}

//yaml
export const parseHeadData = (headData: string): ParsedHeadData => {
    if (!headData) return {}

    const parsed = parse(headData)

    return {
        featured_video_manifest: parsed.featured_video_manifest,
        keywords: parsed.keywords,
        featured_title: parsed.featured_title,
        featured_subtitle: parsed.featured_subtitle
    }
}