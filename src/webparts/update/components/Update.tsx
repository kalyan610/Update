import * as React from 'react';
import styles from './Update.module.scss';
import { IUpdateProps } from './IUpdateProps';

import { escape } from '@microsoft/sp-lodash-subset';
//import { sp } from "@pnp/sp/presets/all";

import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";
import {
   Stack, IDropdownOption, Dropdown, IDropdownStyles,
  IStackStyles, DatePicker, Toggle, getHighContrastNoAdjustStyle, IconButton, IStackTokens, StackItem
} from '@fluentui/react';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { sp, Web, IWeb } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup,IChoiceGroupOption } from 'office-ui-fabric-react'; 

const Radiotest: IChoiceGroupOption[] = 
[  { key: "Yes", text: "Yes" , },  { key: "No", text: "No" },];  



//import { Grid, Checkbox, Paper, Table, ModalManager } from '@material-ui/core';
//import TextField from '@material-ui/core/TextField';

import Service from './Service';
import { Item } from '@pnp/sp/items';
import { values } from 'office-ui-fabric-react/lib/Utilities';
import { spacing } from '@material-ui/system';

//const logo: any = require('./Images/one.jpg');
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const stackTokens = { childrenGap: 80 };
const stackStyles: Partial<IStackStyles> = { root: { padding: 10 } };
const stackButtonStyles: Partial<IStackStyles> = { root: { Width: 20 } };
//const logo: any = require('./Images/MyLine.png');

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

export interface IEditFormProps {
}

export interface IEditFormState {
  layoutOption: string;
  list: any;
  flag: boolean;
  TypedEnterflag: boolean;
  TotalPages: number;
  myRecIndex: number;

}

const options: IDropdownOption[] = [

  { key: 'Category', text: 'Category' },
  { key: 'ApplicationName', text: 'Application Name' },

];

export interface IUpdateState {
  operation: any;
  SearchText: any;
  listItems: any[];
  ItemInfo: any;
  ItemId: number;
  flag: boolean;
  userExsits: boolean;
  TypedEnterflag: boolean;
  TotalPages: number;
  myRecIndex: number;
  TempListItems: any[];
  NofItemsPerPage: number;
  Catvalue:string;
  AppliName:string;
  Categoryvalue:string;
  Licencereqvalue:string;
  Costvalue:string;
  Currvalue:string;
  Descriptionvalue:string;
  AccessibilityDescription:string;
TechnicalOwnervalue:string;
AmountPurchasedvalue:string;
AmountUsedvalue:string;
InfoSecOutcomevalue:string;
ReasonforInfoSecDeclinevalue:string;
ApplicationRestrictedtovalue:string;
Providervalue:string;
ContactNamevalue:string;
TelMobvalue:string;
Emailvalue:string;
Websitevalue:string;
SupportHoursvalue:string;
RelationshipLicenceownervalue:string;
ToggleHidevalue:string;
Restrickedvalue:string;
AccessibilityTool:string;
}

