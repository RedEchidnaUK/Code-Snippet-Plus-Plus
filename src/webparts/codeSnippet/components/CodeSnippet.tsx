import * as React from 'react';
import styles from './CodeSnippet.module.scss';
import { ICodeSnippetProps } from './ICodeSnippetProps';
import { ICodeSnippetState } from './ICodeSnippetState';
import { set } from '@microsoft/sp-lodash-subset';

//Import for CodeMirror and associated syntax highlighters
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/addon/edit/matchbrackets.js'); //nice to have
require('codemirror/addon/mode/simple.js'); //required for Dockerfile

require('codemirror/mode/javascript/javascript.js'); //various JavaScript languages
require('codemirror/mode/jsx/jsx.js');
require('codemirror/mode/css/css.js'); //various CSS languages
require('codemirror/mode/dockerfile/dockerfile.js');
require('codemirror/mode/clike/clike.js'); //C, C++, C#, Java
require('codemirror/mode/diff/diff.js');
require('codemirror/mode/go/go.js');
require('codemirror/mode/python/python.js'); //Cython and Python
require('codemirror/mode/powershell/powershell.js');
require('codemirror/mode/sql/sql.js'); //various SQL languages
require('codemirror/mode/xml/xml.js'); //XML/XHTML and HTML
require('codemirror/mode/markdown/markdown.js');
require('codemirror/mode/yaml/yaml.js');

//Office UI Fabric
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

/**
 * Overrides the default commandBar style
 */
const commandBarStyles = {
  root: {
    background: 'none'
  },
};

/**
 * Main section of code
 */
export default class CodeSnip extends React.Component<ICodeSnippetProps, ICodeSnippetState> {

