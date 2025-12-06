import { NotificationGroup, FilterTab } from '../types';

/**
 * Filters notification groups by the selected tab
 * @param groups - Array of notification groups
 * @param activeTab - Currently selected filter tab
 * @returns Filtered groups (only groups with matching notifications)
 */
export const filterNotificationGroups = (
  groups: NotificationGroup[],
  activeTab: FilterTab,
): NotificationGroup[] => {
  if (activeTab === 'All') return groups;

  return groups
    .map(group => ({
      ...group,
      notifications: group.notifications.filter(
        n => n.category.toLowerCase() === activeTab.toLowerCase(),
      ),
    }))
    .filter(group => group.notifications.length > 0);
};
