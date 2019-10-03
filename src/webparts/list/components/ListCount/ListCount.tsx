import * as React from 'react';
import  {useState} from 'react';
import {OrderList} from '../OrderList/OrderList';
import { Stack , getTheme} from 'office-ui-fabric-react';
import { ListOfProps } from '../List/ListOfProps';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {itemStyles,horizontalGapStackTokens,rootStyle} from './listCountStyle';
import styles from './ListCount.module.scss';





// const circleStyle ={
//     borderRadius: "50%",
//     width: '50px',
//     height: '50px',
//     textAlign: 'center',
//     verticalAlign: 'middle',
//     lineHeight: '50px',
//     border: '1px solid',
//     cursor: 'pointer'
// };


export const ListCount: React.FunctionComponent<ListOfProps> = ({lists}) => {
     
    // Count of LIST 
    var acceptedInvites = lists.filter(list => list.isAccept != false);
    var inProgress = lists.filter(list => list.isAccept != true);
    // var allInvites = lists;


    //COLORS
    // const orangeColor = getTheme().palette.orange;
    const greenColor = getTheme().palette.greenLight;
    const blueColor =  getTheme().palette.blueLight;
    const whiteColor = getTheme().palette.white;

    //STATES 
    const [acceptedBackgroundColor, setAcceptedBackgroundColor] = useState('');
    const [acceptedColor, setAcceptedColor] = useState('');
    const [inProgressBackgroundColor, setInProgressBackgroundColor] = useState('');
    const [inProgressColor, setInProgressColor] = useState('');
    // const [allBackgroundColor, setAllBackgroundColor] = useState(orangeColor);
    // const [allColor, setAllColor] = useState(whiteColor);
    const [propsToPass, setProps] = useState(acceptedInvites);
    const [circle, setCircle] = useState('Accepted')

    // const inProgressStyle:IStackStyles = {
    //     root: {
    //         ...circleStyle,
    //         borderColor : blueColor,
    //         backgroundColor : inProgressBackgroundColor,
    //         color: inProgressColor,
    //         selectors : {
    //             ':hover' : {
    //                 backgroundColor:  blueColor,
    //                 color: whiteColor
    //             }
    //         }
    //     }  
    // };

    // const acceptStyle:IStackStyles = {
    //     root: {
    //         ...circleStyle,
    //         borderColor : greenColor,
    //         backgroundColor : acceptedBackgroundColor,
    //         color : acceptedColor,
    //         selectors : {
    //             ':hover' : {
    //                 backgroundColor: greenColor,
    //                 color: whiteColor
    //             }
    //         }
    //     } 
    // };

    // const allStyle:IStackStyles = {
    //     root: {
    //         ...circleStyle,
    //         borderColor : orangeColor,
    //         backgroundColor : allBackgroundColor,
    //         color: allColor,
    //         selectors : {
    //             ':hover' : {
    //                 backgroundColor: orangeColor,
    //                 color: whiteColor
    //             }
    //         }
    //     } 
    // };
    
    


    const changeActiveStatus = (activeCircle) =>{
        setCircle(activeCircle);
        // if(activeCircle == "All") {
        //    setInProgressBackgroundColor('');
        //    setInProgressColor('')
        //    setAcceptedBackgroundColor('');
        //    setAcceptedColor('')
        //    setAllBackgroundColor(orangeColor);
        //    setAllColor(whiteColor);
        //    setProps(allInvites)
        // } 
        if (activeCircle== "Accepted"){
            setAcceptedBackgroundColor(greenColor);
            setAcceptedColor(whiteColor)
            setInProgressBackgroundColor('');
            setInProgressColor('');
            // setAllBackgroundColor('');
            // setAllColor('');
            setProps(acceptedInvites)
        }
        else if (activeCircle == "inProgress"){
            setAcceptedBackgroundColor('');
            setAcceptedColor('')
            setInProgressBackgroundColor(blueColor);
            setInProgressColor(whiteColor);
            // setAllBackgroundColor('');
            // setAllColor('');
            setProps(inProgress);
        }
        else
            setProps(lists) 
    }


    

    return(
        <Stack>
            <Stack horizontal styles = {rootStyle} tokens={horizontalGapStackTokens} >

                <Stack className = {styles.iconContainer} styles={itemStyles}>
                    <Icon onClick={() => changeActiveStatus("Accepted")} iconName="AllApps" className= {styles.icon} />
                </Stack>

                <Stack className = {styles.iconContainer}  styles={itemStyles}>
                    <Text className={styles.newInvites}>{inProgress.length}</Text>
                    <Icon onClick={() => changeActiveStatus("inProgress")} iconName="Message" className= {styles.icon} />
                </Stack>
                {/* <Stack  grow styles={itemStyles} tokens={horizontalGapStackTokens}>
                        <Text variant = 'medium'>Accepted</Text>
                        <Stack onClick={() => changeActiveStatus("Accepted")} styles = {acceptStyle} className={styles.circleShadow}>
                            <Text variant = 'medium'>{acceptedInvites.length}</Text>
                        </Stack>  
                         <button onClick={() => changeActiveStatus("Accepted")} className={circle == "Accepted" ? styles.acceptedButtonActive : styles.acceptedButton}> Accepted {acceptedInvites.length} </button>
                </Stack>
                <Stack  grow styles={itemStyles} tokens={horizontalGapStackTokens}>
                        <button onClick={() => changeActiveStatus("inProgress")} className={circle == "inProgress" ? styles.inProgressButonActive : styles.inProgressButton}> In Progress {inProgress.length} </button>
                        <Text variant = 'medium'>In Progress</Text>
                        <Stack onClick={() => changeActiveStatus("inProgress")} styles = {inProgressStyle} className={styles.circleShadow}>
                            <Text variant = 'medium'>{inProgress.length}</Text>
                        </Stack>  
                </Stack> */}

                {/* <Stack grow styles={itemStyles} tokens={horizontalGapStackTokens}>
                        <button onClick={() => changeActiveStatus("All")} className={circle == "All" ? styles.allButtonActive : styles.allButton}> All {allInvites.length} </button>
                        <Text variant = 'medium'>All</Text>
                        <Stack  onClick={() => changeActiveStatus("All")} styles = {allStyle} className={styles.circleShadow}>
                            <Text  variant = 'medium'>{allInvites.length}</Text>
                        </Stack>  
                </Stack> */}
            </Stack>
            <OrderList lists={propsToPass}/>
       </Stack>
    );

};