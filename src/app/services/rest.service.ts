import { Injectable } from '@angular/core';
import { Note } from '../note';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private _fireStore: Firestore) { }

  // addNewNote Code Here
  addNote(note: Note){
  note.id = doc(collection(this._fireStore, 'id')).id
  return addDoc(collection(this._fireStore, 'Notes'),note)
  }

  //getAllNote from database
  getNote():Observable<Note[]>{
      let notesRef = collection(this._fireStore, 'Notes')
      return collectionData(notesRef, {idField: 'id'}) as Observable<Note[]>
  }

  //deleteNote from database
  deleteNote(note: Note){
   let docRef = doc(this._fireStore, `Notes/${note.id}`)

   return deleteDoc(docRef)
  }

  //updateNote from database
   updateNote(note : Note, notes : any){
   let docRef = doc(this._fireStore, `Notes/${note.id}`);
   return updateDoc(docRef, notes)
   }
}
