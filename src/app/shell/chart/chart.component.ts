import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NasaApiService } from '../service.service';
import { debounceTime, distinctUntilChanged, map, startWith, Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { number } from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  solFormControl = new FormControl('');
  cameraFormControl = new FormControl('');
  pageFormControl = new FormControl('');
  lessFormControl = new FormControl('');
  solVal: any;
  pageVal: number = 1;
  applicationParams: {
    sol: number;
    camera: string;
    page: number;
  } = {
    sol: 1000,
    camera: "",
    page: 1,
    };

  constructor(private http: HttpClient, private nasaApi: NasaApiService) {}
  MarsObject: any | null = null;
  responceObject: any = {
    photos: []
  }


  ngOnInit(): void {
    this.cameraFormControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        debounceTime(400),
        startWith(''),
        map((value) => value!.trim()),
      )
      .subscribe((value: string) => (this.applicationParams.camera = value));

    this.solFormControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(page => this.solVal = page)

    this.nasaApi
      .GetPhotosByParameters(this.applicationParams)
      .pipe(takeUntil(this.destroy$))
      .subscribe(obj => this.responceObject = obj);

  };

  currentPageMore() {
    this.applicationParams.page = this.applicationParams.page + 1;
    this.onSearch()
  }
  currentPageLess() {
    if (this.applicationParams.page !== 1) {
      this.applicationParams.page = this.applicationParams.page - 1;
      this.onSearch()
    }
  }

  onSearch() {
    this.applicationParams.sol = parseInt(this.solVal);
    this.nasaApi
      .GetPhotosByParameters(this.applicationParams)
      .pipe(takeUntil(this.destroy$))
      .subscribe(obj => this.responceObject = obj)
   }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

