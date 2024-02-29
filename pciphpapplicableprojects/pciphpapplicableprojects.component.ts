import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output, TemplateRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { PhpformService } from 'src/app/shared/services/phpform.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-pciphpapplicableprojects',
  templateUrl: './pciphpapplicableprojects.component.html',
  styleUrls: ['./pciphpapplicableprojects.component.css']
})
export class PciphpapplicableprojectsComponent {
  @Input() selectedRowData: any;
  @Output() dataEvent = new EventEmitter<any>();
  rowData: any;
  page = 1;
  pageSize = 10;
  collectionSize: number;
  selectedProjectDetailsIDs: any[] = [];
  selectedProjectDetailsIDsPhp: any[] = [];
  selectedColumnData: string = '';
  selectedValue: any;
  gridApi: any;
  gridColumnApi: any;
  frameAdmin = {
  };

  selectedRegions: string[] = [];
  regions: any;
  selectedCountries: string[] = [];
  countries: any;
  selectedSbuNames: string[] = [];
  sbuNames: any;
  selectedAccountNames: string[] = [];
  accountNames: any;
  selectedProjectNames: string[] = [];
  projectNames: any;

  filteredCountries: any;
  dd: any;
  sa: any;
  selectedDropdownProjectId:any;
  visible: boolean = false;
  visiblenew : boolean=false;
  inputValue: string;
  selectedDropdown:any;
  constructor(
    private phpformService: PhpformService,
    public toastService: ToastService,
    @Inject(LOCALE_ID) private locale: string,

  ) { }

  allRowsSelectedphp = false;
  allRowsSelectedPCI = false;
  public defaultColDef: ColDef = {
    //  flex: 1,
    // minWidth: 100,
    sortable: true,
    resizable: true,
  };


