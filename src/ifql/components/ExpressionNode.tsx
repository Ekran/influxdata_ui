import React, {PureComponent} from 'react'

import {IFQLContext} from 'src/ifql/containers/IFQLPage'
import FuncSelector from 'src/ifql/components/FuncSelector'
import FuncNode from 'src/ifql/components/FuncNode'

import {Func} from 'src/types/ifql'

interface Props {
  funcNames: any[]
  bodyID: string
  funcs: Func[]
}

// an Expression is a group of one or more functions
class ExpressionNode extends PureComponent<Props> {
  public render() {
    const {bodyID, funcNames, funcs} = this.props
    return (
      <IFQLContext.Consumer>
        {({onDeleteFuncNode, onAddNode, onChangeArg, onGenerateScript}) => {
          return (
            <div className="func-nodes-container">
              <h4>
                <FuncSelector
                  bodyID={bodyID}
                  funcs={funcNames}
                  onAddNode={onAddNode}
                />
              </h4>
              {funcs.map(func => (
                <FuncNode
                  key={func.id}
                  func={func}
                  bodyID={bodyID}
                  onChangeArg={onChangeArg}
                  onDelete={onDeleteFuncNode}
                  onGenerateScript={onGenerateScript}
                />
              ))}
            </div>
          )
        }}
      </IFQLContext.Consumer>
    )
  }
}

export default ExpressionNode
