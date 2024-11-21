<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue';

const toggleEdit = ref(true);
const { id, title, content, noteTags} = defineProps({
    id:{
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    noteTags:{
      type: Array as PropType<string[]>,
    },
    tags:{
      type: Array as PropType<string[]>
    }
  });

  const localTitle = ref(title)
  const localContent = ref(content)
  const noteTagsLocal = ref(noteTags)

  const handleToggle = () => {
    toggleEdit.value = !toggleEdit.value;
    localTitle.value = title
    localContent.value = content
  };

  const handleToggleTags = (tag:string) =>
  {
      noteTagsLocal.value = noteTagsLocal.value?.includes(tag)
    ? noteTagsLocal.value.filter(item => item !== tag) // Remove tag
    : [...(noteTagsLocal.value ?? []), tag]; // Add tag, or initialize if undefined
  }

  const emit = defineEmits(['handleDelete','handleEdit']);

  const onEdit = () =>
  {
    emit('handleEdit', id, localTitle.value, localContent.value, noteTagsLocal.value)
    toggleEdit.value = !toggleEdit.value;
  }

</script>

<template>
    <div class="note-card">
      <template v-if="toggleEdit">
        <div class="btn-container">
          <button class="edit-btn" @click="handleToggle"><v-icon name="hi-solid-pencil" /></button>
          <button class="delete-btn" @click="emit('handleDelete', id)"><v-icon name="bi-trash-fill"/></button>
        </div>
        <h3 class="note-card-title">{{title}}</h3>
        <p class="note-card-content">{{content}}</p>
        <section class="tagsContainer">
          <div :class="['tags', tag.includes(tag) ? 'active' : '']" v-for="(tag, index) in noteTags"
            :key="index">{{ tag }}
          </div>
        </section>
      </template>
      <template v-else>
        <div class="btn-container">
          <button class="edit-btn" @click="handleToggle"><v-icon name="md-cancel" /></button>
        </div>
        <input class="note-card-title-input" v-model="localTitle" placeholder="Title"/>
        <input class="note-card-content-input" v-model="localContent" placeholder="Content"/>
        <section class="tagsContainer">
          <div  v-for="(tag, index) in tags"
            :key="index">
            <button :class="['tags', noteTagsLocal?.includes(tag) ? 'active' : '']" @click="handleToggleTags(tag)">
              {{ tag }}
            </button>
          </div>
        </section>
        <button class="save-btn" @click="onEdit">Save</button>
      </template>     
    </div>
</template>

<style scoped>
.note-card {
    display: flex; 
    flex-direction: column; 
    align-items: center;  
    width: 250px; 
    height: 250px; 
    margin: 0px 10px 0px 10px;
    background-color: #fff; 
    border-radius: 8px; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 16px;
  }
  
  .note-card-title {
    font-size: 1.25em;
    margin: 0 0 8px 0;
    color: #333;
    font-weight: bold;
  }
  
  .note-card-content {
    font-size: 1em;
    color: #666;
  }

  .save-btn {
  background-color: #860097; 
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.save-btn:hover {
  background-color: #6b0066; 
}

.delete-btn {
  background-color: red;
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.btn-container
{
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.btnContainer
{
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.delete-btn {
  
    border: none;
    margin-bottom: 10px;
    color: #ffffff;
    background-color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center; 
    font-size: 1rem;
    border-radius: 50%; 
    width: 35px; 
    height: 35px; 
    padding: 0; 
    transition: background-color 0.3s ease; 
  
}

.edit-btn {
    border: none;
    margin-bottom: 10px;
    color: #ffffff;
    background-color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center; 
    font-size: 0.5rem;
    border-radius: 50%; 
    width: 35px; 
    height: 35px; 
    padding: 0; 
    transition: background-color 0.3s ease; 
  }

    
  .note-card-title-input {
    font-size: 1.25em;
    margin: 0 0 8px 0;
    color: #333;
    font-weight: bold;
    width: 100%;
  }
  
  .note-card-content-input {
    font-size: 1em;
    color: #666;
    width: 100%;
  }

  .tagsContainer
  {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 10%;
    margin-bottom: 5%;
  }

  .tags
  {
    background-color: rgb(108, 106, 109);
    color: white;
    border-radius: 8px;
    border: none;
    margin: 3px;
    padding: 5px;
    font-size: 10px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .tags.active {
    background-color: #a104b6; 
    color: white;
  }
</style>