//export default class Update extends React.Component<IUpdateProps, {}> {
  export default class Update extends React.Component<IUpdateProps, IUpdateState> {

    public _service: any;
  
    public constructor(props: IUpdateProps) {
      super(props);
      this.state = {
  
        operation: null,
        SearchText: "",
        listItems: [],
        ItemInfo: "",
        ItemId: null,
        flag: false,
        userExsits: false,
        TypedEnterflag: false,
        TotalPages: null,
        myRecIndex: null,
        TempListItems: [],
        NofItemsPerPage: 10,
        Catvalue:"",
        AppliName:"",
        Categoryvalue:"",
        Licencereqvalue:"",
        Costvalue:"",
        Currvalue:"",
        Descriptionvalue:"",
        AccessibilityDescription:"",
        TechnicalOwnervalue:"",
        AmountPurchasedvalue:"",
        AmountUsedvalue:"",
InfoSecOutcomevalue:"",
ReasonforInfoSecDeclinevalue:"",
ApplicationRestrictedtovalue:"",
Providervalue:"",
ContactNamevalue:"",
TelMobvalue:"",
Emailvalue:"",
Websitevalue:"",
SupportHoursvalue:"",
RelationshipLicenceownervalue:"",
ToggleHidevalue:"",
Restrickedvalue:"",
AccessibilityTool:"",

  
      };
  
      this._service = new Service(this.props.url, this.props.context);
  
    }
  
    private changeTitle(data: any): void {
  
      this.setState({ SearchText: data.target.value });
  
      // let inputData: any =
      // {
      //   Title: this.state.SearchText,
  
      //   SelcatVal: this.state.operation
  
      // };
  
      // let listItems = this._service.GetData(inputData);
  
      // this.setState({ listItems: listItems });
  
      // let TempArray2=[];
  
      // for(let count=0;count<10;count++)
      // {
      //   TempArray2.push(listItems[count]);
  
      // }
  
      // this.setState({TempListItems:TempArray2});
  
      //let TempListItems=this._service.pagGetData(inputData);
  
    }
  
    private changeChoice(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
  
      this.setState({ operation: item, SearchText: '', listItems: [], ItemInfo: '', flag: false, TypedEnterflag: false, TempListItems: [] });
    }
  
    public async getSelectedListItems() {
  
      const GroupName = 'CatlogueAdmins';
  
      let result = await this._service.isCurrentUserMemberOfGroup(GroupName);
  
      this.setState({ userExsits: result });
  
  
      let inputData: any =
      {
        Title: this.state.SearchText,
  
        SelcatVal: this.state.operation,
  
        UserFindVal: this.state.userExsits
  
      };
  
  
      let listItems = await this._service.GetData(inputData);
  
      this.setState({ listItems: listItems });
  
      //this.setState({ TotalPages: Math.ceil(this.state.listItems.length / this.NofItemsPerPage) });
  
      this.setState({ TotalPages: Math.ceil(this.state.listItems.length / this.state.NofItemsPerPage) });
  
      if (listItems.length == 0) {
  
        this.setState({ TypedEnterflag: true });
  
      }
  
      if (listItems.length > 10) {
  
        let TempArray2 = [];
  
        for (let count = 0; count < this.state.NofItemsPerPage; count++) {
          TempArray2.push(listItems[count]);
  
        }
  
        this.setState({ TempListItems: TempArray2 });
  
      }
  
      else {
  
        this.setState({ TempListItems: listItems });
      }
  
    }
  
    private OnBtnClick(): void {
  
      if (this.state.operation == null || this.state.operation.key == 'Select') {
  
        alert('please select any value');
  
      }
  
      else if (this.state.SearchText == '' || this.state.SearchText == null) {
  
        alert('please enter value');
  
      }
  
      else {
  
        console.log('Button Clicked');
  
        this.getSelectedListItems();
  
      }
    }
  
    public handleChange = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
    
        AppliName:event.target.value,  
    
      });
    };
    public handleChangeRelationshipLicenceowner = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
    
        RelationshipLicenceownervalue:event.target.value,  
    
      });
    };

    public handleChangesamountPurchased = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
     
        AmountPurchasedvalue: event.target.value,
          });
    
    };

    public handleChangesInfoSecOutcome = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
     
        InfoSecOutcomevalue: event.target.value,
          });
    
    };

    public handleChangesReasonforInfoSecDecline = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
     
        ReasonforInfoSecDeclinevalue: event.target.value,
          });
    
    };

    public handleChangesApplicationRestrictedto = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
     
        ApplicationRestrictedtovalue: event.target.value,
          });
    
    };

    public handleChangesProvider = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
     
        Providervalue: event.target.value,
          });
    
    };

    public handleContactName = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
     
        ContactNamevalue: event.target.value,
          });
    
    };
    public handleTelMob = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
     
        TelMobvalue: event.target.value,
          });
    
    };


    public handleEmail = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
     
        Emailvalue: event.target.value,
          });
    
    };

    public handleWebsite = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
     
        Websitevalue: event.target.value,
          });
    
    };

    public handleSupportHours = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
     
        SupportHoursvalue: event.target.value,
          });
    
    };

    public onStatusChange(ev: React.FormEvent<HTMLInputElement>, option: any): void {  

      this.setState({  
  
       Licencereqvalue: option.key  
  
      });  
  
    } 
    
    public ToggleHide(ev: React.FormEvent<HTMLInputElement>, option: any): void {  

      this.setState({  
  
       ToggleHidevalue: option.key  
  
      });  
  
    } 

    public Restricked(ev: React.FormEvent<HTMLInputElement>, option: any): void {  

      this.setState({  
  
       Restrickedvalue: option.key  
  
      });  
  
    } 

    public AccessibilityTool(ev: React.FormEvent<HTMLInputElement>, option: any): void {  

      this.setState({  
  
        AccessibilityTool: option.key  
  
      });  
  
    } 
  
  

    public handleChanges = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
     
        Categoryvalue: event.target.value,
          });
    
    };

    public handleChangeLicence = (event) => {

    
alert(event.target.value)
      console.log(event.target.value);
    
      this.setState({
    
        
        Licencereqvalue:event.target.value
         
    
    
      });
    
    };

   
  
  

      

    public handleChangeCost = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
    
        
        Costvalue: event.target.value,
          
          });
    
    };

    public handleChangeCurr = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
    
          Currvalue:event.target.value,
        
    
          });
    
    };
    public handleChangeDescription = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
    
        
        Descriptionvalue: event.target.value,
      
      });
    };
      public handleChangeAccessibilityDescription = (event) => {

    

        console.log(event.target.value);
      
        this.setState({
      
          
          AccessibilityDescription: event.target.value,
        
        });
    
    };
    public handleChangeTechnical = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
    
        TechnicalOwnervalue:event.target.value,
       
    
      });
    
    };
    public handleChangeApplicationName = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
    
        AppliName:event.target.value,
       
    
      });
    
    };
    public handleChangeAmountUsed = (event) => {

    

      console.log(event.target.value);
    
      this.setState({
    
        AmountUsedvalue:event.target.value,
    
    
      });
    
    };
   
    
    public handleKeyPress(event) {
  
      if (event.key === 'Enter' && this.state.SearchText != '') {
  
        this.getSelectedListItems();
  
      }
  
      else if (event.key === 'Enter' && this.state.SearchText == '') {
  
        alert('Please enter the value');
  
      }
    }
  
    public onBackbuttonClick() {
  
      this.setState({ flag: false });
  
    }

    
  
    private async GetRecordsByID(event, itemId) {
  
      let ItemInfo = await this._service.getItemByID(itemId);
  
      if (ItemInfo.Title != '') {
  
        this.setState({ flag: true });
  
        this.setState({ ItemInfo: ItemInfo });
        
this.setState({AppliName:ItemInfo.Title})
this.setState({Categoryvalue:ItemInfo.Category})
this.setState({Licencereqvalue:ItemInfo.LicenceReq})
this.setState({Costvalue:ItemInfo.Cost})
this.setState({Currvalue:ItemInfo.Curr})
this.setState({Descriptionvalue:ItemInfo.Description})
this.setState({TechnicalOwnervalue:ItemInfo.TechnicalOwner})
this.setState({AmountUsedvalue:ItemInfo.AmountUsed})
this.setState({AmountPurchasedvalue:ItemInfo.AmountPurchased})
this.setState({InfoSecOutcomevalue:ItemInfo.InfoSecOutcome})
this.setState({ReasonforInfoSecDeclinevalue:ItemInfo.ReasonforInfoSecDecline})
this.setState({ApplicationRestrictedtovalue:ItemInfo.RestrictedGroup})
this.setState({Providervalue:ItemInfo.Provider})
this.setState({ContactNamevalue:ItemInfo.ContactName})
this.setState({TelMobvalue:ItemInfo.TelorMobile})
this.setState({Websitevalue:ItemInfo.Website})
this.setState({Emailvalue:ItemInfo.Email})
this.setState({SupportHoursvalue:ItemInfo.SupportHours})
this.setState({RelationshipLicenceownervalue:ItemInfo.RelationshiporLicenceowner})
this.setState({ToggleHidevalue:ItemInfo.ToggleHide})
this.setState({Restrickedvalue:ItemInfo.Restricte})
this.setState({AccessibilityTool:ItemInfo.AccessibilityTool})
this.setState({AccessibilityDescription:ItemInfo.AccessibilityDescription})



this.setState({ItemId:ItemInfo.ID})




  
      }
  
    }

    private async DeleteData(event, itemId) {

      //let ItemInfo = await this._service.getItemByID(itemId).delete()
      const Item = await sp.web.lists.getByTitle("SpCatlog").items.getById(itemId).delete();
      alert("Deleted Successfully");
      this.getSelectedListItems();
    }

    private async UpdateData(event,itemId)
    {
      const Item = await sp.web.lists.getByTitle("SpCatlog").items.getById(itemId).update({
        Category:this.state.Categoryvalue,
        LicenceReq:this.state.Licencereqvalue,
        Title:this.state.AppliName,
        Cost:this.state.Costvalue,
        Curr:this.state.Currvalue,
        Description:this.state.Descriptionvalue,
        TechnicalOwner:this.state.TechnicalOwnervalue,

        Website:this.state.Websitevalue,
        TelorMobile:this.state.TelMobvalue,
        ContactName:this.state.ContactNamevalue,
        Email:this.state.Emailvalue,
        SupportHours:this.state.SupportHoursvalue,
        RelationshiporLicenceowner:this.state.RelationshipLicenceownervalue,
        AmountPurchased:this.state.AmountPurchasedvalue,
        AmountUsed:this.state.AmountUsedvalue,
        InfoSecOutcome:this.state.InfoSecOutcomevalue,
        ReasonforInfoSecDecline:this.state.ReasonforInfoSecDeclinevalue,
        RestrictedGroup:this.state.ApplicationRestrictedtovalue,
        Provider:this.state.Providervalue,
        ToggleHide:this.state.ToggleHidevalue,
        Restricte:this.state.Restrickedvalue,
        AccessibilityTool:this.state.AccessibilityTool,
        AccessibilityDescription:this.state.AccessibilityDescription

      });
          console.log(itemId);
alert("Item Updated successfully")
          this.setState({ flag: false });


    };
  
    private _getPage(page: number) {
  
      console.log('Page:', page);
  
      let TempArray2 = [];
  
      let listItems = this.state.listItems;
  
      for (let count = (page - 1) * this.state.NofItemsPerPage + 1; count < listItems.length && count < (this.state.NofItemsPerPage * page); count++) {
  
        TempArray2.push(listItems[count]);
  
      }
  
      this.setState({ TempListItems: TempArray2 });
  
    }
  
  
    public render(): React.ReactElement<IUpdateProps> {
  
      return (
  
        <Stack tokens={sectionStackTokens}>
          {this.state.flag == false &&
            <Stack horizontal tokens={sectionStackTokens}>
  
              <StackItem className={styles.coststyle}>
  
                <Dropdown
                  placeholder="Quick Search"
                  options={options}
                  className={styles.onlyFont}
                  selectedKey={this.state.operation ? this.state.operation.key : undefined}
                  onChange={this.changeChoice.bind(this)}
                />
              </StackItem>
              <StackItem className={styles.Serachtextbox}>
  
                <input type="text" name="txttest" value={this.state.SearchText} onChange={this.changeTitle.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} className={styles.boxsize} />
  
              </StackItem>
              <StackItem>
  
                <PrimaryButton text="Search" onClick={this.OnBtnClick.bind(this)} styles={stackButtonStyles} className={styles.button} />
              </StackItem>
            </Stack>
          }
          <Stack>
            <br />
          </Stack>
  
          {this.state.listItems.length == 0 && this.state.flag == false && this.state.TypedEnterflag == true &&
  
            <Stack className={styles.myBackcolor}>
  
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.msTeams}>
                  <b>Records Not found with the Above Criteria</b>
                </StackItem>
              </Stack>
            </Stack>
          }
  
          {this.state.flag == false && this.state.TempListItems.map((item, index) => (
  
            <Stack className={styles.myBackcolor}>
  
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.msTeams}>
                  {item.Title}
                </StackItem>
                <StackItem>
                  {<PrimaryButton text="Update" onClick={(event) => { this.GetRecordsByID(event, item.ID) }} styles={stackButtonStyles} className={styles.button} value={item.ID} />}
                </StackItem>
                <StackItem>
                  {<PrimaryButton text="Remove" onClick={(event) => { this.DeleteData(event, item.ID) }} styles={stackButtonStyles} className={styles.button} value={item.ID} />}
                </StackItem>
              </Stack>
  
              <br />
              
  
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                  <b> Category</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                <b>License Owner</b>
                </StackItem>
                </Stack>
                <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                {item.Category == null ? 'N/A' : item.Category}
                </StackItem>
                <StackItem className={styles.commonstyle}>
                {item.RelationshiporLicenceowner == null ? 'N/A' : item.RelationshiporLicenceowner}
                </StackItem>
                </Stack>
                <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                  <b>Currency</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                  <b>Cost</b>
                </StackItem>
              </Stack>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                {item.Curr == null ? 'N/A' : item.Curr}
                </StackItem>
                <StackItem className={styles.commonstyle}>
                {item.Cost == null ? 'N/A' : item.Cost}
                </StackItem>
                </Stack>

            </Stack>
          )
  
          )
  
          }
  
          {/* //paging */}
  
          {this.state.listItems.length > 10 && this.state.flag == false &&
  
            <Pagination
              currentPage={0}
              totalPages={this.state.TotalPages}
              onChange={(page) => this._getPage(page)}
              limiter={3} // Optional - default value 3
              limiterIcon={"More"} // Optional
            />
  
          }
  
          {/* //End */}
  
          
          {this.state.flag == true && this.state.userExsits == true &&
  
            //Admin Desingn Screen
            <Stack>
            <Stack className={styles.myBackcolor}>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem>
                  {/* <PrimaryButton text="AdminBack ←"  styles={stackButtonStyles} className={styles.button}  onClick={(event) => {this.onBackbuttonClick()}}/> */}
                  <IconButton iconProps={{ iconName: "Back" }} styles={stackButtonStyles} className={styles.button} title="Back" ariaLabel="Back" onClick={(event) => { this.onBackbuttonClick() }} />
                </StackItem>
              </Stack>
              <br />
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.DetAppName}>
                <TextField name="Applitxt" className={styles.DetAppName}  value={this.state.AppliName == null ? 'N/A' : this.state.AppliName} onChange={this.handleChangeApplicationName}/>
                 
                </StackItem>
                <StackItem className={styles.coststyle}>
                  <b> App ID</b>:{this.state.ItemInfo.SoftwareID == null ? 'N/A' : this.state.ItemInfo.SoftwareID}
                </StackItem>
              </Stack>
              <br />
              
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                  <b> Category</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                <b>License Owner</b>
                </StackItem>
                </Stack>

                
                <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                <TextField name="cattxt" value={this.state.Categoryvalue == null ? 'N/A' : this.state.Categoryvalue} onChange={this.handleChanges}/>
                
                </StackItem>
                <StackItem className={styles.commonstyle}>
                <TextField name="Relationitxt" value={this.state.RelationshipLicenceownervalue == null ? 'N/A' : this.state.RelationshipLicenceownervalue} onChange={this.handleChangeRelationshipLicenceowner}/>
                
                </StackItem>
                </Stack>
              <br/>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                  <b>Currency</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                  <b>Cost</b>
                </StackItem>
              </Stack>

              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                <TextField name="currtxt" value={this.state.Currvalue == null ? 'N/A' : this.state.Currvalue} onChange={this.handleChangeCurr}/>
                
                </StackItem>
                <StackItem className={styles.commonstyle}>
                <TextField name="costtxt" value={this.state.Costvalue  == null ? 'N/A' : this.state.Costvalue} onChange={this.handleChangeCost}/>
                
                </StackItem>
                </Stack>
             </Stack>
            <br />
            <Stack>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.myDescBox}>
                  <Stack>
                  <label className={styles.alignCenter}>Description</label>
                    <br />
                    <Stack className={styles.whitDescBox}>
                    <StackItem >
                      <textarea name="Descriptxt" className={styles.multiline}   value={this.state.Descriptionvalue == null ? 'N/A' : this.state.Descriptionvalue} onChange={this.handleChangeDescription}/>
                      </StackItem>
                    </Stack>
                  </Stack>
                </StackItem>
              </Stack>
              <br />

              <Stack className={styles.myBackcolor}>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                  <b>Provider</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                  <b>Email</b>
                </StackItem>
              </Stack>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="providetxt" value={this.state.Providervalue == null ? 'N/A' : this.state.Providervalue} onChange={this.handleChangesProvider}/>
                
                </StackItem>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="Emialtxt" value={this.state.Emailvalue == null ? 'N/A' : this.state.Emailvalue} onChange={this.handleEmail}/>
                

                
                </StackItem>
                </Stack>
                <br/>
                <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                  <b>Contact Name</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                  <b>WebSite</b>
                </StackItem>
              </Stack>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="Contactxt" value={this.state.ContactNamevalue  == null ? 'N/A' : this.state.ContactNamevalue} onChange={this.handleContactName}/>
                
                </StackItem>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="Websitetxt" value={this.state.Websitevalue == null ? 'N/A' : this.state.Websitevalue} onChange={this.handleWebsite}/>
                
                </StackItem>
                </Stack>
                <br/>
                <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                  <b>Tel/Mobile</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                  <b>Support Hours</b>
                </StackItem>
              </Stack>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="Teltxt" value={this.state.TelMobvalue == null ? 'N/A' : this.state.TelMobvalue} onChange={this.handleTelMob}/>
                
                </StackItem>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="supporttxt" value={this.state.SupportHoursvalue == null ? 'N/A' : this.state.SupportHoursvalue} onChange={this.handleSupportHours}/>
                
                </StackItem>
                </Stack> <br/>
                
                
