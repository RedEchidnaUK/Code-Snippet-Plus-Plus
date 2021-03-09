import { ICommandBarItemProps} from 'office-ui-fabric-react/lib/CommandBar';

export interface ICodeSnippetState {
  code: string;
  itemsList: ICommandBarItemProps[];
  farItemsList: ICommandBarItemProps[];
}