  columnDefs = [

    {
      headerName: 'Region',
      field: 'region',
      sortable: true,
      filter: true,
      width: 110,
    },
    {
      headerName: 'Country',
      field: 'country',
      sortable: true,
      filter: true,
      width: 110,
    },
    {
      headerName: 'SBU',
      field: 'sbuName',
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: 'Account Name',
      field: 'accountName',
      sortable: true,
      filter: true,
      width: 160,
    },
    {
      headerName: 'Project Code',
      field: 'projectCode',
      sortable: true,
      filter: true,
      width: 200,
      resizable: true,
    },
    {
      headerName: 'Project Name',
      field: 'projectName',
      sortable: true,
      filter: true,
      minWidth: 220,
      resizable: true,
    },
    {
      headerName: 'Project Manager',
      field: 'projectManager',
      sortable: true,
      width: 200,
      resizable: true,
    },
    {
      headerName: 'Project Start Date',
      field: 'projectStartDate',
      sortable: true,
      width: 170,
      cellRenderer: (data) => {
        return formatDate(data.value, 'dd-MMM-yyyy', this.locale);
      },
    },
    {
      headerName: 'Project End Date',
      field: 'projectEndDate',
      sortable: true,
      width: 170,
      cellRenderer: (data) => {
        return formatDate(data.value, 'dd-MMM-yyyy', this.locale);
      },
    },
    {
      headerName: 'PCI-IsActive',
      field: 'pci',
      width: 150,
      cellRenderer: params => `<input type='checkbox' ${params.value ? 'checked' : ''} />`,
      onCellClicked: (event) => {
        if (event.event.target.type === 'checkbox') {

          const isChecked = event.event.target.checked;
             event.data.pci = isChecked;
          const checkedCount = this.getUnselectedCheckboxCount();
          if (checkedCount >0) {
            this.allRowsSelectedPCI = false;
          } 
          else if(checkedCount ==0 ){
            this.allRowsSelectedPCI = true;
          }
		  
          event.data.pci = isChecked; // !event.data.pci ;
          const existingData = this.selectedProjectDetailsIDs.find(obj => obj.projectDetailsID === event.data.projectDetailsID);
          if (existingData) {
            existingData.pci = event.data.pci;
          } else {
            this.selectedProjectDetailsIDs.push({
              projectDetailsID: event.data.projectDetailsID,
              pci: event.data.pci,
              projectName:event.data.projectName,
              email:event.data.email,
              name:event.data.name,
              // php: event.data.php,
            });
          }
          event.api.refreshCells({ rowNodes: [event.node], force: true });
        }
      },
    },

    {
      headerName: 'PHP-IsActive',
      field: 'phpPCI',
      width: 150,
      cellRenderer: params => `<input type='checkbox' ${params.value ? 'checked' : ''} />`,
      onCellClicked: (event) => {
        if (event.event.target.type === 'checkbox') {

          const isChecked = event.event.target.checked;
             event.data.phpPCI = isChecked;
          const checkedCount = this.getUnselectedCheckboxCountphp();
          if (checkedCount >0) {
            this.allRowsSelectedphp = false;
          } 
          else if(checkedCount ==0 ){
            this.allRowsSelectedphp = true;
          }
          event.data.phpPCI =  isChecked; //!event.data.phpPCI;
        
          const existingData = this.selectedProjectDetailsIDsPhp.find(obj => obj.projectDetailsID === event.data.projectDetailsID);
          if (existingData) {
            existingData.phpPCI = event.data.phpPCI;
          } else {
            this.selectedProjectDetailsIDsPhp.push({
              projectDetailsID: event.data.projectDetailsID,
              phpPCI: event.data.phpPCI,
              projectName:event.data.projectName,
              email:event.data.email,
              name:event.data.name,
              //php: event.data.php,
            });
          }
          event.api.refreshCells({ rowNodes: [event.node], force: true });
        }
      },
    },

    
// {
//   headerName: 'Status',
//   field: 'status',
//   sortable: true,
//   filter: true,
//   width: 150,
//   cellRenderer: params => {
//     const dropdownId = `dropdown-${params.rowIndex}`;
//     return `
//       <select id="${dropdownId}">
//         <option value=true>Yes</option>
//         <option value=false>No</option>
//       </select>
//     `;
//   },
//   onCellClicked: (event) => {
//     const selectedValue = event.event.target.value;
//     const rowIndex = event.rowIndex;
//     const rowData = event.api.getRowNode(rowIndex).data;
//     rowData.status = selectedValue;
//     this.selectedDropdown=selectedValue;
//     console.log('Selected value:', selectedValue);
//   }
// }


{
  headerName: 'Status',
  field: 'status',
  sortable: true,
  filter: true,
  width: 150,
  cellRenderer: params => {
    const dropdownId = `dropdown-${params.rowIndex}`;
    return `
      <select id="${dropdownId}" [(ngModel)]="selectedDropdown">
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    `;
  },
  onCellClicked: (event) => {
    const selectedValue = event.event.target.value;
    const rowIndex = event.rowIndex;
    const rowData = event.api.getRowNode(rowIndex).data;
    const projectDetailsID = rowData.projectDetailsID;
    console.log("satya",rowData)
    rowData.status = selectedValue;
    if (selectedValue === 'false') {
      rowData.pci = false;
      this.visiblenew = true;
      const existingData = this.selectedProjectDetailsIDs.find(obj => obj.projectDetailsID === rowData.projectDetailsID);
      if (existingData) {
       
        existingData.pci = false;
      }
      rowData.phpPCI = false;
      this.visiblenew = true;
      const existingDataPHP = this.selectedProjectDetailsIDsPhp.find(obj => obj.projectDetailsID === rowData.projectDetailsID);
      if (existingDataPHP) {
       
        existingDataPHP.phpPCI = false;
      }
    }
    
    event.api.refreshCells({ columns: ['pci', 'phpPCI'], rowNodes: [event.node],  force: true   });
   // event.api.refreshCells({ rowNodes: [event.node], force: true }); 
    console.log('Selected value:', selectedValue);
    console.log('Selected Project ID:', projectDetailsID)
    this.selectedDropdownProjectId=projectDetailsID
  }
}

    

  ];


