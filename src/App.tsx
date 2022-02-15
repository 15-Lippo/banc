import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { UnsupportedNetwork } from 'pages/UnsupportedNetwork';
import { LayoutHeader } from 'elements/layoutHeader/LayoutHeader';
import { useAutoConnect } from 'services/web3/wallet/hooks';
import { setUser } from 'services/observables/user';
import { NotificationAlerts } from 'elements/notifications/NotificationAlerts';
import { setNetwork } from 'services/observables/network';
import { useDispatch } from 'react-redux';
import {
  setDarkMode,
  setSlippageTolerance,
  setUsdToggle,
} from 'redux/user/user';
import {
  Notification,
  setNotifications,
} from 'redux/notification/notification';
import { useAppSelector } from 'redux/index';
import { googleTagManager } from 'services/api/googleTagManager';
import { EthNetworks } from 'services/web3/types';
import {
  getDarkModeLS,
  getNotificationsLS,
  getSlippageToleranceLS,
  getUsdToggleLS,
  setNotificationsLS,
} from 'utils/localStorage';
import { subscribeToObservables } from 'services/observables/triggers';
import { isUnsupportedNetwork } from 'utils/helperFunctions';
import { MarketingBanner } from './elements/marketingBanner/MarketingBanner';
import { keepWSOpen } from 'services/web3';
import { Router } from 'pages/Router';
import { MobileBottomNav } from 'elements/layoutHeader/MobileBottomNav';

export const App = () => {
  const dispatch = useDispatch();
  const { chainId, account } = useWeb3React();
  useAutoConnect();
  const unsupportedNetwork = isUnsupportedNetwork(chainId);
  const notifications = useAppSelector<Notification[]>(
    (state) => state.notification.notifications
  );

  useEffect(() => {
    const usd = getUsdToggleLS();
    if (usd) dispatch(setUsdToggle(usd));

    const notify = getNotificationsLS();
    if (notify) dispatch(setNotifications(notify));

    const slippage = getSlippageToleranceLS();
    if (slippage) dispatch(setSlippageTolerance(slippage));

    subscribeToObservables(dispatch);
    keepWSOpen();

    const dark = getDarkModeLS();
    if (dark) dispatch(setDarkMode(dark));
  }, [dispatch]);

  useEffect(() => {
    setNotificationsLS(notifications);
  }, [notifications]);

  useEffect(() => {
    if (chainId) setNetwork(chainId);
    else setNetwork(EthNetworks.Mainnet);
  }, [chainId]);

  useEffect(() => {
    setUser(account, dispatch);
    googleTagManager();
  }, [account, dispatch]);

  return (
    <BrowserRouter>
      <LayoutHeader />
      {unsupportedNetwork ? (
        <UnsupportedNetwork />
      ) : (
        <>
          <MarketingBanner />
          <main className="max-w-[1400px] mx-auto md:py-[75px] py-60">
            <Router />
          </main>
        </>
      )}
      <MobileBottomNav />
      <NotificationAlerts />
    </BrowserRouter>
  );
};
