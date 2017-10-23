import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../Service/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IBook } from '../Models/book';
import { ICategory } from '../Models/category';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/Components/book.component.html'
})

export class BookComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    books: IBook[];
    book: IBook;
    categories: ICategory[];
    msg: string;
    indLoading: boolean = false;
    bookFrm: FormGroup;
    Category: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _bookService: BookService) { }

    ngOnInit(): void {
        
        this.bookFrm = this.fb.group({
            Id: [''],
            CategoryID: [''],
            Name: ['', Validators.required],
            Category: []
        });
       
        this.LoadBooks();
        this.LoadCategories();
    }
    
    LoadBooks(): void {
        this.indLoading = true;
        this._bookService.get(Global.BOOK_ENDPOINT)
            .subscribe(books => { this.books = books; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    LoadCategories(): void {
        this._bookService.get(Global.CATEGORY_ENDPOINT)
            .subscribe(categories => { this.categories = categories; },
            error => this.msg = <any>error);
    }

    addBook() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Book";
        this.modalBtnTitle = "Add";
        this.bookFrm.reset();
        this.modal.open();
    }

    editBook(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Book";
        this.modalBtnTitle = "Update";
        this.book = this.books.filter(x => x.Id == id)[0];
        this.bookFrm.setValue(this.book);
        this.modal.open();
    }

    deleteBook(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.book = this.books.filter(x => x.Id == id)[0];
        this.bookFrm.setValue(this.book);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.bookFrm.enable() : this.bookFrm.disable();
    }

    onSubmit(formData: any) {
        this.msg = "";
        switch (this.dbops) {
            case DBOperation.create:
                this._bookService.post(Global.BOOK_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadBooks();
                        }
                        else {
                            this.msg = "There is some issue in saving records!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                formData._value.Category = this.categories.filter(x => x.Id == formData._value.CategoryID)[0]
                this._bookService.put(Global.BOOK_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadBooks();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._bookService.delete(Global.BOOK_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadBooks();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

        }
    }
}