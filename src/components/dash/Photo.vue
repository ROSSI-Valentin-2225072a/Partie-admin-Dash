<template>
    <div class="photo-container">
      <span class="photo-text">Photo à venir</span>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .photo-container {
    width: 160px;
    height: 160px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .photo-text {
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    opacity: 0.7;
  }
  </style>
  