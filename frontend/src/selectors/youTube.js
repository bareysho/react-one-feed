export const getYouTubeSelector = (state) => state.youTube;

export const getVideoInformationSelector = (state) => getYouTubeSelector(state).videoInformation;
export const getConvertingVideoSelector = (state) => getYouTubeSelector(state).convertingVideo;

export const getConvertingProgressSelector = (state) => getConvertingVideoSelector(state).convertingProgress;
