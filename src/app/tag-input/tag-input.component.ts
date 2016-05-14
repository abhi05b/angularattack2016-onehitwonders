import {Component, HostBinding, Input, OnInit, ElementRef} from '@angular/core';
import {NgFor} from '@angular/common';
import {isBlank} from '@angular/common/src/facade/lang';
import {TagInputItemComponent} from './../tag-input-item/tag-input-item.component';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap';
import { TagService } from './../tag/tag.service';
declare var jQuery:any;
@Component({
  moduleId: module.id,
  selector: 'tag-input',
  templateUrl: 'tag-input.component.html',
  styleUrls: ['tag-input.component.css'],
  directives: [TagInputItemComponent,TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class TagInputComponent{
  @Input() placeholder: string = 'Add a tag';
  @Input() ngModel: string[];
  @Input() delimiterCode: string = '188';
  @Input() addOnBlur: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() allowedTagsPattern: RegExp = /.+/;
  @HostBinding('class.ng2-tag-input-focus') isFocussed;
  private _cache:any;
  private _prevContext:any;
  public tagsList: string[] = [];
  public inputValue: string = '';
  public delimiter: number;
  public selectedTag: number;
  public tagService: TagService;
  public hasTypeAheadResults = false;
  public getContext():any {
    return this;
  }

  public getAsyncData(context:any):Function {

    let that:any =this;
    this.hasTypeAheadResults = false;
    let query = new RegExp(that.inputValue, 'ig');
    let f:Function = function ():Promise<string[]>{
      let p:Promise<string[]> = that.tagService.getTags().then(data=>{
      	let typeAheadResult =  data.map(tag => {
      		return tag.name;
      	}).filter(tagName => {
      		let matches = tagName.match(query);
      		return matches && matches.length>0;
      	});
      	if(typeAheadResult.length>0){
      		that.hasTypeAheadResults = true;
      	}else{
      		that.hasTypeAheadResults = false;
      	}
      	return typeAheadResult;
      });
      return p;
    };
    this._cache = f;
    return this._cache;
  }
  public typeaheadLoading:boolean = false;
  public typeaheadNoResults:boolean = false;
  public changeTypeaheadLoading(e:boolean):void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e:boolean):void {
    this.typeaheadNoResults = e;
  }


  public typeaheadOnSelect(e:any):void {
    this._addTags([e.item]);
    setTimeout(() => this.inputValue = '');
  }
  constructor(private _tagService: TagService) {
    this.tagService=_tagService;
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
        this.addOnEnter && jQuery('typeahead-container').length===0 && this._addTags([this.inputValue]);
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
    this.addOnBlur && jQuery('typeahead-container').length===0 && this._addTags([this.inputValue]);
    this.isFocussed = false;
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