  ngOnInit(): void {
    this.getProjectDetails();
    this.resetFilter();
   
   

  }

  getProjectDetails() {
    this.phpformService.getBothPHPPCIInvactive().subscribe((response: any) => {
      this.rowData = response.result;
    })
  }

  // onDropdownChange(event: any) {
  //   const selectedValue = event.target.value;
  //   const rowIndex = event.target.id.split('-')[1]; // Extract row index from the dropdown ID
  //   const rowData = this.rowData[rowIndex]; // Get rowData for the corresponding row index
  
  //   // Update rowData status
  //   rowData.status = selectedValue;
  
  //   // If 'No' is selected, uncheck both PCI and PHP-PCI checkboxes
  //   if (selectedValue === false) {
  //     rowData.pci = false;
  //     rowData.phpPCI = false;
  //   }
  
  //   // Refresh the grid
  //   this.gridApi.refreshCells();
  // }
  getSelectedCheckboxCount(): number {
    let selectedCount = 0;
    this.rowData.forEach((rowDataItem: any) => {      
      if ( rowDataItem.pci) {
        selectedCount++;
      }
    });
    return selectedCount;
  }

  getUnselectedCheckboxCount(): number {
    return this.rowData.length - this.getSelectedCheckboxCount();
    
  }
  getSelectedCheckboxCountphp(): number {
    let selectedCount = 0;
    this.rowData.forEach((rowDataItem: any) => {      
      if ( rowDataItem.phpPCI) {
        selectedCount++;
      }
    });
    return selectedCount;
  }

  getUnselectedCheckboxCountphp(): number {
    return this.rowData.length - this.getSelectedCheckboxCountphp();
    
  }
  
  showDialog() {
    this.visible = true;
}
close(){
 this.visible = false;
 this.visiblenew=false;
 this.inputValue='';
 this.resetFilter();
}
Continue(){
  this.visible = true;
}
submitInput(){
  const payload={
    projectDetailsID : this.selectedDropdownProjectId,
    reasonApplicable : this.inputValue

  }
  this.phpformService.postInActiveApplicable(payload).subscribe((response: any) => {
    if (response.success) {
      let msg = "This Project is addded in Not Applicable List ";
      this.toastService.show(msg, {
        classname: 'bg-success text-light',
        delay: 3000,
      });
      this.selectedProjectDetailsIDs = [];
      this.getProjectDetails();
    }
    else{
      let msg = "Please add Roles or Custom parameter,Please check once"
      this.toastService.show(msg, {
      classname: 'bg-danger text-light',
      delay: 4000,
      });
    }
    this.selectedProjectDetailsIDs = [];
  });
  
this.close();


}
  
  
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onRowClicked(event: any) {
    this.selectedColumnData = event.data;
    this.phpformService.setMessage(this.selectedColumnData);
  }

  selectAllRowsPhp(event: any) {
    const selected = event.target.checked;
    if (this.selectedValue) {
      this.rowData.forEach((rowDataItem: any) => {
        rowDataItem.phpPCI = selected;
        const existingData = this.selectedProjectDetailsIDsPhp.find(obj => obj.projectDetailsID === rowDataItem.projectDetailsID);
        if (existingData) {
          existingData.phpPCI = selected;
        } else {
          this.selectedProjectDetailsIDsPhp.push({
            projectDetailsID: rowDataItem.projectDetailsID,
            phpPCI: selected,
            projectName:rowDataItem.projectName,
            email:rowDataItem.email,
            name:rowDataItem.name,
          });
        }
      });
      this.gridApi.refreshCells();
      console.log("CheckBox-Php", this.selectedProjectDetailsIDsPhp)
    }
    else {
      this.rowData.forEach((rowDataItem: any) => {
        rowDataItem.phpPCI = selected;
        const existingData = this.selectedProjectDetailsIDsPhp.find(obj => obj.projectDetailsID === rowDataItem.projectDetailsID);
        if (existingData) {
          existingData.phpPCI = selected;
        } else {
          this.selectedProjectDetailsIDsPhp.push({
            projectDetailsID: rowDataItem.projectDetailsID,
            phpPCI: selected,
            projectName:rowDataItem.projectName,
            email:rowDataItem.email,
            name:rowDataItem.name,
          });
        }
      });
      this.gridApi.refreshCells();
      console.log("CheckBox-Php", this.selectedProjectDetailsIDsPhp)
    }

  }

