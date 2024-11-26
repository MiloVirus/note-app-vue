import {defineStore} from 'pinia'
import axios from 'axios'

interface Note {
    id: number;
    title: string;
    content: string;
    noteTags: string[];
  }
  
export const useNotesStore = defineStore('notes', 
    {
        state: () => ({
            notes: [] as Note[],
            loading: false,
            error:null as string | null,
        }),
        actions:{
            async fetchNotes()
            {
                try {
                    const response = await axios.get<Note[]>('http://localhost:3000/notes')
                    this.notes = response.data;
                } catch (error) {
                    this.error = (error as Error).message;
                }
            },

            async createNote(newNote:{})
            {
                try {
                    const response = await axios.post('http://localhost:3000/notes', newNote)
                    this.notes.push(response.data)
                } catch (error) {
                    this.error = (error as Error).message
                }
            },

            async deleteNote(noteId:number)
            {
                try {
                    await axios.delete(`http://localhost:3000/notes/${noteId}`)
                    this.notes = this.notes.filter(note => note.id !== noteId)
                } catch (error) {
                    this.error = (error as Error).message
                }
            },
            
            async editNote(noteId:number, data: {})
            {
                try {
                    const response = await axios.put(`http://localhost:3000/notes/${noteId}`, data) 
                    const index = this.notes.findIndex(note => note.id === noteId);
                    this.notes[index] = response.data
                } catch (error) {
                    this.error = (error as Error).message
                }
            }
        }
    }
)