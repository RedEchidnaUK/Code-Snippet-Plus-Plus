import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, } from '@microsoft/sp-webpart-base';
import * as strings from 'CodeSnippetWebPartStrings';
import CodeSnip from './components/CodeSnippet';
import { ICodeSnippetProps } from './components/ICodeSnippetProps';
require('../../../node_modules/codemirror/lib/codemirror.css');
require('../../../node_modules/codemirror/theme/monokai.css');
require('../../../node_modules/codemirror/theme/base16-light.css');

export interface ICodeSnippetWebPartProps {
  description: string;
  lineWrapToggle: boolean;
  matchBracketsToggle: boolean;
  languageMenu: {text: string,};
  language: string;
  linesMenu: {icon: string, text: string};
  lines: boolean;
  themeMenu: {icon: string, text: string};
  theme: string;
  code: string;
}

export default class CodeSnippetWebPart extends BaseClientSideWebPart<ICodeSnippetWebPartProps> {

  
  public render(): void {

    /**
     * Sets the defaults if the propertites are blank
     */
    if (!this.properties.description){
      this.properties.description = strings.PropertyPaneDescription;
    }
    if (!this.properties.code){
      this.properties.code = "";
    }
    if (!this.properties.languageMenu){
      this.properties.languageMenu = {text: "JavaScript"};
      this.properties.language = "application/javascript";
    }
    if (!this.properties.linesMenu){
      this.properties.linesMenu = {icon: "NumberedList", text: "Numbered lines"}; 
      this.properties.lines = true; 
    }
    if (!this.properties.themeMenu){
      this.properties.themeMenu = {icon: "ClearNight", text: "Dark theme"}; 
      this.properties.theme = "monokai";    
    }
    const element: React.ReactElement<ICodeSnippetProps> = React.createElement(
      CodeSnip,
      {
        isEditMode: this.displayMode == DisplayMode.Edit,
        snippingProps: this.properties,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
              groupFields: [
                PropertyPaneToggle('lineWrapToggle', {
                  label: strings.PropertyPaneLineWrap
                }),
                PropertyPaneToggle('matchBracketsToggle', {
                  label: strings.PropertyPaneMatchBrackets
                })
              ],
            }
          ]
        }
      ]
    };
  }
}
