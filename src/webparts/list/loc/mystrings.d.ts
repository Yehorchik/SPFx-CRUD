declare interface IListWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  FullName: string;
  ButtonText: string;
}

declare module 'ListWebPartStrings' {
  const strings: IListWebPartStrings;
  export = strings;
}
