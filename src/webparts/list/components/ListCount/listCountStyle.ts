import { IStackStyles, IStackTokens } from "office-ui-fabric-react";
import { mediaQuery } from "../mediaQuery";

 export const itemStyles: IStackStyles = {
    root: {
        fontSize: "30px",
        selectors : {
            [mediaQuery.screenMedium] : {
                fontSize: "20px",
            },
            [mediaQuery.screenSmall] : {
              fontSize: "20px",
            },
            [mediaQuery.screenXSmall] : {
                fontSize: "13px",
              }
        }
    }
}


export const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10
};

export const rootStyle: IStackStyles = {
    root:{
        marginBottom: "10px",
        selectors : {
            [mediaQuery.screenSmall] : {
              justifyContent: 'center',
              marginBottom: '4px'
            },
            [mediaQuery.screenXSmall] : {
                justifyContent: 'center',
                marginBottom: '3px'
              }
        }
    }
};