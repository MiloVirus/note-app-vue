<script setup  lang="ts">
import { ref } from 'vue';
import Note from './components/Note.vue'
import NoteInput from './components/NoteInput.vue'
import Filter from './components/Filter.vue'

const toggleScreen = ref(false);
const noteList = ref(<{id:number, title:string, content:string, noteTags:string[]}[]>[])
const tags = ref(['sport', 'news', 'tech', 'to-do'])

const handleToggle = () => {
  toggleScreen.value = !toggleScreen.value;
};

const handleSave = (title:string , content:string, selectedTags:string[]) =>
{
  const id = Math.floor(Math.random() * 100)
  noteList.value.push({id:id, title: title, content: content, noteTags: selectedTags})
}

const handleDelete = (id:number) =>
{
  noteList.value = noteList.value.filter(item => item.id !== id);
}

const handleEdit = (id:number, title:string, content:string, localTags:string[]) => {
  noteList.value = noteList.value.map(item =>
    item.id === id
    ?  {...item, title: title, content: content, noteTags: localTags}
    : item
  )
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
