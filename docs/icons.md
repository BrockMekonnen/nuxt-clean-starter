# Icons

Uses [@nuxt/icon](https://nuxt.com/modules/icon) with [Material Design Icons](https://icon-sets.iconify.design/mdi/) (`mdi:`), aligned with Flutter `Icons.*`.

## Usage

```vue
<AppIcon :name="AppIcons.home" size="1.25rem" />
<!-- or -->
<Icon name="mdi:cog" />
```

## Registry

Shared names live in `src/_core/icons/app_icons.ts`. Use them in nav registration and pages so renames stay in one place.

```ts
import { AppIcons } from '@core/icons/app_icons'

registerNavDestinations({
  id: 'home',
  titleKey: 'layoutPage.home',
  icon: AppIcons.home,
  route: '/home',
  order: 1
})
```

## Adding icons

1. Pick a name on [Iconify MDI browse](https://icon-sets.iconify.design/mdi/).
2. Add to `AppIcons` if reused often.
3. Use `mdi:icon-name` in templates.

Other sets (e.g. `fa6-solid:github`) work without config changes; add collections to `nuxt.config.ts` `icon.serverBundle.collections` for local bundling.
