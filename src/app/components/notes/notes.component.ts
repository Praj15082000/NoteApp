import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Note } from 'src/app/note';
import { RestService } from 'src/app/services/rest.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
   noteForm !: FormGroup;
   editForm !: FormGroup;
   noteDetails : any;
   noteData : any = [];
   noteObj: Note ={
     id: '',
     note_title: '',
     note_dec: ''
   }
  constructor(private _FB : FormBuilder, private _restService : RestService, private spinner: NgxSpinnerService) {
    this.noteForm = this._FB.group({
     title : ['', Validators.required],
     description : ['', Validators.required]
    });
    this.editForm = this._FB.group({
      edit_title : ['', Validators.required],
      edit_description : ['', Validators.required]
     })
  }

  ngOnInit(): void {
    this.getAllNote();
  }
  addNote(){
    const {value} = this.noteForm
    console.log(value);
    this.noteObj.id = '',
    this.noteObj.note_title = value.title,
    this.noteObj.note_dec   = value.description

    this._restService.addNote(this.noteObj).then((note)=>{
     if(note){
      alert("Note Added Successfully")
      this.noteForm.reset();
     }

    })
  }

  getAllNote(){
    this.spinner.show();
    this._restService.getNote().subscribe((res:Note[])=>{
      console.log(res)
      this.noteData = res;
      this.spinner.hide();
    })
  }
  //deleteNote from database
  deleteNote(note :Note){
   let decision = confirm("Are you want to delet this note?");
   if(decision == true){
    this._restService.deleteNote(note);
   }
  }

 getAllDetails(note : Note){
  this.noteDetails = note
  console.log(this.noteDetails)
 }

  //updataNote from database
  updateNote(note: Note){
  const {value} = this.editForm;
  console.log(value);
  this.noteObj.id = note.id;
    this.noteObj.note_title = value.edit_title;
    this.noteObj.note_dec   = value.edit_description;

    this._restService.updateNote(note, this.noteObj).then(()=>{
      alert("Note Upadated Successfully")
    })
    this.editForm.reset();
  }
}
