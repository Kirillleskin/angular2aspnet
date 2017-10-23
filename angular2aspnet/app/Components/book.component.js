"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var book_service_1 = require("../Service/book.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var BookComponent = (function () {
    function BookComponent(fb, _bookService) {
        this.fb = fb;
        this._bookService = _bookService;
        this.indLoading = false;
    }
    BookComponent.prototype.ngOnInit = function () {
        this.bookFrm = this.fb.group({
            Id: [''],
            Name: ['', forms_1.Validators.required],
            Category: ['']
        });
        this.LoadBooks();
    };
    BookComponent.prototype.LoadBooks = function () {
        var _this = this;
        this.indLoading = true;
        this._bookService.get(global_1.Global.BASE_BOOK_ENDPOINT)
            .subscribe(function (books) { _this.books = books; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    BookComponent.prototype.addBook = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Book";
        this.modalBtnTitle = "Add";
        this.bookFrm.reset();
        this.modal.open();
    };
    BookComponent.prototype.editBook = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Book";
        this.modalBtnTitle = "Update";
        this.book = this.books.filter(function (x) { return x.Id == id; })[0];
        this.bookFrm.setValue(this.book);
        this.modal.open();
    };
    BookComponent.prototype.deleteBook = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.book = this.books.filter(function (x) { return x.Id == id; })[0];
        this.bookFrm.setValue(this.book);
        this.modal.open();
    };
    BookComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.bookFrm.enable() : this.bookFrm.disable();
    };
    BookComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._bookService.post(global_1.Global.BASE_BOOK_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully added.";
                        _this.LoadBooks();
                    }
                    else {
                        _this.msg = "There is some issue in saving records!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._bookService.put(global_1.Global.BASE_BOOK_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully updated.";
                        _this.LoadBooks();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._bookService.delete(global_1.Global.BASE_BOOK_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadBooks();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    return BookComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], BookComponent.prototype, "modal", void 0);
BookComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/book.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, book_service_1.BookService])
], BookComponent);
exports.BookComponent = BookComponent;
//# sourceMappingURL=book.component.js.map