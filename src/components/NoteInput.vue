<script setup lang="ts">
import { ref } from 'vue'

defineProps({
    tags:{
      type: []
    },
  });

const title = ref()
const content = ref()
const selectedTags = ref(<string[]>[])


const emit = defineEmits();

const handleSave = () =>
{
    title.value && content.value
  ? (emit('handleSave', title.value, content.value, selectedTags.value), 
    title.value = '', content.value = '')
  : null;

  selectedTags.value = []
}

const clickTags = (tag:string) => 
{
  selectedTags.value = [...selectedTags.value, tag]
}

</script>

<template>
    <div class="note-card">
        <label for="title">Title</label>
        <input type="text" @change="handleChange" id="title" class="note-card-title" v-model="title"/>
        <label for="content">Content</label>
        <input type="text" @change="handleChange" id="content" class="note-card-content" v-model="content" />
        <section class="tagsContainer">
          <div v-for="(tag, index) in tags">
            <button :class="['tags', selectedTags.includes(tag) ? 'active' : '']" @click="clickTags(tag)"
            :key="index">{{ tag }}</button>
          </div>
        </section>
        <button class="styled-button" @click="handleSave">Save Note</button>
        
    </div>
</template>

<style scoped>
.note-card {
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: space-around; 
    width: 250px; 
    height: 250px; 
    margin: 0 auto; 
    background-color: #fff; 
    border-radius: 8px; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 16px;
  }
  
  .note-card-title {
    font-size: 1.25em;
    margin: 0 0 8px 0;
    color: #666;
    font-weight: bold;
    width: 100%;
    border-radius: 5px;
  }
  
  .note-card-content {
    font-size: 1em;
    color: #666;
    width: 100%;
    height: 200px;
    border-radius: 5px;
  }
  label{
    color: #333;
    font-weight: bold;
  }

  .styled-button {
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

.styled-button:hover {
  background-color: #6b0066; 
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