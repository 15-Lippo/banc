import { ReactComponent as IconTrade } from 'assets/icons/trade.svg';
import { ReactComponent as IconEarn } from 'assets/icons/earn.svg';
import { ReactComponent as IconPortfolio } from 'assets/icons/portfolio.svg';
import { ReactComponent as IconMore } from 'assets/icons/more.svg';
import { useState } from 'react';
import { MobileSidebar } from './MobileSidebar';
import { SettingsMenuContent } from 'elements/settings/SettingsMenu';
import { BancorURL } from 'router/bancorURL.service';
import { Navigate } from 'components/navigate/Navigate';

export const MobileBottomNav = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="md:hidden fixed bottom-0 flex items-center justify-between px-30 w-full h-60 z-30 bg-white dark:bg-black shadow-header text-10 text-black dark:text-white-low dark:text-white-low">
      <Navigate
        to={BancorURL.trade()}
        className="flex flex-col items-center gap-4"
      >
        <IconTrade className="w-16 text-black dark:text-white" />
        Trade
      </Navigate>
      <Navigate
        to={BancorURL.earn}
        className="flex flex-col items-center gap-4"
      >
        <IconEarn className="w-18 text-black dark:text-white" />
        Earn
      </Navigate>
      <Navigate
        to={BancorURL.portfolio}
        className="flex flex-col items-center gap-4"
      >
        <IconPortfolio className="w-14 text-black dark:text-white" />
        Portfolio
      </Navigate>
      <button
        onClick={() => setShow(true)}
        className="flex flex-col items-center gap-[8px]"
      >
        <IconMore className="w-18 text-black dark:text-white" />
        More
      </button>

      <MobileSidebar show={show} setShow={setShow} showDarkMode>
        <SettingsMenuContent mobile />
      </MobileSidebar>
    </div>
  );
};
