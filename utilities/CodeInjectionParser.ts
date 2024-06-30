import { parse } from 'yaml'

export interface ParsedHeadData {
    has_feature_video: boolean
    feature_video_manifest: string
    keywords: string
}

//yaml
export const parseHeadData = (headData: string): ParsedHeadData => {
    const parsed = parse(headData)
    if (!parsed) {
        return {
            has_feature_video: false,
            feature_video_manifest: '',
            keywords: ''
        }
    }

    return {
        has_feature_video: parsed.has_feature_video || false,
        feature_video_manifest: parsed.feature_video_manifest || '',
        keywords: parsed.keywords
    }
}