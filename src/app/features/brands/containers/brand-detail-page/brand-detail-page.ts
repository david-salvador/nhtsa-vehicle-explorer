import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, map, switchMap } from 'rxjs/operators';
import { VehicleFacade } from '../../../vehicles/store/facades/vehicle.facade';
import { Vehicle, VehicleType, VehicleModel } from '../../../vehicles/store/models/vehicle-state.model';

@Component({
  selector: 'app-brand-detail-page',
  templateUrl: './brand-detail-page.html',
  styleUrls: ['./brand-detail-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class BrandDetailPage implements OnInit, OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private vehicleFacade: VehicleFacade = inject(VehicleFacade);
  
  brand$!: Observable<Vehicle | null | undefined>;
  types$: Observable<VehicleType[]> = this.vehicleFacade.vehicleTypes$;
  models$: Observable<VehicleModel[]> = this.vehicleFacade.vehicleModels$;
  loadingTypes$: Observable<boolean> = this.vehicleFacade.loadingTypes$;
  loadingModels$: Observable<boolean> = this.vehicleFacade.loadingModels$;

  private destroy$ = new Subject<void>();
  private brandId: number | null = null;

  ngOnInit(): void {
    this.vehicleFacade.loadVehicles();

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      map(params => Number(params.get('id'))),
      filter(id => !isNaN(id) && id > 0)
    ).subscribe(id => {
      this.brandId = id;
      this.vehicleFacade.selectVehicle(id);
      this.loadBrandDetails();
    });

    this.brand$ = this.vehicleFacade.selectedVehicle$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.vehicleFacade.clearVehicleDetails();
  }

  private loadBrandDetails(): void {
    this.brand$.pipe(
      takeUntil(this.destroy$),
      filter(brand => brand !== null && brand !== undefined)
    ).subscribe(brand => {
      if (brand) {
        this.vehicleFacade.loadVehicleTypes(brand.Make_Name);
        this.vehicleFacade.loadVehicleModels(brand.Make_ID);
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }
}