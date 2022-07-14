import {TimeZone, Theme, NavBarState, VersionInfo, FlowsCTA} from 'src/types'

export enum ActionTypes {
  EnablePresentationMode = 'ENABLE_PRESENTATION_MODE',
  DisablePresentationMode = 'DISABLE_PRESENTATION_MODE',
  SetNavBarState = 'SET_NAV_BAR_STATE',
  SetFluxQueryBuilder = 'SET_FLUX_QUERY_BUILDER',
  SetAutoRefresh = 'SET_AUTOREFRESH',
  SetTimeZone = 'SET_APP_TIME_ZONE',
  SetVersionInfo = 'SET_VERSION_INFO',
  TemplateControlBarVisibilityToggled = 'TemplateControlBarVisibilityToggledAction',
  SetFlowsCTA = 'SET_FLOWS_CTA',
  Noop = 'NOOP',
  SetSubscriptionsCertificateInterest = 'SET_SUB_CERT_INTEREST',
}

export type Action =
  | ReturnType<typeof enablePresentationMode>
  | ReturnType<typeof disablePresentationMode>
  | ReturnType<typeof setFluxQueryBuilder>
  | ReturnType<typeof setNavBarState>
  | ReturnType<typeof setAutoRefresh>
  | ReturnType<typeof setTimeZone>
  | ReturnType<typeof setTheme>
  | ReturnType<typeof setVersionInfo>
  | ReturnType<typeof setFlowsCTA>
  | ReturnType<typeof setSubscriptionsCertificateInterest>

// ephemeral state action creators

export const enablePresentationMode = () =>
  ({
    type: ActionTypes.EnablePresentationMode,
  } as const)

export const disablePresentationMode = () =>
  ({
    type: ActionTypes.DisablePresentationMode,
  } as const)

// persistent state action creators

export const setTheme = (theme: Theme) => ({type: 'SET_THEME', theme} as const)

export const setFluxQueryBuilder = (active: boolean) =>
  ({
    type: ActionTypes.SetFluxQueryBuilder,
    active,
  } as const)

export const setNavBarState = (navBarState: NavBarState) =>
  ({
    type: ActionTypes.SetNavBarState,
    navBarState,
  } as const)

export const setAutoRefresh = (milliseconds: number) =>
  ({
    type: ActionTypes.SetAutoRefresh,
    payload: {
      milliseconds,
    },
  } as const)

export const setTimeZone = (timeZone: TimeZone) =>
  ({
    type: ActionTypes.SetTimeZone,
    payload: {timeZone},
  } as const)

export const setVersionInfo = (versionInfo: VersionInfo) =>
  ({
    type: ActionTypes.SetVersionInfo,
    payload: {versionInfo},
  } as const)

export const setFlowsCTA = (flowsCTA: FlowsCTA) =>
  ({
    type: ActionTypes.SetFlowsCTA,
    payload: {flowsCTA},
  } as const)

export const setSubscriptionsCertificateInterest = () =>
  ({
    type: ActionTypes.SetSubscriptionsCertificateInterest,
  } as const)
