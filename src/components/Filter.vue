<script setup lang="ts">
import type { PropType } from 'vue';

defineProps(
    {
        tags: 
        {
            type: Array as PropType<string[]>
        }
    }
)
</script>
<template>
    <section class="filter-container">
        <div class="filter-title">
            <h3>Filter by Tags</h3>
        </div>
        <div class="tags" v-for="tag in tags">
            <input 
                type="checkbox" 
                id="tag"
            />
            <label for="{{ tag }}">{{ tag }}</label>
        </div>
    </section>
</template>

<style>
    .filter-container {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 320px;
    margin: 1rem auto;
  }
  .filter-title
  {
    width: 100%;
  }
  .filter-container h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.75rem;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 2px;
  }
  
  .tags div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    
  }
  
  .tags input[type="checkbox"] {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  
  .tags label {
    font-size: 1rem;
    color: #555;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .tags label:hover {
    color: #007bff;
  }
  
  .tags input[type="checkbox"]:checked + label {
    font-weight: bold;
    color: #007bff;
  }
</style>