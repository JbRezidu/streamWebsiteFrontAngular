import { MatSnackBar } from '@angular/material/snack-bar';

export function openWarningSnackBar({
  snackBar,
  component,
  warningMessage,
}: {
  snackBar: MatSnackBar;
  component: any;
  warningMessage: string;
}) {
  snackBar.openFromComponent(component, {
    data: {
      warningMessage,
    },
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
    panelClass: ['warn-snackbar'],
  });
}
