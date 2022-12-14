import {
  allTokensNew$,
  keeperDaoTokens$,
  tokensV2$,
} from 'services/observables/tokens';
import {
  setAllTokenListTokens,
  setAllTokens,
  setKeeperDaoTokens,
  setStatisticsV3,
  setTokens,
  setTokenLists,
} from 'store/bancor/bancor';
import { getTokenListLS, setTokenListLS } from 'utils/localStorage';
import { loadingLockedBnt$, loadingPositions$, loadingRewards$ } from './user';
import { statisticsV3$ } from 'services/observables/statistics';
import { setv2Pools, setv3Pools } from 'store/bancor/pool';
import {
  setLoadingLockedBnt,
  setLoadingPositions,
  setLoadingRewards,
  setLockedAvailableBNT,
  setPoolTokens,
  setProtectedPositions,
  setProtocolBnBNTAmount,
  setRewards,
  setSnapshots,
} from 'store/liquidity/liquidity';
import {
  lockedAvailableBnt$,
  protectedPositions$,
  protocolBnBNTAmount$,
  rewards$,
  snapshots$,
} from './liquidity';
import {
  setHoldingsRaw,
  setStandardRewards,
  setWithdrawalRequestsRaw,
  setWithdrawalSettings,
} from 'store/portfolio/v3Portfolio';
import {
  portfolioHoldings$,
  portfolioStandardRewards$,
  portfolioWithdrawals$,
  portfolioWithdrawalSettings$,
} from 'services/observables/portfolio';
import {
  listOfLists,
  tokenListsNew$,
  tokenListTokens$,
  userPreferredListIds$,
} from 'services/observables/tokenLists';
import { poolsNew$, poolsV3$ } from 'services/observables/pools';
import { poolTokens$ } from 'services/observables/poolTokensV1';

export const subscribeToObservables = (dispatch: any) => {
  poolsV3$.subscribe((pools) => {
    dispatch(setv3Pools(pools));
  });

  allTokensNew$.subscribe((tokens) => {
    dispatch(setAllTokens(tokens));
  });

  tokensV2$.subscribe((tokens) => {
    dispatch(setTokens(tokens));
  });

  const userListIds = getTokenListLS();

  tokenListsNew$.subscribe((tokenLists) => {
    dispatch(setTokenLists(tokenLists));
  });

  if (userListIds.length === 0) {
    const twoLists = [listOfLists[0].name, listOfLists[1].name];
    setTokenListLS(twoLists);
    userPreferredListIds$.next(twoLists);
  } else userPreferredListIds$.next(userListIds);

  tokenListTokens$.subscribe(({ allTokenListTokens }) => {
    dispatch(setAllTokenListTokens(allTokenListTokens));
  });

  keeperDaoTokens$.subscribe((keeperDaoTokens) => {
    dispatch(setKeeperDaoTokens(keeperDaoTokens));
  });

  poolsNew$.subscribe((pools) => {
    dispatch(setv2Pools(pools));
  });

  statisticsV3$.subscribe((stats) => {
    dispatch(setStatisticsV3(stats));
  });

  protectedPositions$.subscribe((protectedPositions) => {
    dispatch(setProtectedPositions(protectedPositions));
  });

  rewards$.subscribe((rewards) => {
    dispatch(setRewards(rewards));
  });

  snapshots$.subscribe((snapshots) => dispatch(setSnapshots(snapshots)));

  poolTokens$.subscribe((poolTokens) => dispatch(setPoolTokens(poolTokens)));

  lockedAvailableBnt$.subscribe((lockedAvailableBnt) => {
    if (lockedAvailableBnt) {
      dispatch(setLockedAvailableBNT(lockedAvailableBnt));
    }
  });

  loadingPositions$.subscribe((loadingPositions) =>
    dispatch(setLoadingPositions(loadingPositions))
  );
  loadingRewards$.subscribe((loadingRewards) =>
    dispatch(setLoadingRewards(loadingRewards))
  );
  loadingLockedBnt$.subscribe((loadingLockedBnt) =>
    dispatch(setLoadingLockedBnt(loadingLockedBnt))
  );

  portfolioHoldings$.subscribe((holdingsRaw) => {
    dispatch(setHoldingsRaw(holdingsRaw));
  });

  portfolioStandardRewards$.subscribe((rewards) => {
    dispatch(setStandardRewards(rewards));
  });

  portfolioWithdrawals$.subscribe((withdrawalRequests) => {
    dispatch(setWithdrawalRequestsRaw(withdrawalRequests));
  });

  portfolioWithdrawalSettings$.subscribe((withdrawalSettings) => {
    dispatch(setWithdrawalSettings(withdrawalSettings));
  });

  protocolBnBNTAmount$.subscribe((protocolBnBNTAmount) => {
    dispatch(setProtocolBnBNTAmount(protocolBnBNTAmount));
  });
};
