import { useAppSelector } from 'redux/index';
import { Notification, hideAlert } from 'redux/notification/notification';
import { useDispatch } from 'react-redux';
import wait from 'waait';
import { NotificationAlert } from 'elements/notifications/NotificationAlert';

export const NotificationAlerts = () => {
  const dispatch = useDispatch();

  const notifications = useAppSelector<Notification[]>(
    (state) => state.notification.notifications
  );

  const hide = async (id: string) => {
    await wait(1000);
    dispatch(hideAlert(id));
  };

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 top-[85px] right-[20px] flex items-end pointer-events-none sm:items-start"
    >
      <div className="w-full flex flex-col items-center space-y-15 sm:items-end">
        {notifications
          .filter((x) => x.showSeconds)
          .map((notification) => {
            return (
              <NotificationAlert
                key={notification.id}
                data={notification}
                onRemove={hide}
              />
            );
          })}
      </div>
    </div>
  );
};