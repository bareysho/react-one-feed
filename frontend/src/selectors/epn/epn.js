export const getUserCreativesSelector = state => state.epn.creatives;
export const getUserCreativesDataSelector = state => getUserCreativesSelector(state).data;
export const getUserCreativesLoadingStateSelector = state => getUserCreativesSelector(state).isLoading;

export const getParseDescriptionSelector = state => state.epn.parseDescription;
export const getParsedDescriptionSelector = state => getParseDescriptionSelector(state).parsedDescription;
export const getParseDescriptionLoadingStateSelector = state => getParseDescriptionSelector(state).isLoading;

export const getDomainCuttersSelector = state => state.epn.domainCutters;
export const getDomainCuttersDataSelector = state => getDomainCuttersSelector(state).data;
export const getDomainCuttersLoadingStateSelector = state => getDomainCuttersSelector(state).isLoading;
