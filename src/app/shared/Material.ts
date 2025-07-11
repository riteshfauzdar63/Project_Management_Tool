import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef, } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";

export const MaterialModules = [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
]

export { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatButton, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatPaginatorModule };
