import * as React from 'react';
import styles from './Information.module.scss';
import {useEffect, useState} from 'react';
import { Stack} from 'office-ui-fabric-react';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {smallTextStyle, mediumTextStyle} from '../OrderList/orderListStyle';
import {mainStyle, avatarStyle, itemStyles, horizontalGapStackTokens} from './informationStyle'




export const Information = (props) => {

    const [ comments ,  setComments] = useState ("No Comments");
    const {closeHandler , info} = props;

    useEffect( () => {
        if (info.comments.length > 0){
            setComments ("Comments :");
        }
    })
    
    return (
        <Stack styles={mainStyle} tokens={horizontalGapStackTokens} className={styles.onePerson}>
           <Icon className={styles.closeHandler} iconName="Cancel" onClick={closeHandler}/>
           <Stack styles={avatarStyle} horizontal tokens={horizontalGapStackTokens}>
                <Stack styles={itemStyles}>
                    <img className={styles.avatar} src={info.avatar} alt="Logo"/>
                </Stack>
                <Stack>
                    <Text className={styles.bold}  styles={mediumTextStyle}>{info.fullname}</Text>
                    <Text styles={smallTextStyle}>Software Engineer</Text>
                </Stack>
           </Stack>
           <Stack>
                <Text className={styles.bold} styles={mediumTextStyle}>Submited Date</Text>
                <Text  styles={smallTextStyle}>{info.date}</Text>
           </Stack>
           {info.comments.length >=1 &&
             <Text styles={smallTextStyle} className={styles.comment}>{comments}</Text>
            }
           {info.comments.map(comment => 
                <Stack key={comment.id}>
                    <Text styles={mediumTextStyle} className={styles.bold}>{comment.name}</Text>
                    <Text styles={smallTextStyle} className={styles.marginText}>{comment.comment}</Text>
                </Stack>
            )}
        </Stack>
    )
}