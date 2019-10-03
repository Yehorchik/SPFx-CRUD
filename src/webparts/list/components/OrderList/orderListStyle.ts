import { ITextStyles, IStackStyles, getTheme, IStackTokens } from "office-ui-fabric-react";
import { mediaQuery } from "../mediaQuery";

export const smallTextStyle : ITextStyles = {
    root : {
        fontSize : '12px',
        selectors : {
            [mediaQuery.screenMedium]: {
                fontSize : '6px',
            },
            [mediaQuery.screenSmall]: {
                fontSize : '5px',
                textAlign: 'center', 
            },
            [mediaQuery.screenXSmall]: {
                fontSize : '5px',
                textAlign: 'center',
            },
        }
    }
}

export const mediumTextStyle: ITextStyles = {
    root : {
        fontSize : '14px',
        fontWeight: "500",
        selectors : {
            [mediaQuery.screenMedium]: {
                fontSize : '8px',
                fontWeight: "500",
            },
            [mediaQuery.screenSmall]: {
                textAlign: 'center',
                fontSize : '8px',
                fontWeight: "500",
            },
            [mediaQuery.screenXSmall]: {
                fontSize : '6px',
                textAlign: 'center',
            },
            
        }
    }
}

export const containerStyle : IStackStyles = {
    root : {
        display:'flex',
        justifyContent : 'center',
        padding : 10,
        selectors : {
            [mediaQuery.screenMedium]: {
                flexDirection : "column",
                alignItems: 'center',
                padding : 7,
            } ,
            [mediaQuery.screenSmall]: {
                flexDirection : "column",
                alignItems: 'center',
                padding : 5,
            },
            [mediaQuery.screenXSmall]: {
                flexDirection : "column",
                alignItems: 'center',
                padding : 4,
            },
            [mediaQuery.screenXMedium]: {
                flexDirection : "column",
                alignItems: 'center',
                padding : 9,
            }   
        }
    }
}

export const marginTop : IStackStyles = {
    root : {
        selectors : {
            [mediaQuery.screenXMedium]: {
               marginTop : '30px'
            }  ,

            [mediaQuery.screenMedium]: {
                marginTop : '20px'
            },

            [mediaQuery.screenSmall]: {
                marginTop : '15px'
            },
            [mediaQuery.screenXSmall]: {
                marginTop : '10px'
             }    
        }
    }
}

export const acceptStyle: IStackStyles = {
    root: {
      padding: 5,
      background: getTheme().palette.white,
      borderLeft: "3px solid",
      borderRadius: 2,
      borderColor: getTheme().palette.greenLight,
      cursor : "pointer"
    }
};

export const rejectStyle: IStackStyles = {
    root: {
      padding: 5,
      background: getTheme().palette.white,
      borderRadius: 2,
      borderLeft: "3px solid",
      borderColor: getTheme().palette.blueLight
    }
};

export const itemStyles: IStackStyles = {
    root : {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        textAlign: 'center',
        selectors: {
            [mediaQuery.screenXSmall]: {
                margin: '3px'
            }  ,
            [mediaQuery.screenXMedium]: {
                marginBottom : "10px"
            }  
        }
    }
};

export const stackButtons: IStackStyles = {
    root : {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        textAlign: 'center',
        selectors  : {
            [mediaQuery.screenXSmall]: {
                flexDirection : 'column',
                alignItems: 'center',
                textAlign: 'center',
            }  
        }
    }
};

export const verticalGapStackTokens: IStackTokens = {
    childrenGap: 10,
};

export const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    [mediaQuery.screenSmall]: {
        childrenGap: 0
    },
    [mediaQuery.screenXSmall]: {
       childrenGap: 0
    },
};
