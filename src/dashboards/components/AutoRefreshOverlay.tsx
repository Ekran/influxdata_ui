// Libraries
import React, {FC, useContext} from 'react'

// Components
import {
  Overlay,
  Grid,
  Button,
  ComponentColor,
  SelectDropdown,
  SlideToggle,
  InputLabel,
  ComponentStatus,
} from '@influxdata/clockface'
import {OverlayContext} from 'src/overlays/components/OverlayController'
import AutoRefreshDropdown from 'src/shared/components/dropdown_auto_refresh/AutoRefreshDropdown'
import TimeRangeDropdown from 'src/shared/components/DeleteDataForm/TimeRangeDropdown'

// Types
import {CustomTimeRange, AutoRefreshStatus, TimeRangeDirection} from 'src/types'

// Context
import AutoRefreshContextProvider, {
  AutoRefreshContext,
} from 'src/dashboards/components/RefreshContext'

import './AutoRefresh.scss'

// This array creates an array of [0...24] for the hours selection
const INACTIVITY_ARRAY = [...Array(25).keys()].map(num => num.toString())
// This line replaces the 0 (the first value) with 'None' for the dropdown
INACTIVITY_ARRAY[0] = 'None'

export const AutoRefreshForm: FC = () => {
  const {onClose} = useContext(OverlayContext)
  const {state, dispatch: setRefreshContext, activateAutoRefresh} = useContext(
    AutoRefreshContext
  )

  const handleChooseAutoRefresh = milliseconds => {
    const status =
      milliseconds === 0 ? AutoRefreshStatus.Paused : AutoRefreshStatus.Active
    setRefreshContext({
      type: 'SET_REFRESH_MILLISECONDS',
      refreshMilliseconds: {status, interval: milliseconds},
    })
  }

  return (
    <Overlay.Container maxWidth={500} testID="auto-refresh-overlay">
      <Overlay.Header title="Configure Auto Refresh" onDismiss={onClose} />
      <Grid>
        <Grid.Column className="refresh-form-column">
          <div className="refresh-form-container">
            <span>Select Refresh Frequency: </span>
            <AutoRefreshDropdown
              onChoose={handleChooseAutoRefresh}
              selected={state.refreshMilliseconds}
            />
          </div>
          <div className="refresh-form-container">
            <span className="refresh-form-container-child">Until: </span>
            <InputLabel
              active={!state.infiniteDuration}
              className="refresh-form-time-label"
            >
              Custom
            </InputLabel>
            <SlideToggle
              active={state.infiniteDuration}
              onChange={() =>
                setRefreshContext({
                  type: 'SET_INFINITE_DURATION',
                  infiniteDuration: !state.infiniteDuration,
                })
              }
              className="refresh-form-timerange-toggle"
            />
            <InputLabel
              active={state.infiniteDuration}
              className="refresh-form-time-label"
            >
              Indefinite
            </InputLabel>
          </div>
          {!state.infiniteDuration && (
            <div className="refresh-form-container reverse">
              <TimeRangeDropdown
                timeRange={state.duration}
                onSetTimeRange={(timeRange: CustomTimeRange) => {
                  setRefreshContext({
                    type: 'SET_DURATION',
                    duration: timeRange,
                  })
                  setRefreshContext({
                    type: 'SET_INFINITE_DURATION',
                    infiniteDuration: false,
                  })
                }}
                singleDirection={TimeRangeDirection.Upper}
                className="timerange-dropdown"
              />
            </div>
          )}
          <div className="refresh-form-container">
            <span className="refresh-form-container-child">
              Inactivity Timeout:{' '}
            </span>
            <div
              className={`refresh-form-container-child ${
                state.inactivityTimeout === 'None' ? 'inactive' : 'active'
              }`}
            >
              <SelectDropdown
                options={INACTIVITY_ARRAY}
                selectedOption={state.inactivityTimeout}
                onSelect={(timeout: string) =>
                  setRefreshContext({
                    type: 'SET_INACTIVITY_TIMEOUT',
                    inactivityTimeout: timeout,
                  })
                }
                buttonColor={ComponentColor.Default}
                testID="inactivity-timeout-dropdown"
              />
              {state.inactivityTimeout !== 'None' && (
                <SelectDropdown
                  className="refresh-form-timeout-dropdown"
                  options={['Hours', 'Days']}
                  selectedOption={state.inactivityTimeoutCategory}
                  onSelect={(timeoutCategory: string) =>
                    setRefreshContext({
                      type: 'SET_INACTIVITY_TIMEOUT_CATEGORY',
                      inactivityTimeoutCategory: timeoutCategory,
                    })
                  }
                  buttonColor={ComponentColor.Default}
                  testID="inactivity-timeout-category-dropdown"
                />
              )}
            </div>
          </div>
          <div className="refresh-form-buttons">
            <Button
              onClick={onClose}
              text="Cancel"
              color={ComponentColor.Default}
              className="refresh-form-cancel-button"
              testID="refresh-form-cancel-button"
            />
            <Button
              onClick={() => {
                activateAutoRefresh()
                onClose()
              }}
              text="Enable"
              color={ComponentColor.Success}
              className="refresh-form-activate-button"
              testID="refresh-form-activate-button"
              status={
                state.refreshMilliseconds.interval === 0
                  ? ComponentStatus.Disabled
                  : ComponentStatus.Default
              }
            />
          </div>
        </Grid.Column>
      </Grid>
    </Overlay.Container>
  )
}
export const AutoRefreshOverlay: FC = () => {
  return (
    <AutoRefreshContextProvider>
      <AutoRefreshForm />
    </AutoRefreshContextProvider>
  )
}