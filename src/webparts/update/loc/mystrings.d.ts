declare interface IUpdateWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'UpdateWebPartStrings' {
  const strings: IUpdateWebPartStrings;
  export = strings;
}
