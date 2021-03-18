import { createSlice } from '@reduxjs/toolkit';
import { deleteLinkedAccount, fetchLinkedAccount, getLinkedAccounts } from 'actions/linkedAccounts';
import { linkEpnAccount } from 'actions/epn';

export const initialState = {
  linkedAccounts: [],
  linkedAccountsIds: []
};

const unsetLoadingLinkedAccount = (id) => (state, action) => {
  const { linkedAccounts } = state;

  return ({
    ...state,
    linkedAccounts: { ...linkedAccounts, [id || action.meta.arg.id]: { isLoading: false, type: action.meta.arg.type } },
  })
}

const pendingFetchLinkedAccount = (id) => (state, action) => {
  const { linkedAccounts } = state;

  return ({
    ...state,
    linkedAccounts: { ...linkedAccounts, [id || action.meta.arg.id]: { isLoading: true, type: action.meta.arg.type } },
  })
}

const rejectedFetchLinkedAccount = (id) => (state, action) => {
  const { linkedAccounts } = state;
  const linkedAccountsUpdated = { ...linkedAccounts };

  delete linkedAccountsUpdated[id || action.meta.arg.id];

  return ({
    ...state,
    linkedAccounts: { ...linkedAccountsUpdated },
  })
}

const fulfilledFetchLinkedAccount = (id) => (state, action) => {
  const { linkedAccounts } = state;
  const linkedAccountsUpdated = { ...linkedAccounts };

  delete linkedAccountsUpdated[id || action.meta.arg.id];

  linkedAccountsUpdated[action.payload.accountId] = { ...action.payload, type: action.meta.arg.type }

  return ({
    ...state,
    linkedAccounts: { ...linkedAccountsUpdated },
  })
}

const pendingAddEpnAccount = (state, action) => pendingFetchLinkedAccount(action.meta.arg.clientId)(state, action);
const rejectedAddEpnAccount = (state, action) => {
  return ({
    ...state,
    ...rejectedFetchLinkedAccount(action.meta.arg.clientId)(state, action),
    epnAuthError: action.payload
  })
};
const fulfilledAddEpnAccount = (state, action) => fulfilledFetchLinkedAccount(action.meta.arg.clientId)(state, action);

export const linkedAccountsSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(deleteLinkedAccount.pending, pendingFetchLinkedAccount());
    builder.addCase(deleteLinkedAccount.rejected, unsetLoadingLinkedAccount());
    builder.addCase(deleteLinkedAccount.fulfilled, (state, action) => {
      return ({
        ...state,
        ...rejectedFetchLinkedAccount()(state, action),
        linkedAccountsIds: state.linkedAccountsIds.filter(account => account.id !== action.meta.arg.id),
      })
    });
    builder.addCase(fetchLinkedAccount.pending, pendingFetchLinkedAccount());
    builder.addCase(fetchLinkedAccount.fulfilled, fulfilledFetchLinkedAccount());
    builder.addCase(fetchLinkedAccount.rejected, rejectedFetchLinkedAccount());
    builder.addCase(linkEpnAccount.pending, pendingAddEpnAccount);
    builder.addCase(linkEpnAccount.fulfilled, fulfilledAddEpnAccount);
    builder.addCase(linkEpnAccount.rejected, rejectedAddEpnAccount);
    builder.addCase(getLinkedAccounts.fulfilled, (state, action) => {
      return ({
        ...state,
        linkedAccountsIds: action.payload,
      })
    });
  },
  initialState,
  name: '@linkedAccounts',
});
