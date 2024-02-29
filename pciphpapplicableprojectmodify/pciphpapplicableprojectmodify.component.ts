import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, TemplateRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { PhpformService } from 'src/app/shared/services/phpform.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-pciphpapplicableprojectmodify',
  templateUrl: './pciphpapplicableprojectmodify.component.html',
  styleUrls: ['./pciphpapplicableprojectmodify.component.css']
})
export class PciphpapplicableprojectmodifyComponent {
  
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
  selectedDropdownProjectId:any;
  visible: boolean = false;
  visiblepciphp: boolean = false;
  visiblepci:boolean = false;
  visiblenew: boolean=false;
  visiblenewpci: boolean=false;
  visiblenewphp: boolean=false;

  inputValue: string;
  newinputValue: string;
  inputValuepci: string;

  uncheckProjectId: any;
  uncheckphpPCI: any;
  uncheckPCI: any;

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
          event.data.pci = !event.data.pci;
    
          const existingData = this.selectedProjectDetailsIDs.find(obj => obj.projectDetailsID === event.data.projectDetailsID);
          if (existingData) {
            existingData.pci = event.data.pci;
            
          } else {
            this.uncheckProjectId=event.data.projectDetailsID;
            this.uncheckPCI=event.data.pci;
            
            this.selectedProjectDetailsIDs.push({
              projectDetailsID: event.data.projectDetailsID,
              pci: event.data.pci,
              projectName:event.data.projectName,
              email:event.data.email,
              name:event.data.name,
              // php: event.data.php,
            });
          }
          if (!event.data.pci) {
            this.visiblenewpci = true;
            
          }
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
          event.data.phpPCI = !event.data.phpPCI;
          const existingData = this.selectedProjectDetailsIDsPhp.find(obj => obj.projectDetailsID === event.data.projectDetailsID);
          if (existingData) {
            existingData.phpPCI = event.data.phpPCI;
          } else {
            this.uncheckProjectId=event.data.projectDetailsID;
            this.uncheckphpPCI=event.data.phpPCI;
            
            this.selectedProjectDetailsIDsPhp.push({
              projectDetailsID: event.data.projectDetailsID,
              phpPCI: event.data.phpPCI,
              projectName:event.data.projectName,
              email:event.data.email,
              name:event.data.name,
              //php: event.data.php,
            });
          }
          if (!event.data.phpPCI) {
            this.visiblenewphp = true;

          }
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
//       <select id="${dropdownId}" [(ngModel)]="selectedDropdown">
//         <option value="true">Yes</option>
//         <option value="false">No</option>
//       </select>
//     `;
//   },
//   onCellClicked: (event) => {
//     const selectedValue = event.event.target.value;
//     const rowIndex = event.rowIndex;
//     const rowData = event.api.getRowNode(rowIndex).data;
//     const projectDetailsID = rowData.projectDetailsID;
  
//     rowData.status = selectedValue;
//     if (selectedValue === 'false') {
//       this.visible = true;
//       rowData.pci = false;
//       const existingData = this.selectedProjectDetailsIDs.find(obj => obj.projectDetailsID === rowData.projectDetailsID);
//       if (existingData) {
//         existingData.pci = false;
//       }
//       rowData.phpPCI = false;
//       const existingDataPHP = this.selectedProjectDetailsIDsPhp.find(obj => obj.projectDetailsID === rowData.projectDetailsID);
//       if (existingDataPHP) {
//         this.visible = true;
//         existingDataPHP.phpPCI = false;
//       }
//     }
    
//     event.api.refreshCells({ columns: ['pci', 'phpPCI'], rowNodes: [event.node],  force: true   });
//    // event.api.refreshCells({ rowNodes: [event.node], force: true }); 
//     console.log('Selected value:', selectedValue);
//     console.log('Selected Project ID:', projectDetailsID)
//     this.selectedDropdownProjectId=projectDetailsID
//   }
// }

  ];


  ngOnInit(): void {
    this.getProjectDetails();
    this.resetFilter();
  }
  // getProjectDetails() {
  //   this.phpformService.getAllPHPPCIProjects().subscribe((response: any) => {
  //     this.rowData = response.result;
  //   })
  // }

  getProjectDetails() {
    this.phpformService.getAllPHPPCIProjects().subscribe((response: any) => {
      this.rowData = response.result;

      // Extract unique regions for the dropdown
      this.regions = [...new Set(this.rowData.map((item: any) => item.region))];
      this.countries = [...new Set(this.rowData.map((item: any) => item.country))];
      this.filteredCountries=this.countries;
      this.sbuNames = [...new Set(this.rowData.map((item: any) => item.sbuName))];
      this.filteredSbuNames=this.sbuNames;
      this.accountNames = [...new Set(this.rowData.map((item: any) => item.accountName))];
      this.filteredAccountNames=this.accountNames;
      this.projectNames = [...new Set(this.rowData.map((item: any) => item.projectName))];
      this.filteredProjectNames=this.projectNames;
      this.sa = this.rowData;
    });
  }


  // onRegionChange() {
  //   this.applyFilters();
  //   this.resetFiltersRegion();
  // }
  filteredSbuNames:string[] = [];
  filteredAccountNames:string[] = [];
  filteredProjectNames: string[] = [];
  
  onRegionChange() {
    if (!this.selectedRegions || this.selectedRegions.length === 0) {
        this.filteredSbuNames = this.sbuNames;
        this.filteredAccountNames = this.accountNames;
        this.filteredProjectNames = this.projectNames;
    } else {
      this.filteredCountries = this.countries.filter(country => {
        return this.rowData.some(item => item.country === country && this.selectedRegions===(item.region));
    });
        this.filteredSbuNames = this.sbuNames.filter(sbuName => {
            return this.rowData.some(item => item.sbuName === sbuName && this.selectedRegions===(item.region));
        });

        this.filteredAccountNames = this.accountNames.filter(accountName => {
            return this.rowData.some(item => item.accountName === accountName && this.selectedRegions===(item.region));
        });

        this.filteredProjectNames = this.projectNames.filter(projectName => {
            return this.rowData.some(item => item.projectName === projectName && this.selectedRegions===(item.region));
        });
    }
    this.selectedCountries = [];
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];

    // Apply other filters if necessary
    this.applyFilters();
}


  // onCountryChange() {
  //   this.applyFilters();
  //   this.resetFiltersCountry();
  // }
  onCountryChange() {
    if (!this.selectedCountries || this.selectedCountries.length === 0) {
        this.filteredSbuNames = this.sbuNames;
        this.filteredAccountNames = this.accountNames;
        this.filteredProjectNames = this.projectNames;
    } else {
        
			this.filteredSbuNames = this.sbuNames.filter(sbuName => {
            return this.rowData.some(item => item.sbuName === sbuName && this.selectedCountries===(item.country));
        });
        this.filteredAccountNames = this.accountNames.filter(accountName => {
            return this.rowData.some(item => item.accountName === accountName && this.selectedCountries===(item.country));
        });

        this.filteredProjectNames = this.projectNames.filter(projectName => {
            return this.rowData.some(item => item.projectName === projectName && this.selectedCountries===(item.country));
        });
    }
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.applyFilters();
}

  applyFilters() {
    this.resetFilterReset();
    let filteredData = this.rowData;
    this.sa = filteredData;
    // Filter by selected regions
    if (this.selectedRegions.length > 0) {
      filteredData = filteredData.filter(item => this.selectedRegions === (item.region));
      this.sa = filteredData;
    }

    if (this.selectedCountries.length > 0) {
      filteredData = filteredData.filter(item => this.selectedCountries === (item.country));
      this.sa = filteredData;
    }
    
    if (this.selectedSbuNames.length > 0) {
      console.log("This.selectedSbuNames", this.selectedSbuNames)
      filteredData = filteredData.filter(item => this.selectedSbuNames === (item.sbuName));
      this.sa = filteredData;
      console.log("sa", this.sa)
    }
    if (this.selectedAccountNames.length > 0) {
      filteredData = filteredData.filter(item => this.selectedAccountNames === (item.accountName));
      this.sa = filteredData;
    }
    if (this.selectedProjectNames.length > 0) {
      filteredData = filteredData.filter(item => this.selectedProjectNames === (item.projectName));
      this.sa = filteredData;
    }

    this.gridApi.setRowData(filteredData);
  }


  // onSbuNameChange() {
  //   this.applyFilters();
  //   this.resetFiltersSbuName();
  // }
  onSbuNameChange() {
    if (!this.selectedSbuNames || this.selectedSbuNames.length === 0) {
        this.filteredAccountNames = this.accountNames;
        this.filteredProjectNames = this.projectNames;
    } else {
        this.filteredAccountNames = this.accountNames.filter(accountName => {
            return this.rowData.some(item => item.accountName === accountName && this.selectedSbuNames===(item.sbuName));
        });
        this.filteredProjectNames = this.projectNames.filter(projectName => {
            return this.rowData.some(item => item.projectName === projectName && this.selectedSbuNames===(item.sbuName));
        });
    }
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.applyFilters();
}

  // onAccountNameChange() {
  //   this.applyFilters();
  //   this.resetFiltersAccountName();
  // }
  onAccountNameChange() {
    if (!this.selectedAccountNames || this.selectedAccountNames.length === 0) {
        this.filteredProjectNames = this.projectNames;
    } else {
        // this.filteredAccountNames = this.accountNames.filter(accountName => {
        //     return this.rowData.some(item => item.accountName === accountName && this.selectedAccountNames===(item.accountName));
        // });

        this.filteredProjectNames = this.projectNames.filter(projectName => {
            return this.rowData.some(item => item.projectName === projectName && this.selectedAccountNames===(item.accountName));
        });
    }
    this.selectedProjectNames = [];
    this.applyFilters();
}
  onProjectNameChange() {
    this.applyFilters();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  value: { value: any | null, label: string }[] = [
    { value: 1, label: 'PHP-IsActive' },
    { value: 2, label: 'PHP-InActive' },
    { value: 3, label: 'PCI-IsActive' },
    { value: 4, label: 'PCI-InActive' },
    { value: 5, label: 'Both-IsActive' },
    { value: 6, label: 'Both-InActive' },
    // { value: 7, label: 'Not Assigned' }
  ];


  // onChange(value: any | null): void {
  //   // Handle the selected value
  //   //this.alldropdownsReset();
  //   let filteredData = this.rowData;
  //   this.dd = filteredData;
  //   if (value == 1) {
  //     filteredData = filteredData.filter((item: any) => {
  //       return item.phpPCI === true;
  //     });
  //     this.dd = filteredData;
  //   }
  //   if (value == 2) {
  //     filteredData = filteredData.filter((item: any) => {
  //       return item.phpPCI === false;
  //     });
  //     this.dd = filteredData;
  //   }
  //   if (value == 3) {
  //     filteredData = filteredData.filter((item: any) => {
  //       return item.pci === true;
  //     });
  //     this.dd = filteredData;
  //   }
  //   if (value == 4) {
  //     filteredData = filteredData.filter((item: any) => {
  //       return item.pci === false;
  //     });
  //     this.dd = filteredData;
  //   }
  //   if (value == 5) {
  //     filteredData = filteredData.filter((item: any) => {
  //       return item.pci === true && item.phpPCI === true;
  //     });
  //     this.dd = filteredData;
  //   }

  //   if (value == 6) {
  //     filteredData = filteredData.filter((item: any) => {
  //       return item.pci === false && item.phpPCI === false;
  //     });
  //     this.dd = filteredData;
  //   }
  //   this.gridApi.setRowData(this.dd);
  // }
  onChange(value: any | null): void {
    // Handle the selected value
    this.allRowsSelectedPCI = false;
    this.allRowsSelectedphp = false;

    let filteredData = this.sa;
    this.dd = filteredData;
    
    if (value === 1) {
      filteredData = filteredData.filter(item => item.phpPCI === true);
      this.dd = filteredData;
    } else if (value === 2) {
      filteredData = filteredData.filter(item => item.phpPCI === false);
      this.dd = filteredData;
    } else if (value === 3) {
      filteredData = filteredData.filter(item => item.pci === true);
      this.dd = filteredData;
    } else if (value === 4) {
      filteredData = filteredData.filter(item => item.pci === false);
      this.dd = filteredData;
    } else if (value === 5) {
      filteredData = filteredData.filter(item => item.pci === true && item.phpPCI === true);
      this.dd = filteredData;
    } else if (value === 6) {
      filteredData = filteredData.filter(item => item.pci === false && item.phpPCI === false);
      this.dd = filteredData;
    }
  
    this.gridApi.setRowData(this.dd);
  }


  onRowClicked(event: any) {
    this.selectedColumnData = event.data;
    this.phpformService.setMessage(this.selectedColumnData);
  }

  selectAllRowsPhp(event: any) {
    const selected = event.target.checked;
    if (this.selectedValue) {
      this.dd.forEach((rowDataItem: any) => {
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
      this.sa.forEach((rowDataItem: any) => {
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
      this.dd.forEach((rowDataItem: any) => {
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
      this.sa.forEach((rowDataItem: any) => {
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

  resetFiltersRegion() {
    this.selectedCountries = [];
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.onCountryChange();
    this.onSbuNameChange();
    this.onAccountNameChange();
    this.onProjectNameChange();
  }
  resetFiltersCountry() {
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.onSbuNameChange();
    this.onAccountNameChange();
    this.onProjectNameChange();
  }
  resetFiltersSbuName() {
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.onAccountNameChange();
    this.onProjectNameChange();
  }
  resetFiltersAccountName() {
    this.selectedProjectNames = [];
    this.onProjectNameChange();
  }
  alldropdowns() {
    this.selectedRegions = [];
    this.selectedCountries = [];
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.getProjectDetails();
  }
  alldropdownsReset() {
    this.selectedRegions = [];
    this.selectedCountries = [];
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.allRowsSelectedPCI = false;
    this.allRowsSelectedphp = false;


  }

  resetFilter() {
    this.selectedValue = '';
    this.selectedProjectDetailsIDs = [];
    this.selectedProjectDetailsIDsPhp = [];
    this.allRowsSelectedPCI = false;
    this.allRowsSelectedphp = false;
    this.getProjectDetails();
    this.alldropdowns();
  }
  resetFilterReset() {
    this.selectedValue = '';
    this.selectedProjectDetailsIDs = [];
    this.selectedProjectDetailsIDsPhp = [];
    
    this.allRowsSelectedPCI = false;
    this.allRowsSelectedphp = false;



  }

  // PhpPCIsubmit() {
  //   console.log("CheckBox-PCI", this.selectedProjectDetailsIDs)
  //   console.log("CheckBox-Php", this.selectedProjectDetailsIDsPhp)
  //   this.getProjectDetails();
  //   this. resetFilter();
  // }
  PhpPCIsubmit(): void {
    if (this.selectedProjectDetailsIDs.length === 0 && this.selectedProjectDetailsIDsPhp.length === 0) {
      return;
    }
    const postData = this.selectedProjectDetailsIDs
    this.phpformService.postIsActivePCI(postData).subscribe((response: any) => {
      if (response.success) {
        let msg = "PCI-PHP screen access  Updated Successfully";
        this.toastService.show(msg, {
          classname: 'bg-success text-light',
          delay: 3000,
        });
        this.selectedProjectDetailsIDs = [];
        this.getProjectDetails();
      }
      // else{
      //   let msg = "Please add Roles or Custom parameter,Please check once"
      //   this.toastService.show(msg, {
      //   classname: 'bg-danger text-light',
      //   delay: 4000,
      //   });
      // }
      this.selectedProjectDetailsIDs = [];
    });

    const postDatanew = this.selectedProjectDetailsIDsPhp
    this.phpformService.postIsActivePHP(postDatanew).subscribe((response: any) => {
      if (response.success) {
        let msg = "PCI-PHP screen access  Updated Successfully";
        this.toastService.show(msg, {
          classname: 'bg-success text-light',
          delay: 3000,
        });
        this.selectedProjectDetailsIDsPhp = [];
        this.getProjectDetails();
      }
     
      this.selectedProjectDetailsIDsPhp = [];
    });

    this.resetFilter();


  }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
  Continue(){
   // this.visible = true;
    
    this.visible=true;
  }
  ContinuePCI(){
    this.visible=true;

  }
  ContinuePHP(){
    this.visiblepciphp=true;
  }

 
close(){
 this.visible = false;
 this.visiblepciphp=false;
 this.visiblenewpci=false;
 this.visiblepciphp=false;
 this.visiblepci=false;
 this.visiblenew=false;
 this.visiblenewphp=false;
 
 this.inputValue='';
 this.newinputValue='';
 this.inputValuepci='';
 this.selectedProjectDetailsIDs = [];
    this.selectedProjectDetailsIDsPhp = [];
    this.resetFilter();
}

submitckeckBoxpci(){
    const postData = {
      projectDetailsID: this.uncheckProjectId,
      pci : this.uncheckPCI,
      pciReason: this.inputValuepci
  };
  console.log("PCI:-",postData)
  this.phpformService.postInActivePCIModify(postData).subscribe((response: any) => {
    if (response.success) {
      let msg = "  This PCI Project is Active to InActive";
      this.toastService.show(msg, {
        classname: 'bg-success text-light',
        delay: 3000,
      });
      this.selectedProjectDetailsIDs = [];
      this.getProjectDetails();
    }
    this.selectedProjectDetailsIDs = [];
  });
  this.close();
  
}
submitckeckBoxPHP(){
    const postDataphpPCI = {
      projectDetailsID: this.uncheckProjectId,
      phpPCI : this.uncheckphpPCI,
      phpReason: this.newinputValue
  };
    console.log("postDataphpPCI",postDataphpPCI);

    this.phpformService.postInActivePHPModify(postDataphpPCI).subscribe((response: any) => {
      if (response.success) {
        let msg = "  This PHP Project is Active to InActive";
        this.toastService.show(msg, {
          classname: 'bg-success text-light',
          delay: 3000,
        });
        this.selectedProjectDetailsIDs = [];
        this.getProjectDetails();
      }
      this.selectedProjectDetailsIDs = [];
    });
    this.close();
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
    // else{
    //   let msg = "Please add Roles or Custom parameter,Please check once"
    //   this.toastService.show(msg, {
    //   classname: 'bg-danger text-light',
    //   delay: 4000,
    //   });
    // }
    this.selectedProjectDetailsIDs = [];
  });
  
console.log("PCIPHP not Applicable",payload);
this.close();


}
  
}
