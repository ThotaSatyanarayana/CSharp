import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, TemplateRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { PhpformService } from 'src/app/shared/services/phpform.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-pmoapplicableprojectmodify',
  templateUrl: './pmoapplicableprojectmodify.component.html',
  styleUrls: ['./pmoapplicableprojectmodify.component.css']
})
export class PmoapplicableprojectmodifyComponent {

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
  showpopup: any;
  visible: boolean = false;

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
  applicable: any;
  selectedapplicableStatus: string[] = [];

  filteredCountries: any;


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

  values: any
  ProjectId: any;
  PName: string;
  PStatus:any;
  PReasonApplicable: string;
  reason: string = '';

  selectedOption: any;

  value: { value: boolean, label: string }[] = [
    { value: true, label: 'PMO Applicable' }, 
    { value: false, label: 'PMO Not Applicable' },
  ];
 


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
      headerName: 'Staus',
      field: 'applicableStatus',
      sortable: true,
      filter: true,
      //  minWidth: 50,
      width: 100,
      resizable: true,
    },
    {
      headerName: 'PMO Applicable',
      width: 140,
      sortable: false,
      cellRenderer: function (params) {
        console.log(params, 'params');
        //   if (false) {
        //     return `<i class="bi bi-eye-fill" style="height: 16px; width: 16px; color: #296edb; opacity: .4; cursor: inherit">`;
        //   }
        //   return `<i class="bi bi-eye-fill" style="height: 16px; width: 16px; color: #296edb; cursor: pointer;">`;
        // },
        if (false) {
          return `<i class="bi bi-pencil-fill" style="height: 16px; width: 16px; color: #296edb; opacity: .4; cursor: inherit"></i>`;
        }
        return `<i class="bi bi-pencil-fill" style="height: 16px; width: 16px; color: #296edb; cursor: pointer;"></i>`;
      },
      onCellClicked: (event) => {
        console.log("satya", event.data.projectDetailsID);
        this.ProjectId = event.data.projectDetailsID,
          this.PName = event.data.projectName,
          this.PStatus=event.data.applicableStatus,
          this.PReasonApplicable=event.data.reasonApplicable,
          // this.content.open();

          this.contentOpen(event);
        // alert('You clicked a button in row: ' + 1);
      },
    }


  ];

  ngOnInit(): void {
    this.getProjectDetails();
    this.resetFilter();
    this.reset();

  }

  submit() {
    if (this.selectedOption.length !== 0) {
      if (this.selectedOption == 'true') {
        this.values = true
      }
      if (this.selectedOption == 'false') {
        this.values = false
      }

      console.log("selectOpton", this.selectedOption)
      const addSave = {
        projectDetailsID: this.ProjectId,
        pciPHPApplicable: this.values,
        reasonApplicable: this.reason,
      };

      this.phpformService.postPCIPHPApplicability(addSave).subscribe((response: any) => {
        if (response.success) {
          let msg = "Project Name is" + this.PName + "is " + this.selectedOption + " Updated Successfully";
          this.toastService.show(msg, {
            classname: 'bg-success text-light',
            delay: 3000,
          });
        }
        this.getProjectDetails();

      });
      console.log("popup", addSave);
      this.close();
    }
    else{
      let msg = "Please select dropdown Option";
      this.toastService.show(msg, {
        classname: 'bg-danger text-light',
        delay: 3000,
      });
    }
  }




  close() {
    this.visible = false;
    this.reset();
    this.getProjectDetails();
  }
  reset() {
    this.selectedOption = [];
    this.reason = '';
  }

 


  getProjectDetails() {
    this.phpformService.getBothApplicableNotApplicableProjects().subscribe((response: any) => {
      this.rowData = response.result;

      this.regions = [...new Set(this.rowData.map((item: any) => item.region))];
      this.countries = [...new Set(this.rowData.map((item: any) => item.country))];
      this.filteredCountries = this.countries;
      this.sbuNames = [...new Set(this.rowData.map((item: any) => item.sbuName))];
      this.filteredSbuNames = this.sbuNames;
      this.accountNames = [...new Set(this.rowData.map((item: any) => item.accountName))];
      this.filteredAccountNames = this.accountNames;
      this.projectNames = [...new Set(this.rowData.map((item: any) => item.projectName))];
      this.filteredProjectNames = this.projectNames;
      this.applicable = [...new Set(this.rowData.map((item: any) => item.applicableStatus))];
      this.filteredApplicable = this.applicable;

    });
  }



  filteredSbuNames: string[] = [];
  filteredAccountNames: string[] = [];
  filteredProjectNames: string[] = [];
  filteredApplicable: string[] = [];

  onRegionChange() {
    if (!this.selectedRegions || this.selectedRegions.length === 0) {
      this.filteredSbuNames = this.sbuNames;
      this.filteredAccountNames = this.accountNames;
      this.filteredProjectNames = this.projectNames;
      this.filteredApplicable = this.applicable;
    } else {
      this.filteredCountries = this.countries.filter(country => {
        return this.rowData.some(item => item.country === country && this.selectedRegions === (item.region));
      });
      this.filteredSbuNames = this.sbuNames.filter(sbuName => {
        return this.rowData.some(item => item.sbuName === sbuName && this.selectedRegions === (item.region));
      });

      this.filteredAccountNames = this.accountNames.filter(accountName => {
        return this.rowData.some(item => item.accountName === accountName && this.selectedRegions === (item.region));
      });

      this.filteredProjectNames = this.projectNames.filter(projectName => {
        return this.rowData.some(item => item.projectName === projectName && this.selectedRegions === (item.region));
      });
      this.filteredApplicable = this.applicable.filter(applicableStatus => {
        return this.rowData.some(item => item.applicableStatus === applicableStatus && this.selectedRegions === (item.region));
      });
    }
    this.selectedCountries = [];
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.selectedapplicableStatus = [];

    this.applyFilters();
  }

  onCountryChange() {
    if (!this.selectedCountries || this.selectedCountries.length === 0) {
      this.filteredSbuNames = this.sbuNames;
      this.filteredAccountNames = this.accountNames;
      this.filteredProjectNames = this.projectNames;
      this.filteredApplicable = this.applicable;
    } else {

      this.filteredSbuNames = this.sbuNames.filter(sbuName => {
        return this.rowData.some(item => item.sbuName === sbuName && this.selectedCountries === (item.country));
      });
      this.filteredAccountNames = this.accountNames.filter(accountName => {
        return this.rowData.some(item => item.accountName === accountName && this.selectedCountries === (item.country));
      });

      this.filteredProjectNames = this.projectNames.filter(projectName => {
        return this.rowData.some(item => item.projectName === projectName && this.selectedCountries === (item.country));
      });
      this.filteredApplicable = this.applicable.filter(applicableSatus => {
        return this.rowData.some(item => item.applicableSatus === applicableSatus && this.selectedCountries === (item.country));
      });
    }
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.selectedapplicableStatus = [];
    this.applyFilters();
  }

  applyFilters() {
    this.resetFilterReset();
    let filteredData = this.rowData;
    if (this.selectedRegions.length > 0) {
      filteredData = filteredData.filter(item => this.selectedRegions === (item.region));
    }

    if (this.selectedCountries.length > 0) {
      filteredData = filteredData.filter(item => this.selectedCountries === (item.country));
    }

    if (this.selectedSbuNames.length > 0) {
      console.log("This.selectedSbuNames", this.selectedSbuNames)
      filteredData = filteredData.filter(item => this.selectedSbuNames === (item.sbuName));
    }
    if (this.selectedAccountNames.length > 0) {
      filteredData = filteredData.filter(item => this.selectedAccountNames === (item.accountName));
    }
    if (this.selectedProjectNames.length > 0) {
      filteredData = filteredData.filter(item => this.selectedProjectNames === (item.projectName));
    }
    if (this.selectedapplicableStatus.length > 0) {
      filteredData = filteredData.filter(item => this.selectedapplicableStatus === (item.applicableStatus));
    }

    this.gridApi.setRowData(filteredData);
  }

  onSbuNameChange() {
    if (!this.selectedSbuNames || this.selectedSbuNames.length === 0) {
      this.filteredAccountNames = this.accountNames;
      this.filteredProjectNames = this.projectNames;
      this.filteredApplicable = this.applicable;
    } else {
      this.filteredAccountNames = this.accountNames.filter(accountName => {
        return this.rowData.some(item => item.accountName === accountName && this.selectedSbuNames === (item.sbuName));
      });
      this.filteredProjectNames = this.projectNames.filter(projectName => {
        return this.rowData.some(item => item.projectName === projectName && this.selectedSbuNames === (item.sbuName));
      });
      this.filteredApplicable = this.applicable.filter(applicableStatus => {
        return this.rowData.some(item => item.applicableStatus === applicableStatus && this.selectedSbuNames === (item.sbuName));
      });
    }
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.selectedapplicableStatus = [];
    this.applyFilters();
  }

  onAccountNameChange() {
    if (!this.selectedAccountNames || this.selectedAccountNames.length === 0) {
      this.filteredProjectNames = this.projectNames;
      this.filteredApplicable = this.applicable;
    } else {
      this.filteredProjectNames = this.projectNames.filter(projectName => {
        return this.rowData.some(item => item.projectName === projectName && this.selectedAccountNames === (item.accountName));
      });
      this.filteredApplicable = this.applicable.filter(applicableStatus => {
        return this.rowData.some(item => item.applicableStatus === applicableStatus && this.selectedAccountNames === (item.accountName));
      });
    }
    this.selectedProjectNames = [];
    this.selectedapplicableStatus = [];
    this.applyFilters();
  }
  onProjectNameChange() {
    this.applyFilters();
  }
  onApplicableChange() {
    this.applyFilters();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }




  onRowClicked(event: any) {
    this.selectedColumnData = event.data;
    this.phpformService.setMessage(this.selectedColumnData);
    this.showpopup = false;
  }




  resetFiltersRegion() {
    this.selectedCountries = [];
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.selectedapplicableStatus = [];
    this.onCountryChange();
    this.onSbuNameChange();
    this.onAccountNameChange();
    this.onProjectNameChange();
    this.onApplicableChange();
  }
  resetFiltersCountry() {
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.selectedapplicableStatus = [];
    this.onSbuNameChange();
    this.onAccountNameChange();
    this.onProjectNameChange();
    this.onApplicableChange();
  }
  resetFiltersSbuName() {
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.selectedapplicableStatus = [];
    this.onAccountNameChange();
    this.onProjectNameChange();
    this.onApplicableChange();
  }
  resetFiltersAccountName() {
    this.selectedProjectNames = [];
    this.selectedapplicableStatus = [];
    this.onProjectNameChange();
    this.onApplicableChange();
  }
  alldropdowns() {
    this.selectedRegions = [];
    this.selectedCountries = [];
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.selectedapplicableStatus = [];
    this.getProjectDetails();
  }
  alldropdownsReset() {
    this.selectedRegions = [];
    this.selectedCountries = [];
    this.selectedSbuNames = [];
    this.selectedAccountNames = [];
    this.selectedProjectNames = [];
    this.selectedapplicableStatus = [];
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

  onDataReceived(data: any) {

  }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
  contentOpen(event) {
    this.visible = true;

    //this.showpopup = true;
    this.phpformService.setMessage(this.selectedColumnData);
    this.phpformService.setPopupData(this.selectedColumnData);
    console.log("SelectRow1:", this.selectedColumnData);
    // this.getProjects(this.employeeID);
    //this.getFilter();
    // this.resetFilter();

  }


  exportToExcel() {
    // this.gridApi.setRowData(filteredData);
    const fileName = 'PHP-PCIStatusDetails.xlsx';
    const exportData = this.rowData.map(item => {
      return {
        'Region': item.region,
        'Country': item.country,
        'SBUName': item.sbuName,
        'accountName': item.accountName,
        'projectCode': item.projectCode,
        'projectDetailsID': item.projectDetailsID,
        'projectName': item.projectName,
        'projectType': item.projectType,
        'projectManager': item.projectManager,
        'PHP': item.phpPCI,
        'pci': item.pci,

      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, fileName);
  }
}
