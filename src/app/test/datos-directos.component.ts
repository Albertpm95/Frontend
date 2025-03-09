import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DatosDirectos,
  DatosDirectosResult,
} from '@interfaces/datos-directos.interface';
import { FicheroService } from '@services/external/ficheros.service';
import { VisorImagenComponent } from './imagen.component';

@Component({
  selector: 'app-test-datos-directos',
  standalone: true,
  imports: [CommonModule, VisorImagenComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4">
        <div class="flex flex-col w-1/2 gap-4">
          <label>Matriz:</label>
          <textarea
            [formControl]="matrizTexto"
            class="border p-2 w-full h-24"
          ></textarea>
        </div>
        <div class="flex flex-col w-1/2 gap-4">
          <label for="file" class="text-sm font-medium text-gray-700">
            Selecciona un fichero con variables independientes:
          </label>
          <input
            id="file"
            type="file"
            class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            (change)="seleccionarFicheroVariablesIndependientes($event)"
          />
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div class="flex flex-col w-1/2 gap-4">
          <label>Vector:</label>
          <textarea
            [formControl]="vectorTexto"
            class="border p-2 w-full h-12"
          ></textarea>
        </div>
        <div class="flex flex-col w-1/2 gap-4">
          <label for="file" class="text-sm font-medium text-gray-700">
            Selecciona un fichero con variables dependientes:
          </label>
          <input
            id="file"
            type="file"
            class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            (change)="seleccionarFicheroVariablesDependientes($event)"
          />
        </div>
      </div>
      <div>
        <label>Método:</label>
        <select [formControl]="method" class="border p-2 w-full">
          <option value="OLS" selected>OLS</option>
          <option value="NNLS">NNLS</option>
          <option value="CLS">CLS</option>
        </select>
      </div>

      <div>
        <label>Test size (0-1):</label>
        <input
          type="number"
          [formControl]="test_size"
          class="border p-2 w-full"
          min="0"
          max="1"
          step="0.01"
        />
      </div>

      <div>
        <label>Random State:</label>
        <input
          type="number"
          [formControl]="randomStateControl"
          class="border p-2 w-full"
        />
      </div>
      <button type="button" (click)="enviar()">Enviar</button>
    </div>

    @if(resultado){
    <div style="display: flex; flex-direction: row;">
      <div
        class="p-4 space-y-2 bg-gray-100 rounded-lg shadow-md"
        style="width: 50%"
      >
        <span class="font-semibold text-lg"
          >Coefficients:
          <span class="font-normal">{{
            resultado.coefficients?.join(', ')
          }}</span></span
        ><br />
        <span class="font-semibold text-lg"
          >Intercept:
          <span class="font-normal">{{
            resultado.intercept?.join(', ')
          }}</span></span
        ><br />
        <span class="font-semibold text-lg"
          >R2: <span class="font-normal">{{ resultado.r_squared }}</span></span
        ><br />
        <span class="font-semibold text-lg"
          >Predicciones:
          <span class="font-normal">{{
            resultado.predictions?.join(', ')
          }}</span></span
        ><br />
        <span class="font-semibold text-lg"
          >Método: <span class="font-normal">{{ resultado.method }}</span></span
        ><br />
        <span class="font-semibold text-lg"
          >Ruta del archivo:
          <span class="font-normal">{{ resultado.file_path }}</span></span
        ><br />
      </div>
      <div style="width: 50%">
        <app-visor-imagen
          *ngIf="resultado.plot"
          [imageData]="resultado.plot"
        ></app-visor-imagen>
      </div>
    </div>

    }
  `,
})
export class TestDatosDirectosComponent {
  readonly #ficherosService = inject(FicheroService);
  readonly #cdr = inject(ChangeDetectorRef);

  resultado: DatosDirectosResult | undefined;
  ficheroVariablesDependientes: any = undefined;
  ficheroVariablesIndependientes: any = undefined;
  matriz: number[][] | undefined = [];
  vector: number[] = [];

  matrizTexto = new FormControl(`
`);
  vectorTexto = new FormControl(`500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
`);

  method = new FormControl('OLS', [Validators.required]);
  randomStateControl = new FormControl(42);
  test_size = new FormControl(0.33);

  enviar() {
    this.matriz = this.parsearMatriz();
    this.vector = this.parsearVector();
    console.log('Depend: ', this.ficheroVariablesDependientes);
    console.log('Indep: ', this.ficheroVariablesIndependientes);

    if (this.matriz && this.vector) {
      const datos_directos: DatosDirectos = {
        variables_independientes: { variables_independientes: this.matriz },
        variables_dependientes: { variables_dependientes: this.vector },
        method: this.method.value ?? 'OLS',
        random_state: this.randomStateControl.value,
        test_size: this.test_size.value,
      };
      this.#ficherosService
        .ejecutarRegresionDatosDirectos(datos_directos)
        .subscribe((x: any) => {
          this.resultado = x;
          if (this.resultado)
            this.resultado.plot = 'data:image/png;base64,' + `${x.plot}`;
          this.#cdr.detectChanges();
        });
    } else if (
      this.ficheroVariablesDependientes ||
      this.ficheroVariablesIndependientes
    ) {
    }
  }

  private parsearMatriz(): number[][] | undefined {
    let matriz: number[][] = [];
    if (this.matrizTexto.value) {
      matriz = this.matrizTexto.value
        ?.trim()
        .split('\n')
        .map((line) => line.split(',').map((num) => Number(num.trim())));
    }

    return matriz;
  }

  private parsearVector(): number[] {
    let vector: number[] = [];
    if (this.vectorTexto.value) {
      vector = this.vectorTexto.value
        .trim()
        .split('\n')
        .map((num) => Number(num.trim()));
    }
    return vector;
  }

  seleccionarFicheroVariablesIndependientes($event: any) {
    this.ficheroVariablesDependientes = $event.target?.files?.[0];
  }
  seleccionarFicheroVariablesDependientes($event: any) {
    this.ficheroVariablesDependientes = $event.target?.files?.[0];
  }
}
