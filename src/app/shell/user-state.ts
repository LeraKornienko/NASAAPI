import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FilterList, FilterStateModel } from './model';
import { NasaApiService } from './service.service';
import { FilterChange, FilterClear, GetPhotosByParameters, SetCamera, SetSol } from './user-actions';



@State<FilterStateModel>({
  name: 'filter',
  defaults: {
    sol: 1000,
    camera: " ",
    page: 1,
  },
})
@Injectable()
export class FilterState {

  @Selector()
  static FilterList(state: FilterStateModel): FilterList {
    const {
      sol,
      camera,
      page,
    } = state;
    return {
      sol,
      camera,
      page,
    };
  }

  constructor(private nasaApiService: NasaApiService) {}

  @Action(SetCamera)
  setCamera({ patchState, dispatch }: StateContext<FilterStateModel>, { payload }: SetCamera): void {
    patchState({ camera: payload });
    dispatch(new FilterChange());
  }

  @Action(SetSol)
  setSol({ patchState, dispatch }: StateContext<FilterStateModel>, { payload }: SetSol): void {
    patchState({ sol: payload });
    dispatch(new FilterChange());
  }

  @Action(FilterChange)
  filterChange({}: StateContext<FilterStateModel>, {}: FilterChange): void {}

  @Action(FilterClear)
  FilterClear({ patchState }: StateContext<FilterStateModel>, {}: FilterChange): void {
    patchState({
      sol: undefined,
      camera: undefined,
      page: undefined,
    });
  }
}