  constructor(props) {
    super(props);
    this.state = {
      code: this.props.snippingProps.code,
      itemsList: [
        {
          key: 'languageMenu',
          text: this.props.snippingProps.languageMenu.text,
          buttonStyles: {
            root: {
              background: 'none',
              border: 'none',
            },
          },
          subMenuProps: {
            directionalHint: DirectionalHint.rightCenter,
            items: [
              {
                key: 'text/x-csrc',
                text: 'C',
                split: true,
                onClick: () => this._itemsList('text/x-csrc', "C"),
                subMenuProps: {
                  items: [
                    {
                      key: 'text/x-c++src',
                      text: 'C++',
                      onClick: () => this._itemsList('text/x-c++src', "C++"),
                    },
                    {
                      key: 'text/x-csharp',
                      text: 'C#',
                      onClick: () => this._itemsList('text/x-csharp', "C#"),
                    },
                    {
                      key: 'text/x-ceylon',
                      text: 'Ceylon',
                      onClick: () => this._itemsList('text/x-ceylon', "Ceylon"),
                    },
                    {
                      key: 'text/x-java',
                      text: 'JAVA',
                      onClick: () => this._itemsList('text/x-java', "JAVA"),
                    },
                    {
                      key: 'text/x-objectivec',
                      text: 'Objective C',
                      onClick: () => this._itemsList('text/x-objectivec', "Objective C"),
                    },
                    {
                      key: 'text/x-scala',
                      text: 'Scala',
                      onClick: () => this._itemsList('text/x-scala', "Scala"),
                    },
                    {
                      key: 'text/x-squirrel',
                      text: 'Squirrel',
                      onClick: () => this._itemsList('text/x-squirrel', "Squirrel"),
                    },
                  ]
                },
              },
              {
                key: 'css',
                text: 'CSS',
                split: true,
                onClick: () => this._itemsList('css', "CSS"),
                subMenuProps: {
                  items: [                   
                    {
                      key: 'text/x-less',
                      text: 'LESS',
                      onClick: () => this._itemsList('text/x-less', "LESS"),
                    },
                    {
                      key: 'text/x-scss',
                      text: 'SCSS',
                      onClick: () => this._itemsList('text/x-scss', "SCSS"),
                    },
                  ]
                }
              },
              {
                key: 'text/x-diff',
                text: 'Diff',
                onClick: () => this._itemsList('text/x-diff', "Diff"),
              },
              {
                key: 'dockerfile',
                text: 'Dockerfile',
                onClick: () => this._itemsList('dockerfile', "Dockerfile"),
              },
              {
                key: 'text/x-go',
                text: 'Go',
                onClick: () => this._itemsList('text/x-go', "Go"),
              },
              {
                key: 'application/javascript',
                text: 'JavaScript',
                split: true,
                onClick: () => this._itemsList("application/javascript", "JavaScript"),
                subMenuProps: {
                  items: [
                    {
                      key: 'application/ld+json',
                      text: 'JSON',
                      onClick: () => this._itemsList('application/json', "JSON"),
                    },
                    {
                      key: 'application/ld+json',
                      text: 'JSON-LD',
                      onClick: () => this._itemsList('application/ld+json', "JSON-LD"),
                    },
                    {
                      key: 'text/typescript-jsx',
                      text: 'React/JSX',
                      onClick: () => this._itemsList('text/typescript-jsx', "React/JSX"),
                    },                    
                    {
                      key: 'application/typescript',
                      text: 'Typescript',
                      onClick: () => this._itemsList('application/typescript', "Typescript"),
                    },
                  ]
                },
              },
              {
                key: 'text/x-markdown',
                text: 'Markdown',
                onClick: () => this._itemsList('text/x-markdown', "Markdown"),
              },
              {
                key: 'application/x-powershell',
                text: 'PowerShell',
                onClick: () => this._itemsList('application/x-powershell', "PowerShell"),
              },
              {
                key: 'text/x-python',
                text: 'Python 3',
                split: true,
                onClick: () => this._itemsList('text/x-python', "Python 3"),
                subMenuProps: {
                  items: [
                    {
                      key: 'text/x-cython',
                      text: 'Cython',
                      onClick: () => this._itemsList('text/x-cython', "Cython"),
                    },
                    {
                      key: 'text/x-python',
                      text: 'Python 2',
                      onClick: () => this._itemsList('text/x-python', "Python 2"),
                    },
                  ]
                },
              },
              {
                key: 'text/x-sql',
                text: 'SQL',
                split: true,
                onClick: () => this._itemsList('text/x-sql', "SQL"),
                subMenuProps: {
                  items: [
                    {
                      key: 'text/x-mariadb',
                      text: 'MariaDB',
                      onClick: () => this._itemsList('text/x-mariadb', "MariaDB"),
                    },
                    {
                      key: 'text/x-mssql',
                      text: 'MS SQL',
                      onClick: () => this._itemsList('text/x-mssql', "MS SQL"),
                    },
                    {
                      key: 'text/x-mysql',
                      text: 'MySQL',
                      onClick: () => this._itemsList('text/x-mysql', "MySQL"),
                    },
                    {
                      key: 'text/x-pgsql',
                      text: 'PostgreSQL',
                      onClick: () => this._itemsList('text/x-pgsql', "PostgreSQL"),
                    },
                  ]
                },
              },
              {
                key: 'XHTML', //no real key for XHTML as it is just XML
                text: 'XHTML',
                split:true,
                onClick: () => this._itemsList('application/xml', "XHTML"),
                subMenuProps: {
                  items: [
                    {
                      key: 'text/html',
                      text: 'HTML',
                      onClick: () => this._itemsList('text/html', "HTML"),
                    },
                  ]
                }
              },
              {
                key: 'application/xml',
                text: 'XML',
                onClick: () => this._itemsList('application/xml', "XML"),
              },
              {
              key: 'text/x-yaml',
              text: 'YAML',
              onClick: () => this._itemsList('text/x-yaml', "YAML"),
              },
            ],
          },
        },
      ],
      farItemsList: [
        {
          key: 'numberedLinesMenu',
          text: this.props.snippingProps.linesMenu.text,
          iconProps: { iconName: this.props.snippingProps.linesMenu.icon },
          buttonStyles: {
            root: {
              background: 'none',
              border: 'none',
            },
          },
          subMenuProps: {
            items: [
              {
                key: 'numberedLinesItem',
                id: 'numberedLinesItem',
                text: 'Numbered lines',
                iconProps: { iconName: 'NumberedList' },
                onClick: (evt) => this._farItemsLists(evt),
              },
              {
                key: 'unnumberedLinesItem',
                id: 'unnumberedLinesItem',
                text: 'Unnumbered lines',
                iconProps: { iconName: 'CollapseMenu' },
                onClick: (evt) => this._farItemsLists(evt),
              },
            ],
          },
        },
        {
          key: 'themeMenu',
          text: this.props.snippingProps.themeMenu.text,
          iconProps: { iconName: this.props.snippingProps.themeMenu.icon },
          buttonStyles: {
            root: {
              background: 'none',
              border: 'none',
            },
          },
          subMenuProps: {
            items: [
              {
                key: 'monokai',
                id: 'monokai',
                text: 'Dark theme',
                iconProps: { iconName: 'ClearNight' },
                onClick: (evt) => this._farItemsLists(evt),
              },
              {
                key: 'base16-light',
                id: 'base16-light',
                text: 'Light theme',
                iconProps: { iconName: 'Brightness' },
                onClick: (evt) => this._farItemsLists(evt),
              },
            ],
          },
        },
      ],
    };
  }

