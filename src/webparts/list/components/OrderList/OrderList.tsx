import * as React from 'react';
import styles from './OrderList.module.scss'
import {Information} from '../Information/Information';
import {useState} from 'react';
import {ListOfProps} from '../List/ListOfProps';
import {Stack} from 'office-ui-fabric-react';
import { Text} from 'office-ui-fabric-react/lib/Text';
import {
        smallTextStyle,
        stackButtons,
        horizontalGapStackTokens,
        mediumTextStyle,
        containerStyle,
        marginTop,
        acceptStyle,
        rejectStyle,
        itemStyles,
        verticalGapStackTokens
    } from './orderListStyle';


 

export const OrderList: React.FunctionComponent<ListOfProps> = ({lists}) => {
    
    //STATES
    const [opened, setOpen] = useState(false);
    const [info, setInfo ] = useState({});

    //Functions for opening Information.tsx
    const openInfo = (person) =>{
        if(person.isAccept){
            setOpen(true);
            setInfo(person);
        }
    }
    
   const hideComponent = () =>{
        setOpen(!opened);
    }

   /////////////

    const acceptInvitation = (isAccept , date) => {
        if(isAccept === true){
            return(
                <Stack.Item align="center" grow className={styles.onePerson__content_date}>
                    <Text styles={smallTextStyle} block>Submited {date}</Text>
                </Stack.Item>
             )
        }
        else{
            return (
                <Stack.Item align="center" grow styles={stackButtons} className={styles.onePerson__content_summary}>
                    <a href='#' className= {styles.buttonAccept}>Accept</a>
                    <a href='#' className={styles.buttonReject}>Reject</a>
                </Stack.Item>
    
            )
        };
       
    };

        return(
            <Stack  horizontal tokens={horizontalGapStackTokens} styles= {containerStyle}>
                <Stack  tokens={verticalGapStackTokens}>
                {lists.map(person =>
                    <Stack  styles = {containerStyle} horizontal  tokens={horizontalGapStackTokens} onClick={() => openInfo(person)}
                            key={person.id}
                            className={styles.onePerson}>
                        <Stack.Item  align="center" grow styles={itemStyles}>
                            <img className={styles.avatar} src={person.avatar} alt="Logo"/>
                        </Stack.Item>
                        <Stack  className={styles.onePerson__content} styles={person.isAccept == true ? acceptStyle : rejectStyle}>
                            <Text  styles={mediumTextStyle} block>{person.fullname}</Text>
                            <Text styles={smallTextStyle} block className={styles.onePerson__position}>Software Engineer</Text>
                            <Stack styles = {containerStyle} horizontal tokens={horizontalGapStackTokens} > 
                                <Stack.Item styles={containerStyle} align="center" grow className={styles.onePerson__content_summary}>
                                    <Text  styles={mediumTextStyle} block>{person.summary.slice(0,50)}...</Text>
                                </Stack.Item>
                                {acceptInvitation(person.isAccept , person.date)}
                            </Stack>
                        </Stack> 
                    </Stack>
                    )}
                </Stack>
                <Stack styles = {marginTop}>
                    {opened && (
                         <Information info = {info} closeHandler={hideComponent} />
                    )}
                </Stack> 
            </Stack>
        )

};



