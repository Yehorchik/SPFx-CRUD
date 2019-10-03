import { IStackStyles, getTheme, IStackTokens } from "office-ui-fabric-react";
import { mediaQuery } from "../mediaQuery";



export const mainStyle: IStackStyles = {
    root: {
      display : 'flex',
      padding: 5,
      background: getTheme().palette.white,
      borderRadius: 2,
      borderColor: getTheme().palette.black,
      maxHeight: '320px',
      overflowY:'scroll',
      selectors : {       
            [mediaQuery.screenXMedium]: {
                width : '200px',
            },
            [mediaQuery.screenSmall]: {
                alignItems: 'center',
                justifyContent : 'center',
                width : '100px'
            },
            [mediaQuery.screenXSmall]: {
                alignItems: 'center',
                justifyContent : 'center',
                width : '100px'
            },
        }
    }
};


export const avatarStyle: IStackStyles = {
    root : {
        width: 'max-content',
        selectors : {
            
            [mediaQuery.screenSmall]: {
                display : 'flex',
                flexDirection : "column",
            },
            [mediaQuery.screenXSmall]: {
                display : 'flex',
                flexDirection : "column",
            },
        }
    }
}


export const itemStyles: IStackStyles = {
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        textAlign: 'center'
    }
}


export const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10
};

