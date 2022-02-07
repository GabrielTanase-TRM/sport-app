import React from "react";
import { useSelector } from "react-redux";
import { getBadgeNotifications } from "../../redux/selectors";

import { isEmpty, isNil } from "lodash";

import { BadgeNotification } from "../../redux/interface";
import { LayoutProps } from "./index.interface";

import { NotificationBadge } from "../NotificationBadge";
import { Navigation } from "../Navigation";

const Layout: React.FC<LayoutProps> = ({ deferredPrompt, children }) => {
  const badgeNotifications = useSelector(getBadgeNotifications);

  const renderBadgesError = (badgesError: Array<BadgeNotification>) => (
    <div className="flex flex-col items-end fixed top-10 right-3 z-30 max-w-3/4">
      {badgesError.map((badgeError: BadgeNotification) => (
        <NotificationBadge
          key={badgeError.id}
          errorId={badgeError.id}
          isError={badgeError.isError}
          message={badgeError.message}
          secondDuration={badgeError.secondDuration}
        />
      ))}
    </div>
  );

  return (
    <div className="flex w-screen h-screen backgroundColo">
      <Navigation deferredPrompt={deferredPrompt} />
      <main className="w-full h-full">
        {!isEmpty(badgeNotifications) && renderBadgesError(badgeNotifications)}
        {children}
      </main>
    </div>
  );
};
export default Layout;
