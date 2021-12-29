import React from "react";
import { useSelector } from "react-redux";
import { getBadgeNotifications, getStore } from "../../Redux/selectors";

import { isEmpty } from "lodash";

import { BadgeNotification } from "../../Redux/interface";
import { NotificationBadge } from "../NotificationBadge";
import { Navigation } from "../Navigation";

const Layout = ({ children }) => {
  const badgeNotifications = useSelector(getBadgeNotifications);
  const store = useSelector(getStore);
  console.log(store);

  const renderBadgesError = (badgesError: Array<BadgeNotification>) => (
    <div className="flex flex-col items-end fixed top-10 right-3 z-50 max-w-3/4">
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
    <div className="flex w-screen h-screen backgroundColor text-turquoise">
      <Navigation />
      <main className="w-full h-full">
        {!isEmpty(badgeNotifications) && renderBadgesError(badgeNotifications)}
        {children}
      </main>
    </div>
  );
};
export default Layout;
