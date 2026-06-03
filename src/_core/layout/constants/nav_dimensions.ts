/** Matches Flutter `expandedDrawerWidth` and collapsed rail width. */
export const NAV_DRAWER_WIDTH_PX = 280
export const NAV_RAIL_WIDTH_PX = 80

/** Flutter: expanded tile height 52, collapsed rail destination height 56. */
export const NAV_DRAWER_ITEM_HEIGHT_PX = 52
export const NAV_RAIL_ITEM_HEIGHT_PX = 56

/** App bar / side header row height (Flutter `SizedBox(height: 56)`). */
export const NAV_HEADER_HEIGHT_PX = 56

/** Side nav menu button (`h-10 w-10`). */
export const NAV_MENU_BUTTON_SIZE_PX = 40

/**
 * Shared horizontal center for menu + destination icons (rail and drawer).
 * Rail width is 80px → center at 40px keeps the hamburger fixed when toggling.
 */
export const NAV_SIDE_ICON_CENTER_X_PX = NAV_RAIL_WIDTH_PX / 2

/** Menu button `padding-inline-start` so the icon center sits on [NAV_SIDE_ICON_CENTER_X_PX]. */
export const NAV_HEADER_MENU_INSET_PX =
  NAV_SIDE_ICON_CENTER_X_PX - NAV_MENU_BUTTON_SIZE_PX / 2

/**
 * Drawer item `padding-left` so icon centers align with the menu (margin-left is 12px).
 * 12 + padding + half of 32px icon shell = center.
 */
export const NAV_DRAWER_ITEM_PADDING_LEFT_PX =
  NAV_SIDE_ICON_CENTER_X_PX - 12 - 16
