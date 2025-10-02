import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { VehicleFacade } from '../../store/facades/vehicle.facade';
import { Vehicle, VehicleType, VehicleModel } from '../../store/models/vehicle-state.model';

@Component({
  selector: 'app-vehicle-detail-page',
  templateUrl: './vehicle-detail-page.html',  
  styleUrl: './vehicle-detail-page.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleDetailPage {

    private route: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);
    private vehicleFacade: VehicleFacade = inject(VehicleFacade);

  vehicle$: Observable<Vehicle | null | undefined> = this.vehicleFacade.selectedVehicle$;
  types$: Observable<VehicleType[]> = this.vehicleFacade.vehicleTypes$;
  models$: Observable<VehicleModel[]> = this.vehicleFacade.vehicleModels$;
  loadingTypes$: Observable<boolean> = this.vehicleFacade.loadingTypes$;
  loadingModels$: Observable<boolean> = this.vehicleFacade.loadingModels$;
  errorTypes$: Observable<string | null> = this.vehicleFacade.errorTypes$;
  errorModels$: Observable<string | null> = this.vehicleFacade.errorModels$;

  private destroy$ = new Subject<void>();
  private makeId: number | null = null;
  
  ngOnInit(): void {
    this.vehicleFacade.loadVehicles();

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      map(params => Number(params.get('id'))),
      filter(id => !isNaN(id) && id > 0)
    ).subscribe(id => {
      this.makeId = id;
      this.vehicleFacade.selectVehicle(id);
      this.loadVehicleDetails();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.vehicleFacade.clearVehicleDetails();
  }

  private loadVehicleDetails(): void {
    this.vehicle$.pipe(
      takeUntil(this.destroy$),
      filter(vehicle => vehicle !== null && vehicle !== undefined)
    ).subscribe(vehicle => {
      if (vehicle) {
        this.vehicleFacade.loadVehicleTypes(vehicle.Make_Name);
        this.vehicleFacade.loadVehicleModels(vehicle.Make_ID);
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }

  onRefreshTypes(): void {
    this.vehicle$.pipe(
      takeUntil(this.destroy$),
      filter(vehicle => vehicle !== null && vehicle !== undefined)
    ).subscribe(vehicle => {
      if (vehicle) {
        this.vehicleFacade.loadVehicleTypes(vehicle.Make_Name);
      }
    });
  }

  onRefreshModels(): void {
    if (this.makeId) {
      this.vehicleFacade.loadVehicleModels(this.makeId);
    }
  }
}
