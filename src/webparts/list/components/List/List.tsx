import * as React from 'react';

import styles from './List.module.scss';
import {ListOfProps} from './ListOfProps'
import {ListCount} from '../ListCount/ListCount';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';


export const List = (props) => {
    
    React.useEffect(() => {
      props.onGetListItems();
    } , [])


    // function convertTime(x){
    //   let time = x;
    //   let date = new Date(time);
    //   let day = date.getDate();
    //   let year = date.getFullYear();
    //   let month = date.getMonth()+1;
    //   var dateStr = month+"/"+day+"/"+year;
    //   return dateStr
    // }
    
     function hello(){
       console.log( props.list)
     }


     const GetWeather = (): Promise<any> =>{
      return props.cyx.httpClient.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=90da99e4ec8202561ec8ac9db4c3e4d0`,
        HttpClient.configurations.v1
      )
      .then((response: HttpClientResponse) => {
        return response.json()
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
        return jsonResponse;
      }) as Promise<any>;
    }
  

       return (
           <div className={ styles.container }>  
              {props.list.map(list =>
                  <ul>
                    <li onClick={()=> hello()}>{list.Title}</li>
                  </ul> 
              )}
              {/* <ListCount lists = {list}/> */}
              <input type="button" value="Add Post" onClick={() => props.onAddListItem()}/>
              <input type="button" value="Delete Post" onClick={() => props.onDeleteListItem()}/>
              <input type="button" value="Update Post" onClick={() => props.onUpdatePost()}/>
              <input type="button" value="Get Weather" onClick={()=>GetWeather()}/>
           </div>
       );
    
  }



  //////////////////////////// Function for checking an Environment Type

  // var hello:boolean = checkEnvironment();

  // function checkEnvironment(){
  //    if (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint){
  //      return true
  //    }else{
  //      return false
  //    }
  // }


  // console.log(hello);