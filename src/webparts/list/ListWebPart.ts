import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';
import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';
import {HttpClient, HttpClientResponse} from '@microsoft/sp-http';
import TestList  from './components/List/IList';
import * as strings from 'ListWebPartStrings';
import {List} from './components/List/List';
import axios from 'axios';



export default class ListWebPart extends BaseClientSideWebPart<any> {

  private _list:any = []

  public render(): void {
    const element: React.ReactElement = React.createElement(
      List,
      {
        cyx: this.context,
        list: this._list,
        onGetListItems : this._onGetListItems,
        onAddListItem: this._onAddListItem,
        onDeleteListItem : this._onDeleteListItem,
        onUpdatePost : this._onUpdateListItem,
        // getWeather : this._onGetWeather
      }
    );

    ReactDom.render(element, this.domElement);
  }

  ///////////Function for checking environment of our component /////////////////////////////////////////////

  private get _isSharePoint(): boolean {
    return (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint)
  }

  ////////PROBLEM WITH httpClient showing undefined!
  

  // private _onGetWeather(): Promise<any>{
  //   return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=90da99e4ec8202561ec8ac9db4c3e4d0`)
  //   .then(res => {
  //       console.log(res.data);
  //   })as Promise<any>
  // }
  //////////FUNCTION TO GET ITEM ENTITY TYPE ////////////////////////////
  private _getItemEntityType(): Promise<string>{
    return this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Tasks')?$select=ListItemEntityTypeFullName`,
      SPHttpClient.configurations.v1)
       .then(response => {
         return response.json();
       })
       .then(jsonResponse => {
         return jsonResponse.ListItemEntityTypeFullName;
       }) as Promise<string>;
  }


  /////////////////////////// Here we have spHttp CRUD calls///////////////////////////////

  //////GET REQUEST ALL ITEMS 
  private _onGetListItems = (): any => {
    if(!this._isSharePoint) {
      var list = [ {id: 1, fullname: 'Jake Mackenzie',
          avatar: "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png", 
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",isAccept: false, comments : []},
      {id: 2, fullname: 'Charlie Brown', date: "25th August" ,
        avatar: "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png", 
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",isAccept: true,
        comments: [{ id : 1, name: "Jessica Hero" , comment: "the best Idea i have ever heard"}, {id : 2 ,name: "Sara Paulson" , comment: "cool ,  I'd like to learn more about it"},{id : 3 , name: "Raji Kumar" , comment: "Nice Job Kim!"}]},
      {id: 3, fullname: 'Victor Krouch',
        avatar: "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png", 
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",isAccept: false, comments : []},
      {id: 4, fullname: 'Yehor Melnyk', date: "6th September" ,
        avatar: "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png", 
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",isAccept: true, comments : []}]
       this._list = list
    } else {
      this._getListItems()
        .then(response => {
          console.log(response);
        this._list = response
        this.render();
      })
      
    }
  }


  private _getListItems(): Promise<TestList[]> {
      return this.context.spHttpClient.get(
        this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Tasks')/items?$select=Id,Title,Age,Color,Income`,
        SPHttpClient.configurations.v1)
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          return jsonResponse.value;
        }) as Promise<TestList[]>;
  }
  
///////POST REQUEST ADD ITEM TO LIST //////// TO WORK with component need change props for request.body
  private _onAddListItem = (): any => {
    this._addListItem()
      .then(() => {
          this._getListItems()
            .then(response => {
              this._list = response
              this.render();
            })
      })
  }

  private _addListItem(): Promise<SPHttpClientResponse>{
    return this._getItemEntityType()
      .then(spEntityType => {
        const request: any = {};
        request.body = JSON.stringify({
          Title: "David Hotskovich",
          Income: 10000,
          '@odata.type': spEntityType 
        });;
        return this.context.spHttpClient.post(
          this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Tasks')/items`,
          SPHttpClient.configurations.v1, request);
      });
  }

//////////////////////UPDATE REQUEST UPDATE ITEM IN LIST  To work with component need to specidy Id in URl

  private _onUpdateListItem = (): any => {
    this._updateListItem()
      .then(() => {
          this._getListItems()
            .then(response => {
              this._list = response
              this.render();
            })
      })
  }

  private _updateListItem(): Promise<SPHttpClientResponse>{
    return this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Tasks')/items?$select=Id,Title,Income&$filter=Title eq 'Masha Rasputina'`,
      SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse.value[0];
      })
      .then((listItem: TestList) => {
        //update item 
        listItem.Title = "Yehor Melnyk";
        listItem.Income = 40000;
        //save it
        const request: any = {};
        request.headers = {
          'X-HTTP-Method': 'MERGE',
          'IF-MATCH': (listItem as any)['@odata.etag']
        };
        request.body = JSON.stringify(listItem);
        console.log(request);
        return this.context.spHttpClient.post(
          this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Tasks')/items(${listItem.Id})`,
          SPHttpClient.configurations.v1 , request);
      });
  }

/////////////////DELETE REQUEST DELETE ITEM IN LIST



  private _onDeleteListItem = (): any => {
    this._deleteListItem()
      .then(() => {
          this._getListItems()
            .then(response => {
              this._list = response
              this.render();
            })
      })
  }

  private _deleteListItem(): Promise<SPHttpClientResponse> {
    //get the last item
    return this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl+ `/_api/web/lists/getbytitle('Tasks')/items?$select=Id,Title&$orderby=Id desc&$top=1`,
      SPHttpClient.configurations.v1)
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          return jsonResponse.value[0];
        })
        .then((listItem: TestList) => {
          const request: any ={};
          request.headers = {
            'X-HTTP-Method': 'DELETE',
            'IF-MATCH': '*'
          };
          request.body = JSON.stringify(listItem);
          return this.context.spHttpClient.post(
            this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Tasks')/items(${listItem.Id})`,
            SPHttpClient.configurations.v1, 
            request);
        })
  }

  ////////////////////////////////////////////////////////////////////////////////////

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('fullname', {
                  label: strings.FullName
                })
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
          ]
        }
      ]
    };
  }
}
