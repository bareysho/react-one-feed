export const getUserSettings = (state) => state.userSettings;

export const getChangePasswordLoading = (state) => getUserSettings(state).isChangePasswordLoading;

export const getChangeEmailLoading = (state) => getUserSettings(state).isChangeEmailLoading;
