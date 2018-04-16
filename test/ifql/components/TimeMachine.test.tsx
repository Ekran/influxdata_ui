import React from 'react'
import {shallow} from 'enzyme'
import TimeMachine from 'src/ifql/components/TimeMachine'

const setup = () => {
  const props = {
    funcs: [],
    script: '',
    suggestions: [],
    onAddNode: () => {},
    onChangeScript: () => {},
    onSubmitScript: () => {},
    onDeleteFuncNode: () => {},
    onChangeArg: () => {},
  }

  const wrapper = shallow(<TimeMachine {...props} />)

  return {
    wrapper,
  }
}

describe('IFQL.Components.TimeMachine', () => {
  describe('rendering', () => {
    it('renders', () => {
      const {wrapper} = setup()

      expect(wrapper.exists()).toBe(true)
    })
  })
})
