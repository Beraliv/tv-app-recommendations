import React, { Fragment, FunctionComponent } from "react";
import { ContextReducerParams } from "../../context/ContextReducer";

export const createContextReducer = (
  contextComposition: FunctionComponent<ContextReducerParams>[],
): FunctionComponent<ContextReducerParams> => props => (
  <Fragment>
    {contextComposition.reduce(
      (children, applyCompositionElement) => {
        const wrap = applyCompositionElement({ ...props, children });

        if (wrap !== null) {
          return wrap;
        }

        return children;
      },
      props.children,
    )}
  </Fragment>
);