  /**
   * Saves new values for the itemsList used in the commandBar.
   */
  private _itemsList(language: string, text: string): void {

    // 1. Copy the current state to something we can work with
    let items = [...this.state.itemsList];
    // 2. Make a shallow copy of the item to change
    let item0 = { ...items[0] };
    // 3. Replace the various properties 
    item0.text = text;
    // 4. Update the array with the new item
    items[0] = item0;
    // 5. Set the state to our new copy
    this.setState({ itemsList: items });
    //write back to props so it is saved
    set(this.props.snippingProps.languageMenu, "text", text);
    set(this.props.snippingProps, "language", language);

  }

  /**
   * Saves new values for the farItemsList used in the commandBar.
   */
  private _farItemsLists(event: any): void {

    //get information
    let optionValue = event.currentTarget.id;
    let text = event.currentTarget.children[0].children[1].textContent;
    let iconName = event.currentTarget.children[0].children[0].getAttribute('data-icon-name');

    //set menu information
    let menu: string = "lines";
    let menuIndex: number = 0;

    if (text.indexOf("theme") != -1) {
      menu = "theme";
      menuIndex = 1;
    }

    // 1. Copy the current state to something we can work with
    let items = [...this.state.farItemsList];
    // 2. Make a shallow copy of the item to change
    let item0 = { ...items[menuIndex] };
    // 3. Replace the various properties 
    item0.text = text;
    item0.iconProps = { iconName: iconName },
      // 4. Update the array with the new item
      items[menuIndex] = item0;
    // 5. Set the state to our new copy
    this.setState({ farItemsList: items });

    //update all properties
    if (menu == "lines") {
      set(this.props.snippingProps.linesMenu, "text", text);
      set(this.props.snippingProps.linesMenu, "icon", iconName);
      set(this.props.snippingProps, "lines", (optionValue == "numberedLinesItem") ? true : false);
    }
    else {
      set(this.props.snippingProps.themeMenu, "text", text);
      set(this.props.snippingProps.themeMenu, "icon", iconName);
      set(this.props.snippingProps, "theme", optionValue);
    }
  }

  /** 
   * Creates the correct options for CodeMirror
   */
  private _getOptions(): any {
    let options: any;
    let mode: any;

    //some languages have extra properties, so specify them here or return the default
    switch(this.props.snippingProps.languageMenu.text) {
      case "Python 2":
        mode = {name: "python", version: 2};
        break;
      case "HTML":
        mode = {name: "xml", htmlMode: true};
        break;
      default:
        mode = this.props.snippingProps.language;
    }

    options = {
      lineNumbers: this.props.snippingProps.lines,
      mode: mode,
      theme: this.props.snippingProps.theme,
      lineWrapping: this.props.snippingProps.lineWrapToggle,
      readOnly: !this.props.isEditMode ? "nocursor" : false,
      matchBrackets: this.props.snippingProps.matchBracketsToggle
    };
    return options;
  }

  /**
   * Main render
   */
  public render(): React.ReactElement<ICodeSnippetProps> {

    return (
      <div className={styles.codeSnip}>
        <div className={(this.props.isEditMode) ? '' : (styles.commandBarHide)}>
          <CommandBar
            items={this.state.itemsList}
            farItems={this.state.farItemsList}
            ariaLabel="Use left and right arrow keys to navigate between commands"
            styles={commandBarStyles}
          />
        </div>
        <CodeMirror
          value={this.state.code}
          options={this._getOptions()}
          onBeforeChange={(editor, data, code) => {
            set(this.props.snippingProps, "code", code);
            this.setState({ code: code });
          }}
        />
      </div>
    );
  }
}