</Stack><br/>


              <Stack className={styles.myBackcolor}>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                  <b>Technical Owner</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                  <b>Reason for InfoSec Decline</b>
                </StackItem>
              </Stack>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="Technicaltxt" value={this.state.TechnicalOwnervalue == null ? 'N/A' : this.state.TechnicalOwnervalue} onChange={this.handleChangeTechnical}/>
                
                </StackItem>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="Reasontxt" value={this.state.ReasonforInfoSecDeclinevalue == null ? 'N/A' : this.state.ReasonforInfoSecDeclinevalue} onChange={this.handleChangesReasonforInfoSecDecline}/>
                

                
                </StackItem>
                </Stack>
                <br/>
                <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                  <b>Amount Purchased</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                  <b>Amount Used</b>
                </StackItem>
              </Stack>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="Ammountpurtxt" value={this.state.AmountPurchasedvalue  == null ? 'N/A' : this.state.AmountPurchasedvalue} onChange={this.handleChangesamountPurchased}/>
                
                </StackItem>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="amusedtxt" value={this.state.AmountUsedvalue == null ? 'N/A' : this.state.AmountUsedvalue} onChange={this.handleChangeAmountUsed}/>
                
                </StackItem>
                </Stack>
                <br/>
                <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                  <b>InfoSec Review</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                  <b> Restricted Group</b>
                </StackItem>
              </Stack>
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="Infotxt" value={this.state.InfoSecOutcomevalue == null ? 'N/A' : this.state.InfoSecOutcomevalue} onChange={this.handleChangesInfoSecOutcome}/>
                
                </StackItem>
                <StackItem className={styles.commonstyleDescRightbox}>
                <TextField name="Apprestrictedtxt" value={this.state.ApplicationRestrictedtovalue == null ? 'N/A' : this.state.ApplicationRestrictedtovalue} onChange={this.handleChangesApplicationRestrictedto}/>
                
                </StackItem>
                </Stack> <br/>
                <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyle}>
                  <b>License Required</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                  <b>Toggle Hide</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                  <b>Restricted</b>
                </StackItem>
                <StackItem className={styles.commonstyle}>
                  <b>Accessibility Tool</b>
                </StackItem>
             
              </Stack>
             
              
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.commonstyleDescRightbox}>
                
                
                
                <ChoiceGroup  id="status"  name="StatusOptions"  defaultSelectedKey={this.state.Licencereqvalue} options={Radiotest}   onChange={this.onStatusChange.bind(this)}  selectedKey={this.state.Licencereqvalue}/> 
                </StackItem>
                <StackItem className={styles.commonstyleDescRightbox}>
                <ChoiceGroup  id="Toggle"  name="ToggleOptions"  defaultSelectedKey={this.state.ToggleHidevalue} options={Radiotest}   onChange={this.ToggleHide.bind(this)}  selectedKey={this.state.ToggleHidevalue}/> 
                
                </StackItem><br/><br/><br/>
                <StackItem className={styles.commonstyleDescRightbox}>
                <ChoiceGroup  id="Restric"  name="RestrickedOptions"  defaultSelectedKey={this.state.Restrickedvalue} options={Radiotest}   onChange={this.Restricked.bind(this)}  selectedKey={this.state.Restrickedvalue}/> 
                
                </StackItem><br/><br/><br/>
                <StackItem className={styles.commonstyleDescRightbox}>
                <ChoiceGroup  id="AccessTool"  name="AccessibilityTool"  defaultSelectedKey={this.state.AccessibilityTool} options={Radiotest}   onChange={this.AccessibilityTool.bind(this)}  selectedKey={this.state.AccessibilityTool}/> 
                
                </StackItem><br/><br/><br/>
                </Stack> <br/>
        
              <Stack horizontal tokens={sectionStackTokens}>
                <StackItem className={styles.myDescBox}>
                  <Stack>
                  <label className={styles.alignCenter}>Accessibility Description</label>
                    <br />
                    <Stack className={styles.whitDescBox}>
                    <StackItem >
                      <textarea name="Descritool" className={styles.multiline}   value={this.state.AccessibilityDescription == null ? 'N/A' : this.state.AccessibilityDescription} onChange={this.handleChangeAccessibilityDescription}/>
                      </StackItem>
                    </Stack>
                  </Stack>
                </StackItem>
              </Stack>
                <Stack horizontal tokens={sectionStackTokens}>
<StackItem className={styles.coststyle}>
<PrimaryButton id='save' name='update' text="Save" onClick={(event) => { this.UpdateData(event, this.state.ItemId) }} styles={stackButtonStyles} className={styles.button} value={this.state.ItemId} />
              
              </StackItem>
              </Stack>


                
              </Stack>
            </Stack>
          </Stack>

        }

      </Stack>

    )

  }

}

  
  
  
  
  
  
  