  selectAllRowsPCI(event: any) {
    const selected = event.target.checked;
    if (this.selectedValue) {
      this.rowData.forEach((rowDataItem: any) => {
        rowDataItem.pci = selected;
        const existingData = this.selectedProjectDetailsIDs.find(obj => obj.projectDetailsID === rowDataItem.projectDetailsID);
        if (existingData) {
          existingData.pci = selected;
        } else {
          this.selectedProjectDetailsIDs.push({
            projectDetailsID: rowDataItem.projectDetailsID,
            pci: selected,
            projectName:rowDataItem.projectName,
            email:rowDataItem.email,
            name:rowDataItem.name,
          });
        }
      });
      this.gridApi.refreshCells();
      console.log("CheckBox-PCI", this.selectedProjectDetailsIDs)

    }
    else {
      this.rowData.forEach((rowDataItem: any) => {
        rowDataItem.pci = selected;
        const existingData = this.selectedProjectDetailsIDs.find(obj => obj.projectDetailsID === rowDataItem.projectDetailsID);
        if (existingData) {
          existingData.pci = selected;
        } else {
          this.selectedProjectDetailsIDs.push({
            projectDetailsID: rowDataItem.projectDetailsID,
            pci: selected,
            projectName:rowDataItem.projectName,
            email:rowDataItem.email,
            name:rowDataItem.name,
          });
        }
      });
      this.gridApi.refreshCells();
      console.log("CheckBox-PCI", this.selectedProjectDetailsIDs)
    }


  }
  resetFilter() {
    this.selectedValue = '';
    this.selectedProjectDetailsIDs = [];
    this.selectedProjectDetailsIDsPhp = [];
    this.allRowsSelectedPCI = false;
    this.allRowsSelectedphp = false;
    this.getProjectDetails();
  }
  resetFilterReset() {
    this.selectedValue = '';
    this.selectedProjectDetailsIDs = [];
    this.selectedProjectDetailsIDsPhp = [];
    this.allRowsSelectedPCI = false;
    this.allRowsSelectedphp = false;


  }


  PhpPCIsubmit(): void {
    if (this.selectedProjectDetailsIDs.length === 0 && this.selectedProjectDetailsIDsPhp.length === 0) {
      return;
    }
    const postData = this.selectedProjectDetailsIDs
    this.phpformService.postIsActivePCI(postData).subscribe((response: any) => {
      if (response.success) {
        let msg = "Selected Project PCI IsActive";
        this.toastService.show(msg, {
          classname: 'bg-success text-light',
          delay: 3000,
        });
        this.selectedProjectDetailsIDs = [];
        this.getProjectDetails();
      }
      else{
        let msg = "Sorry,Your Project Manager EmailID not Available,So You can't active this Project."
        this.toastService.show(msg, {
        classname: 'bg-danger text-light',
        delay: 4000,
        });
      }
      this.selectedProjectDetailsIDs = [];
      
    });
    const postDatanew = this.selectedProjectDetailsIDsPhp
    this.phpformService.postIsActivePHP(postDatanew).subscribe((response: any) => {
      if (response.success) {
        let msg = "Selected Project PHP IsActive";
        this.toastService.show(msg, {
          classname: 'bg-success text-light',
          delay: 3000,
        });
        this.selectedProjectDetailsIDsPhp = [];
        this.getProjectDetails();
      }
      else{
        let msg = "Sorry,Your Project Manager EmailID not Available,So You can't active this Project."
        this.toastService.show(msg, {
        classname: 'bg-danger text-light',
        delay: 4000,
        });
      }
      this.selectedProjectDetailsIDsPhp = [];
    });
    this.resetFilter();
    this.getProjectDetails();


  }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }


}
