import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef, } from "@angular/material/dialog";

export const MaterialModules = [
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
]

export { MAT_DIALOG_DATA, MatDialogRef,MatDialog , MatButton,};
