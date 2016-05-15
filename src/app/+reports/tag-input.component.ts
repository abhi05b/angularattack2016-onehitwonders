import {Component, HostBinding, Input} from '@angular/core';
import {NgFor} from '@angular/common';
import {isBlank} from '@angular/common/src/facade/lang';
import {TagInputItemComponent} from './tag-input-item.component';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap';
console.log('dir',TYPEAHEAD_DIRECTIVES,CORE_DIRECTIVES, FORM_DIRECTIVES);
@Component({
  selector: 'tag-input',
  template:
  `<tag-input-item
    [text]="tag"
    [index]="index"
    [selected]="selectedTag === index"
    (tagRemoved)="_removeTag($event)"
    *ngFor="#tag of tagsList; #index = index">
  </tag-input-item>
  <input
    class="ng2-tag-input-field"
    type="text"
    [typeahead]="statesComplex"
    (typeaheadOnSelect)="typeaheadOnSelect($event)"
    [typeaheadOptionField]="'name'"
    [placeholder]="placeholder"
    [(ngModel)]="inputValue"
    (paste)="inputPaste($event)"
    (keydown)="inputChanged($event)"
    (blur)="inputBlurred($event)"
    (focus)="inputFocused()"
    #tagInputRef>`,

  styles: [`
    :host {
      display: block;
      box-shadow: 0 1px #ccc;
      padding: 5px 0;
    }

    :host.ng2-tag-input-focus {
      box-shadow: 0 2px #0d8bff;
    }

    .ng2-tag-input-field {
      display: inline-block;
      width: auto;
      box-shadow: none;
      border: 0;
    }
  `],
  directives: [TagInputItemComponent,TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class TagInputComponent {
  @Input() placeholder: string = 'Add a tag';
  @Input() ngModel: string[];
  @Input() delimiterCode: string = '188';
  @Input() addOnBlur: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() allowedTagsPattern: RegExp = /.+/;
    @HostBinding('class.ng2-tag-input-focus') isFocussed;e

  public tagsList: string[] = [];
  public inputValue: string = '';
  public delimiter: number;
  public selectedTag: number;
  public typeaheadOnSelect(e:any):void {
    console.log('Selected value', e.item);
    this._addTags([e.item.name]);
    setTimeout(() => this.inputValue = '');
    
  }
  public statesComplex:Array<any> = [
    {id: 1, name: 'Alabama'}, {id: 2, name: 'Alaska'}, {id: 3, name: 'Arizona'},
    {id: 4, name: 'Arkansas'}, {id: 5, name: 'California'},
    {id: 6, name: 'Colorado'}, {id: 7, name: 'Connecticut'},
    {id: 8, name: 'Delaware'}, {id: 9, name: 'Florida'},
    {id: 10, name: 'Georgia'}, {id: 11, name: 'Hawaii'},
    {id: 12, name: 'Idaho'}, {id: 13, name: 'Illinois'},
    {id: 14, name: 'Indiana'}, {id: 15, name: 'Iowa'},
    {id: 16, name: 'Kansas'}, {id: 17, name: 'Kentucky'},
    {id: 18, name: 'Louisiana'}, {id: 19, name: 'Maine'},
    {id: 21, name: 'Maryland'}, {id: 22, name: 'Massachusetts'},
    {id: 23, name: 'Michigan'}, {id: 24, name: 'Minnesota'},
    {id: 25, name: 'Mississippi'}, {id: 26, name: 'Missouri'},
    {id: 27, name: 'Montana'}, {id: 28, name: 'Nebraska'},
    {id: 29, name: 'Nevada'}, {id: 30, name: 'New Hampshire'},
    {id: 31, name: 'New Jersey'}, {id: 32, name: 'New Mexico'},
    {id: 33, name: 'New York'}, {id: 34, name: 'North Dakota'},
    {id: 35, name: 'North Carolina'}, {id: 36, name: 'Ohio'},
    {id: 37, name: 'Oklahoma'}, {id: 38, name: 'Oregon'},
    {id: 39, name: 'Pennsylvania'}, {id: 40, name: 'Rhode Island'},
    {id: 41, name: 'South Carolina'}, {id: 42, name: 'South Dakota'},
    {id: 43, name: 'Tennessee'}, {id: 44, name: 'Texas'},
    {id: 45, name: 'Utah'}, {id: 46, name: 'Vermont'},
    {id: 47, name: 'Virginia'}, {id: 48, name: 'Washington'},
    {id: 49, name: 'West Virginia'}, {id: 50, name: 'Wisconsin'},
    {id: 51, name: 'Wyoming'}];

  constructor() {
    //this._ngControl.valueAccessor = this;
  }

  ngOnInit() {
    if (this.ngModel) this.tagsList = this.ngModel;
    this.onChange(this.tagsList);
    this.delimiter = parseInt(this.delimiterCode);
  }

  inputChanged(event) {
    let key = event.keyCode;
    switch(key) {
      case 8: // Backspace
        this._handleBackspace();
        break;
      case 13: //Enter
        this.addOnEnter && this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      case this.delimiter:
        this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      default:
        this._resetSelected();
        break;
    }
  }

  inputBlurred(event) {
    //this.addOnBlur && this._addTags([this.inputValue]);
    //this.isFocussed = false;
  }
  inputFocused(event) {
    this.isFocussed = true;
  }

  inputPaste(event) {
    let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    let pastedString = clipboardData.getData('text/plain');
    let tags = this._splitString(pastedString);
    let tagsToAdd = tags.filter((tag) => this._isTagValid(tag));
    this._addTags(tagsToAdd);
    setTimeout(() => this.inputValue = '', 3000);
  }

  private _splitString(tagString: string) {
    tagString = tagString.trim();
    let tags = tagString.split(String.fromCharCode(this.delimiter));
    return tags.filter((tag) => !!tag);
  }

  private _isTagValid(tagString: string) {
    return this.allowedTagsPattern.test(tagString);
  }

  private _addTags(tags: string[]) {
    let validTags = tags.filter((tag) => this._isTagValid(tag));
    this.tagsList = this.tagsList.concat(validTags);
    this._resetSelected();
    this._resetInput();
    this.onChange(this.tagsList);
  }

  private _removeTag(tagIndexToRemove) {
    this.tagsList.splice(tagIndexToRemove, 1);
    this._resetSelected();
    this.onChange(this.tagsList);
  }

  private _handleBackspace() {
    if (!this.inputValue.length && this.tagsList.length) {
      if (!isBlank(this.selectedTag)) {
        this._removeTag(this.selectedTag);
      }
      else {
        this.selectedTag = this.tagsList.length - 1;
      }
    }
  }

  private _resetSelected() {
    this.selectedTag = null;
  }

  private _resetInput() {
    this.inputValue = '';
  }

  /** Implemented as part of ControlValueAccessor. */
  onChange: (value) => any = () => { };

  onTouched: () => any = () => { };

  writeValue(value: any) { }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
