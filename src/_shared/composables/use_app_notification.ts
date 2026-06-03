import { toast } from 'vue-sonner'

const TOAST_DURATION_MS = 5000

export type AppNotificationOptions = {
  title?: string
  description: string
}

/**
 * Ephemeral UI feedback (aligned with Flutter `CustomToast`).
 * Use for async action failures/successes — not field validation or global banners.
 */
export function useAppNotification() {
  const { t } = useI18n()

  function showError(options: AppNotificationOptions) {
    if (!import.meta.client) return
    toast.error(options.title ?? t('notifications.errorTitle'), {
      description: options.description,
      duration: TOAST_DURATION_MS
    })
  }

  function showSuccess(options: AppNotificationOptions) {
    if (!import.meta.client) return
    toast.success(options.title ?? t('notifications.successTitle'), {
      description: options.description,
      duration: TOAST_DURATION_MS
    })
  }

  return { showError, showSuccess }
}
