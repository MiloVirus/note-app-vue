<script setup  lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useNotesStore } from './store/notes';
import Note from './components/Note.vue'
import NoteInput from './components/NoteInput.vue'
import Filter from './components/Filter.vue'

const toggleScreen = ref(false);
const userStore = useNotesStore();
const noteList = computed(() => userStore.notes);
const tags = ref(['sport', 'news', 'tech', 'to-do'])


onMounted(async () => {
  await userStore.fetchNotes();
});

const handleToggle = () => {
  toggleScreen.value = !toggleScreen.value;
};

const handleSave = async(title:string , content:string, selectedTags:string[]) =>
{
  const newNote = {title: title, content: content, tags: selectedTags}
  await userStore.createNote(newNote)
}

const handleDelete = async(id:number) =>
{
  await userStore.deleteNote(id)
}

const handleEdit = async(id:number, title:string, content:string, localTags:string[]) => {
  const data = {id: id, title: title, content: content, tags: localTags}
  await userStore.editNote(id, data)
}
</script>

<template>
  <Filter
  :tags="tags"/>
  <h3>The Note App</h3>
  <article class="noteContainer">
    <template v-if="toggleScreen">  
      <Note v-for="note in noteList"
      :key="note.id"
      :id = "note.id"
      :title="note.title"
      :content="note.content"
      :tags="tags"
      :noteTags="note.noteTags"
      @handleDelete="handleDelete"
      @handleEdit="handleEdit"
      />
      <button class="buttonCard" @click="handleToggle">+</button>
    </template>
    <template v-else>
      <Note v-for="note in noteList"
      :key="note.id"
      :id = "note.id"
      :title="note.title"
      :content="note.content"
      :tags="tags"
      :noteTags="note.noteTags"
      @handleDelete="handleDelete"
      @handleEdit="handleEdit"/>
      <NoteInput
      :tags="tags"
      @handleSave="handleSave" 
      />
    </template>
  </article>
</template>

<style scoped>
.noteContainer {
  margin: 30px;
  display: flex;
  text-align: center;
}
h3
{
  text-align: center;
}

.buttonCard {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.buttonCard:hover {
  background-color: #0056b3;
}
</style>
