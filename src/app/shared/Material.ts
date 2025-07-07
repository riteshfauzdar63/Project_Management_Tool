import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef, } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";

export const MaterialModules = [
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
]

export { MAT_DIALOG_DATA, MatDialogRef,MatDialog , MatButton,};
